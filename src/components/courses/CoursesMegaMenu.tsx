import React, { useState } from 'react';
import { 
  COURSES_DATA, 
  type Course, 
  type LanguageCategory, 
  type CourseField, 
  type LanguageLevel 
} from '../../data/coursesData';
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  ClockIcon 
} from '../common/Icons';

interface CoursesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourseToEnroll: (course: Course) => void;
}

export const CoursesMegaMenu: React.FC<CoursesMegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectCourseToEnroll
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCategory>('German');
  const [selectedField, setSelectedField] = useState<CourseField>('IT & Software');
  const [selectedLevel, setSelectedLevel] = useState<LanguageLevel | 'All'>('All');

  if (!isOpen) return null;

  const languages: { key: LanguageCategory; label: string; flag: string }[] = [
    { key: 'German', label: 'German (Deutsch)', flag: '🇩🇪' },
    { key: 'Spanish', label: 'Spanish (Español)', flag: '🇪🇸' },
    { key: 'French', label: 'French (Français)', flag: '🇫🇷' },
    { key: 'English', label: 'English (IELTS / Biz)', flag: '🇬🇧' },
  ];

  const fields: { key: CourseField; label: string; icon: string }[] = [
    { key: 'IT & Software', label: 'IT & Software', icon: '💻' },
    { key: 'Healthcare & Nursing', label: 'Healthcare & Nursing', icon: '🏥' },
    { key: 'Engineering', label: 'Engineering & Tech', icon: '⚙️' },
    { key: 'Business & Management', label: 'Business & Management', icon: '💼' },
    { key: 'General & Academic', label: 'General & Academic', icon: '🎓' },
  ];

  const levels: (LanguageLevel | 'All')[] = ['All', 'A1', 'A2', 'B1', 'B2', 'C1'];

  // Filter courses by selected language, field, and level
  const filteredCourses = COURSES_DATA.filter((c) => {
    const langMatch = c.language === selectedLanguage;
    const fieldMatch = c.field === selectedField;
    const levelMatch = selectedLevel === 'All' || c.level === selectedLevel;
    return langMatch && fieldMatch && levelMatch;
  });

  // Fallback if no exact match for this sub-field/level combo: show all courses in this language
  const coursesToDisplay = filteredCourses.length > 0 
    ? filteredCourses 
    : COURSES_DATA.filter((c) => c.language === selectedLanguage);

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl mt-2 rounded-3xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 z-50 animate-fade-in"
      onMouseLeave={onClose}
    >
      {/* Mega Menu Top: 3-Tier Controls (Language -> Field -> Level) */}
      <div className="space-y-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        
        {/* Tier 1: Main Language Category */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {languages.map((lang) => (
              <button
                key={lang.key}
                type="button"
                onClick={() => setSelectedLanguage(lang.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedLanguage === lang.key
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Live Cohorts + Intelli Coach AI Drills</span>
          </div>
        </div>

        {/* Tier 2: Sub-Category / Target Field Domain */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
              Target Field:
            </span>
            {fields.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setSelectedField(f.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedField === f.key
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Tier 3: CEFR Language Levels */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Level:</span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Display Grid */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[55vh] overflow-y-auto pr-1">
        {coursesToDisplay.map((course) => (
          <div
            key={course.id}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
          >
            <div className="space-y-2.5">
              {/* Badge row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{course.flag}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {course.field}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {course.levelTag}
                </span>
              </div>

              {/* Title & Desc */}
              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                {course.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {course.shortDesc}
              </p>

              {/* Target Field Vocabulary Highlight Box */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                  <SparklesIcon className="w-3 h-3 text-yellow-400" />
                  <span>Key {course.field} Vocabulary Taught:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {course.industryKeywords.slice(0, 3).map((w, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {w.split('(')[0].trim()}
                    </span>
                  ))}
                  {course.industryKeywords.length > 3 && (
                    <span className="text-[9px] font-bold text-slate-400 self-center">
                      +{course.industryKeywords.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Duration and Hours */}
              <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5 text-indigo-500" />
                  {course.duration}
                </span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {course.spotsRemaining} spots left
                </span>
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="pt-3 mt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-black text-slate-900 dark:text-white">€{course.price}</span>
                  <span className="text-xs text-slate-400 line-through">€{course.originalPrice}</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 block">
                  CEFR Certified
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectCourseToEnroll(course);
                  onClose();
                }}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <span>Apply / Enroll</span>
                <ArrowRightIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mega Menu Footer Banner */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
          <span>Includes Official Exam Prep (Goethe / telc / DELE / TEF / IELTS) & Intelli Coach AI tutor</span>
        </div>

        <a
          href="/courses"
          onClick={onClose}
          className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <span>Explore All 24+ Language Tracks & Syllabi</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
