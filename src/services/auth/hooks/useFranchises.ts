import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getFranchises } from '../api/getFranchises';
import type { Franchise } from '../types/types';

export const FRANCHISES_QUERY_KEY = ['auth', 'franchises'] as const;

/**
 * Hook to list active franchises and hierarchy nodes
 */
export const useFranchises = (
  options?: Omit<UseQueryOptions<Franchise[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Franchise[], Error>({
    queryKey: FRANCHISES_QUERY_KEY,
    queryFn: getFranchises,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export default useFranchises;
