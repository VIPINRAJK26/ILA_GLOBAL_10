import axiosInstance from '../../../api/axiosInstance';
import { getUserProfile, updateUserProfile } from '../../auth/api/getUserProfile';
import type { AuthUser, UpdateProfilePayload } from '../../auth/types/types';
import type {
  StudentDashboardData,
  StudentProfile,
  EnrolledCourse,
  StudentActivityItem,
  ApplicationTrack,
  StudentDocument,
  CefrLevel,
} from '../types';
import {
  getStudentDashboardData,
  saveStudentDashboardData,
  updateStudentProfileData,
  addStudentDocumentRecord,
  deleteStudentDocumentRecord,
  toggleActivityItemStatus,
} from '../studentStorage';

// ==========================================
// 1. ENDPOINT URL DEFINITIONS
// ==========================================
export const STUDENT_ENDPOINTS = {
  CONSOLIDATED_DASHBOARD: 'student/dashboard/',
  USER_PROFILE: 'auth/profile/',
  STUDENT_PROFILE: 'student/profile/',
  COURSES: 'student/courses/',
  ENROLLMENTS: 'enrollments/',
  APPLICATIONS: 'student/applications/',
  DOCUMENTS: 'student/documents/',
  DOCUMENT_DETAIL: (id: string | number) => `student/documents/${id}/`,
  ACTIVITIES: 'student/activities/',
  ACTIVITY_TOGGLE: (id: string | number) => `student/activities/${id}/toggle/`,
} as const;

// ==========================================
// 2. NORMALIZERS & MAPPERS
// ==========================================

function normalizeProfile(rawProfile: any, rawUser: any, fallback: StudentProfile): StudentProfile {
  const firstName = rawUser?.first_name || rawProfile?.first_name || fallback.firstName || '';
  const lastName = rawUser?.last_name || rawProfile?.last_name || fallback.lastName || '';
  const fullName =
    rawUser?.name ||
    rawProfile?.name ||
    `${firstName} ${lastName}`.trim() ||
    rawUser?.username ||
    rawUser?.email ||
    fallback.name;

  return {
    id: rawProfile?.id ?? rawUser?.id ?? fallback.id,
    identifierCode:
      rawProfile?.identifier_code ||
      rawProfile?.identifierCode ||
      rawUser?.identifierCode ||
      rawUser?.code ||
      fallback.identifierCode,
    name: fullName,
    firstName,
    lastName,
    email: rawUser?.email || rawProfile?.email || fallback.email,
    phone:
      rawUser?.phone ||
      rawUser?.phone_number ||
      rawProfile?.phone ||
      rawProfile?.phone_number ||
      fallback.phone,
    avatar: rawUser?.avatar || rawProfile?.avatar || fallback.avatar,
    nationality: rawProfile?.nationality || fallback.nationality || 'International Student',
    passportNumber:
      rawProfile?.passport_number || rawProfile?.passportNumber || fallback.passportNumber || '',
    birthDate: rawProfile?.birth_date || rawProfile?.birthDate || fallback.birthDate || '',
    address: rawProfile?.address || fallback.address || '',
    destination:
      rawProfile?.destination || rawUser?.destination || fallback.destination || 'Germany 🇩🇪',
    targetProgram:
      rawProfile?.target_program ||
      rawProfile?.targetProgram ||
      rawUser?.program ||
      fallback.targetProgram,
    currentCefrLevel: (rawProfile?.current_cefr_level ||
      rawProfile?.currentCefrLevel ||
      fallback.currentCefrLevel ||
      'B1') as CefrLevel,
    targetCefrLevel: (rawProfile?.target_cefr_level ||
      rawProfile?.targetCefrLevel ||
      fallback.targetCefrLevel ||
      'C1') as CefrLevel,
    enrolledSince:
      rawProfile?.enrolled_since || rawProfile?.enrolledSince || fallback.enrolledSince,
  };
}

