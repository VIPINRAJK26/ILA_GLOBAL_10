import React, { useState } from 'react';
import { 
  GraduationCapIcon, 
  ShieldCheckIcon, 
  BriefcaseIcon, 
  GlobeIcon, 
  AwardIcon, 
  HeartHandshakeIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  SparklesIcon
} from '../common/Icons';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'education' | 'visa' | 'work' | 'study' | 'career' | 'rewards' | 'support';
  tag: string;
  icon: React.FC<{ className?: string }>;
  accentColor: string;
  badgeColor: string;
  metric: string;
  metricLabel: string;
  shortDesc: string;
  detailedDesc: string;
  keyPoints: string[];
  intelliCoachRole: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'education',
    name: 'Education Section',
    category: 'education',
    tag: 'Academic Pathways',
    icon: GraduationCapIcon,
    accentColor: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    metric: '150+',
    metricLabel: 'Partner Universities & Colleges',
    shortDesc: 'End-to-end academic admissions, test preparation, profile shortlisting, and degree recognition.',
    detailedDesc: 'Our Education section unlocks direct pathways to premier bachelor’s, master’s, MBA, and PhD programs across the globe. From standardized test prep (IELTS, TOEFL, GRE, GMAT, German A1–C1) to personalized academic evaluation, we map your educational journey to top-tier international credentials.',
    keyPoints: [
      'Profile evaluation & curated university shortlisting matching your GPA',
      'Intensive IELTS, TOEFL, GRE, and European language preparation',
      'Academic credential evaluation & official transcript translation',
      'Admission essay, SOP, and reference letter (LOR) drafting support'
    ],
    intelliCoachRole: 'Intelli Coach analyzes your marksheet & suggests the exact university tiers where you have the highest admission probability.'
  },
  {
    id: 'visa',
    name: 'Visa Services',
    category: 'visa',
    tag: 'Consular Excellence',
    icon: ShieldCheckIcon,
    accentColor: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    metric: '98.7%',
    metricLabel: 'Verified Visa Approval Rate',
    shortDesc: 'High-precision visa filing, consular interview mock training, and complete documentation audits.',
    detailedDesc: 'Navigating embassy protocols requires flawless accuracy. We handle Student Visas, Post-Study Work Permits, Germany Opportunity Cards (Chancenkarte), Schengen Visas, and Tourist Visas. Our licensed visa strategists eliminate red flags before your file touches consular hands.',
    keyPoints: [
      'Comprehensive document verification & embassy cover letter drafting',
      'Blocked account (Sperrkonto), health insurance & proof-of-funds clearance',
      'Simulated 1-on-1 embassy mock interviews with senior visa counselors',
      'Real-time visa application status tracking and biometrics appointment booking'
    ],
    intelliCoachRole: 'Intelli Coach tests your mock answers with AI speech & sentiment analysis to ensure zero consular hesitation.'
  },
  {
    id: 'workstudy',
    name: 'Work and Study',
    category: 'work',
    tag: 'Earn While Learning',
    icon: BriefcaseIcon,
    accentColor: 'from-cyan-500 to-blue-600',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    metric: '€14 – €24',
    metricLabel: 'Average Hourly Student Earnings',
    shortDesc: 'Dual-track blueprints that empower you to study internationally while earning legal student income.',
    detailedDesc: 'Finance your living expenses abroad with structured work-and-study programs. We guide you through legal work limits (e.g., 140 full days in Germany, 20 hrs/week in UK & Canada), secure high-paying Werkstudent (working student) contracts, and build career-advancing co-op placements.',
    keyPoints: [
      'Legal work authorization guidance tailored to host country laws',
      'High-paying on-campus and off-campus student job placement assistance',
      'Werkstudent and paid internship contract negotiation support',
      'Smooth transition strategies from student status to full-time work visa upon graduation'
    ],
    intelliCoachRole: 'Intelli Coach maps your class schedule with optimal student job vacancies to prevent academic burnout while maximizing pay.'
  },
  {
    id: 'studyabroad',
    name: 'Study Abroad',
    category: 'study',
    tag: 'Global Mobility',
    icon: GlobeIcon,
    accentColor: 'from-purple-500 to-indigo-600',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    metric: '€0 Tuition',
    metricLabel: 'At Public Universities in Germany',
    shortDesc: 'Direct access to premier destinations: Germany, UK, USA, Canada, Australia, and European hubs.',
    detailedDesc: 'Explore world-class academic ecosystems with tailored support. Whether you want tuition-free higher education at public German universities, STEM OPT extensions in the USA, or fast-track Post-Graduation Work Permits in Canada, our international team charts the clearest route.',
    keyPoints: [
      'Targeted guidance for Germany, UK, USA, Canada, Australia, Ireland & Europe',
      'Scholarship matchmaking (DAAD, Erasmus+, Commonwealth, institutional grants)',
      'Intake calendar planning (Winter/Fall and Summer/Spring intakes)',
      'Pre-departure orientation sessions with current international students'
    ],
    intelliCoachRole: 'Intelli Coach compares cost-of-living, tuition costs, and post-study PR policies across 6 countries in one click.'
  },
  {
    id: 'careers',
    name: 'Jobs and Careers',
    category: 'career',
    tag: 'International Employment',
    icon: BriefcaseIcon,
    accentColor: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    metric: '1,200+',
    metricLabel: 'Hiring Partners Across Europe & US',
    shortDesc: 'International job matchmaking, visa sponsorship recruitment, and ATS-proof resume re-engineering.',
    detailedDesc: 'Turn your global degree or professional expertise into high-paying global employment. We work directly with hiring partners in Germany, UK, Netherlands, and North America to place candidates in tech, healthcare, engineering, finance, and supply chain roles that provide full visa sponsorship.',
    keyPoints: [
      'European Europass & North American ATS-optimized resume/CV rewrites',
      'Job matching with employers offering certified visa sponsorship',
      'Technical interview coaching & salary negotiation strategy',
      'Chancenkarte (Germany Opportunity Card) direct job search placement support'
    ],
    intelliCoachRole: 'Intelli Coach scans job descriptions and optimizes your resume keywords to achieve an 85%+ ATS match score.'
  },
  {
    id: 'rewards',
    name: 'Rewards Program',
    category: 'rewards',
    tag: 'Community Loyalty',
    icon: AwardIcon,
    accentColor: 'from-yellow-400 to-amber-600',
    badgeColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
    metric: '10,000+',
    metricLabel: 'ILA Points Given Out Monthly',
    shortDesc: 'Earn valuable points across your journey and redeem them for fee discounts, IELTS vouchers, and cash.',
    detailedDesc: 'Your ambition deserves recognition. The ILA Global Rewards ecosystem awards points whenever you hit milestone achievements—completing your profile, enrolling in test prep, submitting university applications, or referring fellow peers. Redeem points for real fee waivers and exclusive perks.',
    keyPoints: [
      'Earn points on application submissions, quiz completions, and referrals',
      'Redeem for consular filing discounts, IELTS vouchers & 1-on-1 counselor calls',
      'Tier progression: Silver, Gold, Platinum, and Diamond VIP benefits',
      'Cashback bonuses paid directly into your student account upon visa grant'
    ],
    intelliCoachRole: 'Intelli Coach tracks your reward milestones and notifies you of high-value point bonuses before intake deadlines.'
  },
  {
    id: 'ilaswithyou',
    name: 'ILAS With You',
    category: 'support',
    tag: 'Lifelong Companion',
    icon: HeartHandshakeIcon,
    accentColor: 'from-violet-500 to-purple-600',
    badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    metric: '24/7',
    metricLabel: 'On-Ground Care & Buddy Network',
    shortDesc: 'Our dedicated human support network ensuring you are never alone before or after landing in a new country.',
    detailedDesc: 'Moving to a new nation can feel overwhelming. ILAS With You is our signature on-the-ground concierge care. From airport greeting in Frankfurt or Toronto to apartment hunting, city registration (Anmeldung), blocked account activation, and emergency support, we stand with you every step of the way.',
    keyPoints: [
      'Airport pickup and emergency transition accommodations',
      'City registration (Anmeldung/SIN/PPSN) & local bank account setup',
      'International student health insurance activation & SIM card distribution',
      'Local city buddy community meetups and 24/7 emergency hotline'
    ],
    intelliCoachRole: 'Intelli Coach connects you to local city WhatsApp hubs and checklists for the first 30 days in your host country.'
  }
];

