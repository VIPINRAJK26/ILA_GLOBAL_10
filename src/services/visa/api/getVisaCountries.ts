import axiosInstance from '../../../api/axiosInstance';
import type { ApiVisaCountry, PaginatedResponse, VisaCountry } from '../types/types';
import { transformApiCountry } from '../utils/transformers';

/**
 * Fetch all visa countries with nested visa tracks from DRF
 * Endpoint: GET /api/visas/countries/
 */
export const getVisaCountries = async (): Promise<VisaCountry[]> => {
  const response = await axiosInstance.get<PaginatedResponse<ApiVisaCountry> | ApiVisaCountry[]>('visas/countries/');
  
  const rawResults: ApiVisaCountry[] = Array.isArray(response.data)
    ? response.data
    : response.data.results || [];

  return rawResults.filter(c => c.is_active !== false).map(transformApiCountry);
};

export default getVisaCountries;
