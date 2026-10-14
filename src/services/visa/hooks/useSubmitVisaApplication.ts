import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { submitVisaApplication } from '../api/submitVisaApplication';
import type { VisaApplicationPayload, VisaApplicationResponse, DRFValidationError } from '../types/types';

/**
 * Mutation hook to submit a visa application to DRF
 */
export const useSubmitVisaApplication = (
  options?: UseMutationOptions<VisaApplicationResponse, DRFValidationError, VisaApplicationPayload>
) => {
  return useMutation<VisaApplicationResponse, DRFValidationError, VisaApplicationPayload>({
    mutationFn: submitVisaApplication,
    ...options,
  });
};

export default useSubmitVisaApplication;
