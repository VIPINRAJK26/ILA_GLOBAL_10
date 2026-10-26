import React from "react";
import {
  AwardIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "../components/common/Icons";
import { RewardsSection } from "../components/home/RewardsSection";
import { PageEnquiryForm } from "../components/common/PageEnquiryForm";

const Rewards: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header Hero Section - Full Screen Banner in the Background */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] flex items-center overflow-hidden bg-slate-950 text-white select-none py-14 sm:py-20 lg:py-24">
        {/* Full-width Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop"
            alt="Students celebrating graduation milestones and scholarship awards"
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
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-bold">
                  ILA Loyalty & Rewards Program • Student Grant Vault
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Rewards &{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Milestone Grants
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Every academic milestone and application progress earns points. Redeem them for official language test vouchers (Goethe/IELTS), consular filing subsidies, flight rebates, and student cash bonuses.
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("rewards-catalog");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/30 transition-all cursor-pointer hover:scale-102 active:scale-98"
                >
                  <span>Explore Rewards Catalog</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("rewards-enquiry");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-md transition-colors cursor-pointer"
                >
                  <span>Claim Milestone Grant</span>
                </button>
              </div>

              {/* Proof Points */}
              <div className="pt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-300 border-t border-slate-800">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  1 Point = €1 Official Redemption Value
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Up to €1,500 in Student Grants
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Instant Test Voucher Codes
                </span>
              </div>
            </div>

            {/* Right Frosted Glass Stat Card */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
                    Annual Grant Pool
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Guaranteed
                  </span>
                </div>

                <div className="py-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-mono">
                    €1,500+
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    Annual Cap per Active Student
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <AwardIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Automatic Point Accrual</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Earn points automatically as you clear CEFR levels, get offer letters, and submit visa applications.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="text-slate-300 font-mono text-[11px]">Goethe · Telc · IELTS · Cash</span>
                  <span className="text-amber-400 font-semibold text-[11px]">✦ Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">

        {/* Embedded Interactive Rewards Section */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/40 shadow-sm dark:shadow-none">
          <RewardsSection />
        </div>

        {/* Dedicated Rewards & Milestone Grant Claim Form */}
        <div id="rewards-enquiry" className="pt-4">
          <PageEnquiryForm pageType="rewards" />
        </div>
      </div>
    </div>
  );
};

export default Rewards;
