import axiosInstance from '../../../api/axiosInstance';
import { COURSES_DATA, type Course } from '../../../data/coursesData';
import type { BackendLanguageCourse, PaginatedCoursesResponse } from '../types/types';
import { flattenBackendCourses } from '../utils/transformers';
import { DEFAULT_LANGUAGE_COURSES } from '../data/defaultLanguageCourses';

export const CACHE_KEY_LANGUAGES = 'ila_cached_language_courses';

/**
 * Retrieve cached courses from localStorage for 0ms instant loading
 */
export const getCachedLanguageCourses = (): BackendLanguageCourse[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY_LANGUAGES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Local storage disabled or corrupted, ignore
  }
  return null;
};

/**
 * Save fresh course data to localStorage cache
 */
export const setCachedLanguageCourses = (data: BackendLanguageCourse[]): void => {
  try {
    localStorage.setItem(CACHE_KEY_LANGUAGES, JSON.stringify(data));
  } catch {
    // Local storage quota exceeded or unavailable
  }
};

/**
 * Fetch nested Language Courses from DRF API with background caching
 * Endpoint: GET /api/courses/
 */
export const getLanguageCourses = async (): Promise<BackendLanguageCourse[]> => {
  try {
    const response = await axiosInstance.get<PaginatedCoursesResponse | BackendLanguageCourse[]>('courses/');
    
    const rawResults: BackendLanguageCourse[] = Array.isArray(response.data)
      ? response.data
      : response.data.results || [];

    const active = rawResults.filter((l) => l.is_active !== false);
    if (active.length > 0) {
      setCachedLanguageCourses(active);
      return active;
    }
    return getCachedLanguageCourses() || DEFAULT_LANGUAGE_COURSES;
  } catch (err) {
    console.warn('Unable to reach /api/courses/, falling back to local snapshot/cache:', err);
    return getCachedLanguageCourses() || DEFAULT_LANGUAGE_COURSES;
  }
};

/**
 * Fetch flattened courses list
 */
export const getCourses = async (): Promise<Course[]> => {
  const languages = await getLanguageCourses();
  if (languages.length > 0) {
    const flattened = flattenBackendCourses(languages);
    if (flattened.length > 0) return flattened;
  }
  return COURSES_DATA;
};

export default getCourses;
