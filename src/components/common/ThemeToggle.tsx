import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showLabel = false 
}) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer group ${
        isDark 
          ? 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-slate-800 hover:border-amber-400/40 shadow-sm shadow-amber-400/5' 
          : 'bg-white hover:bg-slate-100 text-indigo-600 border border-slate-200 hover:border-indigo-400/40 shadow-sm shadow-indigo-600/10'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (shown in dark mode to switch to light) */}
        <span
          className={`absolute transition-all duration-300 transform ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100 text-amber-300 group-hover:rotate-45' 
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        >
          <SunIcon className="w-5 h-5" />
        </span>

        {/* Moon Icon (shown in light mode to switch to dark) */}
        <span
          className={`absolute transition-all duration-300 transform ${
            !isDark 
              ? 'opacity-100 rotate-0 scale-100 text-indigo-600 group-hover:-rotate-12' 
              : 'opacity-0 rotate-90 scale-50'
          }`}
        >
          <MoonIcon className="w-5 h-5" />
        </span>
      </div>

      {showLabel && (
        <span className={`text-xs font-bold transition-colors ${
          isDark ? 'text-slate-300 group-hover:text-amber-300' : 'text-slate-700 group-hover:text-indigo-600'
        }`}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
