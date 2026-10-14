import axiosInstance from '../../../api/axiosInstance';
import type { PasswordResetRequestPayload, PasswordResetRequestResponse } from '../types/types';

/**
 * Send password reset OTP to user's registered contact
 * Endpoint: POST /api/auth/password/reset-request/
 */
export const passwordResetRequest = async (
  payload: PasswordResetRequestPayload
): Promise<PasswordResetRequestResponse> => {
  try {
    const response = await axiosInstance.post<PasswordResetRequestResponse>(
      'auth/password/reset-request/',
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

export default passwordResetRequest;
