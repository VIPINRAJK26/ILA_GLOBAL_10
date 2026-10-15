import React, { useState } from 'react';
import { ABROAD_OPPORTUNITIES, type AbroadOpportunity } from './data';
import {
  GlobeIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
} from '../common/Icons';

export const AbroadModule: React.FC = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleRegisterInterest = (title: string) => {
    const el = document.getElementById('work-study-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const select = document.querySelector('select[name="studyField"]') as HTMLSelectElement | null;
      if (select) {
        select.value = `Work & Study Abroad: ${title}`;
      }
    }
  };

  return (
    <section id="work-study-abroad" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <span>Module 02</span>
          <span>•</span>
          <span>International Student Opportunities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Work & Study Abroad
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Explore student-support assignments and eligible part-time opportunities in Germany and other European locations while pursuing your studies.
        </p>
      </div>

      {/* 5 Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ABROAD_OPPORTUNITIES.map((opp: AbroadOpportunity, idx: number) => {
          return (
            <div
              key={opp.id}
              className={`rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-md transition-all flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1 ring-1 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20' : ''
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {opp.opportunityType}
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                    <GlobeIcon className="w-3.5 h-3.5" />
                    <span>EU</span>
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                  {opp.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {opp.description}
                </p>

                {/* Specific Indicative Earning Range if applicable */}
                {opp.earningRange && (
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs">
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold block">
                      {opp.earningRange}
                    </span>
                    <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5 block">
                      Per confirmed airport arrival & handover protocol
                    </span>
                  </div>
                )}

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Location:</span>
                    <span>{opp.location}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">Eligibility:</span>
                    <span className="leading-tight">{opp.eligibilityNotes}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleRegisterInterest(opp.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Register Interest</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Section: How Assignments, Verification, and Payments Work */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-4">
        <button
          type="button"
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={showHowItWorks}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ClockIcon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                How Assignments, Verification & Payments Work
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Learn about allocation protocol, statutory student work limits, and payment schedules.
              </p>
            </div>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
              showHowItWorks ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showHowItWorks && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300 animate-fade-in">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">1. Opportunity Allocation</div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Eligible students in Germany or the EU are matched with assignments based on proximity, city registration, and language skills.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">2. Delivery & Quality Audit</div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Completed airport handovers or digital hours are digitally verified by the coordinating desk before sign-off.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">3. Compliance & Payout</div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                All opportunities are coordinated strictly under German statutory limits (e.g., 140 full days or 280 half days per calendar year).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Unobtrusive Disclaimer Note */}
      <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-3">
        <ShieldCheckIcon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Legal Disclaimer:</strong> Opportunities are subject to availability, selection, individual eligibility, and applicable local laws. International students must independently satisfy the work conditions applicable to their residence status. No earning amount or assignment is guaranteed.
        </p>
      </div>
    </section>
  );
};
