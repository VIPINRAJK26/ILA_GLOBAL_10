import React from 'react';
import { Link } from 'react-router';
import { GlobeIcon, CheckCircleIcon, BotIcon } from '../components/common/Icons';
import { ROUTES } from '../routes/paths';

const StudyAbroad: React.FC = () => {
  const destinations = [
    { country: 'Germany', flag: '🇩🇪', highlight: 'Tuition-Free Universities', tuition: '€0 / semester', intake: 'Winter & Summer' },
    { country: 'Canada', flag: '🇨🇦', highlight: 'Co-op + 3-Year PGWP', tuition: 'CAD 16k–30k / yr', intake: 'Fall & Winter' },
    { country: 'United Kingdom', flag: '🇬🇧', highlight: '1-Year Fast Masters', tuition: '£13k–24k / yr', intake: 'Sept & Jan' },
    { country: 'United States', flag: '🇺🇸', highlight: '3-Year STEM OPT', tuition: '$20k–45k / yr', intake: 'Fall & Spring' },
    { country: 'Ireland', flag: '🇮🇪', highlight: 'European Silicon Valley', tuition: '€11k–22k / yr', intake: 'Sept & Jan' },
    { country: 'Australia', flag: '🇦🇺', highlight: 'High Min Wage + Regional PR', tuition: 'AUD 22k–40k / yr', intake: 'Feb & July' },
  ];

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold">
            <GlobeIcon className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            <span>Global Academic Horizons</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Study Abroad <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Admissions & Scholarships</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Gain direct admission into top-ranked global universities with guaranteed scholarship guidance (DAAD, Erasmus+, merit grants) and full consular compliance.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/#intelli-coach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/20"
            >
              <BotIcon className="w-4 h-4" />
              <span>Match My Universities with AI</span>
            </Link>
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500/40 shadow-md dark:shadow-none transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{dest.flag}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 font-bold">
                    {dest.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{dest.country}</h3>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mt-3">
                  <div><strong>Tuition Scale:</strong> {dest.tuition}</div>
                  <div><strong>Key Intakes:</strong> {dest.intake}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircleIcon className="w-3.5 h-3.5" /> Direct Partner
                </span>
                <Link to="/#intelli-coach" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Explore Programs →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyAbroad;