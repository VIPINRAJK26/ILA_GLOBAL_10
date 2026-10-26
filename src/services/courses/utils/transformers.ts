import type { Course, LanguageCategory, CourseField, LanguageLevel } from '../../../data/coursesData';
import type { 
  BackendCourseLevel, 
  BackendLanguageCourse, 
  BackendSpecialization, 
  BackendLearningPath, 
  LearningPathOption 
} from '../types/types';
import { UserIcon, LaptopIcon, BotIcon } from '../../../components/common/Icons';

const parseNumber = (val: string | number | undefined, fallback: number): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

/**
 * Resolves an icon component from a string or icon_type identifier
 */
export function resolveLearningPathIcon(iconType?: string): React.FC<{ className?: string }> {
  const norm = (iconType || '').toLowerCase();
  if (norm.includes('user') || norm.includes('tutor') || norm.includes('human') || norm === '1-to-1') {
    return UserIcon;
  }
  if (norm.includes('bot') || norm.includes('ai') || norm.includes('robot')) {
    return BotIcon;
  }
  return LaptopIcon;
}

/**
 * Transforms DRF BackendLearningPath into a presentation-ready LearningPathOption
 */
export function transformBackendLearningPathToOption(path: BackendLearningPath): LearningPathOption {
  const icon = resolveLearningPathIcon(path.icon_type || path.id);
  const priceMultiplier = parseNumber(path.price_multiplier, 1.0);

  // Default color schemes if not provided by backend
  let defaultBadgeColor = 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800';
  let defaultIconColor = 'text-indigo-600 dark:text-indigo-400';

  if (priceMultiplier > 1.1 || path.id === '1-to-1') {
    defaultBadgeColor = 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    defaultIconColor = 'text-amber-600 dark:text-amber-400';
  } else if (priceMultiplier < 0.9 || path.id === 'ai-tutor') {
    defaultBadgeColor = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    defaultIconColor = 'text-emerald-600 dark:text-emerald-400';
  }

  return {
    id: path.id,
    title: path.title,
    tagline: path.tagline || 'Flexible curriculum adapted to your learning schedule.',
    badge: path.badge || (priceMultiplier > 1 ? 'Live Cohort' : priceMultiplier < 1 ? '24/7 AI Tutor' : 'Most Popular'),
    badgeColor: path.badge_color || defaultBadgeColor,
    priceMultiplier,
    icon,
    iconType: path.icon_type,
    iconColor: path.icon_color || defaultIconColor,
    features: Array.isArray(path.features) ? path.features : [],
    deliverables: Array.isArray(path.deliverables) ? path.deliverables : [],
    recommendedFor: path.recommended_for || 'Learners aiming to advance their professional proficiency.',
  };
}

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

