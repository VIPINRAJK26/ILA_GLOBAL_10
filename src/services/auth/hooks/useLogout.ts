import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { logout } from '../api/logout';
import { AUTH_CHECK_QUERY_KEY } from './useCheckLogin';

/**
 * Mutation hook for logout
 */
export const useLogout = (
  options?: UseMutationOptions<{ success: boolean; message?: string }, Error, string | undefined>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(AUTH_CHECK_QUERY_KEY, { isAuthenticated: false, user: null });
      queryClient.removeQueries({ queryKey: ['auth'] });
      (options?.onSuccess as any)?.(data, variables, context);
    },
  });
};

export default useLogout;
