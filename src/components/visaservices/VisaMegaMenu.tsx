import React from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowRightIcon,
  ChevronRightIcon,
  BotIcon,
} from '../common/Icons';
import { ROUTES } from '../../routes/paths';

interface VisaMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisaMegaMenu: React.FC<VisaMegaMenuProps> = ({
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

  const countries = [
    {
      name: 'Germany',
      flag: '🇩🇪',
      tracks: 'Chancenkarte & National Student Visa',
      badge: 'High Demand',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      tracks: 'SDS Fast-Track & PGWP Work Rights',
      badge: '99% Filing Rate',
      badgeColor: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      tracks: 'Tier 4 Student & Graduate Route Visa',
      badge: 'Fast-Track',
      badgeColor: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    },
    {
      name: 'Austria & Schengen',
      flag: '🇦🇹',
      tracks: 'Student Permit & Red-White-Red Card',
      badge: 'Zero Tuition',
      badgeColor: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    },
    {
      name: 'Ireland',
      flag: '🇮🇪',
      tracks: 'Third-Level Graduate Scheme (Stamp 1G)',
      badge: 'Tech Hub',
      badgeColor: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
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
          Immigration & Consular Jurisdictions
        </span>
        <button
          type="button"
          onClick={() => handleNavigate(ROUTES.VISA_SERVICES)}
          className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>All Visas</span>
          <ChevronRightIcon className="w-3 h-3" />
        </button>
      </div>

      {/* Country Stream List */}
      <div className="space-y-1">
        {countries.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleNavigate(ROUTES.VISA_SERVICES)}
            className="w-full text-left p-2.5 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shrink-0">
                {c.flag}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {c.name}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full border ${c.badgeColor}`}>
                    {c.badge}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[220px]">
                  {c.tracks}
                </div>
              </div>
            </div>

            <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>

      {/* Action Footer */}
      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleNavigate('/#eligibility-checker')}
          className="py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <BotIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>Point Calculator</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate(ROUTES.VISA_SERVICES)}
          className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Explore All Visas</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
