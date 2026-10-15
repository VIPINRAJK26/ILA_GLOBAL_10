import type { AuthUser } from '../auth';
import type {
  StudentDashboardData,
  StudentProfile,
  EnrolledCourse,
  StudentActivityItem,
  ApplicationTrack,
  StudentDocument
} from './types';

const STORAGE_KEY = 'ila_student_dashboard_state';

const getDefaultCourses = (): EnrolledCourse[] => [
  {
    id: 'course-de-b1',
    courseCode: 'GER-B1-INT',
    title: 'German B1 Intermediate Intensive',
    language: 'German',
    flag: '🇩🇪',
    level: 'B1',
    instructorName: 'Frau Dr. Anke Weber',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    batchSchedule: 'Mon, Wed, Fri • 18:00 - 19:30 CET',
    nextClassTime: 'Today at 18:00 CET',
    meetingLink: 'https://meet.google.com/ila-de-b1-live',
    progressPercent: 68,
    attendancePercent: 94,
    totalClasses: 36,
    attendedClasses: 25,
    syllabusCovered: 'Unit 7: Konjunktiv II & Berufsleben Dialogues',
    materialsCount: 14,
    status: 'active',
  },
  {
    id: 'course-ielts-prep',
    courseCode: 'ENG-IELTS-ACAD',
    title: 'IELTS Academic Masterclass (Band 7.5+)',
    language: 'English',
    flag: '🇬🇧',
    level: 'C1',
    instructorName: 'Michael Davies, MA TESOL',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    batchSchedule: 'Tue, Thu • 19:00 - 20:30 CET',
    nextClassTime: 'Tomorrow at 19:00 CET',
    meetingLink: 'https://meet.google.com/ila-ielts-acad',
    progressPercent: 82,
    attendancePercent: 98,
    totalClasses: 24,
    attendedClasses: 20,
    syllabusCovered: 'Module 5: Writing Task 2 Complex Arguments & Cohesion',
    materialsCount: 22,
    status: 'active',
  },
  {
    id: 'course-de-a2',
    courseCode: 'GER-A2-CORE',
    title: 'German A2 Elementary Certificate',
    language: 'German',
    flag: '🇩🇪',
    level: 'A2',
    instructorName: 'Herr Markus Braun',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    batchSchedule: 'Completed Batch (Fall Term)',
    nextClassTime: 'Course Completed',
    progressPercent: 100,
    attendancePercent: 96,
    totalClasses: 30,
    attendedClasses: 29,
    syllabusCovered: 'All Modules Completed • Goethe-Zertifikat A2 Cleared',
    materialsCount: 18,
    status: 'completed',
  },
];

const getDefaultActivities = (): StudentActivityItem[] => [
  {
    id: 'act-1',
    title: 'Upload Official Transcripts for Studienkolleg',
    category: 'visa',
    timestamp: 'Due in 2 days (Oct 16)',
    status: 'action_needed',
    description: 'Consular desk requires notarized English/German degree transcripts with seal.',
    actionLabel: 'Upload Document',
  },
  {
    id: 'act-2',
    title: 'German B1 Speaking Drill with Frau Weber',
    category: 'class',
    timestamp: 'Today at 18:00 CET',
    status: 'upcoming',
    description: 'Interactive conversation practice focusing on medical terminology and client intake.',
    actionUrl: 'https://meet.google.com/ila-de-b1-live',
    actionLabel: 'Join Live Room',
  },
  {
    id: 'act-3',
    title: 'Intelli-Coach AI Visa Mock Interview completed',
    category: 'coaching',
    timestamp: 'Yesterday at 15:40',
    status: 'completed',
    description: 'Mock consular screening passed with 88% readiness score. Feedback: Good confidence on financial proof.',
    actionLabel: 'View Report',
  },
  {
    id: 'act-4',
    title: 'Attendance Bonus Credited (+150 ILA Points)',
    category: 'reward',
    timestamp: '3 days ago',
    status: 'completed',
    description: 'Received for maintaining 90%+ attendance streak in German Intensive B1.',
  },
  {
    id: 'act-5',
    title: 'IELTS Academic Mock Exam 3 Evaluation',
    category: 'test',
    timestamp: '5 days ago',
    status: 'completed',
    description: 'Band Score: 7.5 (Reading: 8.0, Listening: 8.0, Writing: 7.0, Speaking: 7.5).',
  },
];

