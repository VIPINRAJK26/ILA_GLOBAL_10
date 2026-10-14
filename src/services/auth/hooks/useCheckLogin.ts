import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { checkLogin } from '../api/checkLogin';
import type { CheckLoginResponse } from '../types/types';

export const AUTH_CHECK_QUERY_KEY = ['auth', 'check-login'] as const;

/**
 * Hook to inspect current authentication state cleanly without throwing HTTP 401
 */
export const useCheckLogin = (
  options?: Omit<UseQueryOptions<CheckLoginResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<CheckLoginResponse, Error>({
    queryKey: AUTH_CHECK_QUERY_KEY,
    queryFn: checkLogin,
    staleTime: 5 * 60 * 1000,
    retry: false,
    ...options,
  });
};

export default useCheckLogin;
