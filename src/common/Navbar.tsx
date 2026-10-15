import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { 
  GlobeIcon, 
  MenuIcon, 
  XIcon, 
  SparklesIcon, 
  ShieldCheckIcon,
  BriefcaseIcon,
  GraduationCapIcon, 
  AwardIcon, 
  LaptopIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  UserIcon,
  LogOutIcon,
  BookOpenIcon
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
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

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
      return location.pathname === ROUTES.HOME;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_-4px_rgba(0,0,0,0.4)]' 
          : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-slate-200/40 dark:border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (Left) */}
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
            onClick={() => {
              if (location.pathname === ROUTES.HOME) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25 ring-1 ring-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/40">
              <GlobeIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="flex items-center gap-1.5 tracking-tight">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-none">
                ILA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/60">
                GLOBAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) - visible on lg+ */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {/* 1. Home */}
            <NavLink
              to={ROUTES.HOME}
              end
              className={({ isActive }) =>
                `px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold ring-1 ring-indigo-500/20 dark:ring-indigo-400/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Home
            </NavLink>

            {/* 2. All Courses Dropdown */}
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
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                  coursesDropdownOpen || isCurrentActive(ROUTES.COURSES)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold ring-1 ring-indigo-500/20 dark:ring-indigo-400/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={coursesDropdownOpen}
                aria-label="All Courses Dropdown"
              >
                <span>All Courses</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${
                    coursesDropdownOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                  }`} 
                />
              </button>

              <CoursesMegaMenu
                isOpen={coursesDropdownOpen}
                onClose={() => setCoursesDropdownOpen(false)}
              />
            </div>

            {/* 3. Visa Services Dropdown */}
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
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                  visaDropdownOpen || isCurrentActive(ROUTES.VISA_SERVICES)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold ring-1 ring-indigo-500/20 dark:ring-indigo-400/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={visaDropdownOpen}
                aria-label="Visa Services Dropdown"
              >
                <span>Visa Services</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${
                    visaDropdownOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                  }`} 
                />
              </button>

              <VisaMegaMenu
                isOpen={visaDropdownOpen}
                onClose={() => setVisaDropdownOpen(false)}
              />
            </div>

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
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                  workStudyDropdownOpen || isCurrentActive(ROUTES.WORK_AND_STUDY)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold ring-1 ring-indigo-500/20 dark:ring-indigo-400/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={workStudyDropdownOpen}
                aria-label="Work & Study Dropdown"
              >
                <span>Work & Study</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${
                    workStudyDropdownOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                  }`} 
                />
              </button>

              <WorkAndStudyMegaMenu
                isOpen={workStudyDropdownOpen}
                onClose={() => setWorkStudyDropdownOpen(false)}
              />
            </div>

            {/* 5. Study Abroad */}
            <NavLink
              to={ROUTES.STUDY_ABROAD}
              className={({ isActive }) =>
                `px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold ring-1 ring-indigo-500/20 dark:ring-indigo-400/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Study Abroad
            </NavLink>

            {/* 6. Jobs & Careers */}
            <NavLink
              to={ROUTES.JOBS_AND_CAREERS}
              className={({ isActive }) =>
                `px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold ring-1 ring-indigo-500/20 dark:ring-indigo-400/20'
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
                `px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold ring-1 ring-indigo-500/20 dark:ring-indigo-400/20'
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
                `px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold ring-1 ring-indigo-500/20 dark:ring-indigo-400/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              Products
            </NavLink>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Intelli Coach AI Action Badge */}
            <Link
              to="/#intelli-coach"
              className="h-9 px-2.5 sm:px-3 rounded-xl border border-indigo-200/80 dark:border-indigo-800/80 bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-indigo-50/70 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-indigo-950/40 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm hover:shadow-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 group"
              title="Open Intelli Coach AI Assistant"
            >
              <div className="relative flex items-center justify-center">
                <SparklesIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 transition-transform duration-200 group-hover:scale-110" />
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-400"></span>
                </span>
              </div>
              <span className="hidden sm:inline">Intelli Coach</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1 py-0.2 rounded bg-indigo-100/70 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                AI
              </span>
            </Link>

            {/* Theme Switcher Toggle */}
            <ThemeToggle className="h-9 w-9 justify-center rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300 transition-colors" />

            {/* Auth Section */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-1.5 ml-0.5">
                <button
                  type="button"
                  onClick={() => openAuthModal('student', 'login')}
                  className="h-9 px-3 rounded-xl text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('student', 'register')}
                  className="h-9 px-3.5 sm:px-4 rounded-xl text-xs sm:text-[13px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-sm shadow-indigo-600/25 transition-all duration-150 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Get Started</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                {/* Dashboard Shortcut Button */}
                <Link
                  to={ROUTES.DASHBOARD}
                  className="h-9 px-2.5 sm:px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/70 text-xs font-semibold transition-all duration-150 flex items-center gap-1.5"
                  title="Open Student Dashboard"
                >
                  <GraduationCapIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="h-9 px-2 sm:px-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2 transition-colors cursor-pointer"
                    aria-label="User Account Menu"
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[85px] truncate hidden md:inline">
                      {user?.name}
                    </span>
                    <ChevronDownIcon className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Authenticated Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-3 space-y-2 z-50 animate-fade-in">
                      <div className="pb-2.5 border-b border-slate-100 dark:border-slate-800">
                        <div className="font-bold text-sm text-slate-900 dark:text-white truncate">{user?.name}</div>
                        <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium mt-0.5">{user?.identifierCode}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user?.email}</div>
                      </div>

                      <div className="space-y-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Link 
                          to={ROUTES.DASHBOARD} 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <GraduationCapIcon className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Student Dashboard</span>
                          </div>
                          <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                        </Link>
                        <Link 
                          to={ROUTES.COURSES} 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpenIcon className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Courses</span>
                          </div>
                          <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                        </Link>
                        <Link 
                          to="/#intelli-coach" 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <SparklesIcon className="w-3.5 h-3.5 text-amber-500" />
                            <span>Intelli Coach AI</span>
                          </div>
                          <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                        </Link>
                        <Link 
                          to={ROUTES.REWARDS} 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <AwardIcon className="w-3.5 h-3.5 text-slate-400" />
                            <span>Rewards</span>
                          </div>
                          <ChevronRightIcon className="w-3 h-3 text-slate-400" />
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
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
              </div>
            )}

            {/* Mobile / Tablet Menu Button (visible on < lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
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
                <span>Get Started</span>
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
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
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-rose-500 hover:text-rose-600 text-xs font-semibold flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <LogOutIcon className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Accordion 1: All Courses */}
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
                <span>All Courses & Languages</span>
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

          {/* Mobile Accordion 2: Visa Services */}
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
                <span>Visa & Consular Services</span>
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

          {/* Mobile Accordion 3: Work & Study */}
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
                <span>Work & Study Programs</span>
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

          {/* Direct Navigation Links */}
          <div className="space-y-0.5 pt-1">
            {[
              { name: 'Study Abroad', path: ROUTES.STUDY_ABROAD, icon: GraduationCapIcon },
              { name: 'Jobs & Careers', path: ROUTES.JOBS_AND_CAREERS, icon: BriefcaseIcon },
              { name: 'Rewards', path: ROUTES.REWARDS, icon: AwardIcon },
              { name: 'Products', path: ROUTES.PRODUCTS, icon: LaptopIcon },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
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
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
