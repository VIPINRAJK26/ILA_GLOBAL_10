import React from 'react';
import { OverallEligibilityForm } from '../eligibility/OverallEligibilityForm';

export const QuickEligibilityChecker: React.FC = () => {
  return (
    <section 
      id="eligibility-checker" 
      className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-200 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <OverallEligibilityForm showHeroHeader={true} />
      </div>
    </section>
  );
};

export default QuickEligibilityChecker;
