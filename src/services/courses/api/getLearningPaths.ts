import axiosInstance from '../../../api/axiosInstance';
import type { BackendLearningPath, PaginatedLearningPathsResponse } from '../types/types';
import { DEFAULT_BACKEND_LEARNING_PATHS } from '../data/defaultLearningPaths';

export const CACHE_KEY_LEARNING_PATHS = 'ila_cached_learning_paths';

/**
 * Retrieve cached learning paths from localStorage for 0ms instant loading
 */
export const getCachedLearningPaths = (): BackendLearningPath[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY_LEARNING_PATHS);
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
 * Save fresh learning path data to localStorage cache
 */
export const setCachedLearningPaths = (data: BackendLearningPath[]): void => {
  try {
    localStorage.setItem(CACHE_KEY_LEARNING_PATHS, JSON.stringify(data));
  } catch {
    // Local storage quota exceeded or unavailable
  }
};

/**
 * Fetch Learning Paths from DRF API with background caching
 * DRF Endpoint: GET /api/learning-paths/ or /api/courses/learning-paths/
 */
export const getLearningPaths = async (): Promise<BackendLearningPath[]> => {
  try {
    const response = await axiosInstance.get<PaginatedLearningPathsResponse | BackendLearningPath[]>(
      'learning-paths/'
    );

    const rawResults: BackendLearningPath[] = Array.isArray(response.data)
      ? response.data
      : response.data.results || [];

    const active = rawResults
      .filter((p) => p.is_active !== false)
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    if (active.length > 0) {
      setCachedLearningPaths(active);
      return active;
    }
    return getCachedLearningPaths() || DEFAULT_BACKEND_LEARNING_PATHS;
  } catch (err) {
    // In dev or if DRF endpoint is pending migration, quietly fall back to local snapshot/cache
    return getCachedLearningPaths() || DEFAULT_BACKEND_LEARNING_PATHS;
  }
};

export default getLearningPaths;
