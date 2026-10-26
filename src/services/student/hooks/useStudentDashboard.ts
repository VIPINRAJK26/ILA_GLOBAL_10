import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import {
  fetchStudentDashboardData,
  updateStudentProfileBackend,
  uploadStudentDocumentBackend,
  deleteStudentDocumentBackend,
  toggleActivityBackend,
} from '../api/studentApi';
import type { StudentProfile, StudentDocument, StudentDashboardData } from '../types';
import { getStudentDashboardData } from '../studentStorage';

export const STUDENT_DASHBOARD_QUERY_KEY = 'studentDashboard';

export function useStudentDashboard() {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  // Active query cache key dependent on authenticated user
  const userKey = user?.id || user?.email || 'guest';
  const queryKey = [STUDENT_DASHBOARD_QUERY_KEY, userKey];

  // Primary Query fetching data from backend
  const {
    data = getStudentDashboardData(user),
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<StudentDashboardData>({
    queryKey,
    queryFn: () => fetchStudentDashboardData(user),
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });

  // Profile Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (updates: Partial<StudentProfile>) =>
      updateStudentProfileBackend(updates, user),
    onSuccess: (updatedData, updates) => {
      // Sync AuthContext state for Navbar & Avatar
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          name: updates.name || (updates.firstName ? `${updates.firstName} ${updates.lastName || ''}`.trim() : prev.name),
          first_name: updates.firstName !== undefined ? updates.firstName : prev.first_name,
          last_name: updates.lastName !== undefined ? updates.lastName : prev.last_name,
          phone: updates.phone !== undefined ? updates.phone : prev.phone,
          phone_number: updates.phone !== undefined ? updates.phone : prev.phone_number,
          destination: updates.destination !== undefined ? updates.destination : prev.destination,
          program: updates.targetProgram !== undefined ? updates.targetProgram : prev.program,
        };
      });

      // Update Query cache immediately
      queryClient.setQueryData(queryKey, updatedData);
    },
  });

  // Document Upload Mutation
  const uploadDocMutation = useMutation({
    mutationFn: (doc: {
      name: string;
      category: StudentDocument['category'];
      file?: File | null;
      fileName?: string;
    }) => uploadStudentDocumentBackend(doc, user),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(queryKey, updatedData);
    },
  });

  // Document Deletion Mutation
  const deleteDocMutation = useMutation({
    mutationFn: (docId: string) => deleteStudentDocumentBackend(docId, user),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(queryKey, updatedData);
    },
  });

  // Activity Status Toggle Mutation
  const toggleActivityMutation = useMutation({
    mutationFn: (activityId: string) => toggleActivityBackend(activityId, user),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(queryKey, updatedData);
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    uploadDocument: uploadDocMutation.mutateAsync,
    isUploadingDoc: uploadDocMutation.isPending,
    deleteDocument: deleteDocMutation.mutateAsync,
    isDeletingDoc: deleteDocMutation.isPending,
    toggleActivity: toggleActivityMutation.mutateAsync,
    isTogglingActivity: toggleActivityMutation.isPending,
  };
}

export default useStudentDashboard;
