import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { loginPassword } from '../api/loginPassword';
import type { PasswordLoginPayload, PasswordLoginResponse, AuthValidationError } from '../types/types';
import { AUTH_CHECK_QUERY_KEY } from './useCheckLogin';

/**
 * Mutation hook for password-based login
 */
export const useLoginPassword = (
  options?: UseMutationOptions<PasswordLoginResponse, AuthValidationError, PasswordLoginPayload>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginPassword,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: AUTH_CHECK_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
      (options?.onSuccess as any)?.(data, variables, context);
    },
  });
};

export default useLoginPassword;