function normalizeCourse(item: any, index: number): EnrolledCourse {
  const lang =
    item.language ||
    item.course_details?.language?.name ||
    item.course_details?.course?.name ||
    'German';
  const flag = item.flag || item.course_flag || item.course_details?.language?.flag || '🇩🇪';
  const level = (item.level || item.course_level || item.course_details?.level || 'B1') as CefrLevel;
  const title = item.title || item.course_title || item.course_details?.title || `${lang} ${level}`;
  const pathTitle =
    item.learning_path || item.learning_path_title || '1-to-1 Human Tutor';

  return {
    id: String(item.id || item.enrollment_id || `course-${index}`),
    courseCode:
      item.course_code ||
      item.courseCode ||
      item.enrollment_id ||
      `${lang.slice(0, 3).toUpperCase()}-${level}-LIVE`,
    title,
    language: lang,
    flag,
    level,
    instructorName:
      item.instructor_name ||
      item.instructorName ||
      (pathTitle.toLowerCase().includes('human')
        ? 'Senior Native Faculty'
        : 'Intelli Coach AI Faculty'),
    instructorAvatar:
      item.instructor_avatar ||
      item.instructorAvatar ||
      item.course_details?.instructor_avatar ||
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    batchSchedule:
      item.batch_schedule || item.batchSchedule || item.selected_batch || 'Orientation Cohort',
    nextClassTime:
      item.next_class_time || item.nextClassTime || 'Live Batch Orientation Scheduled',
    meetingLink: item.meeting_link || item.meetingLink || 'https://meet.google.com/ila-live-classroom',
    progressPercent:
      typeof item.progress_percent === 'number'
        ? item.progress_percent
        : typeof item.progressPercent === 'number'
        ? item.progressPercent
        : item.status === 'confirmed'
        ? 15
        : 0,
    attendancePercent:
      typeof item.attendance_percent === 'number'
        ? item.attendance_percent
        : typeof item.attendancePercent === 'number'
        ? item.attendancePercent
        : 95,
    totalClasses: item.total_classes || item.totalClasses || 32,
    attendedClasses: item.attended_classes || item.attendedClasses || 0,
    syllabusCovered:
      item.syllabus_covered ||
      item.syllabusCovered ||
      'Module 1: Orientation & Diagnostic Assessment',
    materialsCount: item.materials_count || item.materialsCount || 8,
    status:
      item.status === 'active' || item.status === 'confirmed'
        ? 'active'
        : item.status === 'completed'
        ? 'completed'
        : 'upcoming',
    learningPath: pathTitle,
    tuitionPaid: item.final_price ? `€${item.final_price}` : item.tuition_paid || item.tuitionPaid,
  };
}

