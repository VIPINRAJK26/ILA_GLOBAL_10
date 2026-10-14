import axiosInstance from '../../../api/axiosInstance';
import type { ApiVisaType, PaginatedResponse, VisaType } from '../types/types';
import { transformApiVisaType } from '../utils/transformers';

/**
 * Fetch all visa types/tracks from DRF
 * Endpoint: GET /api/visas/types/
 */
export const getVisaTypes = async (countryId?: string): Promise<VisaType[]> => {
  const url = countryId ? `visas/types/?country=${encodeURIComponent(countryId)}` : 'visas/types/';
  const response = await axiosInstance.get<PaginatedResponse<ApiVisaType> | ApiVisaType[]>(url);
  
  const rawResults: ApiVisaType[] = Array.isArray(response.data)
    ? response.data
    : response.data.results || [];

  return rawResults.filter(t => t.is_active !== false).map(transformApiVisaType);
};

export default getVisaTypes;
