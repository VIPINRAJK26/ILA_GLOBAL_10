import React from 'react';
import { BotIcon, SparklesIcon, ArrowRightIcon, HeadphonesIcon } from '../common/Icons';

interface CTASectionProps {
  onLaunchCoach: () => void;
  onExploreServices: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onLaunchCoach, onExploreServices }) => {
  return (
    <section className="py-12 sm:py-20 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-900 border border-indigo-400/30 dark:border-indigo-500/30 p-8 sm:p-14 text-center shadow-2xl overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-semibold">
              <SparklesIcon className="w-3.5 h-3.5 text-yellow-300" />
              <span>Begin Your Journey in Minutes</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Let Intelli Coach Chart Your Global Future
            </h2>

            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed">
              Whether you want tuition-free university in Germany, a lucrative work-and-study program in Canada, or visa clearance with 98.7% confidence, our AI Coach and caring human team are ready.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                type="button"
                onClick={onLaunchCoach}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-indigo-950 font-bold text-sm sm:text-base hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <BotIcon className="w-5 h-5 text-indigo-600" />
                <span>Chat with Intelli Coach AI</span>
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 text-white font-semibold text-sm sm:text-base border border-indigo-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Browse All 7 Sections</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 text-xs text-indigo-200/70 flex items-center justify-center gap-2">
              <HeadphonesIcon className="w-3.5 h-3.5" />
              <span>Instant AI evaluation • 100% Free Initial Assessment • No Card Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
