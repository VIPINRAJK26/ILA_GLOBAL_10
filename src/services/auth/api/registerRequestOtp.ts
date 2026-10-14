import axiosInstance from '../../../api/axiosInstance';
import type { RegisterRequestOtpPayload, RegisterRequestOtpResponse } from '../types/types';

/**
 * Send 6-digit OTP code to email or phone for new user registration
 * Endpoint: POST /api/auth/register/request-otp/
 */
export const registerRequestOtp = async (
  payload: RegisterRequestOtpPayload
): Promise<RegisterRequestOtpResponse> => {
  try {
    const response = await axiosInstance.post<RegisterRequestOtpResponse>(
      'auth/register/request-otp/',
      payload
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default registerRequestOtp;
