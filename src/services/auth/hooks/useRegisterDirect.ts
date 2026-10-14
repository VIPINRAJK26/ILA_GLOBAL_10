import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { registerDirect } from '../api/registerDirect';
import type { RegisterDirectPayload, RegisterDirectResponse, AuthValidationError } from '../types/types';
import { AUTH_CHECK_QUERY_KEY } from './useCheckLogin';

/**
 * Mutation hook for direct student registration
 */
export const useRegisterDirect = (
  options?: UseMutationOptions<RegisterDirectResponse, AuthValidationError, RegisterDirectPayload>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerDirect,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: AUTH_CHECK_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
      (options?.onSuccess as any)?.(data, variables, context);
    },
  });
};

export default useRegisterDirect;