function normalizeApplication(item: any, index: number): ApplicationTrack {
  const title =
    item.title ||
    item.course_title ||
    item.course_details?.title ||
    'Application Docket';
  const pathTitle = item.learning_path || item.learning_path_title || 'Standard Track';

  return {
    id: String(item.id || item.enrollment_id || `app-${index}`),
    type: item.type || (item.enrollment_id ? 'course_enrollment' : 'visa'),
    title: item.enrollment_id ? `${title} (${pathTitle})` : title,
    country: item.country || (item.flag ? 'International' : 'Germany'),
    flag: item.flag || item.course_flag || '🇩🇪',
    referenceNumber:
      item.reference_number ||
      item.referenceNumber ||
      item.enrollment_id ||
      item.reference ||
      `ILA-APP-${index + 100}`,
    submittedDate: item.submitted_date || item.submittedDate || (item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'),
    status: item.status === 'confirmed' ? 'approved' : item.status || 'submitted',
    statusLabel:
      item.status_label ||
      item.statusLabel ||
      (item.status === 'confirmed' ? 'Seat Confirmed' : 'Processing'),
    consularDesk: item.consular_desk || item.consularDesk || 'ILA Global Academic Admissions Desk',
    officerNotes:
      item.officer_notes ||
      item.officerNotes ||
      (item.final_price ? `Tuition: €${item.final_price}. Selected Batch: ${item.selected_batch}.` : undefined),
    steps: Array.isArray(item.steps) && item.steps.length > 0 ? item.steps : [
      { name: 'Application Received & Seat Allocated', status: 'completed', date: 'Done' },
      { name: 'Payment & Batch Verification', status: 'completed', date: 'Verified' },
      { name: 'Portal Credentials & Learning Kit Dispatch', status: 'current', date: 'Within 24 Hours' },
      { name: 'Live Classroom Orientation', status: 'pending' },
    ],
    learningPath: pathTitle,
    tuitionPaid: item.final_price ? `€${item.final_price}` : item.tuition_paid || item.tuitionPaid,
  };
}

function normalizeDocument(item: any, index: number): StudentDocument {
  const fileName =
    item.file_name ||
    item.fileName ||
    (item.file ? String(item.file).split('/').pop() : 'document.pdf');

  return {
    id: String(item.id || `doc-${index}`),
    name: item.name || item.title || item.document_name || 'Document',
    category: item.category || item.document_type || 'transcript',
    fileName: fileName || 'document.pdf',
    fileSize: item.file_size || item.fileSize || '1.4 MB',
    uploadedAt:
      item.uploaded_at ||
      item.uploadedAt ||
      (item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Verified'),
    status: item.status || 'verified',
    downloadUrl: item.file || item.download_url || item.downloadUrl,
  };
}

function normalizeActivity(item: any, index: number): StudentActivityItem {
  return {
    id: String(item.id || `act-${index}`),
    title: item.title || 'Activity Task',
    category: item.category || 'class',
    timestamp: item.timestamp || (item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recently'),
    status: item.status || 'completed',
    description: item.description || '',
    actionUrl: item.action_url || item.actionUrl,
    actionLabel: item.action_label || item.actionLabel,
  };
}

// ==========================================
// 3. API SERVICE FUNCTIONS
// ==========================================

/**
 * Fetch Consolidated Dashboard Payload:
 * Endpoint: GET /api/student/dashboard/
 */
export const getConsolidatedStudentDashboard = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(STUDENT_ENDPOINTS.CONSOLIDATED_DASHBOARD);
    return response.data;
  } catch {
    return null;
  }
};

/**
 * Fetch Dedicated Student Dossier Profile:
 * Endpoint: GET /api/student/profile/
 */
export const getStudentDossierProfile = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(STUDENT_ENDPOINTS.STUDENT_PROFILE);
    return response.data;
  } catch {
    return null;
  }
};

/**
 * Update Dedicated Student Dossier Profile:
 * Endpoint: PATCH /api/student/profile/
 */
export const updateStudentDossierProfile = async (
  payload: Record<string, any>
): Promise<any> => {
  try {
    const response = await axiosInstance.patch(STUDENT_ENDPOINTS.STUDENT_PROFILE, payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) throw error.response.data;
    throw error;
  }
};

/**
 * Fetch Enrolled Courses:
 * Endpoint: GET /api/student/courses/
 */
export const getStudentCourses = async (): Promise<EnrolledCourse[]> => {
  try {
    const response = await axiosInstance.get(STUDENT_ENDPOINTS.COURSES);
    const raw = Array.isArray(response.data) ? response.data : response.data?.results || [];
    return raw.map(normalizeCourse);
  } catch {
    return [];
  }
};

/**
 * Fetch Course Checkout / Enrollment History:
 * Endpoint: GET /api/enrollments/
 */
export const getStudentEnrollments = async (userEmail?: string): Promise<any[]> => {
  try {
    const response = await axiosInstance.get(STUDENT_ENDPOINTS.ENROLLMENTS);
    const raw = Array.isArray(response.data) ? response.data : response.data?.results || [];
    if (!userEmail) return raw;
    return raw.filter(
      (e: any) => e.applicant_email?.toLowerCase() === userEmail.toLowerCase()
    );
  } catch {
    return [];
  }
};

