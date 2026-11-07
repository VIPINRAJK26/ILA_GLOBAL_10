import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { 
  GlobeIcon, 
  MenuIcon, 
  XIcon, 
  ShieldCheckIcon,
  BriefcaseIcon,
  GraduationCapIcon, 
  AwardIcon, 
  LaptopIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  UserIcon,
  LogOutIcon,
  BookOpenIcon,
  HeartHandshakeIcon,
  CompassIcon
} from '../components/common/Icons';

import { ThemeToggle } from '../components/common/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { CoursesMegaMenu } from '../components/courses/CoursesMegaMenu';
import { VisaMegaMenu } from '../components/visaservices/VisaMegaMenu';
import { WorkAndStudyMegaMenu } from '../components/workandstudy/WorkAndStudyMegaMenu';
import { ROUTES } from '../routes/paths';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  // Desktop dropdown states
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [visaDropdownOpen, setVisaDropdownOpen] = useState(false);
  const [workStudyDropdownOpen, setWorkStudyDropdownOpen] = useState(false);

  // Mobile expandable section states
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileVisaOpen, setMobileVisaOpen] = useState(false);
  const [mobileWorkStudyOpen, setMobileWorkStudyOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const coursesMenuRef = useRef<HTMLDivElement>(null);
  const visaMenuRef = useRef<HTMLDivElement>(null);
  const workStudyMenuRef = useRef<HTMLDivElement>(null);

  const coursesHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visaHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const workStudyHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();
  const { user, isAuthenticated, openAuthModal, openLogoutModal } = useAuth();

  // Hover handlers for All Courses
  const handleCoursesMouseEnter = () => {
    if (coursesHoverTimeoutRef.current) clearTimeout(coursesHoverTimeoutRef.current);
    setCoursesDropdownOpen(true);
    setVisaDropdownOpen(false);
    setWorkStudyDropdownOpen(false);
  };
  const handleCoursesMouseLeave = () => {
    coursesHoverTimeoutRef.current = setTimeout(() => {
      setCoursesDropdownOpen(false);
    }, 150);
  };

  // Hover handlers for Visa Services
  const handleVisaMouseEnter = () => {
    if (visaHoverTimeoutRef.current) clearTimeout(visaHoverTimeoutRef.current);
    setVisaDropdownOpen(true);
    setCoursesDropdownOpen(false);
    setWorkStudyDropdownOpen(false);
  };
  const handleVisaMouseLeave = () => {
    visaHoverTimeoutRef.current = setTimeout(() => {
      setVisaDropdownOpen(false);
    }, 150);
  };

  // Hover handlers for Work & Study
  const handleWorkStudyMouseEnter = () => {
    if (workStudyHoverTimeoutRef.current) clearTimeout(workStudyHoverTimeoutRef.current);
    setWorkStudyDropdownOpen(true);
    setCoursesDropdownOpen(false);
    setVisaDropdownOpen(false);
  };
  const handleWorkStudyMouseLeave = () => {
    workStudyHoverTimeoutRef.current = setTimeout(() => {
      setWorkStudyDropdownOpen(false);
    }, 150);
  };

  // Scroll elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
      if (coursesMenuRef.current && !coursesMenuRef.current.contains(target)) {
        setCoursesDropdownOpen(false);
      }
      if (visaMenuRef.current && !visaMenuRef.current.contains(target)) {
        setVisaDropdownOpen(false);
      }
      if (workStudyMenuRef.current && !workStudyMenuRef.current.contains(target)) {
        setWorkStudyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCoursesDropdownOpen(false);
    setVisaDropdownOpen(false);
    setWorkStudyDropdownOpen(false);
  }, [location.pathname]);

  const isCurrentActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return location.pathname === ROUTES.HOME && !location.hash;
    }
    return location.pathname.startsWith(path);
  };

  const isIlasWithYouActive = location.hash === '#ilas-with-you';

  const handleIlasWithYouClick = (e: React.MouseEvent) => {
    if (location.pathname === ROUTES.HOME) {
      e.preventDefault();
      const el = document.getElementById('ilas-with-you');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 1100, behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/92 dark:bg-slate-950/92 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_-4px_rgba(0,0,0,0.35)]' 
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2 xl:gap-4">
          
          {/* Logo (Left) */}
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center gap-2 group focus:outline-none shrink-0"
            title="ILA Global Home"
            onClick={() => {
              if (location.pathname === ROUTES.HOME) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105">
              <GlobeIcon className="w-4 h-4" />
            </div>
            <div className="flex items-baseline tracking-tight">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                ILA
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-indigo-600 dark:text-indigo-400 ml-1 tracking-wider uppercase">
                GLOBAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) - Neatly Placed & Professional */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5">
            {/* 1. Home */}
            <NavLink
              to={ROUTES.HOME}
              end
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 ${
                  isActive && !isIlasWithYouActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Home
            </NavLink>

            {/* 2. Courses Dropdown */}
            <div 
              className="relative" 
              ref={coursesMenuRef}
              onMouseEnter={handleCoursesMouseEnter}
              onMouseLeave={handleCoursesMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  setCoursesDropdownOpen(!coursesDropdownOpen);
                  setVisaDropdownOpen(false);
                  setWorkStudyDropdownOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                  coursesDropdownOpen || isCurrentActive(ROUTES.COURSES)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={coursesDropdownOpen}
                aria-label="Courses Dropdown"
              >
                <span>Courses</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                    coursesDropdownOpen ? 'rotate-180 opacity-100 text-indigo-600 dark:text-indigo-400' : ''
                  }`} 
                />
              </button>

              <CoursesMegaMenu
                isOpen={coursesDropdownOpen}
                onClose={() => setCoursesDropdownOpen(false)}
              />
            </div>

            {/* 3. Study Abroad */}
            <NavLink
              to={ROUTES.STUDY_ABROAD}
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Study Abroad
            </NavLink>

            {/* 4. Work & Study Dropdown */}
            <div 
              className="relative" 
              ref={workStudyMenuRef}
              onMouseEnter={handleWorkStudyMouseEnter}
              onMouseLeave={handleWorkStudyMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  setWorkStudyDropdownOpen(!workStudyDropdownOpen);
                  setCoursesDropdownOpen(false);
                  setVisaDropdownOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                  workStudyDropdownOpen || isCurrentActive(ROUTES.WORK_AND_STUDY)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={workStudyDropdownOpen}
                aria-label="Work & Study Dropdown"
              >
                <span>Work & Study</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                    workStudyDropdownOpen ? 'rotate-180 opacity-100 text-indigo-600 dark:text-indigo-400' : ''
                  }`} 
                />
              </button>

              <WorkAndStudyMegaMenu
                isOpen={workStudyDropdownOpen}
                onClose={() => setWorkStudyDropdownOpen(false)}
              />
            </div>

            {/* 5. Visa Services Dropdown */}
            <div 
              className="relative" 
              ref={visaMenuRef}
              onMouseEnter={handleVisaMouseEnter}
              onMouseLeave={handleVisaMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  setVisaDropdownOpen(!visaDropdownOpen);
                  setCoursesDropdownOpen(false);
                  setWorkStudyDropdownOpen(false);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                  visaDropdownOpen || isCurrentActive(ROUTES.VISA_SERVICES)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={visaDropdownOpen}
                aria-label="Visa Services Dropdown"
              >
                <span>Visa Services</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                    visaDropdownOpen ? 'rotate-180 opacity-100 text-indigo-600 dark:text-indigo-400' : ''
                  }`} 
                />
              </button>

              <VisaMegaMenu
                isOpen={visaDropdownOpen}
                onClose={() => setVisaDropdownOpen(false)}
              />
            </div>

            {/* 6. Jobs & Careers */}
            <NavLink
              to={ROUTES.JOBS_AND_CAREERS}
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Jobs & Careers
            </NavLink>

            {/* 7. Rewards */}
            <NavLink
              to={ROUTES.REWARDS}
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Rewards
            </NavLink>

            {/* 8. Products */}
            <NavLink
              to={ROUTES.PRODUCTS}
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Products
            </NavLink>

            {/* 9. Eligibility Checker */}
            <NavLink
              to={ROUTES.ELIGIBILITY}
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 flex items-center gap-1 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <span>Eligibility</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                AI
              </span>
            </NavLink>


            {/* 9. ILAS With You (Signature Feature) */}
            <Link
              to="/#ilas-with-you"
              onClick={handleIlasWithYouClick}
              className={`px-2.5 py-1.5 rounded-lg text-[13px] 2xl:text-[13.5px] font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                isIlasWithYouActive
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 ring-1 ring-rose-300 dark:ring-rose-800'
                  : 'text-rose-600/90 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50/70 dark:hover:bg-rose-950/40'
              }`}
            >
              <HeartHandshakeIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>ILAS With You</span>
            </Link>
          </nav>

          {/* Right Section: Theme Switcher & Account Section */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Switcher */}
            <ThemeToggle className="h-8.5 w-8.5 justify-center rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors" />

            {/* Account Section */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openAuthModal('student', 'login')}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('student', 'register')}
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-sm shadow-indigo-600/20 transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="relative" ref={userMenuRef}>
                {/* Account Trigger Button (Dashboard consolidated inside) */}
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="h-9 px-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2 transition-colors cursor-pointer"
                  aria-label="Student Account Menu"
                >
                  <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate leading-tight">
                      {user?.name}
                    </span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium leading-none">
                      Account
                    </span>
                  </div>
                  <ChevronDownIcon className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''}`} />
                </button>

                {/* Account Section Dropdown (With Dashboard & All Settings) */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-3 space-y-2 z-50 animate-fade-in">
                    {/* User Identity Banner */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-sm font-bold shadow-sm shrink-0">
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">{user?.name}</div>
                        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-medium truncate">{user?.identifierCode}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</div>
                      </div>
                    </div>

                    {/* Account Links & Dashboard Settings */}
                    <div className="space-y-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <div className="px-2 pt-1 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Student Portal
                      </div>

                      <Link 
                        to={ROUTES.DASHBOARD} 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <GraduationCapIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              Student Dashboard
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">Overview, metrics & timeline</div>
                          </div>
                        </div>
                        <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                      </Link>

                      <Link 
                        to="/dashboard#applications" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <ShieldCheckIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              My Applications & Visas
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">Admissions, status & files</div>
                          </div>
                        </div>
                        <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                      </Link>

                      <Link 
                        to="/dashboard#courses" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <BookOpenIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              Enrolled Courses
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">Lessons, tests & certificates</div>
                          </div>
                        </div>
                        <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                      </Link>

                      <Link 
                        to="/dashboard#profile" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-300">
                            <UserIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              Profile & Account Settings
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">Personal details & preferences</div>
                          </div>
                        </div>
                        <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                      </Link>

                      <Link 
                        to={ROUTES.REWARDS} 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <AwardIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              My Rewards & Vouchers
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">Points & referral bonus</div>
                          </div>
                        </div>
                        <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openLogoutModal();
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <LogOutIcon className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile / Tablet Menu Button (visible on < xl) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-8.5 w-8.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <XIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Mobile Auth Banner */}
          {!isAuthenticated ? (
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-850">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('student', 'login');
                }}
                className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <UserIcon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('student', 'register');
                }}
                className="py-2.5 px-3 rounded-xl bg-indigo-600 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-600/30 hover:bg-indigo-500"
              >
                <span>Register</span>
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{user?.name}</div>
                    <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-medium">{user?.identifierCode}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLogoutModal();
                  }}
                  className="text-rose-500 hover:text-rose-600 text-xs font-semibold flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <LogOutIcon className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Direct Link to Dashboard from Mobile Account Card */}
              <Link
                to={ROUTES.DASHBOARD}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 font-semibold text-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <GraduationCapIcon className="w-3.5 h-3.5" />
                  <span>Open Student Dashboard</span>
                </div>
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* 1. Home */}
          <NavLink
            to={ROUTES.HOME}
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive && !isIlasWithYouActive
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <GlobeIcon className="w-4 h-4 text-indigo-500" />
              <span>Home</span>
            </div>
            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 opacity-60" />
          </NavLink>

          {/* 2. Courses Accordion */}
          <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
            <button
              type="button"
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-850/60"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <BookOpenIcon className="w-3.5 h-3.5" />
                </div>
                <span>Courses & Languages</span>
              </div>
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${mobileCoursesOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''}`} />
            </button>
            {mobileCoursesOpen && (
              <div className="px-3 pb-2.5 pt-1 space-y-1 text-xs border-t border-slate-200/50 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/40">
                <Link
                  to="/courses?language=German"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>German Language (A1 – C1)</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/courses?language=English"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>IELTS Academic Masterclass</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/courses?language=Spanish"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Spanish (DELE) & French (DELF)</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to={ROUTES.COURSES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center font-bold text-indigo-600 dark:text-indigo-400 p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 mt-1"
                >
                  View All Courses →
                </Link>
              </div>
            )}
          </div>

          {/* 3. Study Abroad */}
          <NavLink
            to={ROUTES.STUDY_ABROAD}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <GraduationCapIcon className="w-4 h-4 text-slate-400" />
              <span>Study Abroad</span>
            </div>
            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 opacity-60" />
          </NavLink>

          {/* 4. Work & Study Accordion */}
          <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
            <button
              type="button"
              onClick={() => setMobileWorkStudyOpen(!mobileWorkStudyOpen)}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-850/60"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/50 dark:border-cyan-800/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <BriefcaseIcon className="w-3.5 h-3.5" />
                </div>
                <span>Work & Study</span>
              </div>
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${mobileWorkStudyOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''}`} />
            </button>
            {mobileWorkStudyOpen && (
              <div className="px-3 pb-2.5 pt-1 space-y-1 text-xs border-t border-slate-200/50 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/40">
                <Link
                  to="/work-and-study#work-study-india"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Work & Study in India</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/work-and-study#work-study-abroad"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Work & Study Abroad</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/work-and-study#german-onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>German Career Projects</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            )}
          </div>

          {/* 5. Visa Services Accordion */}
          <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
            <button
              type="button"
              onClick={() => setMobileVisaOpen(!mobileVisaOpen)}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-850/60"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheckIcon className="w-3.5 h-3.5" />
                </div>
                <span>Visa Services</span>
              </div>
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${mobileVisaOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''}`} />
            </button>
            {mobileVisaOpen && (
              <div className="px-3 pb-2.5 pt-1 space-y-1 text-xs border-t border-slate-200/50 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/40">
                <Link
                  to={ROUTES.VISA_SERVICES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Germany: Chancenkarte & Student Visa</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to={ROUTES.VISA_SERVICES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Canada: SDS & PGWP Work Rights</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to={ROUTES.VISA_SERVICES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>UK: Student & Graduate Route Visa</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to={ROUTES.VISA_SERVICES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center font-bold text-emerald-600 dark:text-emerald-400 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 mt-1"
                >
                  Explore All Visa Routes →
                </Link>
              </div>
            )}
          </div>

          {/* 6. Jobs & Careers */}
          <NavLink
            to={ROUTES.JOBS_AND_CAREERS}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <BriefcaseIcon className="w-4 h-4 text-slate-400" />
              <span>Jobs & Careers</span>
            </div>
            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 opacity-60" />
          </NavLink>

          {/* 7. Rewards */}
          <NavLink
            to={ROUTES.REWARDS}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <AwardIcon className="w-4 h-4 text-slate-400" />
              <span>Rewards</span>
            </div>
            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 opacity-60" />
          </NavLink>

          {/* 8. Products */}
          <NavLink
            to={ROUTES.PRODUCTS}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <LaptopIcon className="w-4 h-4 text-slate-400" />
              <span>Products</span>
            </div>
            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 opacity-60" />
          </NavLink>

          {/* 9. Eligibility Checker */}
          <NavLink
            to={ROUTES.ELIGIBILITY}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <CompassIcon className="w-4 h-4 text-emerald-500" />
              <span>Eligibility Calculator</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
              AI Audit
            </span>
          </NavLink>


          {/* 9. ILAS With You */}
          <Link
            to="/#ilas-with-you"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleIlasWithYouClick(e);
            }}
            className="flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60"
          >
            <div className="flex items-center gap-2.5">
              <HeartHandshakeIcon className="w-4 h-4 text-rose-500" />
              <span>ILAS With You Care</span>
            </div>
            <ChevronRightIcon className="w-3.5 h-3.5 text-rose-400" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
