import React from 'react';
import { Link } from 'react-router';
import { BriefcaseIcon, BotIcon, AwardIcon } from '../components/common/Icons';
import { ROUTES } from '../routes/paths';

const JobsAndCareers: React.FC = () => {
  const jobRoles = [
    { title: 'Software Engineering & Cloud', avgSalary: '€65,000 – €95,000 / yr', locations: 'Berlin, Munich, Dublin, Amsterdam', sponsor: 'Full Visa Sponsorship' },
    { title: 'Healthcare & Registered Nursing', avgSalary: '€42,000 – €60,000 / yr', locations: 'Germany, UK, Ireland', sponsor: 'Fast-Track Recognition' },
    { title: 'Data Analytics & AI Engineering', avgSalary: '€60,000 – €88,000 / yr', locations: 'Frankfurt, London, Toronto', sponsor: 'Full Visa Sponsorship' },
    { title: 'Mechanical & Automotive Engineers', avgSalary: '€55,000 – €82,000 / yr', locations: 'Stuttgart, Munich, Hamburg', sponsor: 'Blue Card Track' },
  ];

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold">
            <BriefcaseIcon className="w-4 h-4 text-rose-500 dark:text-rose-400" />
            <span>International Employment Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Jobs and Careers <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">with Visa Sponsorship</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Turn your qualifications into premier international employment. Connect with 1,200+ vetted global hiring partners in Europe, the UK, and North America offering verified work visa sponsorships.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/#intelli-coach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/20"
            >
              <BotIcon className="w-4 h-4" />
              <span>Optimize Resume with ATS AI</span>
            </Link>
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

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
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{role.title}</h3>
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <div><strong>Benchmark Salary:</strong> <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{role.avgSalary}</span></div>
                  <div><strong>Hub Cities:</strong> {role.locations}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Europass & ATS Format Supported</span>
                <Link to="/#intelli-coach" className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline">
                  Match Openings →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsAndCareers;