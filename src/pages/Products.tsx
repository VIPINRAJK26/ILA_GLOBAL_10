import React from 'react';
import { Link } from 'react-router';
import { LaptopIcon, SparklesIcon } from '../components/common/Icons';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';
import { ROUTES } from '../routes/paths';

const Products: React.FC = () => {
  const tools = [
    {
      name: 'Intelli Coach AI Suite',
      badge: 'Flagship AI Tool',
      description: '24/7 AI-driven counseling, university matching algorithm, and consular mock interview evaluation.',
      features: ['Real-time eligibility score', 'Voice interview simulation', 'SOP and CV keyword audits'],
      link: '/#intelli-coach',
      btnLabel: 'Try Intelli Coach AI'
    },
    {
      name: 'Instant Eligibility Estimator',
      badge: 'Free Interactive Tool',
      description: 'Calculate your visa approval likelihood and student earning potential in under 30 seconds.',
      features: ['Chancenkarte point matrix', 'Part-time student salary estimates', 'Tuition-free university shortlists'],
      link: '/#eligibility-checker',
      btnLabel: 'Launch Estimator'
    },
    {
      name: 'ILAS With You On-Ground Concierge',
      badge: 'Arrival Companion',
      description: 'Pre-flight preparation to airport pickup, student housing, and legal city registration (Anmeldung).',
      features: ['Airport terminal meet & greet', 'Blocked account unfreezing', 'Host city WhatsApp buddy circles'],
      link: '/#ilas-with-you',
      btnLabel: 'Explore On-Ground Care'
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-semibold">
            <LaptopIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>ILA Technology & Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            ILA Global <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Products & Digital Tools</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Proprietary digital engines built to automate and supercharge your study abroad, work permit, and global career experience.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/40 shadow-md dark:shadow-none transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 px-2.5 py-1 rounded-full">
                  {tool.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2">{tool.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{tool.description}</p>

                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-6">
                  {tool.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <SparklesIcon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={tool.link}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <span>{tool.btnLabel}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Products & Digital Suite Demo Enquiry Form */}
        <div id="products-enquiry" className="pt-4">
          <PageEnquiryForm pageType="products" />
        </div>
      </div>
    </div>
  );
};

export default Products;