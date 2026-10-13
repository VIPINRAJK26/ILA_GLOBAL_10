import React, { useState } from 'react';
import { 
  BotIcon, 
  MenuIcon, 
  XIcon, 
  GlobeIcon, 
  SparklesIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  AwardIcon,
  HeartHandshakeIcon
} from '../common/Icons';

interface HomeNavbarProps {
  onLaunchCoach: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HomeNavbar: React.FC<HomeNavbarProps> = ({ onLaunchCoach, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'education', label: 'Education', icon: GraduationCapIcon },
    { id: 'visa', label: 'Visa Services', icon: ShieldCheckIcon },
    { id: 'work-study-spotlight', label: 'Work & Study', icon: BriefcaseIcon },
    { id: 'studyabroad', label: 'Study Abroad', icon: GlobeIcon },
    { id: 'careers', label: 'Jobs & Careers', icon: BriefcaseIcon },
    { id: 'rewards-section', label: 'Rewards', icon: AwardIcon },
    { id: 'ilas-with-you', label: 'ILAS With You', icon: HeartHandshakeIcon },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <GlobeIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white">ILA GLOBAL</span>
                <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 text-[10px] rounded font-bold uppercase border border-indigo-500/30">
                  Mobility
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Education • Careers • Visas</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchCoach();
              }}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer active:scale-95"
            >
              <BotIcon className="w-4 h-4 text-indigo-200" />
              <span>Intelli Coach AI</span>
              <SparklesIcon className="w-3 h-3 text-yellow-300 hidden sm:inline" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Browse All 7 Sections:
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className="flex items-center gap-3 w-full p-2.5 rounded-xl text-left text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchCoach();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg cursor-pointer"
            >
              <BotIcon className="w-4 h-4" />
              <span>Launch Intelli Coach AI Session</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
