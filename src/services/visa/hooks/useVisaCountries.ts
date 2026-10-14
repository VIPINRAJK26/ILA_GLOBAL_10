import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getVisaCountries } from '../api/getVisaCountries';
import type { VisaCountry } from '../types/types';

export const VISA_COUNTRIES_QUERY_KEY = ['visa', 'countries'] as const;

/**
 * Hook to fetch all active visa countries from DRF backend
 */
export const useVisaCountries = (
  options?: Omit<UseQueryOptions<VisaCountry[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<VisaCountry[], Error>({
    queryKey: VISA_COUNTRIES_QUERY_KEY,
    queryFn: getVisaCountries,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    ...options,
  });
};

// Backward-compatible alias
export const useVisa = useVisaCountries;

export default useVisaCountries;
