import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getCourses, getLanguageCourses, getCachedLanguageCourses } from '../api/getCourses';
import type { Course } from '../../../data/coursesData';
import type { BackendLanguageCourse } from '../types/types';
import { DEFAULT_LANGUAGE_COURSES } from '../data/defaultLanguageCourses';
import { flattenBackendCourses } from '../utils/transformers';

export const COURSES_QUERY_KEY = ['courses', 'list'] as const;
export const LANGUAGE_COURSES_QUERY_KEY = ['courses', 'nested_languages'] as const;

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
