import React, { useState, useEffect, useRef } from 'react';
import { 
  SparklesIcon, 
  BotIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '../common/Icons';

interface HeroBannerProps {
  onExploreServices: () => void;
  onLaunchIntelliCoach: () => void;
  onSelectCategory?: (category: string) => void;
}

interface SlideItem {
  id: string;
  badge: string;
  badgeAccent: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  description: string;
  image: string;
  highlights: string[];
  primaryCtaText: string;
  secondaryCtaText: string;
  statsNumber: string;
  statsLabel: string;
  targetSectionId: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreServices,
  onLaunchIntelliCoach,
  onSelectCategory,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides: SlideItem[] = [
    {
      id: 'education',
      badge: '✦ Global Admissions • €0 Tuition Pathways',
      badgeAccent: 'from-amber-400 to-orange-500',
      headlinePrefix: 'Empowering Your Future in ',
      headlineHighlight: 'Global Education',
      headlineSuffix: ' & Free Degrees',
      description: 'Unlock direct access to 150+ premier institutions across Germany, UK, USA, Canada, and Ireland. Secure tuition-free degrees at world-class German public universities with full scholarship assistance.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        '100% Free Tuition at German Universities',
        'Direct Partner Admissions in 6 Countries',
        'DAAD, Erasmus & Merit Scholarship Matching'
      ],
      primaryCtaText: 'Match My Universities with AI',
      secondaryCtaText: 'Explore Study Abroad',
      statsNumber: '150+',
      statsLabel: 'Global Universities',
      targetSectionId: 'education'
    },
    {
      id: 'workstudy',
      badge: '✦ Earn While You Learn • Dual-Advantage',
      badgeAccent: 'from-cyan-400 to-blue-500',
      headlinePrefix: 'Master the Dual Track: ',
      headlineHighlight: 'Work and Study',
      headlineSuffix: ' Across Top Nations',
      description: 'Earn €14.00 – €22.00/hour as a Werkstudent in Germany or Co-op student in Canada. Finance 100% of your student living expenses while accumulating verified international work experience.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
      highlights: [
        'Legal 140 Full Days / 20 hrs/week Work Rights',
        '€14 – €24/hr Average Student Earnings',
        '18-36 Month Post-Study Work Visas & PR'
      ],
      primaryCtaText: 'Calculate Student Earnings',
      secondaryCtaText: 'View Work & Study Guide',
      statsNumber: '€1,400+',
      statsLabel: 'Average Monthly Student Pay',
      targetSectionId: 'work-study-spotlight'
    },
    {
      id: 'visa',
      badge: '✦ Consular Precision • 98.7% Success Rate',
      headlinePrefix: 'Guaranteed Pathway with ',
      headlineHighlight: 'Zero Visa Anxiety',
      headlineSuffix: ' & 1-on-1 Guidance',
      badgeAccent: 'from-emerald-400 to-teal-500',
      description: 'From Germany Opportunity Card (Chancenkarte) to Student and Post-Study Work Permits, our certified visa strategists and AI mock interview simulations eliminate paperwork rejection risks.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
      highlights: [
        '98.7% Verified Consular Approval Rate',
        'Simulated Mock Consular Interview Drills',
        'Blocked Account (Sperrkonto) & Insurance Setup'
      ],
      primaryCtaText: 'Simulate Mock Visa Interview',
      secondaryCtaText: 'Explore Visa Services',
      statsNumber: '98.7%',
      statsLabel: 'Visa Approval Success',
      targetSectionId: 'visa'
    },
    {
      id: 'intelli-coach',
      badge: '✦ 24/7 AI Coach • Intelli Coach Live',
      badgeAccent: 'from-indigo-400 to-purple-500',
      headlinePrefix: 'Meet Intelli Coach: Your ',
      headlineHighlight: '24/7 AI Counselor',
      headlineSuffix: ' & Career Strategist',
      description: 'Trained on consular regulations and admission databases worldwide. Get real-time Statement of Purpose (SOP) audits, university recommendations, and instant visa risk evaluations in seconds.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Instant Eligibility & Consular Risk Scoring',
        'Real-Time SOP & Motivation Letter Feedback',
        '24/7 Personalized Academic Roadmaps'
      ],
      primaryCtaText: 'Chat with Intelli Coach AI',
      secondaryCtaText: 'Test Live AI Prompts',
      statsNumber: '24/7',
      statsLabel: 'Instant AI Availability',
      targetSectionId: 'intelli-coach'
    },
    {
      id: 'ilaswithyou',
      badge: '✦ You Never Land Alone • On-Ground Care',
      badgeAccent: 'from-violet-400 to-pink-500',
      headlinePrefix: 'Lifelong Companion Care: ',
      headlineHighlight: 'ILAS With You',
      headlineSuffix: ' in Your New City',
      description: 'Relocating abroad without stress. We welcome you at the airport, assist with apartment hunting, city registration (Anmeldung), local bank accounts, SIM cards, and host-city student networks.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop',
      highlights: [
        'Airport Pickup & Arrival Transit Concierge',
        'Apartment & City Registration (Anmeldung)',
        '12,000+ Student Buddy Network in Host Cities'
      ],
      primaryCtaText: 'Connect with City Buddy',
      secondaryCtaText: 'Explore On-Ground Care',
      statsNumber: '12k+',
      statsLabel: 'Students Supported Overseas',
      targetSectionId: 'ilas-with-you'
    }
  ];

  // Auto-play timer (5.5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section 
      className="relative w-full h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] min-h-[580px] sm:min-h-[640px] max-h-[960px] overflow-hidden flex flex-col justify-between bg-slate-950 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background Carousel Images with Smooth Cross-Fade & Ken Burns */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              idx === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.headlineHighlight}
              className="w-full h-full object-cover object-center"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Sophisticated Multi-Stage Dark Vignette Gradients for Crystal Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40 sm:to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 z-10" />
        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px] z-10" />
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-14 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Headlines, Highlights & Actions */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md text-xs sm:text-sm font-semibold text-slate-200">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className={`bg-gradient-to-r ${current.badgeAccent} bg-clip-text text-transparent font-bold`}>
                {current.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight">
              {current.headlinePrefix}
              <span className={`bg-gradient-to-r ${current.badgeAccent} bg-clip-text text-transparent`}>
                {current.headlineHighlight}
              </span>
              {current.headlineSuffix}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed sm:leading-relaxed">
              {current.description}
            </p>

            {/* Slide Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-200">
              {current.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/90 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium line-clamp-1">{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={onLaunchIntelliCoach}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <BotIcon className="w-4 h-4 text-indigo-200" />
                <span>{current.primaryCtaText}</span>
                <SparklesIcon className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (current.targetSectionId) {
                    const el = document.getElementById(current.targetSectionId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onExploreServices();
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer backdrop-blur-md"
              >
                <span>{current.secondaryCtaText}</span>
                <ArrowRightIcon className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right Column (Stat Showcase Glass Card) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Global Mobility Metric
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified
                </span>
              </div>

              <div className="py-2">
                <div className={`text-5xl font-black bg-gradient-to-r ${current.badgeAccent} bg-clip-text text-transparent font-mono`}>
                  {current.statsNumber}
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {current.statsLabel}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <BotIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Intelli Coach AI Integration</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Real-time algorithmic shortlisting aligned with 2026/2027 consular intakes and local work authorization laws.
                </p>
              </div>

              {/* Slide Counter Indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-1 font-mono font-bold text-slate-300">
                  <span>0{currentSlide + 1}</span>
                  <span className="text-slate-600">/</span>
                  <span>0{slides.length}</span>
                </div>
                <span className="text-[11px] text-indigo-400">✦ Auto-rotating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Carousel Controls, Progress Bars & Slide Jump Chips */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        
        {/* Horizontal Navigation Chips */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          
          {/* Arrow Buttons & Slide Counter */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold text-slate-400 ml-1 hidden sm:inline">
              0{currentSlide + 1} <span className="text-slate-600">/</span> 0{slides.length}
            </span>
          </div>

          {/* Quick Jump Slide Chips (Horizontal Scrollable on Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrentSlide(idx);
                  onSelectCategory?.(s.id);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${currentSlide === idx ? 'bg-white animate-pulse' : 'bg-slate-600'}`} />
                <span>{s.headlineHighlight}</span>
              </button>
            ))}
          </div>

          {/* Progress Indicator Dots */}
          <div className="hidden md:flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-6 bg-gradient-to-r from-indigo-500 to-purple-500' 
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
