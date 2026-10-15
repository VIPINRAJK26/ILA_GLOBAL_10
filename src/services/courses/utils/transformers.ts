import type { Course, LanguageCategory, CourseField, LanguageLevel } from '../../../data/coursesData';
import type { BackendCourseLevel, BackendLanguageCourse, BackendSpecialization } from '../types/types';

const parseNumber = (val: string | number | undefined, fallback: number): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

/**
 * Transforms a leaf BackendCourseLevel + parent Language & Specialization into a frontend Course
 */
export function transformCourseLevelToCourse(
  lvl: BackendCourseLevel,
  lang: { name: string; flag: string },
  spec: BackendSpecialization
): Course {
  return {
    id: lvl.id,
    title: lvl.title,
    language: (lang.name || 'German') as LanguageCategory,
    flag: lang.flag || '🌐',
    field: (spec.name || 'General') as CourseField,
    level: (lvl.level || 'B1') as LanguageLevel,
    levelTag: lvl.level_tag || `CEFR ${lvl.level}`,
    shortDesc: lvl.short_desc || '',
    fullDesc: lvl.full_desc || lvl.short_desc || '',
    duration: lvl.duration || '8 Weeks',
    hours: lvl.hours || '80 Live Hours',
    price: parseNumber(lvl.price, 199),
    originalPrice: parseNumber(lvl.original_price, 299),
    rating: parseNumber(lvl.rating, 4.9),
    studentsEnrolled: lvl.students_enrolled ?? 150,
    spotsRemaining: lvl.spots_remaining ?? 5,
    industryKeywords: Array.isArray(lvl.industry_keywords) ? lvl.industry_keywords : [],
    features: Array.isArray(lvl.features) ? lvl.features : [],
    batchDates: Array.isArray(lvl.batch_dates) && lvl.batch_dates.length > 0 
      ? lvl.batch_dates 
      : ['Nov 03, 2026 - Morning Cohort', 'Nov 07, 2026 - Evening Cohort'],
    targetAudience: lvl.target_audience || 'Professionals and students seeking certified qualification.',
    cefrCertified: Boolean(lvl.cefr_certified ?? true),
  };
}

/**
 * Flattens all nested Language -> Specialization -> Levels into a flat Course[] list
 */
export function flattenBackendCourses(languages: BackendLanguageCourse[]): Course[] {
  const result: Course[] = [];

  for (const lang of languages) {
    const specs = lang.specializations || lang.fields || [];
    for (const spec of specs) {
      const levels = spec.levels || spec.courses || [];
      for (const lvl of levels) {
        result.push(transformCourseLevelToCourse(lvl, lang, spec));
      }
    }
  }

  return result;
}
