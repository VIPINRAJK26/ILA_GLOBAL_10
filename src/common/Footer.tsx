import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
  GlobeIcon, 
  BotIcon, 
  HeartHandshakeIcon, 
  ShieldCheckIcon, 
  HeadphonesIcon,
  SparklesIcon,
  CheckCircleIcon,
  SendIcon
} from '../components/common/Icons';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { ROUTES } from '../routes/paths';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    setEmailInput('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 pt-14 pb-12 sm:pb-16 relative overflow-hidden transition-colors duration-300">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter / Intake Alerts Row */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-500/20">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Intake & Visa Policy Updates</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Stay Ahead of Global Immigration Deadlines
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Get notified of DAAD scholarship releases, Germany Opportunity Card quota updates, and Canada Co-op alerts directly in your inbox.
            </p>
          </div>

          <div className="w-full lg:auto">
            {isSubscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>You're subscribed! You'll receive intake & visa alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full lg:min-w-[380px]">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shrink-0"
                >
                  <span>Subscribe</span>
                  <SendIcon className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5-Column Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info & Trust */}
          <div className="lg:col-span-2 space-y-4">
            <Link to={ROUTES.HOME} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <GlobeIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 dark:text-white">ILA GLOBAL</span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Global Mobility Network</span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Empowering students and professionals worldwide through high-precision university admissions, consular visa clearance, work & study dual-tracks, and 24/7 AI-driven counseling.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheckIcon className="w-4 h-4" /> Consular Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                <BotIcon className="w-4 h-4" /> Intelli Coach AI
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400 font-medium">
                <HeartHandshakeIcon className="w-4 h-4" /> ILAS With You
              </span>
            </div>
          </div>

          {/* Col 2: Academic & Visas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">Study & Visas</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to={ROUTES.VISA_SERVICES} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Visa Services Overview</Link></li>
              <li><Link to={ROUTES.STUDY_ABROAD} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Study Abroad Guide</Link></li>
              <li><Link to={ROUTES.WORK_AND_STUDY} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Germany Tuition-Free Programs</Link></li>
              <li><Link to="/#eligibility-checker" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Opportunity Card (Chancenkarte)</Link></li>
              <li><Link to="/#intelli-coach" className="hover:text-indigo-600 dark:hover:text-white transition-colors">AI Mock Embassy Prep</Link></li>
            </ul>
          </div>

          {/* Col 3: Work & Rewards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">Work & Careers</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to={ROUTES.WORK_AND_STUDY} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Work and Study Dual Tracks</Link></li>
              <li><Link to={ROUTES.JOBS_AND_CAREERS} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Jobs & Visa Sponsorship</Link></li>
              <li><Link to={ROUTES.REWARDS} className="hover:text-indigo-600 dark:hover:text-white transition-colors">ILA Rewards & Tier Loyalty</Link></li>
              <li><Link to={ROUTES.PRODUCTS} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Products & AI Engines</Link></li>
              <li><Link to="/#ilas-with-you" className="hover:text-indigo-600 dark:hover:text-white transition-colors">ILAS With You On-Ground Care</Link></li>
            </ul>
          </div>

          {/* Col 4: Global Desks & Helpline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">Global Hubs</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Berlin • Frankfurt • London • Dublin • Toronto • Vancouver • Sydney
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 font-semibold">
                <HeadphonesIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>24/7 Student Hotline</span>
              </div>
              <div className="text-indigo-600 dark:text-indigo-400 font-mono">+49 30 1234 5678</div>
              <div className="text-[11px] text-slate-500">English • Deutsch • Hindi Support</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Theme Switcher */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ILA Global Mobility Network. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link to="/#privacy" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/#terms" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/#disclaimer" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Immigration Disclaimer</Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <ThemeToggle showLabel={true} />
            <button
              type="button"
              onClick={scrollToTop}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer ml-1 font-bold"
            >
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