interface ServicesOverviewProps {
  onSelectService?: (service: ServiceItem) => void;
  activeFilter?: string;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  onSelectService,
  activeFilter = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(activeFilter);
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All 7 Sections' },
    { id: 'education', label: 'Education' },
    { id: 'visa', label: 'Visas' },
    { id: 'work', label: 'Work & Study' },
    { id: 'study', label: 'Study Abroad' },
    { id: 'career', label: 'Jobs & Careers' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'support', label: 'ILAS With You' }
  ];

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory || s.id === selectedCategory);

  return (
    <section id="services-overview" className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold mb-3 shadow-sm dark:shadow-none">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>Comprehensive Global Services</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything You Need to Study, Work & Thrive Globally
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            ILA Global brings together the entire international journey into seven synchronized sections. Explore each pillar below to see how our human specialists and AI coach power your success.
          </p>
        </div>

        {/* Filter Pills (Mobile scrollable) */}
        <div className="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map(service => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm dark:shadow-none group relative overflow-hidden"
              >
                {/* Top Ambient Glow */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${service.accentColor} opacity-10 rounded-full blur-2xl group-hover:opacity-25 transition-opacity`} />

                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.accentColor} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${service.badgeColor}`}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Title and Short Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Metric Box */}
                  <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-3 mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-slate-900 dark:text-white">{service.metric}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{service.metricLabel}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded">
                        Guaranteed
                      </span>
                    </div>
                  </div>

                  {/* Key points checklist */}
                  <div className="space-y-2 mb-6">
                    {service.keyPoints.slice(0, 3).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Coach badge & Modal trigger */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/30 p-2 rounded-xl border border-indigo-200 dark:border-indigo-900/40">
                    <SparklesIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="line-clamp-1"><strong>AI Boost:</strong> {service.intelliCoachRole}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalService(service);
                      onSelectService?.(service);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <span>View Full Section Details</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Modal for Detailed Explanation */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-900 dark:text-white">
            <button
              type="button"
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeModalService.accentColor} flex items-center justify-center text-white`}>
                <activeModalService.icon className="w-6 h-6" />
              </div>
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${activeModalService.badgeColor}`}>
                  {activeModalService.tag}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{activeModalService.name}</h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {activeModalService.detailedDesc}
            </p>

            <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-3">Key Features & Offerings</h4>
              <div className="space-y-2.5">
                {activeModalService.keyPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl mb-6">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-1">
                <SparklesIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>How Intelli Coach Enhances This Section</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {activeModalService.intelliCoachRole}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors cursor-pointer text-center"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
