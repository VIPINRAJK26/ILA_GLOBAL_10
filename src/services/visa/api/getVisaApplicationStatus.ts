import axiosInstance from '../../../api/axiosInstance';
import type { VisaApplicationResponse } from '../types/types';

/**
 * Fetch application status by reference code
 * Endpoint: GET /api/visas/applications/status/{reference}/
 */
export const getVisaApplicationStatus = async (
  reference: string
): Promise<VisaApplicationResponse> => {
  if (!reference || !reference.trim()) {
    throw new Error('Application reference is required');
  }

  const cleanRef = reference.trim();
  const response = await axiosInstance.get<VisaApplicationResponse>(
    `visas/applications/status/${encodeURIComponent(cleanRef)}/`
  );
  return response.data;
};

export default getVisaApplicationStatus;
