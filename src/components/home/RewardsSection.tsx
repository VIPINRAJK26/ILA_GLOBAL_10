import React, { useState } from 'react';
import { 
  AwardIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  ZapIcon, 
  ArrowRightIcon 
} from '../common/Icons';

export const RewardsSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(3);

  const tiers = [
    { name: 'Silver Explorer', points: '0 – 2,500', perk: 'Free AI SOP Review & Basic Roadmaps', color: 'text-slate-300 border-slate-700 bg-slate-800/40' },
    { name: 'Gold Scholar', points: '2,501 – 5,000', perk: '50% Off 1-on-1 Consular Mock Interview', color: 'text-yellow-400 border-yellow-500/40 bg-yellow-950/20' },
    { name: 'Platinum Voyager', points: '5,001 – 10,000', perk: 'Free IELTS / German Test Voucher ($150 value)', color: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/20' },
    { name: 'Diamond Ambassador', points: '10,000+', perk: '$250 Cash Grant + Airport Transit Concierge', color: 'text-purple-300 border-purple-500/40 bg-purple-950/20' },
  ];

  const milestones = [
    { title: 'Create Profile & Verify Email', points: 500 },
    { title: 'Complete Intelli Coach Profile Assessment', points: 1000 },
    { title: 'Upload Transcripts for University Matching', points: 1500 },
    { title: 'Submit University Application via ILA', points: 3000 },
    { title: 'Refer a Friend who Enrolls', points: 2500 },
    { title: 'Visa Grant Milestone Bonus', points: 5000 },
  ];

  const totalPoints = milestones.slice(0, selectedMilestone + 1).reduce((acc, curr) => acc + curr.points, 0);

  return (
    <section id="rewards-section" className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-white relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 text-yellow-800 dark:text-yellow-300 text-xs sm:text-sm font-semibold mb-3 shadow-sm dark:shadow-none">
            <AwardIcon className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
            <span>ILA Rewards & Loyalty Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Earn Valuable Perks as You Achieve Every Milestone
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Your educational and career efforts should be rewarded. With the <strong className="text-yellow-700 dark:text-yellow-300 font-semibold">ILA Rewards Program</strong>, every action from taking test prep to receiving your visa grants points you can redeem for discounts, vouchers, and cash grants.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${tier.color} flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-slate-900/60 shadow-sm dark:shadow-none`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tier {idx + 1}</span>
                  <AwardIcon className="w-4 h-4 text-amber-500" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">{tier.name}</h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">{tier.points} Points</div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {tier.perk}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Automatic Tier Unlock</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Points Calculator */}
        <div className="mt-12 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-yellow-500/30 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left milestones check list */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ZapIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                  Select your current progress to calculate points:
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tap a milestone to see your accumulated points & rewards</p>
              </div>

              <div className="space-y-2">
                {milestones.map((m, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedMilestone(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                      idx <= selectedMilestone
                        ? 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-500/50 text-slate-900 dark:text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        idx <= selectedMilestone ? 'bg-yellow-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-500'
                      }`}>
                        {idx <= selectedMilestone ? '✓' : idx + 1}
                      </span>
                      <span className="font-medium text-left">{m.title}</span>
                    </div>
                    <span className="font-mono font-bold text-yellow-600 dark:text-yellow-400 shrink-0">+{m.points} pts</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Rewards Value preview */}
            <div className="lg:col-span-5 bg-gradient-to-br from-yellow-50 dark:from-yellow-950/40 via-white dark:via-slate-900 to-amber-50 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-500/40 rounded-2xl p-6 text-center space-y-4 shadow-sm dark:shadow-none">
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
                Calculated Points Balance
              </span>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono">
                {totalPoints.toLocaleString()} <span className="text-lg text-yellow-600 dark:text-yellow-400 font-sans">Points</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You qualify for: <strong className="text-yellow-700 dark:text-yellow-300">
                  {totalPoints >= 10000 ? 'Diamond Tier Benefits' : totalPoints >= 5000 ? 'Platinum Voucher Tier' : totalPoints >= 2500 ? 'Gold Scholar Perks' : 'Silver Explorer Tier'}
                </strong>
              </p>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-left space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <SparklesIcon className="w-3.5 h-3.5" />
                  <span>Instant Redemption Ready:</span>
                </div>
                <div>• Redeem for up to ${(totalPoints / 25).toFixed(0)} off visa documentation fees</div>
                <div>• Or claim free 1-on-1 advisor strategy call</div>
              </div>

              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 cursor-pointer"
              >
                <span>Activate Rewards Account</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
