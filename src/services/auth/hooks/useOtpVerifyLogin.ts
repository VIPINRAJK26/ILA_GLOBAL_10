import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { otpVerifyLogin } from '../api/otpVerifyLogin';
import type { OtpVerifyLoginPayload, OtpVerifyLoginResponse, AuthValidationError } from '../types/types';
import { AUTH_CHECK_QUERY_KEY } from './useCheckLogin';

/**
 * Mutation hook for passwordless OTP verification login
 */
export const useOtpVerifyLogin = (
  options?: UseMutationOptions<OtpVerifyLoginResponse, AuthValidationError, OtpVerifyLoginPayload>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: otpVerifyLogin,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: AUTH_CHECK_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
      (options?.onSuccess as any)?.(data, variables, context);
    },
  });
};

export default useOtpVerifyLogin;
