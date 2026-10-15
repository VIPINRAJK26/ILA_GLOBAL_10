import React from 'react';
import { Link } from 'react-router';
import type { StudentDashboardData } from '../../services/student';
import {
  SparklesIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  AwardIcon,
  BotIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '../common/Icons';

interface DashboardOverviewProps {
  data: StudentDashboardData;
  onTabChange: (tabId: string) => void;
  onToggleActivity: (activityId: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  data,
  onTabChange,
  onToggleActivity,
}) => {
  const { profile, enrolledCourses, activities, applications, rewards, documents } = data;
  const activeCourse = enrolledCourses.find((c) => c.status === 'active') || enrolledCourses[0];
  const primaryApplication = applications[0];
  const verifiedDocsCount = documents.filter((d) => d.status === 'verified').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Courses */}
        <div
          onClick={() => onTabChange('courses')}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Active Courses
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpenIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {enrolledCourses.filter((c) => c.status === 'active').length}
            </span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {activeCourse?.level || 'B1'} Target
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 truncate">
            {activeCourse?.title || 'German Intensive'}
          </div>
        </div>

        {/* Attendance Streak */}
        <div
          onClick={() => onTabChange('courses')}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Class Attendance
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircleIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {activeCourse?.attendancePercent || 94}%
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              High
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {activeCourse?.attendedClasses || 25} of {activeCourse?.totalClasses || 36} attended
          </div>
        </div>

        {/* Visa & Dossier Status */}
        <div
          onClick={() => onTabChange('applications')}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Visa Filing
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheckIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white capitalize truncate">
              {primaryApplication?.status === 'under_review' ? 'In Review' : 'Active'}
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              Step 3/5
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 truncate">
            {primaryApplication?.country} {primaryApplication?.flag} • VFS Docket
          </div>
        </div>

        {/* Rewards & Points */}
        <div
          onClick={() => onTabChange('rewards')}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Rewards Balance
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AwardIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {rewards.pointsBalance.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              Pts ({rewards.tier})
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {rewards.vouchers.filter((v) => v.status === 'active').length} active voucher available
          </div>
        </div>
      </div>

      {/* Main Focus Row: Upcoming Class & Live Action Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Live Class Focus */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-7 relative overflow-hidden border border-indigo-800/40 shadow-xl shadow-indigo-950/20">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-20 -mb-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next Scheduled Lesson</span>
              </div>
              <span className="text-xs font-mono text-indigo-200/80 bg-indigo-900/40 px-2.5 py-1 rounded-lg border border-indigo-700/50">
                Batch: {activeCourse?.batchSchedule}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-2xl font-black">
                <span>{activeCourse?.flag}</span>
                <span>{activeCourse?.title}</span>
              </div>
              <p className="text-sm text-indigo-200/90 mt-2 max-w-xl">
                Current Focus: <span className="text-white font-semibold">{activeCourse?.syllabusCovered}</span>
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-indigo-300">
                <span>Instructor: <strong className="text-white">{activeCourse?.instructorName}</strong></span>
                <span>•</span>
                <span>Materials: <strong className="text-white">{activeCourse?.materialsCount} documents</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {activeCourse?.meetingLink ? (
                <a
                  href={activeCourse.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Join Live Lecture Room</span>
                </a>
              ) : null}

              <button
                type="button"
                onClick={() => onTabChange('courses')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors border border-white/10"
              >
                View Full Syllabus
              </button>
            </div>
          </div>
        </div>

        {/* Intelli-Coach AI Quick Launch Card */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 dark:from-purple-950/30 dark:via-pink-950/20 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800/50 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
              <BotIcon className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-3">
              Intelli-Coach AI Tutor
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Practice Germany consular questions, grammar patterns, or run instant visa mock interviews tailored to {profile.destination}.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-purple-600 dark:text-purple-400">Last Interview Score</span>
              <span className="text-slate-900 dark:text-white font-mono">88% Readiness</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              "Great defense on university financial backing; refine course rationale."
            </p>
          </div>

          <Link
            to="/#intelli-coach"
            className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold text-center shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
          >
            <SparklesIcon className="w-3.5 h-3.5 text-yellow-300" />
            <span>Launch AI Mock Session</span>
          </Link>
        </div>
      </div>

      {/* Two Column Grid: Interactive Action Checklist & Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Action Checklist */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Action Checklist & Tasks
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Click tasks to toggle your completed preparation steps
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-bold">
              {activities.filter((a) => a.status === 'completed').length} / {activities.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {activities.map((act) => {
              const isDone = act.status === 'completed';
              return (
                <div
                  key={act.id}
                  onClick={() => onToggleActivity(act.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-75'
                      : 'bg-white dark:bg-slate-850 border-indigo-100 dark:border-indigo-950 hover:border-indigo-300 dark:hover:border-indigo-800 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    aria-label="Toggle task"
                    className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500'
                    }`}
                  >
                    {isDone && <CheckCircleIcon className="w-3.5 h-3.5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-xs font-bold truncate ${
                          isDone
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {act.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                        {act.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Stage & Document Readiness */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Filing Readiness & Dossier
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target: {profile.destination} • {primaryApplication?.referenceNumber}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onTabChange('applications')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Full Details</span>
              <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>

          {/* Stepper Preview */}
          <div className="space-y-3">
            {primaryApplication?.steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    step.status === 'completed'
                      ? 'bg-emerald-500 text-white'
                      : step.status === 'current'
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {step.status === 'completed' ? '✓' : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold truncate ${
                        step.status === 'completed'
                          ? 'text-slate-800 dark:text-slate-200'
                          : step.status === 'current'
                          ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {step.name}
                    </span>
                    {step.date && (
                      <span className="text-[10px] text-slate-400 shrink-0">{step.date}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Document Locker Quick Summary */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
              <span>
                <strong>{verifiedDocsCount}</strong> of <strong>{documents.length}</strong> core documents verified
              </span>
            </div>
            <button
              type="button"
              onClick={() => onTabChange('profile')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Document Locker →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