/**
 * Fetch Application Tracking (Visas & Uni applications):
 * Endpoint: GET /api/student/applications/
 */
export const getStudentApplications = async (): Promise<ApplicationTrack[]> => {
  try {
    const response = await axiosInstance.get(STUDENT_ENDPOINTS.APPLICATIONS);
    const raw = Array.isArray(response.data) ? response.data : response.data?.results || [];
    return raw.map(normalizeApplication);
  } catch {
    return [];
  }
};

/**
 * Fetch Document Vault:
 * Endpoint: GET /api/student/documents/
 */
export const getStudentDocuments = async (): Promise<StudentDocument[]> => {
  try {
    const response = await axiosInstance.get(STUDENT_ENDPOINTS.DOCUMENTS);
    const raw = Array.isArray(response.data) ? response.data : response.data?.results || [];
    return raw.map(normalizeDocument);
  } catch {
    return [];
  }
};

/**
 * Upload Document to Vault (Multipart, max 10MB, PDF/JPG/PNG):
 * Endpoint: POST /api/student/documents/
 */
export const uploadStudentDocumentApi = async (
  doc: {
    name: string;
    category: StudentDocument['category'];
    file: File;
  }
): Promise<StudentDocument> => {
  // Client-side validations
  const maxBytes = 10 * 1024 * 1024; // 10MB
  if (doc.file.size > maxBytes) {
    throw new Error('File exceeds maximum allowed size of 10MB.');
  }

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(doc.file.type)) {
    throw new Error('Invalid file format. Allowed formats: PDF, JPG, PNG.');
  }

  const formData = new FormData();
  formData.append('file', doc.file, doc.file.name);
  formData.append('name', doc.name);
  formData.append('category', doc.category);

  const response = await axiosInstance.post(STUDENT_ENDPOINTS.DOCUMENTS, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return normalizeDocument(response.data, 0);
};

/**
 * Delete Document from Vault:
 * Endpoint: DELETE /api/student/documents/<id>/
 */
export const deleteStudentDocumentApi = async (docId: string | number): Promise<void> => {
  await axiosInstance.delete(STUDENT_ENDPOINTS.DOCUMENT_DETAIL(docId));
};

/**
 * Fetch Student Activities:
 * Endpoint: GET /api/student/activities/
 */
export const getStudentActivities = async (): Promise<StudentActivityItem[]> => {
  try {
    const response = await axiosInstance.get(STUDENT_ENDPOINTS.ACTIVITIES);
    const raw = Array.isArray(response.data) ? response.data : response.data?.results || [];
    return raw.map(normalizeActivity);
  } catch {
    return [];
  }
};

/**
 * Toggle Activity Task Status:
 * Endpoint: POST /api/student/activities/<id>/toggle/
 */
export const toggleStudentActivityApi = async (activityId: string | number): Promise<any> => {
  const response = await axiosInstance.post(STUDENT_ENDPOINTS.ACTIVITY_TOGGLE(activityId), {});
  return response.data;
};

// ==========================================
// 4. MAIN INTEGRATED DASHBOARD FETCH
// ==========================================

/**
 * Master dashboard data fetch:
 * 1. Attempts consolidated endpoint /api/student/dashboard/
 * 2. If unavailable, concurrently fetches modular endpoints (/api/student/profile/, /courses/, /applications/, /documents/, /activities/, /enrollments/)
 * 3. Gracefully merges with local cache so the dashboard never fails
 */
