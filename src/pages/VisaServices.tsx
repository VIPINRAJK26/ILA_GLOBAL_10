import React from 'react';
import { Link } from 'react-router';
import { ShieldCheckIcon, BotIcon, ArrowRightIcon, SparklesIcon } from '../components/common/Icons';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';
import { ROUTES } from '../routes/paths';

const VisaServices: React.FC = () => {
  const visaTypes = [
    {
      title: 'Student Visa (Subclass 500 / Tier 4 / Germany National Visa)',
      description: 'End-to-end filing for undergraduate, postgraduate, and language-school visas with fast appointment scheduling.',
      badge: '99.2% Approval Rate',
    },
    {
      title: 'Germany Opportunity Card (Chancenkarte)',
      description: 'Points-based legal job-seeker visa allowing you to enter Germany for up to 1 year and work part-time.',
      badge: 'Fast-Track Eligible',
    },
    {
      title: 'Post-Graduation Work Permit (PGWP / Graduate Route)',
      description: 'Transition smoothly from international student status to unrestricted full-time work authorization.',
      badge: 'Career Pathway',
    },
    {
      title: 'Schengen & Tourist Visas',
      description: 'Flawless itinerary curation, flight reservations, consular interview prep, and biometric filing.',
      badge: '7-14 Day Processing',
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>Consular-Grade Visa Excellence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Comprehensive <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Visa & Immigration</span> Services
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Eliminate rejection anxiety with our 98.7% verified visa success rate. Our licensed immigration advisors and Intelli Coach AI audit your financial, academic, and intent documents prior to embassy submission.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/#intelli-coach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20"
            >
              <BotIcon className="w-4 h-4" />
              <span>Simulate Embassy Interview with AI</span>
            </Link>
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Visa Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visaTypes.map((visa, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/40 shadow-md dark:shadow-none transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-full">
                    {visa.badge}
                  </span>
                  <ShieldCheckIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{visa.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{visa.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Documentation Verification Included</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  Learn Details <ArrowRightIcon className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Visa Audit Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-500/30 shadow-md dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
              <SparklesIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Intelli Coach Real-Time Consular Risk Audit</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Want to know your exact approval odds?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Upload or type in your profile details to evaluate bank statement adequacy, blocked-account readiness, and academic credibility.
            </p>
          </div>

          <Link
            to="/#intelli-coach"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm whitespace-nowrap text-center transition-colors shadow-lg"
          >
            Start Free AI Visa Assessment →
          </Link>
        </div>

        {/* Dedicated Visa Enquiry Section */}
        <div id="visa-enquiry" className="pt-4">
          <PageEnquiryForm pageType="visa" />
        </div>
      </div>
    </div>
  );
};

export default VisaServices;