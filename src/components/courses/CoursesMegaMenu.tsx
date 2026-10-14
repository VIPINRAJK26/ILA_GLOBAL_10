import React from 'react';
import { useNavigate } from 'react-router';
import { COURSES_DATA, type Course, type LanguageCategory } from '../../data/coursesData';
import { ArrowRightIcon } from '../common/Icons';
import { ROUTES } from '../../routes/paths';

interface CoursesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourseToEnroll?: (course: Course) => void;
  onCourseClick?: (courseId: string) => void;
}

export const CoursesMegaMenu: React.FC<CoursesMegaMenuProps> = ({
  isOpen,
  onClose,
  onCourseClick,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const languages: { key: LanguageCategory; label: string; flag: string }[] = [
    { key: 'German', label: 'German', flag: '🇩🇪' },
    { key: 'Spanish', label: 'Spanish', flag: '🇪🇸' },
    { key: 'French', label: 'French', flag: '🇫🇷' },
    { key: 'English', label: 'English', flag: '🇬🇧' },
  ];

  const handleCourseClick = (courseId: string) => {
    onClose();
    if (onCourseClick) {
      onCourseClick(courseId);
    } else {
      navigate(`/courses?course=${courseId}#course-${courseId}`);
    }
  };

  const handleViewAllCourses = () => {
    onClose();
    navigate(ROUTES.COURSES);
  };

  return (
    <div
      className="absolute top-full left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Scrollable Simple Course List */}
      <div className="max-h-[380px] overflow-y-auto space-y-2 p-1.5 scrollbar-thin">
        {languages.map((lang) => {
          const coursesInLang = COURSES_DATA.filter((c) => c.language === lang.key);
          if (coursesInLang.length === 0) return null;

          return (
            <div key={lang.key} className="space-y-0.5">
              {/* Category Header */}
              <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <span>{lang.flag}</span>
                <span>{lang.label} Courses</span>
              </div>

              {/* Course Items */}
              {coursesInLang.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => handleCourseClick(course.id)}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                    {course.title}
                  </span>
                  <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700">
                    {course.level}
                  </span>
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {/* Minimal Footer */}
      <div className="p-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={handleViewAllCourses}
          className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View All Courses Directory</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
