import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { registerRequestOtp } from '../api/registerRequestOtp';
import type { RegisterRequestOtpPayload, RegisterRequestOtpResponse, AuthValidationError } from '../types/types';

/**
 * Mutation hook to request OTP for new user registration
 */
export const useRegisterRequestOtp = (
  options?: UseMutationOptions<RegisterRequestOtpResponse, AuthValidationError, RegisterRequestOtpPayload>
) => {
  return useMutation<RegisterRequestOtpResponse, AuthValidationError, RegisterRequestOtpPayload>({
    mutationFn: registerRequestOtp,
    ...options,
  });
};

export default useRegisterRequestOtp;
