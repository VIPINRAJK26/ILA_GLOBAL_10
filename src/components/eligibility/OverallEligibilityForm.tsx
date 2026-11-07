import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  BotIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  PlaneIcon,
  BookOpenIcon,
  GlobeIcon
} from '../common/Icons';

import { 
  AVAILABLE_PRODUCTS,
  type ProductType,
  type EducationLevel,
  type ExperienceYears,
  type ProfessionalField,
  type GermanLevel,
  type EnglishLevel,
  type AgeRange,
  type BudgetReadiness,
  type TargetTimeline,
  type EligibilityAssessmentPayload,
  type EligibilityResult,
  submitEligibilityAssessment
} from '../../services/eligibility';
import { useAuth } from '../../context/AuthContext';

interface OverallEligibilityFormProps {
  initialProduct?: ProductType;
  className?: string;
  onResultCalculated?: (result: EligibilityResult) => void;
  showHeroHeader?: boolean;
}

export const OverallEligibilityForm: React.FC<OverallEligibilityFormProps> = ({
  initialProduct = 'visa_services',
  className = '',
  onResultCalculated,
  showHeroHeader = true
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // Stepper state: 1: Product & Country, 2: Academic & Exp, 3: Language & Age, 4: Financial & Contact
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  // Form Fields
  const [productType, setProductType] = useState<ProductType>(initialProduct);
  const [targetCountry, setTargetCountry] = useState<string>('Germany');
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('bachelor_stem');
  const [fieldOfStudy, setFieldOfStudy] = useState<ProfessionalField>('it_software');
  const [experienceYears, setExperienceYears] = useState<ExperienceYears>('3-5');
  const [germanLevel, setGermanLevel] = useState<GermanLevel>('a2');
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel>('fluent_ielts_6_5');
  const [ageRange, setAgeRange] = useState<AgeRange>('under_35');
  const [budgetReadiness, setBudgetReadiness] = useState<BudgetReadiness>('full_blocked_account');
  const [timeline, setTimeline] = useState<TargetTimeline>('3_6_months');
  const [applicantName, setApplicantName] = useState(user?.name || '');
  const [applicantEmail, setApplicantEmail] = useState(user?.email || '');
  const [applicantPhone, setApplicantPhone] = useState(user?.phone || user?.phone_number || '');
  const [userNotes, setUserNotes] = useState('');

  const activeProduct = AVAILABLE_PRODUCTS.find((p) => p.id === productType) || AVAILABLE_PRODUCTS[0];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: EligibilityAssessmentPayload = {
      product_type: productType,
      target_country: targetCountry,
      education_level: educationLevel,
      field_of_study: fieldOfStudy,
      experience_years: experienceYears,
      german_level: germanLevel,
      english_level: englishLevel,
      age_range: ageRange,
      budget_readiness: budgetReadiness,
      timeline,
      applicant_name: applicantName.trim() || user?.name || 'Applicant',
      applicant_email: applicantEmail.trim() || user?.email || '',
      applicant_phone: applicantPhone.trim() || user?.phone || '',
      user_notes: userNotes.trim(),
    };

    try {
      const evaluation = await submitEligibilityAssessment(payload);
      setResult(evaluation);
      if (onResultCalculated) {
        onResultCalculated(evaluation);
      }
    } catch (err) {
      console.error('Failed to calculate eligibility:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStep(1);
  };

  const renderProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'passport':
        return <PlaneIcon className="w-5 h-5" />;
      case 'graduation':
        return <GraduationCapIcon className="w-5 h-5" />;
      case 'book':
        return <BookOpenIcon className="w-5 h-5" />;
      case 'briefcase':
        return <BriefcaseIcon className="w-5 h-5" />;
      default:
        return <GlobeIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      {/* Optional Hero Header */}
      {showHeroHeader && (
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold">
            <BotIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>ILA Universal Eligibility Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Global Pathway & Visa{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Eligibility Calculator
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Audit your consular visa points, tuition-free public university chances, dual-study wage potential, and required language cohort in 60 seconds.
          </p>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
        
        {/* Glow Effects */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ================= IF RESULT IS DISPLAYED ================= */}
        {result ? (
          <div className="space-y-8 animate-fade-in">
            {/* Top Verdict Ribbon */}
            <div className={`p-6 rounded-2xl border ${result.statusColor} flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
              <div className="flex items-center gap-4">
                {/* Score Gauge */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block leading-none">
                      {result.score}%
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                      Match Score
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                      Ref: {result.assessmentReference}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <ShieldCheckIcon className="w-4 h-4" />
                      Statutory Framework Verified
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {result.verdict}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                    Assessed for: <strong className="text-slate-900 dark:text-white capitalize">{result.productType.replace('_', ' ')}</strong> in <strong className="text-slate-900 dark:text-white">{result.targetCountry}</strong>.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Adjust Parameters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isAuthenticated) {
                      openAuthModal('student', 'login', 'Sign in to sync this assessment with your Student Dashboard.');
                    } else {
                      navigate('/dashboard');
                    }
                  }}
                  className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{isAuthenticated ? 'View in Dashboard' : 'Save Assessment'}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Counselor Audit Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 flex items-start gap-3">
              <BotIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-sm">
                <strong className="text-slate-900 dark:text-white font-bold block">
                  Intelli Coach Academic Counselor Analysis:
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {result.counselorSummary}
                </p>
              </div>
            </div>

            {/* Criteria Breakdown Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  5-Point Statutory Scoring Matrix
                </h3>
                {result.totalPoints !== undefined && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    Statutory Points: {result.totalPoints} / {result.qualifyingPointsRequired} required
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.pointsBreakdown.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {item.category}
                      </span>
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                        item.status === 'passed' 
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                          : item.status === 'partial' 
                          ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' 
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                      }`}>
                        {item.pointsAwarded} / {item.maxPoints} pts
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.status === 'passed' ? 'bg-emerald-500' : item.status === 'partial' ? 'bg-indigo-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${(item.pointsAwarded / item.maxPoints) * 100}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Profile Strengths:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {result.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <SparklesIcon className="w-4 h-4" />
                  <span>Optimizations to Maximize Approval:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tailored Product Recommendations */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Recommended Actions & Tailored Pathways
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {result.recommendedProducts.map((prod) => (
                  <div 
                    key={prod.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3 group hover:border-indigo-400 transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {prod.badge}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-indigo-600 transition-colors">
                        {prod.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        {prod.description}
                      </p>
                    </div>

                    <Link
                      to={prod.link}
                      className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 text-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      Explore & Apply →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* ================= STEPPER FORM ================= */
          <form onSubmit={handleCalculate} className="space-y-6">
            
            {/* Stepper Progress Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              {[
                { step: 1, label: 'Product & Target' },
                { step: 2, label: 'Academic & Career' },
                { step: 3, label: 'Language & Profile' },
                { step: 4, label: 'Budget & Review' }
              ].map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStep(s.step)}
                  className={`flex items-center gap-2 cursor-pointer transition-colors ${
                    currentStep === s.step 
                      ? 'text-indigo-600 dark:text-indigo-400 font-bold' 
                      : currentStep > s.step 
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
                      : 'text-slate-400'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                    currentStep === s.step 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : currentStep > s.step 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {currentStep > s.step ? '✓' : s.step}
                  </span>
                  <span className="hidden sm:inline text-xs">{s.label}</span>
                </button>
              ))}
            </div>

            {/* ================= STEP 1: SELECT PRODUCT ================= */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      1. Choose the Service or Pathway You Want to Evaluate:
                    </label>
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                      Selected: {activeProduct.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {activeProduct.keyFeature}
                  </p>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {AVAILABLE_PRODUCTS.map((prod) => {
                    const isSelected = productType === prod.id;
                    return (
                      <div
                        key={prod.id}
                        onClick={() => setProductType(prod.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-600 shadow-md ring-1 ring-indigo-500/30'
                            : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                              {renderProductIcon(prod.iconName)}
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${prod.badgeColor}`}>
                              {prod.badge}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-2.5">
                            {prod.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                            {prod.tagline}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Focus: {prod.popularDestination}</span>
                          <span className={isSelected ? 'text-indigo-600 font-bold' : ''}>
                            {isSelected ? 'Selected ✓' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Country Destination */}
                <div className="pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Target Destination Country:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'Germany', flag: '🇩🇪', note: 'EU Leader • Free Unis' },
                      { id: 'Ireland', flag: '🇮🇪', note: 'Tech Capital • 2-Yr Post Study' },
                      { id: 'United Kingdom', flag: '🇬🇧', note: '1-Yr Masters • Graduate Visa' },
                      { id: 'Canada', flag: '🇨🇦', note: 'Co-op Program • PGWP Pathway' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setTargetCountry(c.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          targetCountry === c.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="text-lg">{c.flag}</div>
                        <div className="text-xs font-bold mt-1">{c.id}</div>
                        <div className={`text-[10px] ${targetCountry === c.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {c.note}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: ACADEMIC & CAREER BACKGROUND ================= */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                {/* Highest Education */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Highest Completed or Ongoing Degree:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'bachelor_stem', label: "Bachelor's Degree in STEM (Engineering / CS / IT)" },
                      { id: 'bachelor_non_stem', label: "Bachelor's Degree in Business, Arts or Commerce" },
                      { id: 'master_stem', label: "Master's Degree (M.Tech, M.S., or equivalent)" },
                      { id: 'nursing_medical', label: "Nursing / MBBS / Medical / Healthcare Credential" },
                      { id: 'high_school', label: "10+2 / High School / 3-Year Diploma" },
                      { id: 'phd', label: "Doctorate / Ph.D. Level" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEducationLevel(item.id as EducationLevel)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer font-medium ${
                          educationLevel === item.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Professional Field */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Primary Domain / Industry Specialization:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'it_software', label: '💻 IT & Software Engineering' },
                      { id: 'healthcare_nursing', label: '🩺 Healthcare & Nursing' },
                      { id: 'engineering', label: '⚙️ Mechanical & Automotive' },
                      { id: 'business_finance', label: '📊 Business, Marketing & MBA' },
                      { id: 'sciences', label: '🔬 Natural Sciences & Bio' },
                      { id: 'other', label: '🌐 Other Specialized Field' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFieldOfStudy(f.id as ProfessionalField)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer font-medium ${
                          fieldOfStudy === f.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Verifiable Post-Qualification Work Experience:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: '0', label: 'Fresh Graduate (0 Yrs)' },
                      { id: '1-2', label: '1 - 2 Years' },
                      { id: '3-5', label: '3 - 5 Years' },
                      { id: '5+', label: '5+ Years (Senior)' }
                    ].map((exp) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => setExperienceYears(exp.id as ExperienceYears)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                          experienceYears === exp.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 3: LANGUAGE & PROFILE ================= */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                {/* German Level */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Current German Language Proficiency (CEFR):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'none', label: 'Zero / Beginner (A0)' },
                      { id: 'a1', label: 'A1 Foundational' },
                      { id: 'a2', label: 'A2 Elementary' },
                      { id: 'b1', label: 'B1 Intermediate (Chancenkarte min)' },
                      { id: 'b2', label: 'B2 Professional' },
                      { id: 'c1_plus', label: 'C1 / C2 Advanced Fluent' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGermanLevel(g.id as GermanLevel)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer font-medium ${
                          germanLevel === g.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* English Level */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    English Language Proficiency:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'basic', label: 'Basic / Conversational' },
                      { id: 'intermediate', label: 'Medium (No formal test)' },
                      { id: 'fluent_ielts_6_5', label: 'IELTS 6.5+ / TOEFL 85+' },
                      { id: 'advanced_ielts_7_5', label: 'IELTS 7.5+ / Native' }
                    ].map((eng) => (
                      <button
                        key={eng.id}
                        type="button"
                        onClick={() => setEnglishLevel(eng.id as EnglishLevel)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                          englishLevel === eng.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {eng.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age Range */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Candidate Age Bracket:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'under_35', label: 'Under 35 (Max Points)' },
                      { id: '35_40', label: '35 - 40 Years' },
                      { id: 'above_40', label: 'Above 40 Years' }
                    ].map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setAgeRange(a.id as AgeRange)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                          ageRange === a.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 4: BUDGET & REVIEW ================= */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fade-in">
                {/* Financial Readiness */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Proof of Funds / Financial Capability:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'full_blocked_account', label: 'Ready with Blocked Account (~€11,904) / Self-Funded' },
                      { id: 'partial_funding', label: 'Partial Funds (~€5,000 - €8,000) + Student Working Rights' },
                      { id: 'seeking_zero_tuition', label: 'Seeking 100% Free Public Universities + Student Financing' },
                      { id: 'employer_sponsored', label: 'Direct Corporate Sponsorship or Paid Apprenticeship' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudgetReadiness(b.id as BudgetReadiness)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer font-medium ${
                          budgetReadiness === b.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-md'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Intake / Timeline */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Target Relocation Timeline / University Intake:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'immediate', label: 'Immediate (1-3 Mos)' },
                      { id: '3_6_months', label: 'Next Intake (3-6 Mos)' },
                      { id: '6_12_months', label: 'Future (6-12 Mos)' },
                      { id: 'exploring', label: 'Just Exploring' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTimeline(t.id as TargetTimeline)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                          timeline === t.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Fields for Dossier Delivery */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Where Should We Send Your Official Verification Report?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="WhatsApp Number"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <textarea
                      rows={2}
                      placeholder="Optional notes, current backlog, or specific immigration questions for our counselor..."
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}


            {/* Form Footer Navigation */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  ← Previous Step
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Continue Step {currentStep + 1}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-8 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  <BotIcon className="w-4 h-4" />
                  <span>{isSubmitting ? 'Auditing Regulatory Matrix...' : 'Generate Instant Assessment'}</span>
                  <SparklesIcon className="w-3.5 h-3.5 text-yellow-300" />
                </button>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default OverallEligibilityForm;
