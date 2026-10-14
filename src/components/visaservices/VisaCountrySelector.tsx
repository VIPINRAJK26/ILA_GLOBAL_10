import React from 'react';
import type { VisaCountry } from '../../services/visa';
import { ShieldCheckIcon, ClockIcon } from '../common/Icons';

interface VisaCountrySelectorProps {
  countries: VisaCountry[];
  selectedCountry: VisaCountry | null;
  onSelectCountry: (country: VisaCountry) => void;
}

export const VisaCountrySelector: React.FC<VisaCountrySelectorProps> = ({
  countries,
  selectedCountry,
  onSelectCountry,
}) => {
  if (!countries || countries.length === 0) {
    return null;
  }

  const activeCountry = selectedCountry || countries[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">
            Step 1: Choose Destination Country
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Select Your Target Immigration & Study Destination
          </h2>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
          <span>{countries.length} Global Jurisdictions Available</span>
        </div>
      </div>

      {/* Country Pills / Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {countries.map((country) => {
          const isSelected = activeCountry.id === country.id;
          return (
            <button
              key={country.id}
              type="button"
              onClick={() => onSelectCountry(country)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              )}
              <div>
                <div className="text-2xl sm:text-3xl mb-1.5">{country.flag}</div>
                <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  {country.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {country.region}
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">
                  {country.visaTypes?.length || 0} tracks
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {country.overallApprovalRate}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Selected Country Banner Info */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="text-4xl">{activeCountry.flag}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                {activeCountry.name} Visa Tracks
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                {activeCountry.region}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                {activeCountry.currency}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
              {activeCountry.heroHeadline || activeCountry.summary}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <ClockIcon className="w-3.5 h-3.5 text-emerald-500" />
            <span>Avg. Processing: <strong>{activeCountry.averageProcessingTime}</strong></span>
          </div>
          <div className="hidden sm:block text-slate-400">•</div>
          <div className="text-slate-600 dark:text-slate-300">
            Approval: <strong className="text-emerald-600 dark:text-emerald-400">{activeCountry.overallApprovalRate}</strong>
          </div>
          {activeCountry.consularHotline && (
            <>
              <div className="hidden sm:block text-slate-400">•</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                ☎ {activeCountry.consularHotline}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
