import React from 'react';
import { useNavigate } from 'react-router';
import { useCourseLanguages, type CourseLanguage } from '../../services/courses';
import { ArrowRightIcon, ChevronRightIcon, BookOpenIcon, SparklesIcon } from '../common/Icons';
import { ROUTES } from '../../routes/paths';

interface CoursesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_LANGUAGES: CourseLanguage[] = [
  { id: 'german', name: 'German', code: 'de', flag: '🇩🇪' },
  { id: 'english', name: 'English (IELTS)', code: 'en', flag: '🇬🇧' },
  { id: 'spanish', name: 'Spanish', code: 'es', flag: '🇪🇸' },
  { id: 'french', name: 'French', code: 'fr', flag: '🇫🇷' },
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

  const getLanguageDetails = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('german')) return { track: 'A1 – C1, TestDaF & Medical', badge: 'Flagship' };
    if (lower.includes('english')) return { track: 'IELTS Academic & Band 7.5+', badge: 'Intensive' };
    if (lower.includes('spanish')) return { track: 'DELE A1 – B2 Immersion', badge: 'European' };
    if (lower.includes('french')) return { track: 'DELF Preparation & TCF', badge: 'Global' };
    return { track: 'Foundational & Spoken', badge: 'Certificate' };
  };

  const getFlagEmoji = (lang: CourseLanguage) => {
    if (lang.flag && lang.flag.length <= 4) return lang.flag;
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
      className="absolute top-full left-0 mt-2.5 w-[340px] sm:w-[380px] rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-3.5 z-50 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Language & Industry Tracks
        </span>
        <button
          type="button"
          onClick={handleViewAllCourses}
          className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>All Courses</span>
          <ChevronRightIcon className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-1">
        {languages.map((lang) => {
          const details = getLanguageDetails(lang.name);
          return (
            <button
              key={lang.id || lang.code}
              type="button"
              onClick={() => handleLanguageClick(lang.name)}
              className="w-full text-left p-2.5 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shrink-0">
                  {getFlagEmoji(lang)}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {lang.name}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800">
                      {details.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                    {details.track}
                  </div>
                </div>
              </div>

              <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
            </button>
          );
        })}
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
        <button
          type="button"
          onClick={handleViewAllCourses}
          className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
        >
          <BookOpenIcon className="w-3.5 h-3.5" />
          <span>Explore All Language Classes</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
