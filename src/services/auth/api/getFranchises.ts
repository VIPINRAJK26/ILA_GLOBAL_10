import axiosInstance from '../../../api/axiosInstance';
import type { Franchise, PaginatedFranchisesResponse } from '../types/types';

/**
 * List active franchises and hierarchical organization tree
 * Endpoint: GET /api/auth/franchises/
 */
export const getFranchises = async (): Promise<Franchise[]> => {
  try {
    const response = await axiosInstance.get<PaginatedFranchisesResponse | Franchise[]>(
      'auth/franchises/'
    );
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }
    return data.results || [];
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default getFranchises;
