import React from 'react';
import { StarIcon, CheckCircleIcon, GlobeIcon, AwardIcon } from '../common/Icons';

export const TestimonialsAndTrust: React.FC = () => {
  const reviews = [
    {
      name: 'Ananya Sharma',
      role: 'Master in Informatics, TU Munich',
      country: '🇩🇪 Germany',
      badge: 'Zero-Tuition Scholar',
      quote: 'Intelli Coach reviewed my Statement of Purpose and shortlisted 3 tuition-free German universities. Within 6 months, my visa was approved with zero stress. Plus, ILAS With You helped me register my city address (Anmeldung) on my second day!',
      rating: 5
    },
    {
      name: 'Marcus Chen',
      role: 'Cloud Engineer, Berlin',
      country: '🇩🇪 Germany',
      badge: 'Opportunity Card (Chancenkarte)',
      quote: 'The Points Calculator on Intelli Coach scored my exact qualifications accurately. Within 3 months of landing in Germany, I secured a full-time English-speaking cloud engineering role with permanent sponsorship.',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Co-op Data Analyst, Toronto',
      country: '🇨🇦 Canada',
      badge: 'Work & Study Co-op Track',
      quote: 'The dual Work & Study roadmap allowed me to work 20+ hours a week legally and pay for my own accommodation in Toronto. I earned over 8,000 ILA Rewards points which gave me a $200 discount on visa services!',
      rating: 5
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs sm:text-sm font-semibold mb-3">
            <AwardIcon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Real Student & Professional Success</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Trusted by Over 10,000 Global Movers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Hear from real students and international professionals who turned their study, work, and visa dreams into reality with ILA Global and Intelli Coach.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl dark:hover:shadow-2xl transition-all shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                    {rev.country}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{rev.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{rev.role}</div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-1 rounded-md">
                  {rev.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Hubs ticker */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>Frankfurt & Berlin Hubs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>London & Dublin On-Ground Teams</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>Toronto & Vancouver Student Desks</span>
          </div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>Consular-Compliant Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
};
