import axiosInstance from '../../../api/axiosInstance';
import type { TokenVerifyPayload, TokenVerifyResponse } from '../types/types';

/**
 * Validate token integrity and retrieve associated user payload
 * Endpoint: POST /api/auth/token/verify/
 */
export const tokenVerify = async (
  payload: TokenVerifyPayload
): Promise<TokenVerifyResponse> => {
  try {
    const response = await axiosInstance.post<TokenVerifyResponse>(
      'auth/token/verify/',
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

export default tokenVerify;
