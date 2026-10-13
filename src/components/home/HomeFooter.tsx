import React from 'react';
import { GlobeIcon, BotIcon, HeartHandshakeIcon, ShieldCheckIcon } from '../common/Icons';

export const HomeFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <GlobeIcon className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white">ILA GLOBAL</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering students and skilled professionals across the world through end-to-end global mobility: academic admissions, visa services, work & study programs, and 24/7 AI-guided career coaching.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheckIcon className="w-4 h-4" /> Consular Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-indigo-400">
                <BotIcon className="w-4 h-4" /> Intelli Coach AI
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-violet-400">
                <HeartHandshakeIcon className="w-4 h-4" /> ILAS With You
              </span>
            </div>
          </div>

          {/* Academic & Visas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Study & Visas</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#education" className="hover:text-white transition-colors">Education Section</a></li>
              <li><a href="#visa" className="hover:text-white transition-colors">Visa Services</a></li>
              <li><a href="#studyabroad" className="hover:text-white transition-colors">Study Abroad Guide</a></li>
              <li><a href="#work-study-spotlight" className="hover:text-white transition-colors">Germany Tuition-Free</a></li>
              <li><a href="#visa" className="hover:text-white transition-colors">Chancenkarte (Opportunity Card)</a></li>
            </ul>
          </div>

          {/* Careers & Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Work & Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#work-study-spotlight" className="hover:text-white transition-colors">Work and Study Dual Tracks</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Jobs and Careers Placements</a></li>
              <li><a href="#rewards-section" className="hover:text-white transition-colors">ILA Rewards & Loyalty</a></li>
              <li><a href="#ilas-with-you" className="hover:text-white transition-colors">ILAS With You On-Ground Care</a></li>
              <li><a href="#intelli-coach" className="hover:text-white transition-colors">Intelli Coach AI Counselor</a></li>
            </ul>
          </div>

          {/* Global Desks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Global Hubs</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Berlin • Frankfurt • London • Dublin • Toronto • Vancouver • Sydney
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="font-semibold text-slate-200">24/7 Student Hotline</div>
              <div className="text-indigo-400 font-mono mt-0.5">+49 30 1234 5678</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ILA Global Mobility Network. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#disclaimer" className="hover:text-slate-400 transition-colors">Immigration Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
