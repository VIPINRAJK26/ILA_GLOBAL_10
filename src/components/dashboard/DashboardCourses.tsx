import React, { useState } from 'react';
import { Link } from 'react-router';
import type { EnrolledCourse } from '../../services/student';
import { ROUTES } from '../../routes/paths';
import {
  GraduationCapIcon,
} from '../common/Icons';

interface DashboardCoursesProps {
  courses: EnrolledCourse[];
}

export const DashboardCourses: React.FC<DashboardCoursesProps> = ({ courses }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    courses[0]?.id || ''
  );

  const filteredCourses = courses.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const selectedCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCapIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>My Enrolled Courses & Study Plans</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your CEFR language levels, attendance streak, lecture batches, and live classroom links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({courses.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'active'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Active ({courses.filter((c) => c.status === 'active').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'completed'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Completed ({courses.filter((c) => c.status === 'completed').length})
            </button>
          </div>

          <Link
            to={ROUTES.COURSES}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm shrink-0"
          >
            + Browse Catalog
          </Link>
        </div>
      </div>

      {/* Main Layout: Course List & Selected Course Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Course Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filteredCourses.map((course) => {
            const isSelected = course.id === selectedCourse?.id;
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                  isSelected
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-500/60 dark:border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
                      {course.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {course.courseCode}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            course.status === 'active'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                        {course.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Syllabus Progress</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {course.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.status === 'completed'
                          ? 'bg-emerald-500'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                      }`}
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate">Mentor: {course.instructorName}</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                    {course.attendancePercent}% Attendance
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed View for Selected Course */}
        {selectedCourse && (
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedCourse.flag}</span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    {selectedCourse.language} Language Track • CEFR {selectedCourse.level}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedCourse.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Schedule: <strong className="text-slate-700 dark:text-slate-300">{selectedCourse.batchSchedule}</strong>
                </p>
              </div>

              {selectedCourse.meetingLink && selectedCourse.status === 'active' && (
                <a
                  href={selectedCourse.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Launch Live Classroom</span>
                </a>
              )}
            </div>

            {/* CEFR Level Progression Track */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                CEFR Milestone Progression Track
              </h4>
              <div className="grid grid-cols-6 gap-2">
                {cefrLevels.map((lvl) => {
                  const currentIdx = cefrLevels.indexOf(selectedCourse.level);
                  const thisIdx = cefrLevels.indexOf(lvl);
                  const isDone = thisIdx < currentIdx;
                  const isCurrent = thisIdx === currentIdx;

                  return (
                    <div
                      key={lvl}
                      className={`p-3 rounded-2xl text-center border transition-all ${
                        isDone
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-400 font-bold'
                          : isCurrent
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25 font-black scale-105'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="text-xs sm:text-sm">{lvl}</div>
                      <div className="text-[9px] mt-0.5 truncate">
                        {isDone ? 'Cleared' : isCurrent ? 'Enrolled' : 'Target'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attendance & Class Ratio */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Classes Attended
                </span>
                <div className="mt-1 text-lg font-black text-slate-900 dark:text-white font-mono">
                  {selectedCourse.attendedClasses} / {selectedCourse.totalClasses}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
                  {selectedCourse.attendancePercent}% attendance rate
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Next Lecture
                </span>
                <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white truncate">
                  {selectedCourse.nextClassTime}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Instructor available 15m early
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Curriculum Module
                </span>
                <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white truncate">
                  {selectedCourse.syllabusCovered.split(':')[0]}
                </div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {selectedCourse.materialsCount} downloadable handouts
                </div>
              </div>
            </div>

            {/* Instructor Info & Study Materials */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-800/60 dark:to-indigo-950/20 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedCourse.instructorAvatar ? (
                  <img
                    src={selectedCourse.instructorAvatar}
                    alt={selectedCourse.instructorName}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {selectedCourse.instructorName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Course Lead & Certified Examiner</div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {selectedCourse.instructorName}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Downloading latest handouts for ${selectedCourse.title}...`)}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors shadow-sm cursor-pointer"
              >
                Download Materials ({selectedCourse.materialsCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
