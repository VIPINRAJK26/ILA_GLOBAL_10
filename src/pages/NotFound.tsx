import React from 'react';
import { Link } from 'react-router';
import { BotIcon, ArrowRightIcon, GlobeIcon, SparklesIcon } from '../components/common/Icons';
import { ROUTES } from '../routes/paths';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 sm:py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            404
          </div>
          <div className="absolute -top-2 -right-4">
            <SparklesIcon className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The global destination or page you are looking for doesn't exist or has moved. Let Intelli Coach guide you back to safety.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-600/30"
          >
            <GlobeIcon className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/#intelli-coach"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-sm font-medium transition-colors"
          >
            <BotIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>Ask Intelli Coach</span>
            <ArrowRightIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-900 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
          <Link to={ROUTES.VISA_SERVICES} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white transition-colors">
            → Visa Services
          </Link>
          <Link to={ROUTES.WORK_AND_STUDY} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white transition-colors">
            → Work & Study
          </Link>
          <Link to={ROUTES.STUDY_ABROAD} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white transition-colors">
            → Study Abroad
          </Link>
          <Link to={ROUTES.JOBS_AND_CAREERS} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white transition-colors">
            → Jobs & Careers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
