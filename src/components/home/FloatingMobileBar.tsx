import React from 'react';
import { BotIcon, GlobeIcon, AwardIcon, SparklesIcon, CompassIcon } from '../common/Icons';

interface FloatingMobileBarProps {
  onLaunchCoach: () => void;
  onExploreServices: () => void;
  onCheckEligibility: () => void;
  onViewRewards: () => void;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({
  onLaunchCoach,
  onExploreServices,
  onCheckEligibility,
  onViewRewards,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-xl px-2 py-2 shadow-lg">
      <div className="grid grid-cols-4 gap-1 items-center text-center">
        <button
          type="button"
          onClick={onExploreServices}
          className="flex flex-col items-center justify-center py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <GlobeIcon className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium">Services</span>
        </button>

        <button
          type="button"
          onClick={onCheckEligibility}
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <CompassIcon className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium">Eligibility</span>
        </button>

        <button
          type="button"
          onClick={onViewRewards}
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <AwardIcon className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium">Rewards</span>
        </button>

        <button
          type="button"
          onClick={onLaunchCoach}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold transition-all shadow-md cursor-pointer active:scale-95"
        >
          <div className="flex items-center gap-0.5">
            <BotIcon className="w-3.5 h-3.5" />
            <SparklesIcon className="w-2.5 h-2.5 text-yellow-300" />
          </div>
          <span className="text-[10px]">AI Coach</span>
        </button>
      </div>
    </div>
  );
};
