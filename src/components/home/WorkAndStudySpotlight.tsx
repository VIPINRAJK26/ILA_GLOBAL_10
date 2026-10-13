import React, { useState } from 'react';
import { 
  BriefcaseIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  SparklesIcon
} from '../common/Icons';

export const WorkAndStudySpotlight: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<'germany' | 'canada' | 'uk' | 'ireland'>('germany');

  const countryData = {
    germany: {
      name: 'Germany',
      flag: '🇩🇪',
      tuition: '€0 / semester (Free at Public Universities)',
      workHours: '140 full days (or 280 half days) per year',
      averageWage: '€14.00 – €22.00 / hour',
      popularStudentJobs: ['Werkstudent in Tech / Engineering', 'Research Assistant (HiWi)', 'English Tutor', 'Logistics & Retail'],
      postStudyVisa: '18-month Job Seeker Visa with easy PR transition',
      intelliInsight: 'Germany is the #1 choice for zero-tuition STEM degrees. Earning €1,000–€1,400/month covers 100% of your student living costs!'
    },
    canada: {
      name: 'Canada',
      flag: '🇨🇦',
      tuition: 'CAD 16,000 – 32,000 / year',
      workHours: 'Up to 24 hours / week off-campus during term',
      averageWage: 'CAD 17.50 – 25.00 / hour',
      popularStudentJobs: ['Campus Co-op Placements', 'Customer Operations', 'Tech QA Internships', 'Barista & Hospitality'],
      postStudyVisa: 'Up to 3-year Post-Graduation Work Permit (PGWP)',
      intelliInsight: 'Co-op programs in Canada integrate paid 4-month internships directly into your curriculum, leading directly to permanent residency.'
    },
    uk: {
      name: 'United Kingdom',
      flag: '🇬🇧',
      tuition: '£13,000 – 26,000 / year (1-Year Fast Masters)',
      workHours: 'Up to 20 hours / week during term-time',
      averageWage: '£11.44 – £18.00 / hour',
      popularStudentJobs: ['University Brand Ambassador', 'Retail & Events Assistant', 'Junior Developer Co-op', 'Healthcare Support'],
      postStudyVisa: '2-Year Graduate Route Visa without employer sponsorship needed',
      intelliInsight: '1-year UK Master’s programs reduce living duration costs, followed immediately by 2 full years of unrestricted work rights.'
    },
    ireland: {
      name: 'Ireland',
      flag: '🇮🇪',
      tuition: '€11,000 – 22,000 / year',
      workHours: '20 hrs/week (term) & 40 hrs/week (holidays)',
      averageWage: '€12.70 – €20.00 / hour',
      popularStudentJobs: ['Tech Support & Data Entry in Silicon Docks', 'Hospitality', 'Retail Associate', 'Academic Peer Tutor'],
      postStudyVisa: '2-Year Third Level Graduate Scheme (Stamp 1G)',
      intelliInsight: 'European Tech Hub! Dublin houses the European headquarters of Google, Meta, and Apple with abundant entry-level tech roles.'
    }
  };

  const active = countryData[selectedCountry];

  return (
    <section id="work-study-spotlight" className="py-12 sm:py-20 bg-slate-100/70 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-white relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-semibold mb-3 shadow-sm dark:shadow-none">
            <BriefcaseIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Dual-Advantage Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Work and Study + Study Abroad in Harmony
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Why choose between gaining global academic prestige and earning real income? With our synchronized Work & Study roadmaps, you graduate debt-free with international work experience on your CV.
          </p>
        </div>

        {/* Country Selector Tabs */}
        <div className="mt-8 flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {(['germany', 'canada', 'uk', 'ireland'] as const).map((key) => {
            const c = countryData[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCountry(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCountry === key
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 scale-105'
                    : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Country Breakdown Card */}
        <div className="mt-8 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left summary */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{active.flag}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {active.name} Work & Study Blueprint
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Verified official student visa regulations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tuition Overview</div>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">{active.tuition}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Permitted Working Hours</div>
                  <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mt-1">{active.workHours}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hourly Earnings</div>
                  <div className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-1">{active.averageWage}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Post-Study Work Visa</div>
                  <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">{active.postStudyVisa}</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Top Student Roles in {active.name}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.popularStudentJobs.map((job, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-medium"
                    >
                      ✓ {job}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Intelli Coach Note */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50 dark:from-indigo-950/60 via-white dark:via-slate-900 to-cyan-50 dark:to-cyan-950/40 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <SparklesIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Intelli Coach Strategic Analysis</div>
                  <div className="text-[11px] text-indigo-600 dark:text-indigo-300">Cost-Benefit Calculation</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                "{active.intelliInsight}"
              </p>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Personalized bank blocked-account calculation included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Resume tailored to local employment standards</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Calculate My Study-Work Budget</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
