import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { submitVisaApplication } from '../api/submitVisaApplication';
import type { VisaApplicationPayload, VisaApplicationResponse, DRFValidationError } from '../types/types';

/**
 * Mutation hook to submit a visa application to DRF
 */
export const useSubmitVisaApplication = (
  options?: UseMutationOptions<VisaApplicationResponse, DRFValidationError, VisaApplicationPayload>
) => {
  const queryClient = useQueryClient();
  const callerOnSuccess = options?.onSuccess;
  return useMutation<VisaApplicationResponse, DRFValidationError, VisaApplicationPayload>({
    mutationFn: submitVisaApplication,
    ...options,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: ['studentDashboard'] });
      await callerOnSuccess?.(data, variables, onMutateResult, context);
    },
  });
};

export default useSubmitVisaApplication;
