import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { registerVerifyOtp } from '../api/registerVerifyOtp';
import type { RegisterVerifyOtpPayload, RegisterVerifyOtpResponse, AuthValidationError } from '../types/types';
import { AUTH_CHECK_QUERY_KEY } from './useCheckLogin';

/**
 * Mutation hook to verify registration OTP and create user
 */
export const useRegisterVerifyOtp = (
  options?: UseMutationOptions<RegisterVerifyOtpResponse, AuthValidationError, RegisterVerifyOtpPayload>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerVerifyOtp,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: AUTH_CHECK_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
      (options?.onSuccess as any)?.(data, variables, context);
    },
  });
};

export default useRegisterVerifyOtp;
