export type ProductType = 
  | 'visa_services' 
  | 'course_enrollment' 
  | 'study_abroad' 
  | 'work_and_study' 
  | 'job_placement';

export interface ProductOption {
  id: ProductType;
  title: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  iconName: string;
  popularDestination: string;
  keyFeature: string;
}

export type EducationLevel = 
  | 'high_school' 
  | 'bachelor_stem' 
  | 'bachelor_non_stem' 
  | 'master_stem' 
  | 'master_non_stem' 
  | 'nursing_medical' 
  | 'phd';

export type ExperienceYears = '0' | '1-2' | '3-5' | '5+';

export type ProfessionalField = 
  | 'it_software' 
  | 'healthcare_nursing' 
  | 'engineering' 
  | 'business_finance' 
  | 'sciences' 
  | 'other';

export type GermanLevel = 'none' | 'a1' | 'a2' | 'b1' | 'b2' | 'c1_plus';
export type EnglishLevel = 'basic' | 'intermediate' | 'fluent_ielts_6_5' | 'advanced_ielts_7_5';
export type AgeRange = 'under_35' | '35_40' | 'above_40';
export type BudgetReadiness = 'full_blocked_account' | 'partial_funding' | 'seeking_zero_tuition' | 'employer_sponsored';
export type TargetTimeline = 'immediate' | '3_6_months' | '6_12_months' | 'exploring';

export interface EligibilityAssessmentPayload {
  product_type: ProductType;
  target_country: string;
  education_level: EducationLevel;
  field_of_study: ProfessionalField;
  experience_years: ExperienceYears;
  german_level: GermanLevel;
  english_level: EnglishLevel;
  age_range: AgeRange;
  budget_readiness: BudgetReadiness;
  timeline: TargetTimeline;
  applicant_name?: string;
  applicant_email?: string;
  applicant_phone?: string;
  user_notes?: string;
}

export interface EligibilityPointItem {
  category: string;
  pointsAwarded: number;
  maxPoints: number;
  status: 'passed' | 'partial' | 'needs_work';
  description: string;
}

export interface RecommendedProduct {
  id: string;
  title: string;
  category: string;
  badge: string;
  link: string;
  description: string;
}

export interface EligibilityResult {
  id?: string;
  assessmentReference: string;
  productType: ProductType;
  score: number; // 0 to 100
  verdict: string;
  statusCategory: 'high_match' | 'strong_potential' | 'conditional_track';
  statusColor: string;
  targetCountry: string;
  pointsBreakdown: EligibilityPointItem[];
  totalPoints?: number;
  qualifyingPointsRequired?: number;
  strengths: string[];
  recommendations: string[];
  recommendedProducts: RecommendedProduct[];
  estimatedTimeline: string;
  counselorSummary: string;
  calculatedAt: string;
}

export interface BackendEligibilityAssessment {
  id?: number | string;
  reference_id: string;
  product_type: string;
  target_country: string;
  score: number;
  verdict: string;
  status_category: string;
  applicant_name?: string;
  applicant_email?: string;
  applicant_phone?: string;
  input_data: EligibilityAssessmentPayload;
  points_breakdown: EligibilityPointItem[];
  strengths: string[];
  recommendations: string[];
  counselor_notes?: string;
  created_at?: string;
}
