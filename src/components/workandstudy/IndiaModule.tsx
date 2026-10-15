import React, { useState } from 'react';
import { INDIA_PROGRAMMES, type IndiaProgrammeCategory } from './data';
import {
  BuildingIcon,
  LaptopIcon,
  GlobeIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  AwardIcon,
} from '../common/Icons';

export const IndiaModule: React.FC = () => {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'BuildingIcon':
        return <BuildingIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'LaptopIcon':
        return <LaptopIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'GlobeIcon':
        return <GlobeIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'ShieldCheckIcon':
      default:
        return <ShieldCheckIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    }
  };

  const handleApplyClick = (programmeName: string) => {
    const el = document.getElementById('work-study-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Suggest program in studyField or targetDegree if applicable
      const select = document.querySelector('select[name="studyField"]') as HTMLSelectElement | null;
      if (select) {
        select.value = programmeName;
      }
    }
  };

  return (
    <section id="work-study-india" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
          <span>Module 01</span>
          <span>•</span>
          <span>Domestic Corporate Pathways</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Work & Study in India
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Build practical skills through structured training, corporate projects, and potential employment opportunities while preparing for further education or international career pathways.
        </p>
      </div>

      {/* 4 Programme Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INDIA_PROGRAMMES.map((cat: IndiaProgrammeCategory) => {
          const isOpen = Boolean(openAccordions[cat.id]);

          return (
            <div
              key={cat.id}
              className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center shrink-0">
                      {renderIcon(cat.iconName)}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                        {cat.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                        {cat.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cat.tagline}
                </p>

                {/* Compensation Chip */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Advertised Compensation:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                    {cat.compensationRange}
                  </span>
                </div>

                {/* Specialisations List */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Training Streams
                  </div>
                  <ul className="space-y-1.5">
                    {cat.specialisations.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions & Accordion */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleApplyClick(cat.name)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply for Programme</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleAccordion(cat.id)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    aria-expanded={isOpen}
                  >
                    <span>Terms</span>
                    <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Expandable Terms Accordion */}
                {isOpen && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 animate-fade-in">
                    <div className="font-bold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider">
                      Programme Conditions & Requirements:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {cat.termsAndConditions.map((tc, idx) => (
                        <li key={idx}>{tc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate Experience & Certification Section */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-indigo-900/20 border border-cyan-200/60 dark:border-cyan-800/60 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-600/20">
            <AwardIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Corporate Experience & Certification
            </h3>
            <span className="text-xs text-cyan-700 dark:text-cyan-300 font-semibold">
              Performance-Based Verification & Recommendation Portfolio
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Eligible participants may receive experience documentation, project records, or corporate recommendation letters based on the work completed and the programme's terms.
        </p>

        <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 italic">
          * Note: Advertised corporate certificates and partner letters correspond directly to verified project hours and deliverables completed under the partner corporate charter. Six months of skills training does not automatically constitute one year of corporate tenure.
        </div>
      </div>
    </section>
  );
};
