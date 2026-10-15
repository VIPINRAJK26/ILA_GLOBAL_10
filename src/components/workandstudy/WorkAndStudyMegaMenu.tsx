import React from 'react';
import { useNavigate } from 'react-router';
import {
  BriefcaseIcon,
  GlobeIcon,
  ShieldCheckIcon,
  AwardIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  BotIcon,
} from '../common/Icons';
import { ROUTES } from '../../routes/paths';

interface WorkAndStudyMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkAndStudyMegaMenu: React.FC<WorkAndStudyMegaMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (path: string, hash?: string) => {
    onClose();
    if (hash) {
      navigate(`${path}#${hash}`);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      navigate(path);
    }
  };

  const modules = [
    {
      id: 'work-study-india',
      title: 'Work & Study in India',
      badge: 'Domestic Hub',
      badgeColor: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      desc: 'Office Admin, Software AI, Global Logistics & Technical Services (₹15k–₹35k/mo)',
      icon: BriefcaseIcon,
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      id: 'work-study-abroad',
      title: 'Work & Study Abroad',
      badge: 'Germany & EU',
      badgeColor: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      desc: 'Airport pick-ups (€50–€100), student services, IT and marketing part-time roles',
      icon: GlobeIcon,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'german-onboarding',
      title: 'German Onboarding Projects',
      badge: 'Industry Prep',
      badgeColor: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      desc: 'Solar & Renewable, Cross-Border Logistics, Modern Web AI, and Medical German',
      icon: ShieldCheckIcon,
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 'rewards-study',
      title: 'Rewards & Earning Platforms',
      badge: 'Incentives',
      badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      desc: 'Milestone points, tech kits, European educational tours, and course subsidies',
      icon: AwardIcon,
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <div
      className="absolute top-full left-0 mt-2.5 w-[360px] sm:w-[420px] rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-3.5 z-50 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Work & Study Pathways
        </span>
        <button
          type="button"
          onClick={() => handleNavigate(ROUTES.WORK_AND_STUDY)}
          className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Overview</span>
          <ChevronRightIcon className="w-3 h-3" />
        </button>
      </div>

      {/* Module Links */}
      <div className="space-y-1">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => handleNavigate(ROUTES.WORK_AND_STUDY, mod.id)}
              className="w-full text-left p-3 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all flex items-start gap-3 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                <Icon className={`w-4 h-4 ${mod.iconColor}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                    {mod.title}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${mod.badgeColor}`}>
                    {mod.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 leading-snug">
                  {mod.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Calculator Shortcut Bar */}
      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleNavigate(ROUTES.WORK_AND_STUDY, 'plan-calculator')}
          className="py-2 px-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <BotIcon className="w-3.5 h-3.5 text-cyan-600" />
          <span>Plan Calculator</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate(ROUTES.WORK_AND_STUDY)}
          className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>All Modules</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
