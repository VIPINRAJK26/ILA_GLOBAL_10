import React from "react";
import { OverallEligibilityForm } from "../components/eligibility/OverallEligibilityForm";
import { PageEnquiryForm } from "../components/common/PageEnquiryForm";
import {
  ShieldCheckIcon,
  AwardIcon,
  CheckCircleIcon,
  BotIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "../components/common/Icons";

export const Eligibility: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 min-h-screen">
      {/* Header Hero Section - Full Screen Banner in the Background */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] flex items-center overflow-hidden bg-slate-950 text-white select-none py-14 sm:py-20 lg:py-24">
        {/* Full-width Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop"
            alt="Student analyzing academic qualification scores and international admission roadmap"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Multi-stage Vignette Gradients for Crystal Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40 sm:to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 z-10" />
          <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] z-10" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md text-xs sm:text-sm font-semibold text-slate-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                  ILA Universal Eligibility Engine • Statutory Matrix
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Global Pathway & Visa{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Eligibility Calculator
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Audit your consular visa points, tuition-free public university chances, dual-study wage potential, and required CEFR language cohort in 60 seconds with official immigration metrics.
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("eligibility-calculator-form");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer hover:scale-102 active:scale-98"
                >
                  <span>Start Instant Evaluation</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                <a
                  href="#counselor-audit"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/#intelli-coach";
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-md transition-colors"
                >
                  <SparklesIcon className="w-4 h-4 text-indigo-400" />
                  <span>Ask Intelli Coach AI</span>
                </a>
              </div>

              {/* Proof Points */}
              <div className="pt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-300 border-t border-slate-800">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Official German BMI & Anabin Standards
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Statutory 5-Point Chancenkarte Matrix
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Instant Consular Risk Audit
                </span>
              </div>
            </div>

            {/* Right Frosted Glass Stat Card */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <SparklesIcon className="w-3.5 h-3.5 text-indigo-400" />
                    Predictive Accuracy
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    60-Sec Audit
                  </span>
                </div>

                <div className="py-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
                    99.2%
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    Algorithmic Profile Match
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold">
                    <BotIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Statutory 5-Point Evaluation</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Zero guesswork before spending thousands on application deposits, blocked accounts, or language tests.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="text-slate-300 font-mono text-[11px]">Free University · Visa · Job</span>
                  <span className="text-indigo-400 font-semibold text-[11px]">✦ Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">

        {/* Main Overall Form */}
        <div id="eligibility-calculator-form" className="scroll-mt-20">
          <OverallEligibilityForm showHeroHeader={false} />
        </div>

        {/* Value Props & Assurances Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Official Consular Standards
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
              Audited against German Federal Ministry of the Interior (BMI),
              Anabin ZAB databases, and CEFR frameworks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <AwardIcon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Zero Guesswork Scoring
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
              Know your exact chances before spending thousands on application
              deposits, blocked accounts, or language tests.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              1:1 Counselor Backed
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
              Every automated score can be audited by our senior immigration
              advocates and admissions officers.
            </p>
          </div>
        </div>

        {/* Global Page Enquiry Form at bottom */}
        <div className="pt-6">
          <PageEnquiryForm
            pageType="visa"
            title="Need Personalized Document Audit or Appeals Assistance?"
            subtitle="Our legal advocates can review your academic transcripts, Anabin university rating, and CV for statutory compliance."
          />
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
