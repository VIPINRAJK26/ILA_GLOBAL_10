import React, { useState } from 'react';
import { 
  COURSES_DATA, 
  type Course, 
  type LanguageCategory, 
  type CourseField, 
  type LanguageLevel 
} from '../data/coursesData';
import { CourseEnrollmentModal } from '../components/courses/CourseEnrollmentModal';
import { 
  SparklesIcon, 
  BookOpenIcon, 
  ClockIcon, 
  AwardIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon 
} from '../components/common/Icons';

export const Courses: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCategory | 'All'>('All');
  const [selectedField, setSelectedField] = useState<CourseField | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = useState<LanguageLevel | 'All'>('All');
  const [activeCourseToEnroll, setActiveCourseToEnroll] = useState<Course | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const languages: (LanguageCategory | 'All')[] = ['All', 'German', 'Spanish', 'French', 'English'];
  const fields: (CourseField | 'All')[] = [
    'All',
    'IT & Software',
    'Healthcare & Nursing',
    'Engineering',
    'Business & Management',
    'General & Academic',
  ];
  const levels: (LanguageLevel | 'All')[] = ['All', 'A1', 'A2', 'B1', 'B2', 'C1'];

  const filteredCourses = COURSES_DATA.filter((c) => {
    const langMatch = selectedLanguage === 'All' || c.language === selectedLanguage;
    const fieldMatch = selectedField === 'All' || c.field === selectedField;
    const levelMatch = selectedLevel === 'All' || c.level === selectedLevel;
    return langMatch && fieldMatch && levelMatch;
  });

  const handleEnroll = (course: Course) => {
    setActiveCourseToEnroll(course);
    setIsEnrollModalOpen(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold">
            <BookOpenIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>ILA Language & Industry Mobility Academy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Industry-Specialized <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Language Courses</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Don't just learn textbook language. Our accredited programs embed targeted vocabulary for <strong>IT & Software</strong>, <strong>Healthcare</strong>, and <strong>Engineering</strong> alongside official CEFR certifications (A1–C1).
          </p>
        </div>

        {/* Filter Navigation Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
          {/* 1. Language Filter */}
          <div>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              1. Choose Language:
            </span>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {lang === 'German' && '🇩🇪 '}
                  {lang === 'Spanish' && '🇪🇸 '}
                  {lang === 'French' && '🇫🇷 '}
                  {lang === 'English' && '🇬🇧 '}
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Industry Field Filter */}
          <div>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              2. Target Industry / Professional Field:
            </span>
            <div className="flex flex-wrap gap-2">
              {fields.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedField(f)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedField === f
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Level Filter */}
          <div>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              3. CEFR Language Level:
            </span>
            <div className="flex flex-wrap gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
          <span>Showing <strong>{filteredCourses.length}</strong> accredited language tracks</span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheckIcon className="w-4 h-4" />
            Goethe, telc, DELE & British Council Compliant
          </span>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Pills */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{course.flag}</span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {course.field}
                    </span>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {course.levelTag}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {course.shortDesc}
                  </p>
                </div>

                {/* Target Industry Vocabulary Highlight Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300">
                    <span className="flex items-center gap-1.5">
                      <SparklesIcon className="w-3.5 h-3.5 text-yellow-400" />
                      Specialized {course.field} Terms:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.industryKeywords.map((word, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Course Specifications */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4 text-indigo-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AwardIcon className="w-4 h-4 text-amber-500" />
                    <span>CEFR {course.level} Certified</span>
                  </div>
                </div>
              </div>

              {/* Card Footer & Purchase Action */}
              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">€{course.price}</span>
                    <span className="text-xs text-slate-400 line-through">€{course.originalPrice}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    {course.spotsRemaining} cohort seats open
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnroll(course)}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Apply & Enroll</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Enrollment & Purchase Modal */}
      <CourseEnrollmentModal
        course={activeCourseToEnroll}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  );
};

export default Courses;
