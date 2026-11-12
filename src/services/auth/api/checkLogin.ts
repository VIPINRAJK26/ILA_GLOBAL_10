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
    const data = response.data as CheckLoginResponse & { is_authenticated?: boolean; authenticated?: boolean };
    const user = data.user ? normalizeAuthUser(data.user) : null;
    const isAuthenticated = data.isAuthenticated ?? data.is_authenticated ?? data.authenticated ?? Boolean(user);
    if (user) {
      data.user = user;
    }
    return {
      isAuthenticated: Boolean(isAuthenticated && user),
      user,
      message: data.message,
    };
  } catch {
    throw new Error('Unable to verify the current session.');
  }
};

export default checkLogin;
