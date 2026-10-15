import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { 
  GlobeIcon, 
  BotIcon, 
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
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]' 
          : 'bg-white/75 dark:bg-slate-950/75 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50'
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
            <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <GlobeIcon className="w-4 h-4" />
            </div>
            <div className="flex items-baseline tracking-tight">
              <span className="font-bold text-base text-slate-900 dark:text-white">
                ILA
              </span>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 ml-1 tracking-wider uppercase">
                GLOBAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden xl:flex items-center gap-1">
            {/* 1. Home */}
            <NavLink
              to={ROUTES.HOME}
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
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
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  coursesDropdownOpen || isCurrentActive(ROUTES.COURSES)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`}
                aria-expanded={coursesDropdownOpen}
                aria-label="All Courses Dropdown"
              >
                <span>All Courses</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                    coursesDropdownOpen ? 'rotate-180 opacity-100' : ''
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
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  visaDropdownOpen || isCurrentActive(ROUTES.VISA_SERVICES)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`}
                aria-expanded={visaDropdownOpen}
                aria-label="Visa Services Dropdown"
              >
                <span>Visa Services</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                    visaDropdownOpen ? 'rotate-180 opacity-100' : ''
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
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  workStudyDropdownOpen || isCurrentActive(ROUTES.WORK_AND_STUDY)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`}
                aria-expanded={workStudyDropdownOpen}
                aria-label="Work & Study Dropdown"
              >
                <span>Work & Study</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                    workStudyDropdownOpen ? 'rotate-180 opacity-100' : ''
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
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`
              }
            >
              Study Abroad
            </NavLink>

            {/* 6. Jobs & Careers */}
            <NavLink
              to={ROUTES.JOBS_AND_CAREERS}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`
              }
            >
              Jobs & Careers
            </NavLink>

            {/* 7. Rewards */}
            <NavLink
              to={ROUTES.REWARDS}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`
              }
            >
              Rewards
            </NavLink>

            {/* 8. Products */}
            <NavLink
              to={ROUTES.PRODUCTS}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`
              }
            >
              Products
            </NavLink>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Switcher Toggle */}
            <ThemeToggle className="h-8 w-8 justify-center rounded-lg" />

            {/* Auth Section */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-1.5 ml-1">
                <button
                  type="button"
                  onClick={() => openAuthModal('student', 'login')}
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('student', 'register')}
                  className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors cursor-pointer"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Dashboard Shortcut Button */}
                <Link
                  to={ROUTES.DASHBOARD}
                  className="h-8 px-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  title="Open Student Dashboard"
                >
                  <GraduationCapIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="h-8 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    aria-label="User Account Menu"
                  >
                    <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {user?.name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 max-w-[85px] truncate hidden md:inline">
                      {user?.name}
                    </span>
                    <ChevronDownIcon className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>

                  {/* Authenticated Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 space-y-2 z-50">
                      <div className="pb-2.5 border-b border-slate-100 dark:border-slate-800">
                        <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">{user?.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{user?.identifierCode}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 truncate">{user?.email}</div>
                      </div>

                      <div className="space-y-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Link 
                          to={ROUTES.DASHBOARD} 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <span>Student Dashboard</span>
                          <GraduationCapIcon className="w-3.5 h-3.5 text-indigo-500" />
                        </Link>
                        <Link 
                          to={ROUTES.COURSES} 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <span>My Courses</span>
                          <BookOpenIcon className="w-3.5 h-3.5 text-slate-400" />
                        </Link>
                        <Link 
                          to="/#intelli-coach" 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <span>Intelli Coach AI</span>
                          <SparklesIcon className="w-3.5 h-3.5 text-amber-500" />
                        </Link>
                        <Link 
                          to={ROUTES.REWARDS} 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <span>Rewards</span>
                          <AwardIcon className="w-3.5 h-3.5 text-slate-400" />
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-1.5 p-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <LogOutIcon className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Intelli Coach AI Action */}
            <Link
              to="/#intelli-coach"
              className="h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 ml-1"
            >
              <BotIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Intelli Coach</span>
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-8 w-8 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile Auth Banner */}
          {!isAuthenticated ? (
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-850">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('student', 'login');
                }}
                className="py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5"
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
                className="py-2 px-3 rounded-lg bg-indigo-600 text-xs font-semibold text-white flex items-center justify-center gap-1.5"
              >
                <span>Register</span>
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">{user?.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{user?.identifierCode}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-rose-500 text-xs font-semibold flex items-center gap-1"
              >
                <LogOutIcon className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Accordion 1: All Courses */}
          <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/60"
            >
              <div className="flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4 text-indigo-500" />
                <span>All Courses & Languages</span>
              </div>
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${mobileCoursesOpen ? 'rotate-180 opacity-100' : ''}`} />
            </button>
            {mobileCoursesOpen && (
              <div className="px-3 pb-2.5 pt-1 space-y-1 text-xs border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/courses?language=German"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>German Language (A1 – C1)</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/courses?language=English"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>IELTS Academic Masterclass</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/courses?language=Spanish"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Spanish (DELE) & French (DELF)</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to={ROUTES.COURSES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center font-semibold text-indigo-600 dark:text-indigo-400 p-2 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 mt-1"
                >
                  View All Courses →
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Accordion 2: Visa Services */}
          <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileVisaOpen(!mobileVisaOpen)}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/60"
            >
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
                <span>Visa & Consular Services</span>
              </div>
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${mobileVisaOpen ? 'rotate-180 opacity-100' : ''}`} />
            </button>
            {mobileVisaOpen && (
              <div className="px-3 pb-2.5 pt-1 space-y-1 text-xs border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={ROUTES.VISA_SERVICES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Germany: Chancenkarte & Student Visa</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to={ROUTES.VISA_SERVICES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Canada: SDS & PGWP Work Rights</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to={ROUTES.VISA_SERVICES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>UK: Student & Graduate Route Visa</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to={ROUTES.VISA_SERVICES}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center font-semibold text-emerald-600 dark:text-emerald-400 p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 mt-1"
                >
                  Explore All Visa Routes →
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Accordion 3: Work & Study */}
          <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileWorkStudyOpen(!mobileWorkStudyOpen)}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/60"
            >
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4 text-cyan-500" />
                <span>Work & Study Programs</span>
              </div>
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${mobileWorkStudyOpen ? 'rotate-180 opacity-100' : ''}`} />
            </button>
            {mobileWorkStudyOpen && (
              <div className="px-3 pb-2.5 pt-1 space-y-1 text-xs border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/work-and-study#work-study-india"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Work & Study in India</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/work-and-study#work-study-abroad"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <span>Work & Study Abroad</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/work-and-study#german-onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
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
                    `flex items-center justify-between p-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 opacity-50" />
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
