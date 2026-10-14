import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { updateUserProfile } from '../api/getUserProfile';
import type { AuthUser, UpdateProfilePayload, AuthValidationError } from '../types/types';
import { USER_PROFILE_QUERY_KEY } from './useUserProfile';
import { AUTH_CHECK_QUERY_KEY } from './useCheckLogin';

/**
 * Mutation hook to update user profile
 */
export const useUpdateUserProfile = (
  options?: UseMutationOptions<AuthUser, AuthValidationError, UpdateProfilePayload>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(USER_PROFILE_QUERY_KEY, data);
      queryClient.invalidateQueries({ queryKey: AUTH_CHECK_QUERY_KEY });
      (options?.onSuccess as any)?.(data, variables, context);
    },
  });
};

export default useUpdateUserProfile;
