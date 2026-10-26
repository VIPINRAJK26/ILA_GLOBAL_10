import React from "react";
import { Link } from "react-router";
import {
  BriefcaseIcon,
  BotIcon,
  AwardIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "../components/common/Icons";
import { PageEnquiryForm } from "../components/common/PageEnquiryForm";

const JobsAndCareers: React.FC = () => {
  const jobRoles = [
    {
      title: "Software Engineering & Cloud",
      avgSalary: "€65,000 – €95,000 / yr",
      locations: "Berlin, Munich, Dublin, Amsterdam",
      sponsor: "Full Visa Sponsorship",
    },
    {
      title: "Healthcare & Registered Nursing",
      avgSalary: "€42,000 – €60,000 / yr",
      locations: "Germany, UK, Ireland",
      sponsor: "Fast-Track Recognition",
    },
    {
      title: "Data Analytics & AI Engineering",
      avgSalary: "€60,000 – €88,000 / yr",
      locations: "Frankfurt, London, Toronto",
      sponsor: "Full Visa Sponsorship",
    },
    {
      title: "Mechanical & Automotive Engineers",
      avgSalary: "€55,000 – €82,000 / yr",
      locations: "Stuttgart, Munich, Hamburg",
      sponsor: "Blue Card Track",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header Hero Section - Full Screen Banner in the Background */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] flex items-center overflow-hidden bg-slate-950 text-white select-none py-14 sm:py-20 lg:py-24">
        {/* Full-width Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop"
            alt="Confident international professional working in modern corporate European office"
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
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent font-bold">
                  International Employment Network • Direct Sponsor Matching
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Jobs and Careers{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  with Visa Sponsorship
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Turn your qualifications into premier international employment. Connect with 1,200+ vetted global hiring partners in Europe, the UK, and North America offering verified work visa sponsorships and fast-track EU Blue Cards.
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <Link
                  to="/#intelli-coach"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-600/30 cursor-pointer hover:scale-102 active:scale-98 transition-all"
                >
                  <BotIcon className="w-4 h-4" />
                  <span>Optimize Resume with ATS AI</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("careers-enquiry");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-md transition-colors cursor-pointer"
                >
                  <span>Apply for Career Placement</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Proof Points */}
              <div className="pt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-300 border-t border-slate-800">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  1,200+ Vetted Hiring Partners
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Full Work Visa Relocation Packages
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  EU Blue Card Fast-Track
                </span>
              </div>
            </div>

            {/* Right Frosted Glass Stat Card */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <SparklesIcon className="w-3.5 h-3.5 text-rose-400" />
                    Verified Global Compensation
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    Sponsorship
                  </span>
                </div>

                <div className="py-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent font-mono">
                    €65k – €95k
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    STEM Average Benchmark Salary
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-bold">
                    <BriefcaseIcon className="w-3.5 h-3.5 text-rose-400" />
                    <span>Direct Consular Work Visa</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Full relocation bonuses and legal visa filing supported by European corporate HR divisions.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="text-slate-300 font-mono text-[11px]">Berlin · Munich · London</span>
                  <span className="text-rose-400 font-semibold text-[11px]">✦ Sponsored</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobRoles.map((role, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-500/40 shadow-md dark:shadow-none transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 px-2.5 py-1 rounded-full">
                    {role.sponsor}
                  </span>
                  <AwardIcon className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {role.title}
                </h3>
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <div>
                    <strong>Benchmark Salary:</strong>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {role.avgSalary}
                    </span>
                  </div>
                  <div>
                    <strong>Hub Cities:</strong> {role.locations}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Europass & ATS Format Supported
                </span>
                <Link
                  to="/#intelli-coach"
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Match Openings →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Jobs & Career Sponsorship Enquiry Form */}
        <div id="jobs-enquiry" className="pt-4">
          <PageEnquiryForm pageType="jobs-and-careers" />
        </div>
      </div>
    </div>
  );
};

export default JobsAndCareers;
