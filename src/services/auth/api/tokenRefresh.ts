import axiosInstance from '../../../api/axiosInstance';
import type { TokenRefreshPayload, TokenRefreshResponse } from '../types/types';

/**
 * Exchange refresh token (from body or cookie) for fresh access/refresh tokens
 * Endpoint: POST /api/auth/token/refresh/
 */
export const tokenRefresh = async (
  payload?: TokenRefreshPayload
): Promise<TokenRefreshResponse> => {
  try {
    const response = await axiosInstance.post<TokenRefreshResponse>(
      'auth/token/refresh/',
      payload || {}
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default tokenRefresh;
