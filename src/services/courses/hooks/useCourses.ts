import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getCourses, getLanguageCourses, getCachedLanguageCourses } from '../api/getCourses';
import { getLearningPaths, getCachedLearningPaths } from '../api/getLearningPaths';
import type { Course } from '../../../data/coursesData';
import type { BackendLanguageCourse, BackendLearningPath, BackendCourseLevel, LearningPathOption } from '../types/types';
import { DEFAULT_LANGUAGE_COURSES } from '../data/defaultLanguageCourses';
import { DEFAULT_BACKEND_LEARNING_PATHS } from '../data/defaultLearningPaths';
import { flattenBackendCourses, transformBackendLearningPathToOption } from '../utils/transformers';

export const COURSES_QUERY_KEY = ['courses', 'list'] as const;
export const LANGUAGE_COURSES_QUERY_KEY = ['courses', 'nested_languages'] as const;
export const LEARNING_PATHS_QUERY_KEY = ['courses', 'learning_paths'] as const;

/**
 * React Query hook to fetch nested language courses with specializations and levels.
 * Uses cached localStorage data or local snapshot for 0ms instant loading.
 */
export const useLanguageCourses = (
  options?: Omit<UseQueryOptions<BackendLanguageCourse[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<BackendLanguageCourse[], Error>({
    queryKey: LANGUAGE_COURSES_QUERY_KEY,
    queryFn: getLanguageCourses,
    initialData: () => getCachedLanguageCourses() || DEFAULT_LANGUAGE_COURSES,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * React Query hook to fetch learning pathways (1-to-1, Video+AI, 24/7 AI Tutor).
 * Backed by DRF with offline local storage cache.
 */
export const useLearningPaths = (
  options?: Omit<UseQueryOptions<BackendLearningPath[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<BackendLearningPath[], Error>({
    queryKey: LEARNING_PATHS_QUERY_KEY,
    queryFn: getLearningPaths,
    initialData: () => getCachedLearningPaths() || DEFAULT_BACKEND_LEARNING_PATHS,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * Hook to retrieve options for a specific course level (allowing level-specific path overrides if defined in DRF)
 */
export const useResolvedLearningPaths = (
  selectedLevel?: BackendCourseLevel
): {
  learningPaths: LearningPathOption[];
  rawLearningPaths: BackendLearningPath[];
  isLoading: boolean;
} => {
  const { data: globalPaths = DEFAULT_BACKEND_LEARNING_PATHS, isLoading } = useLearningPaths();

  // If the backend course level explicitly supplies its own customized learning_paths, prioritize them
  const rawPaths: BackendLearningPath[] = (
    selectedLevel?.learning_paths && selectedLevel.learning_paths.length > 0
  )
    ? selectedLevel.learning_paths
    : globalPaths;

  const learningPaths: LearningPathOption[] = rawPaths
    .filter((p) => p.is_active !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
    .map(transformBackendLearningPathToOption);

  return {
    learningPaths,
    rawLearningPaths: rawPaths,
    isLoading,
  };
};

/**
 * React Query hook to fetch flattened courses with instant initial data.
 */
export const useCourses = (
  options?: Omit<UseQueryOptions<Course[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Course[], Error>({
    queryKey: COURSES_QUERY_KEY,
    queryFn: getCourses,
    initialData: () => {
      const cached = getCachedLanguageCourses();
      return cached ? flattenBackendCourses(cached) : flattenBackendCourses(DEFAULT_LANGUAGE_COURSES);
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export default useCourses;

