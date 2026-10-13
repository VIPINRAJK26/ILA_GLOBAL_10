import React from 'react';
import { Link } from 'react-router';
import { BriefcaseIcon, BotIcon } from '../components/common/Icons';
import { WorkAndStudySpotlight } from '../components/home/WorkAndStudySpotlight';
import { ROUTES } from '../routes/paths';

const WorkAndStudy: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white space-y-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-semibold">
            <BriefcaseIcon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>Dual-Track Academic & Income Model</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Work and Study <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Programs</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Graduate without financial burdens. Our dual-track blueprints combine international degrees with legal part-time student contracts, co-op semesters, and guaranteed hourly wages (€14–€24/hr).
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/#eligibility-checker"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/20"
            >
              <BotIcon className="w-4 h-4" />
              <span>Calculate Student Budget</span>
            </Link>
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Embedded Interactive Country Spotlight */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/40 shadow-sm dark:shadow-none">
          <WorkAndStudySpotlight />
        </div>
      </div>
    </div>
  );
};

export default WorkAndStudy;