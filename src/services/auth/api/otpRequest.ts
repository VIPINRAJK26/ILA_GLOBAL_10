import axiosInstance from '../../../api/axiosInstance';
import type { OtpRequestPayload, OtpRequestResponse } from '../types/types';

/**
 * Request OTP code for login, password reset, or contact verification
 * Endpoint: POST /api/auth/otp/request/
 */
export const otpRequest = async (
  payload: OtpRequestPayload
): Promise<OtpRequestResponse> => {
  try {
    const response = await axiosInstance.post<OtpRequestResponse>(
      'auth/otp/request/',
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

export default otpRequest;