export const fetchStudentDashboardData = async (
  currentUser?: AuthUser | null
): Promise<StudentDashboardData> => {
  const fallback = getStudentDashboardData(currentUser);

  // Strategy 1: Check Consolidated Dashboard endpoint
  const consolidated = await getConsolidatedStudentDashboard();
  if (consolidated) {
    const profile = normalizeProfile(
      consolidated.profile || consolidated.student_profile,
      consolidated.user || currentUser,
      fallback.profile
    );

    const enrolledCourses = Array.isArray(consolidated.courses || consolidated.enrolled_courses)
      ? (consolidated.courses || consolidated.enrolled_courses).map(normalizeCourse)
      : fallback.enrolledCourses;

    const applications = Array.isArray(consolidated.applications)
      ? consolidated.applications.map(normalizeApplication)
      : fallback.applications;

    const documents = Array.isArray(consolidated.documents)
      ? consolidated.documents.map(normalizeDocument)
      : fallback.documents;

    const activities = Array.isArray(consolidated.activities)
      ? consolidated.activities.map(normalizeActivity)
      : fallback.activities;

    const complete: StudentDashboardData = {
      profile,
      enrolledCourses,
      applications,
      documents,
      activities,
      rewards: consolidated.rewards || fallback.rewards,
    };

    saveStudentDashboardData(complete);
    return complete;
  }

  // Strategy 2: Modular concurrent calls
  const [
    authProfileRes,
    studentProfileRes,
    coursesRes,
    enrollmentsRes,
    appsRes,
    docsRes,
    actsRes,
  ] = await Promise.allSettled([
    getUserProfile().catch(() => null),
    getStudentDossierProfile().catch(() => null),
    getStudentCourses().catch(() => []),
    getStudentEnrollments(currentUser?.email).catch(() => []),
    getStudentApplications().catch(() => []),
    getStudentDocuments().catch(() => []),
    getStudentActivities().catch(() => []),
  ]);

  const authUser = authProfileRes.status === 'fulfilled' ? authProfileRes.value : currentUser;
  const studentDossier = studentProfileRes.status === 'fulfilled' ? studentProfileRes.value : null;

  const profile = normalizeProfile(studentDossier, authUser, fallback.profile);

  // Courses: prefer /api/student/courses/, enrich with /api/enrollments/
  let enrolledCourses: EnrolledCourse[] = fallback.enrolledCourses;
  const directCourses = coursesRes.status === 'fulfilled' ? coursesRes.value : [];
  const enrollments = enrollmentsRes.status === 'fulfilled' ? enrollmentsRes.value : [];

  if (directCourses.length > 0) {
    enrolledCourses = directCourses;
  } else if (enrollments.length > 0) {
    const mapped = enrollments.map((e, idx) => normalizeCourse(e, idx));
    const existingIds = new Set(mapped.map((m: EnrolledCourse) => m.id));
    const nonDupes = fallback.enrolledCourses.filter((c) => !existingIds.has(c.id));
    enrolledCourses = [...mapped, ...nonDupes];
  }

  // Applications: prefer /api/student/applications/, enrich with /api/enrollments/
  let applications: ApplicationTrack[] = fallback.applications;
  const directApps = appsRes.status === 'fulfilled' ? appsRes.value : [];
  if (directApps.length > 0) {
    applications = directApps;
  } else if (enrollments.length > 0) {
    const mappedApps = enrollments.map((e, idx) => normalizeApplication(e, idx));
    const existingRefs = new Set(mappedApps.map((a: ApplicationTrack) => a.referenceNumber));
    const nonDupes = fallback.applications.filter((a) => !existingRefs.has(a.referenceNumber));
    applications = [...mappedApps, ...nonDupes];
  }

  // Documents: from /api/student/documents/
  const documents =
    docsRes.status === 'fulfilled' && docsRes.value.length > 0
      ? docsRes.value
      : fallback.documents;

  // Activities: from /api/student/activities/
  const activities =
    actsRes.status === 'fulfilled' && actsRes.value.length > 0
      ? actsRes.value
      : fallback.activities;

  const completeData: StudentDashboardData = {
    profile,
    enrolledCourses,
    applications,
    documents,
    activities,
    rewards: fallback.rewards,
  };

  saveStudentDashboardData(completeData);
  return completeData;
};

// ==========================================
// 5. MUTATION HANDLERS
// ==========================================

