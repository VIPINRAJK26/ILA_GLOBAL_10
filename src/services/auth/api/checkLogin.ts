import axiosInstance from '../../../api/axiosInstance';
import type { CheckLoginResponse } from '../types/types';
import { normalizeAuthUser } from '../utils/transformers';

/**
 * Inspect current authentication state cleanly without throwing HTTP 401
 * Endpoint: GET /api/auth/check-login/
 */
export const checkLogin = async (): Promise<CheckLoginResponse> => {
  try {
    const response = await axiosInstance.get<CheckLoginResponse>('auth/check-login/');
    const data = response.data;
    if (data.user) {
      data.user = normalizeAuthUser(data.user);
    }
    return {
      isAuthenticated: Boolean(data.isAuthenticated),
      user: data.user,
      message: data.message,
    };
  } catch {
    return {
      isAuthenticated: false,
      user: null,
      message: 'Failed to check session.',
    };
  }
};

export default checkLogin;
