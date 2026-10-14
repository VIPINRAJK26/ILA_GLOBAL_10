import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getVisaTypes } from '../api/getVisaTypes';
import type { VisaType } from '../types/types';

export const VISA_TYPES_QUERY_KEY = ['visa', 'types'] as const;

/**
 * Hook to fetch visa types from DRF backend, optionally filtered by countryId
 */
export const useVisaTypes = (
  countryId?: string,
  options?: Omit<UseQueryOptions<VisaType[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<VisaType[], Error>({
    queryKey: [...VISA_TYPES_QUERY_KEY, countryId || 'all'],
    queryFn: () => getVisaTypes(countryId),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export default useVisaTypes;
