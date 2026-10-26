import { useState, useEffect, useCallback } from 'react';
import type { StudyAbroadOverviewData } from '../types';
import {
  getStudyAbroadOverview,
  getCachedStudyAbroadData,
} from '../api/studyAbroadApi';
import { DEFAULT_STUDY_ABROAD_DATA } from '../defaultStudyAbroadData';

export interface UseStudyAbroadDataReturn {
  data: StudyAbroadOverviewData;
  isLoading: boolean;
  isBackendConnected: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStudyAbroadData = (): UseStudyAbroadDataReturn => {
  const [data, setData] = useState<StudyAbroadOverviewData>(() => {
    return getCachedStudyAbroadData() || DEFAULT_STUDY_ABROAD_DATA;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getStudyAbroadOverview();
      setData(result);
      setIsBackendConnected(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to load live backend data');
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    isBackendConnected,
    error,
    refetch: fetchData,
  };
};
