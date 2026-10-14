import axiosInstance from '../../../api/axiosInstance';
import type { OtpVerifyLoginPayload, OtpVerifyLoginResponse } from '../types/types';
import { normalizeAuthUser } from '../utils/transformers';

/**
 * Passwordless login via 6-digit OTP; sets auth cookies
 * Endpoint: POST /api/auth/otp/verify-login/
 */
export const otpVerifyLogin = async (
  payload: OtpVerifyLoginPayload
): Promise<OtpVerifyLoginResponse> => {
  try {
    const response = await axiosInstance.post<OtpVerifyLoginResponse>(
      'auth/otp/verify-login/',
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

export default otpVerifyLogin;
