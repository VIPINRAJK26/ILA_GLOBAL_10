import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  LaptopIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
  BotIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  GlobeIcon,
  UserIcon,
} from '../components/common/Icons';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';
import { ROUTES } from '../routes/paths';

type ProductCategory =
  | 'all'
  | 'courses'
  | 'visa'
  | 'work-study'
  | 'study-abroad'
  | 'jobs'
  | 'ai-tools'
  | 'rewards-portal';

interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  primaryLink: string;
  primaryLabel: string;
  secondaryLink?: string;
  secondaryLabel?: string;
  flag?: string;
}

const ALL_PRODUCTS: ProductItem[] = [
  // 1. Language & Vocational Courses
  {
    id: 'prod-courses-german',
    name: 'German Language Academy (CEFR A1 to C1)',
    category: 'courses',
    categoryLabel: 'Language Academy',
    badge: 'Goethe & Telc Certified',
    badgeColor: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    icon: BookOpenIcon,
    flag: '🇩🇪',
    tagline: 'Master German with native examiners and certified clinical vocabulary.',
    description: 'Intensive instructor-led live batches designed for university entrance (TestDaF), medical doctor & nursing recognition (Fachsprachprüfung), and Chancenkarte immigration.',
    highlights: [
      'Live interactive batches (A1, A2, B1, B2, C1) with certified native examiners',
      'Specialized Medical German & Clinical Communication tracks for healthcare staff',
      'Goethe-Zertifikat, Telc & TestDaF mock examination drills included',
      'Digital curriculum access with 100+ recorded lectures and audio exercises',
    ],
    specs: [
      { label: 'Format', value: 'Live Online & Hybrid' },
      { label: 'Levels', value: 'CEFR A1 – C1' },
      { label: 'Pass Rate', value: '98.4% First-Attempt' },
    ],
    primaryLink: ROUTES.COURSES,
    primaryLabel: 'Explore Course Catalog',
  },
  {
    id: 'prod-courses-ielts-languages',
    name: 'IELTS Academic & European Language Tracks',
    category: 'courses',
    categoryLabel: 'Language Academy',
    badge: 'Band 7.5+ Guaranteed Blueprint',
    badgeColor: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: BookOpenIcon,
    flag: '🇬🇧 🇪🇸 🇫🇷',
    tagline: 'Top-band English, Spanish (DELE), and French (DELF) tracks.',
    description: 'High-impact test preparation for international university admissions and migration dockets. Master writing Task 2 structures and consular speaking fluency.',
    highlights: [
      'Personalized 1-on-1 writing essay assessments and grammar breakdowns',
      'Speaking mock examinations with certified Cambridge & British Council trainers',
      'Spanish (DELE A1-B2) & French (DELF A1-B2) immersion tracks',
      'Full bank of 40+ full-length computer-delivered mock tests',
    ],
    specs: [
      { label: 'Target', value: 'IELTS Band 7.5+' },
      { label: 'Languages', value: 'English, Spanish, French' },
      { label: 'Materials', value: 'Official Cambridge Tests' },
    ],
    primaryLink: ROUTES.COURSES,
    primaryLabel: 'View Language Programs',
  },

  // 2. Visa & Consular Services
  {
    id: 'prod-visa-chancenkarte',
    name: 'Germany Chancenkarte (Opportunity Card) Filing',
    category: 'visa',
    categoryLabel: 'Visa & Immigration',
    badge: 'New Immigration Route',
    badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: ShieldCheckIcon,
    flag: '🇩🇪',
    tagline: 'Point-based fast-track work search visa to live and work in Germany.',
    description: 'Full legal dossier compilation under Germany’s newest immigration act. Includes point matrix audit, foreign degree recognition (ZAB), and expedited consular submission.',
    highlights: [
      'Comprehensive 6-point eligibility audit & score maximization strategy',
      'Foreign qualification equivalence filing with ZAB / Anabin database',
      'Sperrkonto (blocked account) and health insurance docket setup',
      'Consular interview defense preparation with legal immigration specialists',
    ],
    specs: [
      { label: 'Destination', value: 'Germany' },
      { label: 'Validity', value: '1 Year Search Permit' },
      { label: 'Work Rights', value: '20 hrs/wk + 2 wk Trial' },
    ],
    primaryLink: ROUTES.VISA_SERVICES,
    primaryLabel: 'File Visa Application',
    secondaryLink: '/#eligibility-checker',
    secondaryLabel: 'Check Eligibility',
  },
  {
    id: 'prod-visa-student-dockets',
    name: 'National Student Visas (Germany, Canada & UK)',
    category: 'visa',
    categoryLabel: 'Visa & Immigration',
    badge: '99.4% Approval Track',
    badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: ShieldCheckIcon,
    flag: '🇩🇪 🇨🇦 🇬🇧',
    tagline: 'End-to-end consular filing and financial proof orchestration.',
    description: 'Guaranteed consular filing for Germany National Student Visas, Canada SDS / Non-SDS study permits, and UK Student Routes. Zero paperwork headaches.',
    highlights: [
      'Official blocked account verification (Coracle / Expatrio partner network)',
      'Statement of Purpose (SOP) crafting and consular compliance vetting',
      'VFS Global & Embassy biometric appointment coordination',
      'Post-arrival visa extension and residence permit guidance',
    ],
    specs: [
      { label: 'Destinations', value: 'Germany, Canada, UK, EU' },
      { label: 'Success Rate', value: '99.4% Verified' },
      { label: 'Processing', value: 'Dedicated Consular Desk' },
    ],
    primaryLink: ROUTES.VISA_SERVICES,
    primaryLabel: 'Explore Visa Tracks',
  },

  // 3. Work & Study Blueprints
  {
    id: 'prod-work-study-dual',
    name: 'Work & Study Dual-Degree Blueprints',
    category: 'work-study',
    categoryLabel: 'Work & Study',
    badge: 'Earn While You Learn',
    badgeColor: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    icon: BriefcaseIcon,
    flag: '🇩🇪 🇦🇹',
    tagline: 'Graduate debt-free with legal employment contracts paying €14–€24/hr.',
    description: 'Combining accredited European university degrees with 20 hours/week legal student contracts and guaranteed paid co-op semesters to fully cover living expenses.',
    highlights: [
      'Legal 20 hrs/week part-time employment placement under German & EU labor laws',
      'Guaranteed hourly wages ranging from €14.00 to €24.00 / hour',
      'Full monthly living cost coverage (€950–€1,400/month earning potential)',
      'Dual-study university matching (Duales Studium) with corporate tuition sponsorship',
    ],
    specs: [
      { label: 'Earning Potential', value: '€14 – €24 / hr' },
      { label: 'Monthly Income', value: '€1,100 – €1,900 / mo' },
      { label: 'Legal Hours', value: '20 hrs/wk (140 full days)' },
    ],
    primaryLink: ROUTES.WORK_AND_STUDY,
    primaryLabel: 'Calculate Student Budget',
  },

  // 4. Study Abroad & University Placement
  {
    id: 'prod-study-abroad-admissions',
    name: 'Tuition-Free Public University Admissions',
    category: 'study-abroad',
    categoryLabel: 'Study Abroad',
    badge: '300+ Partner Universities',
    badgeColor: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    icon: GraduationCapIcon,
    flag: '🇩🇪 🇦🇹 🇨🇦',
    tagline: 'Direct admission into premier European public research universities.',
    description: 'Secure direct bachelor and master degree admission into Germany and Austria’s world-ranking public universities offering 100% tuition-free education in English and German.',
    highlights: [
      'Direct admissions to TU Munich, RWTH Aachen, Heidelberg, and LMU Munich',
      'Zero tuition fees across state universities in Germany and Austria',
      'Uni-Assist VPD evaluation, document notarization, and portfolio formatting',
      'Studienkolleg foundation preparation for high school graduates',
    ],
    specs: [
      { label: 'Tuition Cost', value: '€0 (Zero Tuition)' },
      { label: 'Programs', value: '1,800+ English Tracks' },
      { label: 'Institutions', value: 'Top 100 Global Rank' },
    ],
    primaryLink: ROUTES.STUDY_ABROAD,
    primaryLabel: 'Explore Destinations',
  },

  // 5. Jobs & Careers Network
  {
    id: 'prod-jobs-careers-placement',
    name: 'International Jobs & Employer Visa Sponsorships',
    category: 'jobs',
    categoryLabel: 'Jobs & Careers',
    badge: '1,200+ Hiring Partners',
    badgeColor: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    icon: BriefcaseIcon,
    flag: '🇩🇪 🇮🇪 🇬🇧',
    tagline: 'Fast-track international employment with EU Blue Card sponsorships.',
    description: 'Direct recruitment and licensing pathways for software engineers, cloud architects, registered nurses, medical professionals, and mechanical engineers across Europe.',
    highlights: [
      'Software & IT direct recruitment (€65,000 – €95,000 / year salary range)',
      'Healthcare & Registered Nurse licensing (Anerkennung) with zero recruitment fees',
      'Mechanical & Automotive Blue Card sponsorships in Stuttgart and Munich',
      'Europass resume optimization and AI-powered consular interview prep',
    ],
    specs: [
      { label: 'Salary Range', value: '€42,000 – €95,000 / yr' },
      { label: 'Sponsorship', value: 'EU Blue Card' },
      { label: 'Locations', value: 'Germany, UK, Ireland' },
    ],
    primaryLink: ROUTES.JOBS_AND_CAREERS,
    primaryLabel: 'View Career Openings',
  },

  // 6. AI & Technology Digital Products
  {
    id: 'prod-ai-intelli-coach',
    name: 'Intelli Coach AI Suite',
    category: 'ai-tools',
    categoryLabel: 'AI & Digital Tools',
    badge: 'Flagship AI Tool',
    badgeColor: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent',
    icon: BotIcon,
    tagline: '24/7 AI-driven counseling and consular mock interview simulator.',
    description: 'Proprietary artificial intelligence engine trained on embassy interview patterns, German admission rubrics, and CEFR speaking evaluations. Practice anytime with instant feedback.',
    highlights: [
      'Interactive consular mock interview drills with instant readiness scores',
      'Real-time language grammar feedback and CEFR speaking assessments',
      'ATS resume and statement of purpose keyword optimization',
      'Personalized scholarship and university shortlisting algorithms',
    ],
    specs: [
      { label: 'Availability', value: '24/7 Instant' },
      { label: 'Accuracy', value: 'Consular Defense Calibrated' },
      { label: 'Feedback', value: 'Instant Audio & Text' },
    ],
    primaryLink: '/#intelli-coach',
    primaryLabel: 'Try Intelli Coach AI',
  },
  {
    id: 'prod-ai-eligibility-estimator',
    name: 'Instant Visa & Eligibility Estimator',
    category: 'ai-tools',
    categoryLabel: 'AI & Digital Tools',
    badge: 'Free Interactive Tool',
    badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: LaptopIcon,
    tagline: 'Calculate your visa likelihood and earning potential in 30 seconds.',
    description: 'Automated multi-factor calculator that audits Chancenkarte points, part-time student earnings, and tuition-free university admission matches without human delay.',
    highlights: [
      'Instant German Chancenkarte point calculation (age, qualification, language, ties)',
      'Projected monthly student wage & blocked account requirement estimator',
      'Fast-track university shortlist generation tailored to undergraduate GPA',
      'Instant downloadable PDF preparation docket',
    ],
    specs: [
      { label: 'Duration', value: 'Under 30 Seconds' },
      { label: 'Cost', value: '100% Free' },
      { label: 'Calculation', value: 'Chancenkarte & SDS' },
    ],
    primaryLink: '/#eligibility-checker',
    primaryLabel: 'Launch Free Estimator',
  },
  {
    id: 'prod-ilas-on-ground',
    name: 'ILAS With You: On-Ground Arrival Concierge',
    category: 'ai-tools',
    categoryLabel: 'Support Ecosystem',
    badge: 'Arrival Companion',
    badgeColor: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: GlobeIcon,
    flag: '🇪🇺',
    tagline: 'Complete landing assistance from airport tarmac to student dorms.',
    description: 'Never feel lost abroad. Our European on-ground field team handles airport meet & greets, blocked account unfreezing, legal city registration (Anmeldung), and SIM cards.',
    highlights: [
      'Airport pickup and guaranteed private transport to student accommodation',
      'City council registration (Anmeldung) and tax ID paperwork handling',
      'Bank blocked account unfreezing and local debit card activation',
      'WhatsApp emergency helpline and local student buddy community circles',
    ],
    specs: [
      { label: 'Locations', value: 'Berlin, Munich, Frankfurt, Vienna' },
      { label: 'Coverage', value: 'First 30 Days Arrival' },
      { label: 'Helpline', value: '24/7 WhatsApp Desk' },
    ],
    primaryLink: '/#ilas-with-you',
    primaryLabel: 'Explore On-Ground Care',
  },

  // 7. Rewards & Student Portal
  {
    id: 'prod-rewards-loyalty',
    name: 'ILA Student Rewards & Loyalty Club',
    category: 'rewards-portal',
    categoryLabel: 'Rewards & Perks',
    badge: 'Student Loyalty Program',
    badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    icon: AwardIcon,
    tagline: 'Earn redeemable points for attendance, exam scores, and milestones.',
    description: 'Every milestone on your journey earns points. Redeem them for official Goethe / TestDaF exam fee vouchers, consular filing fee waivers, and student cash bonuses.',
    highlights: [
      'Earn points for on-time class attendance and mock test submissions',
      'Redeem €50–€100 exam vouchers for Goethe, Telc, and IELTS tests',
      'Tier upgrades (Bronze, Silver, Gold, Platinum) with VIP consular priority',
      'Referral bonuses of up to €150 credited directly to student accounts',
    ],
    specs: [
      { label: 'Perks', value: 'Exam Vouchers & Cash' },
      { label: 'Tiers', value: 'Bronze to Platinum' },
      { label: 'Redemption', value: 'Instant Code' },
    ],
    primaryLink: ROUTES.REWARDS,
    primaryLabel: 'Explore Rewards Club',
  },
  {
    id: 'prod-student-dashboard',
    name: 'Integrated Student Portal & Dashboard',
    category: 'rewards-portal',
    categoryLabel: 'Digital Portal',
    badge: 'Member Exclusive',
    badgeColor: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    icon: UserIcon,
    tagline: 'Your centralized command center for courses, applications, and documents.',
    description: 'A personalized portal for enrolled students to manage lecture batches, track embassy visa dossiers in real-time, store notarized documents in the vault, and review AI coaching.',
    highlights: [
      'Interactive CEFR level progression bars and live lecture room shortcuts',
      'Application tracking stepper with real-time consular officer status notes',
      'Secure Document Locker for notarized transcripts, passport, and Sperrkonto slips',
      'Interactive preparation checklist and milestones tracker',
    ],
    specs: [
      { label: 'Access', value: 'Authenticated Students' },
      { label: 'Security', value: 'Encrypted Vault' },
      { label: 'Sync', value: 'Real-Time Updates' },
    ],
    primaryLink: ROUTES.DASHBOARD,
    primaryLabel: 'Open Student Dashboard',
  },
];

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Array<{ id: ProductCategory; label: string; count: number }> = [
    { id: 'all', label: 'All Products', count: ALL_PRODUCTS.length },
    {
      id: 'courses',
      label: 'Language Courses',
      count: ALL_PRODUCTS.filter((p) => p.category === 'courses').length,
    },
    {
      id: 'visa',
      label: 'Visa & Consular',
      count: ALL_PRODUCTS.filter((p) => p.category === 'visa').length,
    },
    {
      id: 'work-study',
      label: 'Work & Study',
      count: ALL_PRODUCTS.filter((p) => p.category === 'work-study').length,
    },
    {
      id: 'study-abroad',
      label: 'Study Abroad',
      count: ALL_PRODUCTS.filter((p) => p.category === 'study-abroad').length,
    },
    {
      id: 'jobs',
      label: 'Jobs & Careers',
      count: ALL_PRODUCTS.filter((p) => p.category === 'jobs').length,
    },
    {
      id: 'ai-tools',
      label: 'AI & Digital Tools',
      count: ALL_PRODUCTS.filter((p) => p.category === 'ai-tools').length,
    },
    {
      id: 'rewards-portal',
      label: 'Rewards & Portal',
      count: ALL_PRODUCTS.filter((p) => p.category === 'rewards-portal').length,
    },
  ];

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.highlights.some((h) => h.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-semibold">
            <LaptopIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>ILA Global Unified Product Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Everything You Need for Your Global Career,{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              All in One Place
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            From CEFR language mastery and dual-degree work contracts to consular visa dockets, European job sponsorships, and AI-powered interview coaches. Explore our full suite of integrated products.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">8+</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Core Product Tracks</div>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">99.4%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Visa & Filing Success</div>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">€0</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tuition Pathways</div>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-amber-500">24/7</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">AI Coach Support</div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Navigation */}
        <div className="space-y-4">
          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search products (e.g. 'German', 'Visa', 'Work-Study', 'Nursing', 'AI Coach')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 pl-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-3xl">🔍</div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              No products found matching "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your keywords or select "All Products" to browse the full catalog.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500/40 hover:shadow-xl dark:hover:shadow-indigo-950/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Category Badge & Flags */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${product.badgeColor}`}
                      >
                        {product.badge}
                      </span>
                      {product.flag && (
                        <span className="text-lg" title="Supported Destinations">
                          {product.flag}
                        </span>
                      )}
                    </div>

                    {/* Product Name & Icon */}
                    <div className="mt-4 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                          {product.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Specs Chips Row */}
                    <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="text-center">
                          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                            {spec.label}
                          </div>
                          <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-4 space-y-2">
                      {product.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-2">
                    <Link
                      to={product.primaryLink}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer text-center"
                    >
                      <span>{product.primaryLabel}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>

                    {product.secondaryLink && (
                      <Link
                        to={product.secondaryLink}
                        className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors text-center whitespace-nowrap cursor-pointer"
                      >
                        {product.secondaryLabel}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Global Product Consultation Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-10 relative overflow-hidden border border-indigo-800/40 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-200 border border-white/15">
                <SparklesIcon className="w-3.5 h-3.5 text-yellow-300" />
                <span>Need Personalized Product Guidance?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                Custom Blueprint for Your Destination & Career
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
                Whether you need language tracks bundled with Chancenkarte visa filing, or dual-study placement with consular blocked account setup, our senior counselors will map your personalized pathway.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="#products-enquiry"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 text-xs sm:text-sm font-black shadow-lg shadow-black/20 transition-all text-center cursor-pointer"
              >
                Request Custom Package
              </a>
              <Link
                to="/#intelli-coach"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-700/60 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold border border-indigo-500/40 transition-colors text-center flex items-center justify-center gap-2"
              >
                <BotIcon className="w-4 h-4 text-indigo-200" />
                <span>Ask Intelli Coach AI</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dedicated Products & Digital Suite Demo Enquiry Form */}
        <div id="products-enquiry" className="pt-4">
          <PageEnquiryForm pageType="products" />
        </div>
      </div>
    </div>
  );
};

export default Products;