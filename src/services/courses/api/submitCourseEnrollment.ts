import axiosInstance from '../../../api/axiosInstance';

export interface CourseEnrollmentPayload {
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  selected_batch: string;
  final_price: string | number;
  course_level?: string;
  course?: string;
  payment_method?: string;
  redeem_points?: boolean;
  points_discount?: string | number;
  learning_goals?: string;
}

export interface CourseEnrollmentResponse {
  id: number;
  enrollment_id?: string;
  course_title?: string;
  course_flag?: string;
  course_details?: any;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  selected_batch: string;
  payment_method?: string;
  redeem_points?: boolean;
  points_discount?: string;
  final_price: string;
  status?: string;
  created_at?: string;
}

/**
 * Submit Course Enrollment Application to DRF
 * Endpoint: POST /api/enrollments/
 */
export const submitCourseEnrollment = async (
  payload: CourseEnrollmentPayload
): Promise<CourseEnrollmentResponse> => {
  try {
    const response = await axiosInstance.post<CourseEnrollmentResponse>(
      'enrollments/',
      payload
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default submitCourseEnrollment;
