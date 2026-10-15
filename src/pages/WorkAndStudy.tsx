import React from 'react';
import { Link } from 'react-router';
import {
  BriefcaseIcon,
  GlobeIcon,
  ShieldCheckIcon,
  AwardIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
} from '../components/common/Icons';
import { IndiaModule } from '../components/workandstudy/IndiaModule';
import { AbroadModule } from '../components/workandstudy/AbroadModule';
import { GermanProjectsModule } from '../components/workandstudy/GermanProjectsModule';
import { RewardsModule } from '../components/workandstudy/RewardsModule';
import { PlanCalculator } from '../components/workandstudy/PlanCalculator';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';
import { ROUTES } from '../routes/paths';

export const WorkAndStudy: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Explore',
      desc: 'Find a programme track that matches your technical, commercial, or language goals.',
    },
    {
      num: '02',
      title: 'Apply',
      desc: 'Review prerequisites and submit your background details for initial advisory screening.',
    },
    {
      num: '03',
      title: 'Participate',
      desc: 'Engage in structured curriculum, hands-on tasks, or approved student support assignments.',
    },
    {
      num: '04',
      title: 'Progress',
      desc: 'Accumulate verified credentials, performance documentation, and eligible rewards.',
    },
  ];

  const shortcuts = [
    { label: 'Work & Study in India', targetId: 'work-study-india', icon: BriefcaseIcon },
    { label: 'Work & Study Abroad', targetId: 'work-study-abroad', icon: GlobeIcon },
    { label: 'German Onboarding Projects', targetId: 'german-onboarding', icon: ShieldCheckIcon },
    { label: 'Rewards & Study', targetId: 'rewards-study', icon: AwardIcon },
  ];

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Section A — Hero */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <span>CAREER MAXIM · VERIFIED GLOBAL EXPERIENCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Learn. Work.{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Build Your Global Future.
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore practical training, domestic and international work opportunities, German career projects, and rewards designed to support your professional journey.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('work-study-india')}
              className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-600/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Opportunities</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <span>How It Works</span>
            </button>
          </div>

          {/* 4 Compact Navigation Links / Section Shortcuts */}
          <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Direct Programme Shortcuts
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {shortcuts.map((sc, i) => {
                const Icon = sc.icon;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToSection(sc.targetId)}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:bg-cyan-50/40 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all flex items-center justify-center gap-2 text-xs font-bold shadow-sm cursor-pointer"
                  >
                    <Icon className="w-4 h-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                    <span className="truncate">{sc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section B — How It Works */}
        <section id="how-it-works" className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Clear Four-Step Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              How the Programme Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              From initial qualification to hands-on delivery and documentation, our structured milestones ensure transparent progression.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 space-y-2 relative"
              >
                <div className="text-xs font-black font-mono px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 w-fit">
                  Step {st.num}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Module One — Work & Study in India */}
        <IndiaModule />

        {/* Module Two — Work & Study Abroad */}
        <AbroadModule />

        {/* Module Three — German Onboarding Projects */}
        <GermanProjectsModule />

        {/* Module Four — Rewards That Support Your Progress */}
        <RewardsModule />

        {/* Interactive Work-While-Learn Plan Calculator */}
        <PlanCalculator />

        {/* Dedicated Work & Study Student Enquiry Form */}
        <section id="work-study-enquiry" className="pt-6 scroll-mt-24">
          <div className="mb-4 text-center max-w-xl mx-auto">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Official Application Portal
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Apply or Enquire for Work & Study
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Submit your academic background and chosen programme to receive personalized counselor guidance.
            </p>
          </div>
          <PageEnquiryForm pageType="work-and-study" />
        </section>
      </div>
    </div>
  );
};

export default WorkAndStudy;