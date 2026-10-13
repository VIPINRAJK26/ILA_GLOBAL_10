import React from 'react';
import { Link } from 'react-router';
import { AwardIcon } from '../components/common/Icons';
import { RewardsSection } from '../components/home/RewardsSection';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';
import { ROUTES } from '../routes/paths';

const Rewards: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white space-y-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-amber-600 dark:text-yellow-300 text-xs sm:text-sm font-semibold">
            <AwardIcon className="w-4 h-4 text-amber-500 dark:text-yellow-400" />
            <span>ILA Loyalty & Rewards Program</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Rewards & <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Milestone Grants</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Every step towards your global career earns points. Redeem them for official language test vouchers, consular filing discounts, and student cash bonuses.
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