const getDefaultApplications = (): ApplicationTrack[] => [
  {
    id: 'app-de-student-visa',
    type: 'visa',
    title: 'Germany National Student Visa (Visum zu Studienzwecken)',
    country: 'Germany',
    flag: '🇩🇪',
    referenceNumber: 'DE-MUC-2026-88194',
    submittedDate: 'Sep 28, 2026',
    status: 'under_review',
    statusLabel: 'Consular Verification in Progress',
    consularDesk: 'German Consular Desk • VFS Global Hub',
    officerNotes: 'Blocked account (Sperrkonto) verified at Coracle. Awaiting biometric appointment slot confirmation.',
    steps: [
      { name: 'Application Docket Prepared', status: 'completed', date: 'Sep 24, 2026' },
      { name: 'Sperrkonto / Financial Proof Filed', status: 'completed', date: 'Sep 27, 2026' },
      { name: 'VFS Biometrics & Dossier Submission', status: 'completed', date: 'Oct 02, 2026' },
      { name: 'Federal Foreign Office Review (Ausländerbehörde)', status: 'current', date: 'In Progress' },
      { name: 'Visa Stamping & Passport Dispatch', status: 'pending' },
    ],
  },
  {
    id: 'app-tum-admissions',
    type: 'university',
    title: 'Technical University of Munich (TUM) • MSc Informatics',
    country: 'Germany',
    flag: '🇩🇪',
    referenceNumber: 'TUM-APPL-449102',
    submittedDate: 'Aug 15, 2026',
    status: 'approved',
    statusLabel: 'Conditional Admission Letter Issued',
    consularDesk: 'International Student Affairs Office • Munich',
    officerNotes: 'Congratulations! Official Zulassungsbescheid issued. Condition: Present German B2 certificate before semester matriculation.',
    steps: [
      { name: 'Uni-Assist VPD Evaluation', status: 'completed', date: 'Aug 04, 2026' },
      { name: 'Department Review & Interview', status: 'completed', date: 'Aug 22, 2026' },
      { name: 'Letter of Admission Issued', status: 'completed', date: 'Sep 05, 2026' },
      { name: 'Matriculation Deposit & Health Insurance', status: 'current', date: 'Due Nov 01' },
      { name: 'Campus Enrollment & Orientation', status: 'pending' },
    ],
  },
];

const getDefaultDocuments = (): StudentDocument[] => [
  {
    id: 'doc-1',
    name: 'International Passport (Front & Back Copy)',
    category: 'passport',
    fileName: 'Passport_Scan_Verified.pdf',
    fileSize: '2.4 MB',
    uploadedAt: 'Sep 10, 2026',
    status: 'verified',
  },
  {
    id: 'doc-2',
    name: 'Bachelor Degree Transcripts & Apostille',
    category: 'transcript',
    fileName: 'Bachelor_Transcripts_Apostilled.pdf',
    fileSize: '4.8 MB',
    uploadedAt: 'Sep 12, 2026',
    status: 'verified',
  },
  {
    id: 'doc-3',
    name: 'Europass CV & Statement of Purpose',
    category: 'resume',
    fileName: 'CV_Germany_Europass_Standard.pdf',
    fileSize: '850 KB',
    uploadedAt: 'Sep 18, 2026',
    status: 'verified',
  },
  {
    id: 'doc-4',
    name: 'Coracle Blocked Account Confirmation (Sperrkonto)',
    category: 'visa_form',
    fileName: 'Coracle_Blocked_Account_Confirmation.pdf',
    fileSize: '1.1 MB',
    uploadedAt: 'Sep 26, 2026',
    status: 'verified',
  },
  {
    id: 'doc-5',
    name: 'Goethe-Zertifikat A2 Examination Scorecard',
    category: 'language_certificate',
    fileName: 'Goethe_A2_Official_Cert.pdf',
    fileSize: '1.6 MB',
    uploadedAt: 'Aug 20, 2026',
    status: 'verified',
  },
];

