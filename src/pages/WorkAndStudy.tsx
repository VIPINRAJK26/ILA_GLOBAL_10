import React from "react";
import {
  BriefcaseIcon,
  GlobeIcon,
  ShieldCheckIcon,
  AwardIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "../components/common/Icons";
import { IndiaModule } from "../components/workandstudy/IndiaModule";
import { AbroadModule } from "../components/workandstudy/AbroadModule";
import { GermanProjectsModule } from "../components/workandstudy/GermanProjectsModule";
import { RewardsModule } from "../components/workandstudy/RewardsModule";
import { PlanCalculator } from "../components/workandstudy/PlanCalculator";
import { PageEnquiryForm } from "../components/common/PageEnquiryForm";

export const WorkAndStudy: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const steps = [
    {
      num: "01",
      title: "Explore",
      desc: "Find a programme track that matches your technical, commercial, or language goals.",
    },
    {
      num: "02",
      title: "Apply",
      desc: "Review prerequisites and submit your background details for initial advisory screening.",
    },
    {
      num: "03",
      title: "Participate",
      desc: "Engage in structured curriculum, hands-on tasks, or approved student support assignments.",
    },
    {
      num: "04",
      title: "Progress",
      desc: "Accumulate verified credentials, performance documentation, and eligible rewards.",
    },
  ];

  const shortcuts = [
    {
      label: "Work & Study in India",
      targetId: "work-study-india",
      icon: BriefcaseIcon,
    },
    {
      label: "Work & Study Abroad",
      targetId: "work-study-abroad",
      icon: GlobeIcon,
    },
    {
      label: "German Onboarding Projects",
      targetId: "german-onboarding",
      icon: ShieldCheckIcon,
    },
    { label: "Rewards & Study", targetId: "rewards-study", icon: AwardIcon },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Section A — Hero Full Screen Banner in the Background */}
      <section className="relative w-full min-h-[500px] sm:min-h-[580px] flex items-center overflow-hidden bg-slate-950 text-white select-none py-14 sm:py-20 lg:py-24">
        {/* Full-width Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
            alt="International students working together on laptops in modern European workplace"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Multi-stage Vignette Gradients for Crystal Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40 sm:to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 z-10" />
          <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] z-10" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md text-xs sm:text-sm font-semibold text-slate-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                  CAREER MAXIM · DUAL-TRACK ADVANTAGE
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Learn. Work.{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Build Your Global Future.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Combine accredited European academics with paid student employment (Werkstudent & Co-op). Earn €14.00 – €24.00/hour while completing your degree and accumulating verified multinational work experience.
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => scrollToSection("work-study-india")}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-600/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                >
                  <span>Explore Opportunities</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("how-it-works")}
                  className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-md transition-colors cursor-pointer"
                >
                  <span>How It Works</span>
                </button>
              </div>

              {/* Proof Points */}
              <div className="pt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-300 border-t border-slate-800">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Legal 140 Full Days / 20 hrs Work Rights
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  €14 – €24/hr Average Hourly Wage
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  18-36 Month Post-Study Work Visas & PR
                </span>
              </div>
            </div>

            {/* Right Frosted Glass Stat Card */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    {/* <SparklesIcon className="w-3.5 h-3.5 text-cyan-400" /> */}
                    Student Financial Autonomy
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    Dual-Track
                  </span>
                </div>

                <div className="py-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent font-mono">
                    €1,400+
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    Average Monthly Student Pay
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <BriefcaseIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Werkstudent & Co-op Rules</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Finance 100% of your student living expenses while accumulating verified international work experience.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="text-slate-300 font-mono text-[11px]">Germany · Canada · Europe</span>
                  <span className="text-cyan-400 font-semibold text-[11px]">✦ Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Programme Shortcuts Bar */}
          <div className="pt-6 border-t border-slate-800/80">
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
                    className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-400/80 hover:bg-slate-800/90 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold backdrop-blur-md cursor-pointer shadow-sm"
                  >
                    <Icon className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span className="truncate">{sc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20">

        {/* Section B — How It Works */}
        <section
          id="how-it-works"
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8 scroll-mt-24"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Clear Four-Step Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              How the Programme Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              From initial qualification to hands-on delivery and documentation,
              our structured milestones ensure transparent progression.
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
              Submit your academic background and chosen programme to receive
              personalized counselor guidance.
            </p>
          </div>
          <PageEnquiryForm pageType="work-and-study" />
        </section>
      </div>
    </div>
  );
};

export default WorkAndStudy;
