import React, { useState } from 'react';
import { Link } from 'react-router';
import type { StudentDashboardData } from '../../services/student';
import { ROUTES } from '../../routes/paths';
import {
  AwardIcon,
  SparklesIcon,
  BotIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '../common/Icons';

interface DashboardRewardsProps {
  rewards: StudentDashboardData['rewards'];
}

export const DashboardRewards: React.FC<DashboardRewardsProps> = ({ rewards }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Rewards Overview Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-amber-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-2">
              <AwardIcon className="w-3.5 h-3.5 text-yellow-200" />
              <span>ILA Global Student Rewards Club</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              {rewards.pointsBalance.toLocaleString()} Reward Points
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-lg leading-relaxed">
              You are currently on <strong className="text-white underline">{rewards.tier} Tier</strong>. Earn points for on-time class attendance, mock test scores, and visa document completeness.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <span className="text-xs font-mono text-white/80">
              Lifetime Earned: {rewards.pointsLifetime.toLocaleString()} pts
            </span>
            <Link
              to={ROUTES.REWARDS}
              className="px-5 py-2.5 rounded-xl bg-white text-amber-700 hover:bg-amber-50 text-xs sm:text-sm font-extrabold shadow-lg shadow-black/10 transition-all flex items-center gap-2"
            >
              <span>Explore Rewards Catalog</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Vouchers & Achievement Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vouchers & Perks */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AwardIcon className="w-5 h-5 text-amber-500" />
              <span>Redeemed Vouchers & Discounts</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {rewards.vouchers.length} Total
            </span>
          </div>

          <div className="space-y-3">
            {rewards.vouchers.map((voucher) => {
              const isActive = voucher.status === 'active';
              return (
                <div
                  key={voucher.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/70 dark:border-amber-800/50'
                      : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono">
                          {voucher.discount}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                          }`}
                        >
                          {voucher.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mt-1">
                        {voucher.title}
                      </h4>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Expires: {voucher.expiresAt} • Spent {voucher.pointsSpent} pts
                      </div>
                    </div>

                    {isActive && (
                      <button
                        type="button"
                        onClick={() => handleCopy(voucher.code)}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-colors cursor-pointer shrink-0"
                      >
                        {copiedCode === voucher.code ? 'Copied! ✓' : voucher.code}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Achievement Badges */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-indigo-500" />
              <span>Earned Milestone Badges</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {rewards.badges.length} Badges
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {rewards.badges.map((badge) => (
              <div
                key={badge.id}
                className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex flex-col items-center text-center space-y-2 hover:scale-[1.02] transition-transform"
              >
                <span className="text-3xl p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
                  {badge.icon}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {badge.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {badge.description}
                </p>
                <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold pt-1">
                  Earned {badge.earnedAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intelli-Coach AI Practice Sessions History */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <BotIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Intelli-Coach AI Mock Sessions & Interview Analytics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Past mock interview transcripts, readiness scores, and AI recommendations.
              </p>
            </div>
          </div>

          <Link
            to="/#intelli-coach"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <SparklesIcon className="w-3.5 h-3.5 text-yellow-300" />
            <span>Launch New Session</span>
          </Link>
        </div>

        <div className="space-y-3">
          {rewards.coachHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {item.topic}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.sessionDate}
                  </span>
                </div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Focus: {item.skillFocus}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic">
                  💡 Recommendation: "{item.keyRecommendation}"
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {item.confidenceScore}%
                  </div>
                  <div className="text-[10px] text-slate-400">Readiness Score</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