export const createDefaultDashboardData = (user?: AuthUser | null): StudentDashboardData => {
  const firstName = user?.first_name || user?.name?.split(' ')[0] || 'Alex';
  const lastName = user?.last_name || user?.name?.split(' ').slice(1).join(' ') || 'Vance';
  const fullName = user?.name || `${firstName} ${lastName}`;
  const email = user?.email || 'alex.vance@student.ilaglobal.com';
  const phone = user?.phone || user?.phone_number || '+49 176 8920 1144';
  const identifierCode = user?.identifierCode || 'ILA-STD-89240';
  const destination = user?.destination || 'Germany';
  const program = user?.program || 'MSc Applied Computer Science & Work-Study';

  const profile: StudentProfile = {
    id: user?.id || 'std-active-1',
    identifierCode,
    name: fullName,
    firstName,
    lastName,
    email,
    phone,
    avatar: user?.avatar,
    nationality: 'International Student',
    passportNumber: 'P89204128',
    birthDate: '2001-08-14',
    address: 'Amalienstraße 45, 80333 Munich, Germany',
    destination,
    targetProgram: program,
    currentCefrLevel: 'B1',
    targetCefrLevel: 'C1',
    enrolledSince: 'July 2026',
  };

  return {
    profile,
    enrolledCourses: getDefaultCourses(),
    activities: getDefaultActivities(),
    applications: getDefaultApplications(),
    documents: getDefaultDocuments(),
    rewards: {
      pointsBalance: 1450,
      pointsLifetime: 2800,
      tier: 'Gold',
      vouchers: [
        {
          id: 'vouch-1',
          code: 'TESTDAF-50-OFF',
          title: '€50 Goethe / TestDaF Examination Voucher',
          discount: '€50 Off',
          pointsSpent: 600,
          redeemedAt: 'Oct 01, 2026',
          expiresAt: 'Dec 31, 2026',
          status: 'active',
        },
        {
          id: 'vouch-2',
          code: 'VISA-FILING-FREE',
          title: 'Priority Consular Dossier Verification Voucher',
          discount: '100% Free',
          pointsSpent: 500,
          redeemedAt: 'Sep 20, 2026',
          expiresAt: 'Nov 30, 2026',
          status: 'used',
        },
      ],
      badges: [
        {
          id: 'badge-1',
          name: 'Punctuality Ace',
          description: 'Maintained 95%+ class attendance across 20+ lessons',
          icon: '⚡',
          earnedAt: 'Sep 2026',
        },
        {
          id: 'badge-2',
          name: 'Grammar Master B1',
          description: 'Scored 90%+ in Konjunktiv and Passive voice drills',
          icon: '🏆',
          earnedAt: 'Oct 2026',
        },
        {
          id: 'badge-3',
          name: 'AI Coach Enthusiast',
          description: 'Completed 10+ mock visa interviews with Intelli Coach',
          icon: '🤖',
          earnedAt: 'Sep 2026',
        },
      ],
      coachHistory: [
        {
          id: 'coach-1',
          topic: 'Germany Visa Interview: Motivation & Career Pathway',
          sessionDate: 'Oct 12, 2026',
          skillFocus: 'Consular Defense & Fluency',
          confidenceScore: 88,
          keyRecommendation: 'Articulate why TU Munich specifically aligns with your undergraduate research thesis.',
        },
        {
          id: 'coach-2',
          topic: 'German B1 Speaking: Job Interview Scenarios',
          sessionDate: 'Oct 08, 2026',
          skillFocus: 'Professional Vocabulary & Connectors',
          confidenceScore: 82,
          keyRecommendation: 'Use "aufgrund dessen" and "infolgedessen" instead of repeating "deshalb".',
        },
      ],
    },
  };
};

export const getStudentDashboardData = (user?: AuthUser | null): StudentDashboardData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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

  const initial = createDefaultDashboardData(user);
  saveStudentDashboardData(initial);
  return initial;
};

export const saveStudentDashboardData = (data: StudentDashboardData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
