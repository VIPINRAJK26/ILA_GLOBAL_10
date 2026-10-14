import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getUserProfile } from '../api/getUserProfile';
import type { AuthUser } from '../types/types';

export const USER_PROFILE_QUERY_KEY = ['auth', 'profile'] as const;

/**
 * Hook to fetch authenticated user profile with franchises and assigned roles
 */
export const useUserProfile = (
  options?: Omit<UseQueryOptions<AuthUser, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<AuthUser, Error>({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export default useUserProfile;
