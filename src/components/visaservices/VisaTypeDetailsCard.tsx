import React, { useState } from 'react';
import type { VisaType, VisaCountry } from '../../services/visa';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  BriefcaseIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  SparklesIcon, 
  FileTextIcon,
  ChevronDownIcon
} from '../common/Icons';

interface VisaTypeDetailsCardProps {
  visa: VisaType;
  country: VisaCountry;
  onApply: (visa: VisaType) => void;
}

export const VisaTypeDetailsCard: React.FC<VisaTypeDetailsCardProps> = ({
  visa,
  country,
  onApply,
}) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/40 shadow-sm hover:shadow-xl dark:shadow-none transition-all flex flex-col justify-between overflow-hidden group">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />

      <div className="p-6 sm:p-7 space-y-5">
        {/* Header Title & Badges */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
              {visa.officialCode}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {visa.badge}
              </span>
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {visa.approvalRate}
              </span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {visa.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {visa.shortDescription}
          </p>
        </div>

        {/* 4-Column Consular Spec Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
          {/* Processing Time */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] mb-1">
              <ClockIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>Processing Time</span>
            </div>
            <div className="font-bold text-slate-900 dark:text-white truncate">
              {visa.processingTime}
            </div>
          </div>

          {/* Consular Filing Fee */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] mb-1">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>Consular Fee</span>
            </div>
            <div className="font-bold text-slate-900 dark:text-white truncate">
              {visa.consularFee}
            </div>
          </div>

          {/* Financial Maintenance */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 col-span-2">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] mb-1">
              <SparklesIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>Financial Proof Required</span>
            </div>
            <div className="font-semibold text-slate-900 dark:text-white text-[11px] sm:text-xs">
              {visa.financialRequirement}
            </div>
          </div>

          {/* Work Rights */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 col-span-2">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] mb-1">
              <BriefcaseIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>Legal Work Rights</span>
            </div>
            <div className="font-semibold text-slate-900 dark:text-white text-[11px] sm:text-xs">
              {visa.workRights}
            </div>
          </div>
        </div>

        {/* Expandable Document Checklist & Detailed Highlights */}
        {showFullDetails && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
            {/* Eligibility Highlights */}
            {visa.eligibilityCriteria && visa.eligibilityCriteria.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Core Eligibility Criteria
                </span>
                <ul className="space-y-1.5">
                  {visa.eligibilityCriteria.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mandatory Documents Checklist */}
            {visa.requiredDocuments && visa.requiredDocuments.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Mandatory Filing Checklist
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {visa.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl">
                      <FileTextIcon className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Toggle Details Button */}
        <button
          type="button"
          onClick={() => setShowFullDetails(!showFullDetails)}
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>{showFullDetails ? 'Hide Detailed Checklist' : 'View Full Document Checklist & Criteria'}</span>
          <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${showFullDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 bg-slate-50/70 dark:bg-slate-850/60 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 w-full sm:w-auto">
          <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
          <span>{country.flag} Pre-audit by licensed {country.name} immigration specialists</span>
        </div>

        <button
          type="button"
          onClick={() => onApply(visa)}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98 shrink-0"
        >
          <span>Apply for this Visa</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VisaTypeDetailsCard;
