import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { passwordResetRequest } from '../api/passwordResetRequest';
import { passwordResetConfirm } from '../api/passwordResetConfirm';
import type { 
  PasswordResetRequestPayload, 
  PasswordResetRequestResponse, 
  PasswordResetConfirmPayload, 
  PasswordResetConfirmResponse, 
  AuthValidationError 
} from '../types/types';

/**
 * Hook to request password reset OTP
 */
export const usePasswordResetRequest = (
  options?: UseMutationOptions<PasswordResetRequestResponse, AuthValidationError, PasswordResetRequestPayload>
) => {
  return useMutation<PasswordResetRequestResponse, AuthValidationError, PasswordResetRequestPayload>({
    mutationFn: passwordResetRequest,
    ...options,
  });
};

/**
 * Hook to confirm password reset with OTP
 */
export const usePasswordResetConfirm = (
  options?: UseMutationOptions<PasswordResetConfirmResponse, AuthValidationError, PasswordResetConfirmPayload>
) => {
  return useMutation<PasswordResetConfirmResponse, AuthValidationError, PasswordResetConfirmPayload>({
    mutationFn: passwordResetConfirm,
    ...options,
  });
};
