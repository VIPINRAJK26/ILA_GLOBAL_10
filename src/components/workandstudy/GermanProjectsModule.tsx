import React from 'react';
import { GERMAN_PROJECTS, type GermanProject } from './data';
import {
  LaptopIcon,
  GlobeIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '../common/Icons';

export const GermanProjectsModule: React.FC = () => {
  const handleApplyProject = (projectName: string) => {
    const el = document.getElementById('work-study-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const select = document.querySelector('select[name="studyField"]') as HTMLSelectElement | null;
      if (select) {
        select.value = `German Project: ${projectName}`;
      }
    }
  };

  const getIndustryIcon = (industry: string) => {
    if (industry.includes('Clean Energy')) {
      return <ShieldCheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
    if (industry.includes('Supply Chain')) {
      return <GlobeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
    if (industry.includes('Software')) {
      return <LaptopIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    }
    return <SparklesIcon className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
  };

  return (
    <section id="german-onboarding" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-semibold">
          <span>Module 03</span>
          <span>•</span>
          <span>Targeted Industry Preparation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          German Onboarding Projects
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Develop practical, industry-relevant experience through technical, commercial, and healthcare-related projects aligned with international career goals.
        </p>
      </div>

      {/* 4 Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GERMAN_PROJECTS.map((proj: GermanProject) => {
          return (
            <div
              key={proj.id}
              className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:border-purple-400 dark:hover:border-purple-500/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Pathway Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {proj.pathwayLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    🇩🇪 Focus
                  </span>
                </div>

                {/* Title & Industry */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center shrink-0">
                    {getIndustryIcon(proj.industry)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                      {proj.title}
                    </h3>
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                      {proj.industry}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                {/* Key Topics Tags */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Curriculum & Practical Pillars:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Direction & Selection Criteria */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Target Career Direction:
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 block">
                      {proj.careerDirection}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Selection Criteria: </span>
                    {proj.selectionCriteria}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleApplyProject(proj.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Apply for Project Onboarding</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regulatory Context Callout */}
      <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        * <strong>Admissions & Sponsorship Transparency:</strong> All international employer placements, licensing assessments (Anerkennung), and immigration pathways depend upon verified partner openings, consular clearance, and individual student eligibility.
      </div>
    </section>
  );
};
