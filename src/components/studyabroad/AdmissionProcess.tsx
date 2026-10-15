import React from 'react';

export const AdmissionProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Profile Assessment',
      desc: 'Review academic qualifications.',
    },
    {
      num: '02',
      title: 'Course Selection',
      desc: 'Identify suitable universities and programmes.',
    },
    {
      num: '03',
      title: 'Application & Documentation',
      desc: 'Prepare required documents and complete applicable application procedures, including APS or Uni-Assist where relevant.',
    },
    {
      num: '04',
      title: 'Visa Preparation',
      desc: 'Receive guidance on the relevant visa application process.',
    },
  ];

  return (
    <section id="admission-process" className="py-4 scroll-mt-24">
      <div className="max-w-3xl mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Admission Process
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
          A structured, transparent pathway from initial evaluation to departure.
        </p>
      </div>

      {/* Compact Four-Step Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors relative"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300">
                  Step {step.num}
                </span>
                {idx < steps.length - 1 && (
                  <span className="hidden md:inline-block text-slate-300 dark:text-slate-700 text-xs font-bold">
                    →
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
