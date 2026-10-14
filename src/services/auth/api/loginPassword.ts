import axiosInstance from '../../../api/axiosInstance';
import type { PasswordLoginPayload, PasswordLoginResponse } from '../types/types';
import { normalizeAuthUser } from '../utils/transformers';

/**
 * Multi-identifier login with password; sets auth cookies
 * Endpoint: POST /api/auth/login/password/
 */
export const loginPassword = async (
  payload: PasswordLoginPayload
): Promise<PasswordLoginResponse> => {
  try {
    const response = await axiosInstance.post<PasswordLoginResponse>(
      'auth/login/password/',
      {
        identifier: payload.identifier.trim(),
        password: payload.password,
        remember_me: payload.remember_me,
      }
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

export default loginPassword;
