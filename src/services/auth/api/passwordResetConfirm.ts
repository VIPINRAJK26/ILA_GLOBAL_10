import axiosInstance from '../../../api/axiosInstance';
import type { PasswordResetConfirmPayload, PasswordResetConfirmResponse } from '../types/types';

/**
 * Verify OTP and set a new password
 * Endpoint: POST /api/auth/password/reset-confirm/
 */
export const passwordResetConfirm = async (
  payload: PasswordResetConfirmPayload
): Promise<PasswordResetConfirmResponse> => {
  try {
    const response = await axiosInstance.post<PasswordResetConfirmResponse>(
      'auth/password/reset-confirm/',
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

export default passwordResetConfirm;
