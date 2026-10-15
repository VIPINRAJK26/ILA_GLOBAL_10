export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface StudentProfile {
  id: string | number;
  identifierCode: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  nationality: string;
  passportNumber?: string;
  birthDate?: string;
  address?: string;
  destination: string;
  targetProgram: string;
  currentCefrLevel: CefrLevel;
  targetCefrLevel: CefrLevel;
  enrolledSince: string;
}

export interface EnrolledCourse {
  id: string;
  courseCode: string;
  title: string;
  language: string;
  flag: string;
  level: CefrLevel;
  instructorName: string;
  instructorAvatar?: string;
  batchSchedule: string;
  nextClassTime: string;
  meetingLink?: string;
  progressPercent: number;
  attendancePercent: number;
  totalClasses: number;
  attendedClasses: number;
  syllabusCovered: string;
  materialsCount: number;
  status: 'active' | 'completed' | 'upcoming';
}

export interface StudentActivityItem {
  id: string;
  title: string;
  category: 'class' | 'visa' | 'coaching' | 'reward' | 'test' | 'profile';
  timestamp: string;
  status: 'completed' | 'in_progress' | 'upcoming' | 'action_needed';
  description: string;
  actionUrl?: string;
  actionLabel?: string;
}

export interface ApplicationStep {
  name: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  notes?: string;
}

export interface ApplicationTrack {
  id: string;
  type: 'visa' | 'university' | 'job_matching';
  title: string;
  country: string;
  flag: string;
  referenceNumber: string;
  submittedDate: string;
  status: 'submitted' | 'under_review' | 'action_required' | 'approved';
  statusLabel: string;
  consularDesk: string;
  officerNotes?: string;
  steps: ApplicationStep[];
}

export interface StudentDocument {
  id: string;
  name: string;
  category: 'passport' | 'transcript' | 'resume' | 'language_certificate' | 'visa_form' | 'other';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: 'verified' | 'reviewing' | 'rejected' | 'pending';
  downloadUrl?: string;
}

export interface StudentRewardVoucher {
  id: string;
  code: string;
  title: string;
  discount: string;
  pointsSpent: number;
  redeemedAt: string;
  expiresAt: string;
  status: 'active' | 'used';
}

export interface StudentRewardBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface IntelliCoachHistoryItem {
  id: string;
  topic: string;
  sessionDate: string;
  skillFocus: string;
  confidenceScore: number;
  keyRecommendation: string;
}

export interface StudentDashboardData {
  profile: StudentProfile;
  enrolledCourses: EnrolledCourse[];
  activities: StudentActivityItem[];
  applications: ApplicationTrack[];
  documents: StudentDocument[];
  rewards: {
    pointsBalance: number;
    pointsLifetime: number;
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    vouchers: StudentRewardVoucher[];
    badges: StudentRewardBadge[];
    coachHistory: IntelliCoachHistoryItem[];
  };
}
