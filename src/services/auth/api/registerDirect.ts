import axiosInstance from '../../../api/axiosInstance';
import type { RegisterDirectPayload, RegisterDirectResponse } from '../types/types';
import { normalizeAuthUser } from '../utils/transformers';

/**
 * Direct student registration; creates account in DRF backend, returns profile & tokens
 * Endpoint: POST /api/auth/register/
 */
export const registerDirect = async (
  payload: RegisterDirectPayload
): Promise<RegisterDirectResponse> => {
  try {
    const response = await axiosInstance.post<RegisterDirectResponse>(
      'auth/register/',
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

export default registerDirect;
