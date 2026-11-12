import type { AuthUser } from '../auth';
import type {
  StudentDashboardData,
  StudentProfile,
  EnrolledCourse,
  ApplicationTrack,
  StudentDocument
} from './types';

const STORAGE_KEY = 'ila_student_dashboard_state';
const getStorageKey = (email?: string) =>
  email ? `${STORAGE_KEY}:${email.trim().toLowerCase()}` : STORAGE_KEY;

export const createDefaultDashboardData = (user?: AuthUser | null): StudentDashboardData => {
  const firstName = user?.first_name || user?.name?.split(' ')[0] || '';
  const lastName = user?.last_name || user?.name?.split(' ').slice(1).join(' ') || '';
  const fullName = user?.name || `${firstName} ${lastName}`;
  const email = user?.email || '';
  const phone = user?.phone || user?.phone_number || '';
  const identifierCode = user?.identifierCode || '';
  const destination = user?.destination || '';
  const program = user?.program || '';

  const profile: StudentProfile = {
    id: user?.id || '',
    identifierCode,
    name: fullName,
    firstName,
    lastName,
    email,
    phone,
    avatar: user?.avatar,
    nationality: '',
    passportNumber: '',
    birthDate: '',
    address: '',
    destination,
    targetProgram: program,
    currentCefrLevel: 'B1',
    targetCefrLevel: 'C1',
    enrolledSince: '',
  };

  return {
    profile,
    enrolledCourses: [],
    activities: [],
    applications: [],
    documents: [],
    rewards: {
      pointsBalance: 0,
      pointsLifetime: 0,
      tier: 'Bronze',
      vouchers: [],
      badges: [],
      coachHistory: [],
    },
  };
};

export const getStudentDashboardData = (user?: AuthUser | null): StudentDashboardData => {
  try {
    const raw = localStorage.getItem(getStorageKey(user?.email));
    if (raw) {
      const parsed = JSON.parse(raw) as StudentDashboardData;
      // If user profile changed or logged in as different user, sync identifier and email
      if (user && user.email && parsed.profile.email !== user.email) {
        parsed.profile.email = user.email;
        if (user.name) parsed.profile.name = user.name;
        if (user.identifierCode) parsed.profile.identifierCode = user.identifierCode;
      }
      return parsed;
    }
  } catch {
    // Ignore JSON parse errors
  }

  return createDefaultDashboardData(user);
};

export const saveStudentDashboardData = (data: StudentDashboardData): void => {
  try {
    localStorage.setItem(getStorageKey(data.profile.email), JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save student dashboard data:', err);
  }
};

export const updateStudentProfileData = (
  updates: Partial<StudentProfile>,
  user?: AuthUser | null
): StudentDashboardData => {
  const current = getStudentDashboardData(user);
  current.profile = { ...current.profile, ...updates };
  saveStudentDashboardData(current);
  return current;
};

export const toggleActivityItemStatus = (
  activityId: string,
  user?: AuthUser | null
): StudentDashboardData => {
  const current = getStudentDashboardData(user);
  current.activities = current.activities.map((act) => {
    if (act.id === activityId) {
      const nextStatus = act.status === 'completed' ? 'action_needed' : 'completed';
      return { ...act, status: nextStatus };
    }
    return act;
  });
  saveStudentDashboardData(current);
  return current;
};

export const addStudentDocumentRecord = (
  doc: Omit<StudentDocument, 'id' | 'uploadedAt' | 'status'>,
  user?: AuthUser | null
): StudentDashboardData => {
  const current = getStudentDashboardData(user);
  const newDoc: StudentDocument = {
    id: `doc-${Date.now()}`,
    name: doc.name,
    category: doc.category,
    fileName: doc.fileName,
    fileSize: doc.fileSize,
    uploadedAt: 'Just now',
    status: 'reviewing',
  };
  current.documents.unshift(newDoc);
  current.activities.unshift({
    id: `act-${Date.now()}`,
    title: `Document uploaded: ${doc.name}`,
    category: 'visa',
    timestamp: 'Just now',
    status: 'completed',
    description: `Uploaded file ${doc.fileName} (${doc.fileSize}) for consular review.`,
  });
  saveStudentDashboardData(current);
  return current;
};

export const deleteStudentDocumentRecord = (
  docId: string,
  user?: AuthUser | null
): StudentDashboardData => {
  const current = getStudentDashboardData(user);
  current.documents = current.documents.filter((d) => d.id !== docId);
  saveStudentDashboardData(current);
  return current;
};

export const addStudentCourseEnrollment = (
  course: {
    id: string;
    title: string;
    language: string;
    flag: string;
    level: string;
    field?: string;
  },
  learningPathTitle: string,
  selectedBatch: string,
  finalPrice: string | number,
  applicationId: string,
  user?: AuthUser | null
): StudentDashboardData => {
  const current = getStudentDashboardData(user);
  
  // Create Course Record
  const newCourse: EnrolledCourse = {
    id: `course-${Date.now()}`,
    courseCode: `${course.language.slice(0, 3).toUpperCase()}-${course.level}-COHORT`,
    title: course.title,
    language: course.language,
    flag: course.flag,
    level: (course.level || 'B1') as any,
    instructorName: learningPathTitle.includes('Human') ? 'Senior Native Faculty' : 'Intelli Coach AI System',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    batchSchedule: selectedBatch,
    nextClassTime: 'Orientation Scheduled',
    progressPercent: 0,
    attendancePercent: 100,
    totalClasses: 32,
    attendedClasses: 0,
    syllabusCovered: 'Orientation & Module 1 Diagnostic',
    materialsCount: 8,
    status: 'upcoming',
    learningPath: learningPathTitle,
    tuitionPaid: typeof finalPrice === 'number' ? `€${finalPrice}` : finalPrice,
  };

  // Create Application Track Record
  const newApplication: ApplicationTrack = {
    id: `app-course-${Date.now()}`,
    type: 'course_enrollment',
    title: `${course.title} (${learningPathTitle})`,
    country: course.language,
    flag: course.flag,
    referenceNumber: applicationId,
    submittedDate: 'Today',
    status: 'submitted',
    statusLabel: 'Enrollment Confirmed • Seat Allocated',
    consularDesk: 'ILA Global Academic Admissions Desk',
    officerNotes: `Enrollment confirmed under ${learningPathTitle}. Batch: ${selectedBatch}. Tuition: €${finalPrice}.`,
    learningPath: learningPathTitle,
    tuitionPaid: typeof finalPrice === 'number' ? `€${finalPrice}` : finalPrice,
    steps: [
      { name: 'Application Received & Seat Locked', status: 'completed', date: 'Today' },
      { name: 'Learning Path Verified', status: 'completed', date: 'Today' },
      { name: 'Welcome Kit & Portal Access Dispatch', status: 'current', date: 'Within 24 Hours' },
      { name: 'Live Cohort Orientation', status: 'pending' },
    ],
  };

  current.enrolledCourses.unshift(newCourse);
  current.applications.unshift(newApplication);
  current.activities.unshift({
    id: `act-${Date.now()}`,
    title: `Enrolled in ${course.title}`,
    category: 'class',
    timestamp: 'Just now',
    status: 'completed',
    description: `Registered for ${learningPathTitle} starting ${selectedBatch} (Ref: ${applicationId}).`,
  });

  saveStudentDashboardData(current);
  return current;
};
