import React from 'react';
import { 
  FileTextIcon, 
  ShieldCheckIcon, 
  CreditCardIcon, 
  HeartHandshakeIcon, 
  BuildingIcon, 
  GlobeIcon, 
  ArrowRightIcon 
} from '../common/Icons';

interface StudentSupportServicesProps {
  onRequestSupport: (serviceTitle: string) => void;
}

export const StudentSupportServices: React.FC<StudentSupportServicesProps> = ({
  onRequestSupport
}) => {
  const services = [
    {
      id: 'applications',
      title: 'University Applications & Documentation',
      desc: 'Guidance through university application portals, certified document translation checks, and Uni-Assist submission procedures.',
      icon: FileTextIcon,
      accent: 'text-purple-600 dark:text-purple-400 bg-purple-500/10'
    },
    {
      id: 'aps-visa',
      title: 'APS & Visa Guidance',
      desc: 'Assistance preparing Academic Evaluation Centre (APS) documentation and navigating national student visa filing requirements.',
      icon: ShieldCheckIcon,
      accent: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10'
    },
    {
      id: 'blocked-account',
      title: 'Blocked Account & Financial Preparation',
      desc: 'Support with setting up compliant blocked accounts (Sperrkonto) and verifying required proof-of-finance documentation.',
      icon: CreditCardIcon,
      accent: 'text-blue-600 dark:text-blue-400 bg-blue-500/10'
    },
    {
      id: 'health-insurance',
      title: 'Health Insurance Guidance',
      desc: 'Advisory on selecting eligible statutory (public) or private student health insurance policies accepted by embassies and universities.',
      icon: HeartHandshakeIcon,
      accent: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'accommodation',
      title: 'Accommodation & Airport Pickup',
      desc: 'Practical guidance for student dormitory applications, verified private housing searches, and scheduled airport welcome support.',
      icon: BuildingIcon,
      accent: 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
    },
    {
      id: 'settlement',
      title: 'Local Registration & Settlement Support',
      desc: 'Step-by-step assistance with local city hall registration (Anmeldung), local tax ID, bank accounts, and initial resident setup.',
      icon: GlobeIcon,
      accent: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10'
    }
  ];

  return (
    <section id="support-services" className="py-4 scroll-mt-24">
      <div className="max-w-3xl mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Student Support Services
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
          Comprehensive, non-academic advisory and administrative support to facilitate your transition to living and studying abroad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className={`w-11 h-11 rounded-2xl ${service.accent} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onRequestSupport(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Support</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
