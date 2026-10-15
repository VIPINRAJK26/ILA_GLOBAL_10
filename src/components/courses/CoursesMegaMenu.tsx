import React from 'react';
import { useNavigate } from 'react-router';
import { useCourseLanguages, type CourseLanguage } from '../../services/courses';
import { ArrowRightIcon, ChevronRightIcon } from '../common/Icons';
import { ROUTES } from '../../routes/paths';

interface CoursesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_LANGUAGES: CourseLanguage[] = [
  { id: 'german', name: 'German', code: 'de', flag: '🇩🇪' },
  { id: 'spanish', name: 'Spanish', code: 'es', flag: '🇪🇸' },
  { id: 'french', name: 'French', code: 'fr', flag: '🇫🇷' },
  { id: 'english', name: 'English', code: 'en', flag: '🇬🇧' },
  { id: 'dutch', name: 'Dutch', code: 'nl', flag: '🇳🇱' },
];

export const CoursesMegaMenu: React.FC<CoursesMegaMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { data: languages = DEFAULT_LANGUAGES } = useCourseLanguages();

  if (!isOpen) return null;

  const handleLanguageClick = (languageName: string) => {
    onClose();
    navigate(`/courses?language=${encodeURIComponent(languageName)}`);
  };

  const handleViewAllCourses = () => {
    onClose();
    navigate(ROUTES.COURSES);
  };

  // Helper for flag fallback if raw flag string is not emoji
  const getFlagEmoji = (lang: CourseLanguage) => {
    if (lang.flag && lang.flag.length > 2) return lang.flag;
    switch (lang.code?.toLowerCase()) {
      case 'de': return '🇩🇪';
      case 'es': return '🇪🇸';
      case 'fr': return '🇫🇷';
      case 'en': return '🇬🇧';
      case 'nl': return '🇳🇱';
      default: return '🌐';
    }
  };

  return (
    <div
      className="absolute top-full left-0 mt-2 w-64 sm:w-72 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
        Select Language
      </div>

      {/* Clean list of Language Courses: German, Spanish, French, English, Dutch */}
      <div className="space-y-0.5">
        {languages.map((lang) => (
          <button
            key={lang.id || lang.code}
            type="button"
            onClick={() => handleLanguageClick(lang.name)}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg leading-none">{getFlagEmoji(lang)}</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {lang.name}
              </span>
            </div>

            <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>

      {/* Minimal View All Courses footer */}
      <div className="mt-1 pt-1.5 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={handleViewAllCourses}
          className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View All Courses</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
