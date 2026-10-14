import axiosInstance from '../../../api/axiosInstance';
import type { VisaApplicationPayload, VisaApplicationResponse } from '../types/types';

/**
 * Submit a complete Visa Application with resume to DRF
 * Endpoint: POST /api/visas/applications/
 */
export const submitVisaApplication = async (
  payload: VisaApplicationPayload
): Promise<VisaApplicationResponse> => {
  const formData = new FormData();

  formData.append('country_id', payload.country_id);
  formData.append('visa_type_id', payload.visa_type_id);
  formData.append('first_name', payload.first_name);
  formData.append('last_name', payload.last_name);
  formData.append('email', payload.email);
  if (payload.phone_country_code) {
    formData.append('phone_country_code', payload.phone_country_code);
  }
  formData.append('phone_number', payload.phone_number);
  formData.append('date_of_birth', payload.date_of_birth);
  formData.append('gender', payload.gender);
  formData.append('nationality', payload.nationality);
  formData.append('country_of_residence', payload.country_of_residence);
  formData.append('passport_number', payload.passport_number);
  formData.append('passport_expiry_date', payload.passport_expiry_date);
  formData.append('highest_qualification', payload.highest_qualification);
  formData.append('field_of_study', payload.field_of_study);
  if (payload.institution_name) {
    formData.append('institution_name', payload.institution_name);
  }
  if (payload.gpa_or_grade) {
    formData.append('gpa_or_grade', payload.gpa_or_grade);
  }
  formData.append('intended_institution', payload.intended_institution);
  if (payload.intended_program) {
    formData.append('intended_program', payload.intended_program);
  }
  formData.append('planned_travel_date', payload.planned_travel_date);
  formData.append('funds_proof_status', payload.funds_proof_status);
  formData.append('has_prior_refusal', String(Boolean(payload.has_prior_refusal)));
  if (payload.prior_refusal_details) {
    formData.append('prior_refusal_details', payload.prior_refusal_details);
  }
  if (payload.applicant_statement) {
    formData.append('applicant_statement', payload.applicant_statement);
  }

  // Resume file attachment
  if (payload.resume) {
    formData.append('resume', payload.resume, payload.resume.name);
  }

  try {
    const response = await axiosInstance.post<VisaApplicationResponse>(
      'visas/applications/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default submitVisaApplication;
