import axiosInstance from '../../../api/axiosInstance';
import type { AuthUser, UpdateProfilePayload } from '../types/types';
import { normalizeAuthUser } from '../utils/transformers';

/**
 * Retrieve authenticated user profile with franchises and assigned roles
 * Endpoint: GET /api/auth/profile/
 */
export const getUserProfile = async (): Promise<AuthUser> => {
  try {
    const response = await axiosInstance.get<AuthUser>('auth/profile/');
    return normalizeAuthUser(response.data);
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * Update personal details (name, phone, avatar) for authenticated user
 * Endpoint: PATCH /api/auth/profile/
 */
export const updateUserProfile = async (
  payload: UpdateProfilePayload
): Promise<AuthUser> => {
  try {
    let response;
    if (payload.avatar instanceof File) {
      const formData = new FormData();
      if (payload.first_name !== undefined) formData.append('first_name', payload.first_name);
      if (payload.last_name !== undefined) formData.append('last_name', payload.last_name);
      if (payload.phone_number !== undefined) formData.append('phone_number', payload.phone_number);
      if (payload.destination !== undefined) formData.append('destination', payload.destination);
      if (payload.program !== undefined) formData.append('program', payload.program);
      formData.append('avatar', payload.avatar, payload.avatar.name);

      response = await axiosInstance.patch<AuthUser>('auth/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await axiosInstance.patch<AuthUser>('auth/profile/', payload);
    }

    return normalizeAuthUser(response.data);
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default getUserProfile;
