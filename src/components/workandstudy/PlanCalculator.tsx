import React, { useState } from 'react';
import {
  CALCULATOR_PROGRAMMES,
  CALCULATOR_DURATIONS,
  CALCULATOR_CONFIG,
  type CalculatorProgrammeType,
  type CalculatorDurationType,
} from './data';
import {
  BotIcon,
  ArrowRightIcon,
} from '../common/Icons';

export const PlanCalculator: React.FC = () => {
  const [selectedProgramme, setSelectedProgramme] = useState<CalculatorProgrammeType>(
    CALCULATOR_PROGRAMMES[0]
  );
  const [selectedDuration, setSelectedDuration] = useState<CalculatorDurationType>(
    CALCULATOR_DURATIONS[1]
  );

  const planSummary = CALCULATOR_CONFIG[selectedDuration];

  const handleEnquirePlan = () => {
    const el = document.getElementById('work-study-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const select = document.querySelector('select[name="studyField"]') as HTMLSelectElement | null;
      if (select) {
        select.value = `${selectedProgramme} (${selectedDuration})`;
      }
    }
  };

  return (
    <section id="plan-calculator" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <BotIcon className="w-4 h-4 text-indigo-500" />
          <span>Interactive Plan Configurator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Work-While-Learn Plan Calculator
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Configure your preferred learning pathway and programme duration to view applicable advertised stipends, course subsidies, and verified credential benefits.
        </p>
      </div>

      {/* Main Interactive Box */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-8">
        {/* Two Selectors Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input 1: Target Programme */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              1. Select Target Programme Track
            </label>
            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value as CalculatorProgrammeType)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {CALCULATOR_PROGRAMMES.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Combines language training, industry curriculum, and practical project tasks.
            </p>
          </div>

          {/* Input 2: Programme Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              2. Select Programme Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CALCULATOR_DURATIONS.map((dur) => {
                const isSelected = selectedDuration === dur;
                return (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setSelectedDuration(dur)}
                    className={`py-2.5 px-2 rounded-2xl text-xs font-bold transition-all text-center border cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25 scale-[1.02]'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <span>{dur.split(' ')[0]}</span>
                    <span className="block text-[10px] font-normal opacity-80 truncate">
                      {dur.split(' ').slice(1).join(' ')}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Determines project milestone milestones and documentation depth.
            </p>
          </div>
        </div>

        {/* Dynamic Plan Summary Output */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/40 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/60 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Configured Blueprint Summary
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {selectedProgramme}
              </h3>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">
              {selectedDuration}
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Potential Stipend */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Advertised Compensation
              </span>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {planSummary.advertisedStipend}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Performance-linked project stipend
              </div>
            </div>

            {/* Course Discount */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Course Subsidy
              </span>
              <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                {planSummary.courseDiscount}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Applicable on language or IELTS tuition
              </div>
            </div>

            {/* Experience Docs */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Experience Credentials
              </span>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {planSummary.experienceDocs}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Verified portfolio & recommendation
              </div>
            </div>

            {/* Reward Tier */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Incentive Tier
              </span>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {planSummary.rewardTier}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Milestone points & equipment perks
              </div>
            </div>
          </div>

          {/* Details & CTA Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Perks: </span>
              {planSummary.additionalPerks}
            </p>

            <button
              type="button"
              onClick={handleEnquirePlan}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Enquire About This Plan</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 italic text-center">
          * Note: Figures and percentages shown are advertised promotional benchmarks configured for planning reference. Actual compensation, subsidies, and credential issuance are subject to admission screening, verified assignment delivery, and published programme terms.
        </p>
      </div>
    </section>
  );
};
