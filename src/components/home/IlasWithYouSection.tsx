import React from 'react';
import { 
  HeartHandshakeIcon, 
  MapPinIcon, 
  Building2Icon, 
  UsersIcon, 
  HeadphonesIcon, 
  CheckCircleIcon,
  ShieldCheckIcon
} from '../common/Icons';

export const IlasWithYouSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pre-Departure Briefing',
      desc: 'Pack right, prepare immigration folder, and connect with fellow batchmates heading to your exact city.',
      icon: MapPinIcon,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      step: '02',
      title: 'Airport Greeting & Safe Transit',
      desc: 'Our local city coordinator welcomes you upon landing and arranges comfortable transit to your accommodation.',
      icon: HeartHandshakeIcon,
      color: 'from-purple-500 to-pink-600'
    },
    {
      step: '03',
      title: 'Apartment & City Registration',
      desc: 'Guidance through tenancy agreements and legal city hall registration (Anmeldung / municipal enrollment).',
      icon: Building2Icon,
      color: 'from-amber-500 to-orange-600'
    },
    {
      step: '04',
      title: 'Banking, SIM & Insurance',
      desc: 'Unblock your student funds, set up local mobile eSIMs, and finalize mandatory statutory health coverage.',
      icon: ShieldCheckIcon,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      step: '05',
      title: 'Local Buddy & 24/7 Hotline',
      desc: 'Pair up with a senior student buddy and have 24/7 emergency support for any healthcare or legal hiccups.',
      icon: HeadphonesIcon,
      color: 'from-rose-500 to-red-600'
    }
  ];

  return (
    <section id="ilas-with-you" className="py-12 sm:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-semibold mb-3 shadow-sm dark:shadow-none">
            <HeartHandshakeIcon className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Lifelong On-Ground Companion</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            ILAS With You: You Never Land Alone
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Relocating overseas is more than just getting a visa. <strong className="text-violet-600 dark:text-violet-300 font-semibold">ILAS With You</strong> is our heartbeat—a dedicated human care and community network that supports you before takeoff, greets you at the terminal, and walks with you until you feel right at home.
          </p>
        </div>

        {/* 5-Step Journey Timeline */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-violet-400 dark:hover:border-violet-500/50 transition-all duration-300 flex flex-col justify-between group shadow-sm dark:shadow-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10 px-2.5 py-1 rounded-lg">
                      STAGE {item.step}
                    </span>
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <CheckCircleIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>On-ground verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Highlight Box */}
        <div className="mt-10 bg-gradient-to-r from-violet-50 dark:from-violet-950/40 via-white dark:via-slate-900 to-indigo-50 dark:to-indigo-950/40 border border-violet-200 dark:border-violet-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-violet-600/30">
              <UsersIcon className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Join 12,000+ Students in Host-City WhatsApp Circles</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Connect with seniors already living in Munich, Berlin, London, Toronto, Dublin, and Sydney before you board your flight!
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer shadow-md"
          >
            Connect with My City Buddy →
          </button>
        </div>
      </div>
    </section>
  );
};
