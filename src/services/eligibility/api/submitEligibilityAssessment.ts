import axiosInstance from '../../../api/axiosInstance';
import type { 
  EligibilityAssessmentPayload, 
  EligibilityResult, 
  BackendEligibilityAssessment 
} from '../types';
import { calculateEligibility } from '../utils/evaluationRules';
import { getStudentDashboardData, saveStudentDashboardData } from '../../student/studentStorage';
import type { ApplicationTrack } from '../../student/types';

export const CACHE_KEY_ELIGIBILITY_HISTORY = 'ila_eligibility_assessments';

export const getCachedEligibilityHistory = (): EligibilityResult[] => {
  try {
    const raw = localStorage.getItem(CACHE_KEY_ELIGIBILITY_HISTORY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
};

export const saveCachedEligibilityResult = (result: EligibilityResult): void => {
  try {
    const current = getCachedEligibilityHistory();
    const updated = [result, ...current.filter((item) => item.assessmentReference !== result.assessmentReference)].slice(0, 10);
    localStorage.setItem(CACHE_KEY_ELIGIBILITY_HISTORY, JSON.stringify(updated));
  } catch {
    // quota exceeded
  }
};

/**
 * Record completed assessment into the Student Dashboard's Application Tracking tab
 */
export const recordAssessmentToStudentDashboard = (result: EligibilityResult, payload: EligibilityAssessmentPayload) => {
  try {
    const currentData = getStudentDashboardData();
    const appTrack: ApplicationTrack = {
      id: `app-elg-${Date.now()}`,
      type: 'university', // compatible with student tracking
      title: `Global Eligibility Assessment: ${result.productType.replace('_', ' ').toUpperCase()}`,
      country: result.targetCountry,
      flag: result.targetCountry.toLowerCase().includes('germany') ? '🇩🇪' : result.targetCountry.toLowerCase().includes('canada') ? '🇨🇦' : '🌐',
      referenceNumber: result.assessmentReference,
      submittedDate: result.calculatedAt,
      status: result.score >= 80 ? 'approved' : 'under_review',
      statusLabel: `Score: ${result.score}% • ${result.verdict.slice(0, 35)}...`,
      consularDesk: 'ILA Global Eligibility & Consular Audit Desk',
      officerNotes: result.counselorSummary,
      steps: [
        { name: 'Self-Assessment Audit Complete', status: 'completed', date: 'Today' },
        { name: 'Statutory Criteria Calculated', status: 'completed', date: 'Today' },
        { name: 'Counselor Verification & Case Mapping', status: 'current', date: 'Within 24 Hours' },
        { name: 'Official Consular / University Lodgement', status: 'pending' },
      ]
    };

    currentData.applications.unshift(appTrack);
    currentData.activities.unshift({
      id: `act-elg-${Date.now()}`,
      title: `Completed Eligibility Audit (${result.score}%)`,
      category: 'visa',
      timestamp: 'Just now',
      status: 'completed',
      description: `Evaluated eligibility for ${payload.product_type} in ${payload.target_country} (Ref: ${result.assessmentReference}).`,
      actionUrl: `/eligibility?ref=${result.assessmentReference}`,
      actionLabel: 'View Results'
    });

    saveStudentDashboardData(currentData);
  } catch (err) {
    console.warn('Could not record eligibility assessment in student dashboard:', err);
  }
};

/**
 * Submit and evaluate Eligibility Assessment
 * DRF Endpoint: POST /api/eligibility/assessments/
 */
export const submitEligibilityAssessment = async (
  payload: EligibilityAssessmentPayload
): Promise<EligibilityResult> => {
  // Compute local calculation instantly so user gets guaranteed instant results
  const localResult = calculateEligibility(payload);

  try {
    const response = await axiosInstance.post<BackendEligibilityAssessment>(
      'eligibility/assessments/',
      payload
    );

    if (response.data) {
      // Merge backend verified reference if returned
      if (response.data.reference_id) {
        localResult.assessmentReference = response.data.reference_id;
      }
      if (typeof response.data.score === 'number') {
        localResult.score = response.data.score;
      }
      if (response.data.verdict) {
        localResult.verdict = response.data.verdict;
      }
    }
  } catch (err) {
    // In dev or if DRF endpoint is pending migration, localResult provides 100% functional fallback
    console.info('DRF eligibility endpoint pending/offline, using verified local calculation engine:', err);
  }

  // Save to offline storage and dashboard
  saveCachedEligibilityResult(localResult);
  recordAssessmentToStudentDashboard(localResult, payload);

  return localResult;
};

export default submitEligibilityAssessment;
