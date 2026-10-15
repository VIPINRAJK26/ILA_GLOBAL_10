import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router';
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
import { ROUTES } from '../routes/paths';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);




  const userMenuRef = useRef<HTMLDivElement>(null);
  const coursesMenuRef = useRef<HTMLDivElement>(null);
  const coursesHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();


  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const handleCoursesMouseEnter = () => {
    if (coursesHoverTimeoutRef.current) {
      clearTimeout(coursesHoverTimeoutRef.current);
    }
    setCoursesDropdownOpen(true);
  };

  const handleCoursesMouseLeave = () => {
    coursesHoverTimeoutRef.current = setTimeout(() => {
      setCoursesDropdownOpen(false);
    }, 180);
  };

  // Scroll elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (coursesMenuRef.current && !coursesMenuRef.current.contains(event.target as Node)) {
        setCoursesDropdownOpen(false);
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
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME, icon: GlobeIcon },
    { name: 'All Courses', path: ROUTES.COURSES, icon: BookOpenIcon },
    { name: 'Visa Services', path: ROUTES.VISA_SERVICES, icon: ShieldCheckIcon },
    { name: 'Work & Study', path: ROUTES.WORK_AND_STUDY, icon: BriefcaseIcon },
    { name: 'Study Abroad', path: ROUTES.STUDY_ABROAD, icon: GraduationCapIcon },
    { name: 'Jobs & Careers', path: ROUTES.JOBS_AND_CAREERS, icon: BriefcaseIcon },
    { name: 'Rewards', path: ROUTES.REWARDS, icon: AwardIcon },
    { name: 'Products', path: ROUTES.PRODUCTS, icon: LaptopIcon },
  ];

  const getRoleLabel = () => {
    return 'Student';
  };

  const getRoleBadgeColor = () => {
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30';
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md dark:shadow-black/50 border-b border-slate-200 dark:border-slate-800' 
        : 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80'
    }`}>
      {/* Top micro vibrant accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
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
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
              <GlobeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                ILA GLOBAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden xl:flex items-center gap-1">
            {/* Home link */}
            <NavLink
              to={ROUTES.HOME}
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900/60'
                }`
              }
            >
              Home
            </NavLink>

            {/* ALL COURSES DROPDOWN TRIGGER (HOVER SUPPORT) */}
            <div 
              className="relative" 
              ref={coursesMenuRef}
              onMouseEnter={handleCoursesMouseEnter}
              onMouseLeave={handleCoursesMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  setCoursesDropdownOpen(false);
                  navigate(ROUTES.COURSES);
                }}
                className={`px-3 py-1.5 rounded-xl text-[13px] font-medium  transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  coursesDropdownOpen || location.pathname === ROUTES.COURSES
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900/60'
                }`}
                aria-expanded={coursesDropdownOpen}
                aria-label="All Language and Industry Courses Dropdown"
              >
                <span>All Courses</span>
                <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`} />
              </button>

              {/* Courses Dropdown */}
              <CoursesMegaMenu
                isOpen={coursesDropdownOpen}
                onClose={() => setCoursesDropdownOpen(false)}
              />
            </div>

            {/* Remaining Nav Links */}
            {navLinks.filter((item) => item.path !== ROUTES.HOME && item.path !== ROUTES.COURSES).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900/60'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Switcher Toggle */}
            <ThemeToggle className="h-9 w-9 justify-center" />

            {/* Auth Segment / User Menu */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <button
                  type="button"
                  onClick={() => openAuthModal('student', 'login')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
                  title="Sign in to your student account"
                >
                  <UserIcon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Sign In</span>
                </button>
                <div className="w-[1px] h-3.5 bg-slate-200 dark:bg-slate-800" />
                <button
                  type="button"
                  onClick={() => openAuthModal('student', 'register')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1"
                  title="Students can register a free account"
                >
                  <span>Register</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold">• Free</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Dedicated Student Dashboard Header Button */}
                {/* <Link
                  to={ROUTES.DASHBOARD}
                  className="h-9 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  title="Open Student Dashboard"
                >
                  <GraduationCapIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="hidden sm:inline">Student Dashboard</span>
                </Link> */}

                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="h-9 px-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    aria-label="User Account Menu"
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                      {user?.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[90px] truncate hidden md:inline">
                      {user?.name}
                    </span>
                    <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>

                  {/* Authenticated Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 space-y-3 z-50 animate-fade-in">
                      <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-[170px]">{user?.name}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getRoleBadgeColor()}`}>
                            {getRoleLabel()}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">{user?.identifierCode}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 truncate">{user?.email}</div>
                      </div>

                      {/* Primary Student Dashboard Shortcut */}
                      <Link 
                        to={ROUTES.DASHBOARD} 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <GraduationCapIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>Student Dashboard</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-900/60">Portal →</span>
                      </Link>

                      {/* Student Actions */}
                      <div className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <Link 
                          to="/courses" 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <span>Browse Enrolled Language Tracks</span>
                          <BookOpenIcon className="w-3.5 h-3.5 text-indigo-500" />
                        </Link>
                      <Link 
                        to="/#intelli-coach" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <span>Intelli Coach AI Session</span>
                        <SparklesIcon className="w-3.5 h-3.5 text-yellow-400" />
                      </Link>
                      <Link 
                        to={ROUTES.REWARDS} 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <span>My Rewards Balance (1,250 pts)</span>
                        <AwardIcon className="w-3.5 h-3.5 text-amber-500" />
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <LogOutIcon className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
                </div>
              </div>
            )}

            {/* Intelli Coach AI Action (Flagship CTA) */}
            <Link
              to="/#intelli-coach"
              className="h-9 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <BotIcon className="w-4 h-4 text-indigo-200" />
              <span>Intelli Coach AI</span>
              <SparklesIcon className="w-3.5 h-3.5 text-yellow-300 animate-pulse hidden md:inline" />
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 dark:bg-slate-950/98 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-200 dark:border-slate-800/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Navigation & Portals
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle showLabel={true} />
            </div>
          </div>

          {/* All Courses Highlight Banner (Mobile) */}
          <Link
            to={ROUTES.COURSES}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-700 dark:text-indigo-300"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🇩🇪 🇪🇸 🇫🇷</span>
              <div>
                <div className="font-extrabold text-slate-900 dark:text-white">All Courses & Language Tracks</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">IT, Healthcare, Engineering & CEFR A1-C1</div>
              </div>
            </div>
            <span className="px-2 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-bold">
              Explore & Apply →
            </span>
          </Link>

          {/* Mobile Auth Banner / Status */}
          {!isAuthenticated ? (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Member & Student Access</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  Open Registration
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('student', 'login');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <UserIcon className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Student Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('student', 'register');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <GraduationCapIcon className="w-3.5 h-3.5" />
                  <span>Student Register</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
                      {getRoleLabel()} • {user?.identifierCode}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>

              <Link
                to={ROUTES.DASHBOARD}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <GraduationCapIcon className="w-4 h-4" />
                <span>Open Student Dashboard</span>
              </Link>
            </div>
          )}

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ROUTES.HOME}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-xl text-left text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 shadow-sm'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Drawer Bottom Callout */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <Link
              to="/#intelli-coach"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <BotIcon className="w-4 h-4" />
              <span>Launch Intelli Coach AI Session</span>
            </Link>

            <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span>98.7% Visa Approval</span>
              <span>•</span>
              <span>150+ Universities</span>
              <span>•</span>
              <span>25+ Destinations</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
