import axiosInstance from '../../api/axiosInstance';

export interface HomeEnquiryPayload {
  page_type: string;
  full_name: string;
  email: string;
  phone: string;
  country_code: string;
  preferred_contact: string;
  highest_qualification: string;
  current_score: string;
  study_field: string;
  target_degree: string;
  language_proficiency: string;
  target_intake: string;
  scholarship_need: string;
  budget_readiness: string;
  message: string;
  student_member_id?: string;
  milestone_type?: string;
  claim_category?: string;
  job_domain?: string;
  years_experience?: string;
  notice_period?: string;
  linked_in_url?: string;
  target_work_country?: string;
  destination_country?: string;
  selected_program?: string;
  visa_type?: string;
  travel_timeline?: string;
  prior_refusal_status?: string;
}

export const submitHomeEnquiry = async (payload: HomeEnquiryPayload): Promise<{ ticket_id?: string; reference_id?: string }> => {
  try {
    const response = await axiosInstance.post('enquiries/', payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) throw error.response.data;
    throw error;
  }
};

export const submitRewardsClaim = async (payload: HomeEnquiryPayload): Promise<{ ticket_id?: string; reference_id?: string }> => {
  try {
    const response = await axiosInstance.post('rewards/claims/', payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) throw error.response.data;
    throw error;
  }
};

export const requestIntelliCoach = async (payload: { action: 'query' | 'document_checklist'; prompt: string; category: string }) => {
  try {
    const response = await axiosInstance.post('intelli-coach/requests/', payload);
    return response.data as { success: boolean; response?: string; checklist?: string[]; message?: string };
  } catch (error: any) {
    if (error.response?.data) throw error.response.data;
    throw error;
  }
};
