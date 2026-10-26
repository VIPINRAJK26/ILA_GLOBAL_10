import type { Course, LanguageCategory, CourseField, LanguageLevel } from '../../../data/coursesData';

export interface BackendLearningPath {
  id: string;
  slug?: string;
  title: string;
  tagline?: string;
  badge?: string;
  badge_color?: string;
  price_multiplier?: number | string;
  icon_type?: 'user' | 'laptop' | 'bot' | 'tutor' | 'video' | 'ai' | string;
  icon_color?: string;
  features?: string[];
  deliverables?: string[];
  recommended_for?: string;
  is_active?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface LearningPathOption {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  priceMultiplier: number;
  icon?: React.FC<{ className?: string }>;
  iconType?: string;
  iconColor: string;
  features: string[];
  deliverables: string[];
  recommendedFor: string;
}

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
  learning_paths?: BackendLearningPath[];
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

export interface PaginatedLearningPathsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BackendLearningPath[];
}

export type { Course, LanguageCategory, CourseField, LanguageLevel };

