import React from 'react';
import { 
  GraduationCapIcon, 
  AwardIcon, 
  BriefcaseIcon, 
  CompassIcon 
} from '../common/Icons';

export const WhyStudyAbroad: React.FC = () => {
  const benefits = [
    {
      title: 'Global Academic Recognition',
      description: 'Internationally recognised educational opportunities across accredited European and worldwide institutions.',
      icon: GraduationCapIcon,
      accent: 'text-purple-600 dark:text-purple-400 bg-purple-500/10'
    },
    {
      title: 'Tuition-Free & Low-Fee Programmes',
      description: 'Access to eligible public-university programmes with low or no tuition fees, depending on the institution and country.',
      icon: AwardIcon,
      accent: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10'
    },
    {
      title: 'Student Employment Frameworks',
      description: 'Student employment opportunities subject to local labor regulations and visa permissions.',
      icon: BriefcaseIcon,
      accent: 'text-blue-600 dark:text-blue-400 bg-blue-500/10'
    },
    {
      title: 'Post-Study Career Pathways',
      description: 'Potential post-study employment and residence pathways, subject to statutory eligibility and regional criteria.',
      icon: CompassIcon,
      accent: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10'
    }
  ];

  return (
    <section className="py-4">
      <div className="max-w-3xl mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Why Study Abroad?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
          Key considerations and verified institutional advantages for students seeking higher education in Germany and across Europe.
        </p>
      </div>

      {/* Simple Icon-and-Text Layout rather than large cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div 
              key={idx} 
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 transition-colors"
            >
              <div className={`p-2.5 rounded-xl ${b.accent} shrink-0 mt-0.5`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
