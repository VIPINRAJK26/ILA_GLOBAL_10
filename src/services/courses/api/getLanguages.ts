import axiosInstance from '../../../api/axiosInstance';

export interface CourseLanguage {
  id: string;
  name: string;
  code: string;
  flag: string;
  description?: string;
  is_active?: boolean;
}

const DEFAULT_LANGUAGES: CourseLanguage[] = [
  { id: 'german', name: 'German', code: 'de', flag: '🇩🇪' },
  { id: 'spanish', name: 'Spanish', code: 'es', flag: '🇪🇸' },
  { id: 'french', name: 'French', code: 'fr', flag: '🇫🇷' },
  { id: 'english', name: 'English', code: 'en', flag: '🇬🇧' },
  { id: 'dutch', name: 'Dutch', code: 'nl', flag: '🇳🇱' },
];

/**
 * Fetch available course languages
 * Endpoint: GET /api/courses/languages/
 */
export const getCourseLanguages = async (): Promise<CourseLanguage[]> => {
  try {
    const response = await axiosInstance.get<CourseLanguage[]>('courses/languages/');
    const list = Array.isArray(response.data) ? response.data : [];
    const active = list.filter((l) => l.is_active !== false);
    return active.length > 0 ? active : DEFAULT_LANGUAGES;
  } catch {
    return DEFAULT_LANGUAGES;
  }
};
