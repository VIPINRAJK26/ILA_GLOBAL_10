export type VisaCategory = 'student' | 'work' | 'post-study' | 'visitor' | string;

/**
 * Raw Django REST Framework (DRF) response for a Visa Type
 */
export interface ApiVisaType {
  id: string;
  category_display: string;
  name: string;
  official_code: string;
  category: VisaCategory;
  badge: string;
  approval_rate: string;
  short_description: string;
  full_description: string;
  processing_time: string;
  consular_fee: string;
  financial_requirement: string;
  work_rights: string;
  validity_period: string;
  eligibility_criteria: string[] | string;
  required_documents: string[] | string;
  key_highlights: string[] | string;
  tags: string[] | string;
  is_active: boolean;
  country: string;
}

/**
 * Raw Django REST Framework (DRF) response for a Visa Country
 */
export interface ApiVisaCountry {
  id: string;
  code: string;
  name: string;
  flag: string;
  region: string;
  currency: string;
  average_processing_time: string;
  overall_approval_rate: string;
  consular_hotline: string;
  is_active: boolean;
  created_at: string;
  visa_types: ApiVisaType[];
  hero_headline?: string;
  popular_intakes?: string;
}

/**
 * Standard Paginated DRF List Response
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Normalized Frontend Visa Type
 */
export interface VisaType {
  id: string;
  country: string;
  countryCode?: string;
  name: string;
  officialCode: string;
  category: VisaCategory;
  categoryDisplay: string;
  badge: string;
  approvalRate: string;
  shortDescription: string;
  fullDescription: string;
  processingTime: string;
  consularFee: string;
  financialRequirement: string;
  workRights: string;
  validityPeriod: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  keyHighlights: string[];
  tags: string[];
  isActive: boolean;
}

/**
 * Normalized Frontend Visa Country
 */
export interface VisaCountry {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: string;
  currency: string;
  averageProcessingTime: string;
  overallApprovalRate: string;
  consularHotline: string;
  isActive: boolean;
  createdAt?: string;
  visaTypes: VisaType[];
  heroHeadline: string;
  summary: string;
  activeVisaTracksCount: number;
  popularIntakes: string;
}

/**
 * Visa Application Intake Payload for DRF Backend
 */
export interface VisaApplicationPayload {
  country_id: string;
  visa_type_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_country_code?: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  country_of_residence: string;
  passport_number: string;
  passport_expiry_date: string;
  highest_qualification: string;
  field_of_study: string;
  institution_name?: string;
  gpa_or_grade?: string;
  intended_institution: string;
  intended_program?: string;
  planned_travel_date: string;
  funds_proof_status: string;
  has_prior_refusal?: boolean;
  prior_refusal_details?: string;
  applicant_statement?: string;
  resume: File | null;
  passport_scan?: File | null;
  offer_letter?: File | null;
}

/**
 * Visa Application Response returned from DRF Backend
 */
export interface VisaApplicationResponse {
  id?: number | string;
  uuid?: string;
  application_reference: string;
  status: 'received' | 'under_review' | 'docs_verified' | 'interview_scheduled' | 'approved' | 'rejected' | string;
  status_display: string;
  first_name?: string;
  last_name?: string;
  applicant_name?: string;
  email?: string;
  applicant_email?: string;
  phone_country_code?: string;
  phone_number?: string;
  country_name?: string;
  country_flag?: string;
  visa_type_name?: string;
  visa_official_code?: string;
  intended_institution?: string;
  intended_program?: string;
  planned_travel_date?: string;
  resume_file_name?: string;
  resume_file_size_kb?: number;
  created_at?: string;
  submitted_at?: string;
  estimated_decision_date?: string | null;
  assigned_consular_advisor?: {
    name?: string;
    title?: string;
    contact_email?: string;
  };
  checklist_status?: {
    resume_uploaded?: boolean;
    academic_audit?: string;
    financial_audit?: string;
    consular_readiness_score?: number;
  };
}

/**
 * DRF Form / Model Validation Error Map
 */
export interface DRFValidationError {
  [field: string]: string[] | string | undefined;
}

export interface VisaFilterParams {
  countryId?: string;
  category?: VisaCategory | 'all';
  search?: string;
}
