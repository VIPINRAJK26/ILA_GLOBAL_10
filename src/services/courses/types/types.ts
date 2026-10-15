import type { Course, LanguageCategory, CourseField, LanguageLevel } from '../../../data/coursesData';

export interface BackendCourseLevel {
  id: string;
  level: string;
  level_tag?: string;
  title: string;
  short_desc?: string;
  full_desc?: string;
  duration?: string;
  hours?: string;
  price?: string | number;
  original_price?: string | number;
  rating?: string | number;
  students_enrolled?: number;
  spots_remaining?: number;
  industry_keywords?: string[];
  features?: string[];
  batch_dates?: string[];
  target_audience?: string;
  cefr_certified?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BackendSpecialization {
  id: string;
  name: string;
  description?: string;
  levels?: BackendCourseLevel[];
  courses?: BackendCourseLevel[];
}

export interface BackendLanguageCourse {
  id: string;
  slug?: string;
  name: string;
  code: string;
  flag: string;
  description?: string;
  is_active?: boolean;
  fields?: BackendSpecialization[];
  specializations: BackendSpecialization[];
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedCoursesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BackendLanguageCourse[];
}

export type { Course, LanguageCategory, CourseField, LanguageLevel };
