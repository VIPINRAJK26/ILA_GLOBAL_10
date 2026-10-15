import React from 'react';
import { REWARD_INCENTIVES, type RewardIncentive } from './data';
import {
  AwardIcon,
  LaptopIcon,
  GlobeIcon,
  BriefcaseIcon,
  UserIcon,
  GraduationCapIcon,
} from '../common/Icons';

export const RewardsModule: React.FC = () => {
  const renderIncentiveIcon = (icon: string) => {
    switch (icon) {
      case 'LaptopIcon':
        return <LaptopIcon className="w-5 h-5 text-indigo-500" />;
      case 'GlobeIcon':
        return <GlobeIcon className="w-5 h-5 text-cyan-500" />;
      case 'BriefcaseIcon':
        return <BriefcaseIcon className="w-5 h-5 text-emerald-500" />;
      case 'UserIcon':
        return <UserIcon className="w-5 h-5 text-purple-500" />;
      case 'GraduationCapIcon':
        return <GraduationCapIcon className="w-5 h-5 text-rose-500" />;
      case 'AwardIcon':
      default:
        return <AwardIcon className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="rewards-study" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <span>Module 04</span>
          <span>•</span>
          <span>Incentive & Advancement Framework</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Rewards That Support Your Progress
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Eligible participants may unlock incentives through learning milestones, verified project work, and programme participation.
        </p>
      </div>

      {/* 6 Incentive Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REWARD_INCENTIVES.map((item: RewardIncentive) => {
          return (
            <div
              key={item.id}
              className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:border-amber-400 dark:hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center">
                    {renderIncentiveIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                  Eligibility Criteria:
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {item.eligibilityDetails}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
