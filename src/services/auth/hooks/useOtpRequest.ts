import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { otpRequest } from '../api/otpRequest';
import type { OtpRequestPayload, OtpRequestResponse, AuthValidationError } from '../types/types';

/**
 * Mutation hook to request general login/reset OTP
 */
export const useOtpRequest = (
  options?: UseMutationOptions<OtpRequestResponse, AuthValidationError, OtpRequestPayload>
) => {
  return useMutation<OtpRequestResponse, AuthValidationError, OtpRequestPayload>({
    mutationFn: otpRequest,
    ...options,
  });
};

export default useOtpRequest;