/**
 * Update Profile across both /api/auth/profile/ and /api/student/profile/
 */
export const updateStudentProfileBackend = async (
  updates: Partial<StudentProfile>,
  user?: AuthUser | null
): Promise<StudentDashboardData> => {
  // 1. Dispatch PATCH /api/auth/profile/
  const authPayload: UpdateProfilePayload = {};
  if (updates.firstName !== undefined) authPayload.first_name = updates.firstName;
  if (updates.lastName !== undefined) authPayload.last_name = updates.lastName;
  if (updates.phone !== undefined) authPayload.phone_number = updates.phone;
  if (updates.destination !== undefined) authPayload.destination = updates.destination;
  if (updates.targetProgram !== undefined) authPayload.program = updates.targetProgram;

  // 2. Dispatch PATCH /api/student/profile/
  const dossierPayload: Record<string, any> = {};
  if (updates.passportNumber !== undefined) dossierPayload.passport_number = updates.passportNumber;
  if (updates.nationality !== undefined) dossierPayload.nationality = updates.nationality;
  if (updates.address !== undefined) dossierPayload.address = updates.address;
  if (updates.destination !== undefined) dossierPayload.destination = updates.destination;
  if (updates.targetProgram !== undefined) dossierPayload.target_program = updates.targetProgram;
  if (updates.currentCefrLevel !== undefined) dossierPayload.current_cefr_level = updates.currentCefrLevel;
  if (updates.targetCefrLevel !== undefined) dossierPayload.target_cefr_level = updates.targetCefrLevel;

  await Promise.allSettled([
    Object.keys(authPayload).length > 0 ? updateUserProfile(authPayload).catch(() => null) : null,
    Object.keys(dossierPayload).length > 0 ? updateStudentDossierProfile(dossierPayload).catch(() => null) : null,
  ]);

  // Sync to local state
  return updateStudentProfileData(updates, user);
};

/**
 * Upload Document via POST /api/student/documents/
 */
export const uploadStudentDocumentBackend = async (
  doc: {
    name: string;
    category: StudentDocument['category'];
    file?: File | null;
    fileName?: string;
  },
  user?: AuthUser | null
): Promise<StudentDashboardData> => {
  if (doc.file) {
    try {
      const uploadedDoc = await uploadStudentDocumentApi({
        name: doc.name,
        category: doc.category,
        file: doc.file,
      });

      const current = getStudentDashboardData(user);
      current.documents.unshift(uploadedDoc);
      saveStudentDashboardData(current);
      return current;
    } catch (err) {
      console.warn('Backend document upload warning, saving snapshot locally:', err);
    }
  }

  return addStudentDocumentRecord(
    {
      name: doc.name,
      category: doc.category,
      fileName: doc.fileName || doc.file?.name || `${doc.name.replace(/\s+/g, '_')}.pdf`,
      fileSize: doc.file ? `${(doc.file.size / (1024 * 1024)).toFixed(1)} MB` : '1.4 MB',
    },
    user
  );
};

/**
 * Delete Document via DELETE /api/student/documents/<id>/
 */
export const deleteStudentDocumentBackend = async (
  docId: string,
  user?: AuthUser | null
): Promise<StudentDashboardData> => {
  try {
    await deleteStudentDocumentApi(docId);
  } catch (err) {
    console.warn(`Backend delete document ${docId} warning, updating snapshot locally:`, err);
  }

  return deleteStudentDocumentRecord(docId, user);
};

/**
 * Toggle Activity Task Status via POST /api/student/activities/<id>/toggle/
 */
export const toggleActivityBackend = async (
  activityId: string,
  user?: AuthUser | null
): Promise<StudentDashboardData> => {
  try {
    await toggleStudentActivityApi(activityId);
  } catch (err) {
    console.warn(`Activity toggle ${activityId} offline fallback:`, err);
  }

  return toggleActivityItemStatus(activityId, user);
};
