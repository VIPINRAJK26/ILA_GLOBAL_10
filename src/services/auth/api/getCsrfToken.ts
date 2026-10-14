import axiosInstance from '../../../api/axiosInstance';
import type { CsrfResponse } from '../types/types';

/**
 * Sets csrftoken cookie and returns token string for request headers
 * Endpoint: GET /api/auth/csrf/
 */
export const getCsrfToken = async (): Promise<CsrfResponse> => {
  try {
    const response = await axiosInstance.get<CsrfResponse>('auth/csrf/');
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default getCsrfToken;
