import axiosInstance from '../../../api/axiosInstance';
import type { RegisterVerifyOtpPayload, RegisterVerifyOtpResponse } from '../types/types';
import { normalizeAuthUser } from '../utils/transformers';

/**
 * Verify OTP code and create user account; sets auth cookies and returns profile
 * Endpoint: POST /api/auth/register/verify-otp/
 */
export const registerVerifyOtp = async (
  payload: RegisterVerifyOtpPayload
): Promise<RegisterVerifyOtpResponse> => {
  try {
    const response = await axiosInstance.post<RegisterVerifyOtpResponse>(
      'auth/register/verify-otp/',
      payload
    );

    const data = response.data;
    if (data.user) {
      data.user = normalizeAuthUser(data.user);
    }
    return data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default registerVerifyOtp;
