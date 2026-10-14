import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getVisaApplicationStatus } from '../api/getVisaApplicationStatus';
import type { VisaApplicationResponse } from '../types/types';

export const VISA_STATUS_QUERY_KEY = ['visa', 'application-status'] as const;

/**
 * Hook to track a visa application status in real-time
 */
export const useVisaApplicationStatus = (
  reference: string,
  options?: Omit<UseQueryOptions<VisaApplicationResponse, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<VisaApplicationResponse, any>({
    queryKey: [...VISA_STATUS_QUERY_KEY, reference],
    queryFn: () => getVisaApplicationStatus(reference),
    enabled: Boolean(reference && reference.trim().length > 0),
    retry: 1,
    staleTime: 30 * 1000, // 30 seconds
    ...options,
  });
};

export default useVisaApplicationStatus;
