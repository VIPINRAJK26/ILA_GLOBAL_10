import { useQuery } from '@tanstack/react-query';
import { getCourseLanguages, type CourseLanguage } from '../api/getLanguages';

export const COURSE_LANGUAGES_QUERY_KEY = ['courses', 'languages'] as const;

export const useCourseLanguages = () => {
  return useQuery<CourseLanguage[], Error>({
    queryKey: COURSE_LANGUAGES_QUERY_KEY,
    queryFn: getCourseLanguages,
    staleTime: 10 * 60 * 1000,
  });
};
