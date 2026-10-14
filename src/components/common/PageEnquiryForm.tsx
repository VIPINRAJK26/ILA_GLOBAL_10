import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  savePendingForm, 
  getPendingForm, 
  clearPendingForm 
} from '../../utils/pendingFormStorage';
import { 
  ShieldCheckIcon, 
  BriefcaseIcon, 
  GraduationCapIcon, 
  BookOpenIcon, 
  LaptopIcon, 
  AwardIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  SendIcon, 
  PhoneIcon, 
  MailIcon, 
  UserIcon,
  ClockIcon
} from './Icons';

export type EnquiryPageType = 
  | 'visa' 
  | 'work-and-study' 
  | 'study-abroad' 
  | 'jobs-and-careers' 
  | 'courses' 
  | 'products' 
  | 'rewards' 
  | 'general';

interface PageEnquiryFormProps {
  pageType: EnquiryPageType;
  title?: string;
  subtitle?: string;
  className?: string;
}

interface FormState {
  // General User Details
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email';
  
  // Visa Services Specific
  visaType: string;
  destinationCountry: string;
  travelTimeline: string;
  hasPriorRefusal: string;
  
  // Work and Study & Study Abroad Specific
  highestQualification: string;
  currentScore: string;
  studyField: string;
  targetDegree: string;
  languageProficiency: string;
  targetIntake: string;
  scholarshipNeed: string;
  budgetReadiness: string;
  
  // Jobs and Careers Specific
  jobDomain: string;
  yearsExperience: string;
  noticePeriod: string;
  linkedInUrl: string;
  targetWorkCountry: string;
  
  // Courses Specific
  courseLanguage: string;
  courseField: string;
  courseLevel: string;
  batchPreference: string;
  
  // Products Specific
  productInterest: string;
  userRole: string;
  
  // Rewards Specific
  studentMemberId: string;
  milestoneType: string;
  claimCategory: string;
  
  // Notes / Message
  message: string;
}

export const PageEnquiryForm: React.FC<PageEnquiryFormProps> = ({
  pageType,
  title,
  subtitle,
  className = ""
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [isRestored, setIsRestored] = useState(false);

  const [formData, setFormData] = useState<FormState>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || user?.phone_number || '',
    countryCode: '+91',
    preferredContact: 'WhatsApp',
    
    // Visa
    visaType: 'Germany National Student Visa',
    destinationCountry: 'Germany',
    travelTimeline: '1-3 Months',
    hasPriorRefusal: 'No',
    
    // Work & Study / Study Abroad
    highestQualification: "Bachelor's Degree",
    currentScore: '75% / 7.5 CGPA',
    studyField: 'Computer Science & IT',
    targetDegree: "Master's Degree (M.Sc)",
    languageProficiency: 'German A2 / English IELTS 6.5',
    targetIntake: 'Winter / Fall 2026',
    scholarshipNeed: 'Need Partial Scholarship (30-50%)',
    budgetReadiness: 'Blocked Account Ready / Arranging',
    
    // Jobs & Careers
    jobDomain: 'Software Engineering & Cloud',
    yearsExperience: '2-4 Years',
    noticePeriod: '1 Month',
    linkedInUrl: '',
    targetWorkCountry: 'Germany (Chancenkarte / Blue Card)',
    
    // Courses
    courseLanguage: 'German',
    courseField: 'IT & Software',
    courseLevel: 'B1 (Intermediate)',
    batchPreference: 'Weekday Evening Batch',
    
    // Products
    productInterest: 'Intelli Coach AI Suite Demo',
    userRole: 'Prospective Student / Aspirant',
    
    // Rewards
    studentMemberId: '',
    milestoneType: 'Passed Language Certification (Goethe/IELTS)',
    claimCategory: 'Exam Fee Reimbursement Voucher',
    
    // Message
    message: ''
  });

  // Restore pending form on mount or when user authenticates
  useEffect(() => {
    const pending = getPendingForm<FormState>(`enquiry_${pageType}`);
    if (pending?.data) {
      setFormData(prev => ({
        ...prev,
        ...pending.data,
        fullName: user?.name || pending.data.fullName,
        email: user?.email || pending.data.email,
        phone: user?.phone || user?.phone_number || pending.data.phone,
      }));
      setIsRestored(true);
      clearPendingForm(`enquiry_${pageType}`);
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || user.phone_number || prev.phone,
      }));
    }
  }, [pageType, user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = 'Please provide a valid contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!isAuthenticated || !user) {
      // Save form data in local storage and redirect to login
      savePendingForm(`enquiry_${pageType}`, formData);
      openAuthModal(
        'student',
        'login',
        'Please sign in to submit your enquiry. Your form details have been saved.'
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable API submission with contextual ticket generation
    setTimeout(() => {
      const prefix = pageType.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4) || 'ENQ';
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const generatedTicket = `ILA-${prefix}-${randomNum}`;
      
      clearPendingForm(`enquiry_${pageType}`);
      setTicketId(generatedTicket);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 650);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTicketId('');
    setFormData(prev => ({
      ...prev,
      message: '',
      phone: ''
    }));
  };

  // Contextual Header Information
  const getHeaderInfo = () => {
    switch (pageType) {
      case 'visa':
        return {
          badgeText: 'Free Consular Assessment',
          badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
          icon: <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />,
          title: title || 'Apply for Visa Consultation & Embassy Audit',
          subtitle: subtitle || 'Our licensed immigration team and IntelliCoach AI will review your passport status, funding proof, and consular approval odds within 24 hours.'
        };
      case 'work-and-study':
        return {
          badgeText: 'Dual-Track Placement Assessment',
          badgeColor: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300',
          icon: <BriefcaseIcon className="w-5 h-5 text-cyan-500" />,
          title: title || 'Enquire for Work & Study Programs',
          subtitle: subtitle || 'Share your educational background to receive customized part-time earning blueprints, co-op university options, and wage projections.'
        };
      case 'study-abroad':
        return {
          badgeText: 'University Admissions & Scholarship Desk',
          badgeColor: 'bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300',
          icon: <GraduationCapIcon className="w-5 h-5 text-purple-500" />,
          title: title || 'Free Study Abroad Profile Evaluation',
          subtitle: subtitle || 'Find out which tuition-free and scholarship-eligible universities match your GPA, language level, and budget goals.'
        };
      case 'jobs-and-careers':
        return {
          badgeText: 'International Career & Sponsorship Screening',
          badgeColor: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300',
          icon: <BriefcaseIcon className="w-5 h-5 text-rose-500" />,
          title: title || 'Apply for Global Job Matching & Visa Sponsorship',
          subtitle: subtitle || 'Submit your profile to be screened for 1,200+ European & global tech, healthcare, and engineering vacancies with full visa sponsorship.'
        };
      case 'courses':
        return {
          badgeText: 'Course Counseling & Batch Enrollment',
          badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300',
          icon: <BookOpenIcon className="w-5 h-5 text-blue-500" />,
          title: title || 'Custom Language Training & Batch Enquiry',
          subtitle: subtitle || 'Need customized timings, corporate group rates, or guidance on German/Spanish/French levels? Talk to our language academic counselors.'
        };
      case 'products':
        return {
          badgeText: 'Digital Suite & Tool Advisory',
          badgeColor: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300',
          icon: <LaptopIcon className="w-5 h-5 text-indigo-500" />,
          title: title || 'Request IntelliCoach Demo & Ecosystem Access',
          subtitle: subtitle || 'Get an interactive walkthrough of our AI interview simulator, visa eligibility algorithms, or on-ground arrival care package.'
        };
      case 'rewards':
        return {
          badgeText: 'Grants & Milestone Verification',
          badgeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300',
          icon: <AwardIcon className="w-5 h-5 text-amber-500" />,
          title: title || 'Claim Milestone Grant & Points Redemption',
          subtitle: subtitle || 'Submit your official exam score, university admit, or visa approval to unlock cash bonuses, fee reimbursements, and peer rewards.'
        };
      default:
        return {
          badgeText: 'Global Career Enquiry',
          badgeColor: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300',
          icon: <SparklesIcon className="w-5 h-5 text-indigo-500" />,
          title: title || 'Request a Personal Counseling Session',
          subtitle: subtitle || 'Tell us about your global aspirations and an expert advisor will reach out with actionable steps within 24 business hours.'
        };
    }
  };

  const header = getHeaderInfo();

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-slate-950/50 transition-all ${className}`}>
      {/* Subtle Ambient Background Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 lg:p-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold tracking-wide">
            <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full ${header.badgeColor}`}>
              {header.icon}
              {header.badgeText}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
              <ClockIcon className="w-3.5 h-3.5" /> 24hr Guaranteed Response
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {header.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {header.subtitle}
          </p>
        </div>

        {/* Success Confirmation State */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-300 dark:border-emerald-500/30 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircleIcon className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
                Enquiry Successfully Registered
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Thank You, {formData.fullName.split(' ')[0]}!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Your enquiry has been received and routed to our dedicated {pageType.replace(/-/g, ' ')} advisory team. An expert will reach out via <strong className="text-emerald-600 dark:text-emerald-400">{formData.preferredContact}</strong> ({formData.email}) shortly.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800/60 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Your Enquiry Tracking ID</span>
              <div className="font-mono text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 select-all tracking-wider">
                {ticketId}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                Save this reference ID to track your application status or chat with IntelliCoach.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Form */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Restored from local storage indicator */}
            {isRestored && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Welcome back! Your previously entered enquiry details have been restored. You can now submit your request.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRestored(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs ml-2 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* 1. Core Contact Information Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <UserIcon className="w-4 h-4 text-indigo-500" />
                <span>1. Your Contact Details</span>
                {isAuthenticated && (
                  <span className="ml-auto text-emerald-600 dark:text-emerald-400 normal-case font-normal text-xs flex items-center gap-1">
                    <CheckCircleIcon className="w-3.5 h-3.5" /> Logged In
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Alex Henderson"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                        errors.fullName ? 'border-rose-500 dark:border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-rose-500">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MailIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex.henderson@example.com"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                        errors.email ? 'border-rose-500 dark:border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-24 px-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+353">🇮🇪 +353</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+34">🇪🇸 +34</option>
                    </select>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <PhoneIcon className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                          errors.phone ? 'border-rose-500 dark:border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                    </div>
                  </div>
                  {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
                </div>
              </div>

              {/* Preferred Communication Mode */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Preferred Contact Method:</span>
                {(['WhatsApp', 'Phone Call', 'Email'] as const).map(method => (
                  <label key={method} className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value={method}
                      checked={formData.preferredContact === method}
                      onChange={() => setFormData(prev => ({ ...prev, preferredContact: method }))}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Page-Specific Contextual Fields */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <SparklesIcon className="w-4 h-4 text-indigo-500" />
                <span>2. {pageType.toUpperCase().replace(/-/g, ' ')} Specific Information</span>
              </div>

              {/* VISA SERVICES FORM */}
              {pageType === 'visa' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Visa Category
                    </label>
                    <select
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Germany National Student Visa">Germany National Student Visa</option>
                      <option value="Germany Opportunity Card (Chancenkarte)">Germany Opportunity Card (Chancenkarte)</option>
                      <option value="Canada Study Permit & Co-op Visa">Canada Study Permit & Co-op Visa</option>
                      <option value="UK Student Route (Tier 4)">UK Student Route (Tier 4)</option>
                      <option value="Australia Subclass 500 Visa">Australia Subclass 500 Visa</option>
                      <option value="EU Blue Card / Skilled Worker Visa">EU Blue Card / Skilled Worker Visa</option>
                      <option value="Schengen Tourist & Business Visa">Schengen Tourist & Business Visa</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Destination Country
                    </label>
                    <select
                      name="destinationCountry"
                      value={formData.destinationCountry}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="United States">🇺🇸 United States</option>
                      <option value="Ireland">🇮🇪 Ireland</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Schengen Zone">🇪🇺 Other Schengen Zone</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Planned Travel Timeline
                    </label>
                    <select
                      name="travelTimeline"
                      value={formData.travelTimeline}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Immediate (< 30 days)">Immediate (&lt; 30 days)</option>
                      <option value="1-3 Months">1–3 Months</option>
                      <option value="3-6 Months">3–6 Months</option>
                      <option value="6-12 Months">6–12 Months</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Any Prior Visa Refusals?
                    </label>
                    <select
                      name="hasPriorRefusal"
                      value={formData.hasPriorRefusal}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="No">No (First Time Applicant)</option>
                      <option value="Yes - Student Visa">Yes - Student Visa Refusal</option>
                      <option value="Yes - Tourist / Visit Visa">Yes - Tourist / Visit Visa Refusal</option>
                      <option value="Yes - Work Visa">Yes - Work Visa Refusal</option>
                    </select>
                  </div>
                </div>
              )}

              {/* WORK AND STUDY FORM */}
              {pageType === 'work-and-study' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Highest Student Qualification
                    </label>
                    <select
                      name="highestQualification"
                      value={formData.highestQualification}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="High School (12th Grade)">High School (12th Grade)</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Diploma / Vocational Certification">Diploma / Vocational</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Current Score / CGPA
                    </label>
                    <input
                      type="text"
                      name="currentScore"
                      value={formData.currentScore}
                      onChange={handleChange}
                      placeholder="e.g. 78% or 7.8 CGPA"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Work & Study Track
                    </label>
                    <select
                      name="studyField"
                      value={formData.studyField}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Computer Science & IT">Computer Science & IT</option>
                      <option value="Mechanical & Automotive">Mechanical & Automotive</option>
                      <option value="Healthcare & Nursing Assistant">Healthcare & Nursing</option>
                      <option value="Business Management & Logistics">Business & Logistics</option>
                      <option value="Hospitality & Culinary Arts">Hospitality & Culinary</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Country & Model
                    </label>
                    <select
                      name="destinationCountry"
                      value={formData.destinationCountry}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Germany (Duales Studium / Ausbildung)">🇩🇪 Germany (Duales Studium / Ausbildung)</option>
                      <option value="Canada (Paid Co-op Diploma/Degree)">🇨🇦 Canada (Paid Co-op Diploma/Degree)</option>
                      <option value="Australia (CRICOS Work-Study)">🇦🇺 Australia (CRICOS Work-Study)</option>
                      <option value="Ireland (Tech Hub Work-Study)">🇮🇪 Ireland (Tech Hub Work-Study)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STUDY ABROAD FORM */}
              {pageType === 'study-abroad' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Desired Degree Level
                    </label>
                    <select
                      name="targetDegree"
                      value={formData.targetDegree}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Bachelor's Degree (B.Sc / B.A)">Bachelor's Degree (B.Sc / B.A)</option>
                      <option value="Master's Degree (M.Sc / M.A / MBA)">Master's Degree (M.Sc / M.A / MBA)</option>
                      <option value="PhD / Doctoral Fellowship">PhD / Doctoral Fellowship</option>
                      <option value="Studienkolleg / Foundation Track">Studienkolleg / Foundation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Preferred Country Destination
                    </label>
                    <select
                      name="destinationCountry"
                      value={formData.destinationCountry}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Germany (Tuition-Free Public Unis)">🇩🇪 Germany (Tuition-Free Public Unis)</option>
                      <option value="Canada (Top Research & Co-op)">🇨🇦 Canada (Top Research & Co-op)</option>
                      <option value="United Kingdom (1-Yr Fast Masters)">🇬🇧 United Kingdom (1-Yr Fast Masters)</option>
                      <option value="United States (STEM OPT Eligible)">🇺🇸 United States (STEM OPT)</option>
                      <option value="Australia (Regional PR Pathway)">🇦🇺 Australia (Regional PR Pathway)</option>
                      <option value="Ireland (Silicon Valley of Europe)">🇮🇪 Ireland (European Tech Hub)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Standardized Test Status (IELTS/GRE)
                    </label>
                    <select
                      name="languageProficiency"
                      value={formData.languageProficiency}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="IELTS 6.5+ / TOEFL 90+ Score Ready">IELTS 6.5+ / TOEFL 90+ Ready</option>
                      <option value="Planning test in next 60 days">Planning test in next 60 days</option>
                      <option value="Seeking English Waiver (MOI Certificate)">Seeking English Waiver (MOI)</option>
                      <option value="German telc / Goethe B1+ Certified">German telc / Goethe B1+ Certified</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Scholarship Guidance Needed?
                    </label>
                    <select
                      name="scholarshipNeed"
                      value={formData.scholarshipNeed}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Need 100% Full Tuition Scholarship (DAAD/Erasmus)">100% Full Scholarship (DAAD/Erasmus)</option>
                      <option value="Need Partial Merit Scholarship (30-50%)">Partial Merit Scholarship (30-50%)</option>
                      <option value="Tuition-Free University Only (€0 Tuition)">Tuition-Free University Only (€0)</option>
                      <option value="Self-Funded with Student Loan">Self-Funded with Student Loan</option>
                    </select>
                  </div>
                </div>
              )}

              {/* JOBS AND CAREERS FORM */}
              {pageType === 'jobs-and-careers' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Professional Domain
                    </label>
                    <select
                      name="jobDomain"
                      value={formData.jobDomain}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="Software Engineering & Cloud">Software Engineering & Cloud</option>
                      <option value="Healthcare & Registered Nursing">Healthcare & Registered Nursing</option>
                      <option value="Data Analytics & AI Engineering">Data Analytics & AI Engineering</option>
                      <option value="Mechanical & Automotive Engineering">Mechanical & Automotive</option>
                      <option value="Finance & Accounting">Finance & Accounting</option>
                      <option value="Hospitality Management">Hospitality Management</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Total Work Experience
                    </label>
                    <select
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="Fresh Graduate (< 1 Year)">Fresh Graduate (&lt; 1 Year)</option>
                      <option value="1-3 Years">1–3 Years</option>
                      <option value="3-5 Years">3–5 Years</option>
                      <option value="5-8 Years">5–8 Years</option>
                      <option value="8+ Years Senior / Lead">8+ Years Senior / Lead</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Employment Country
                    </label>
                    <select
                      name="targetWorkCountry"
                      value={formData.targetWorkCountry}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="Germany (Chancenkarte / Blue Card)">🇩🇪 Germany (Opportunity Card / Blue Card)</option>
                      <option value="Ireland (Critical Skills Permit)">🇮🇪 Ireland (Critical Skills Permit)</option>
                      <option value="United Kingdom (Skilled Worker Visa)">🇬🇧 United Kingdom (Skilled Worker Visa)</option>
                      <option value="Netherlands (Highly Skilled Migrant)">🇳🇱 Netherlands (Highly Skilled Migrant)</option>
                      <option value="Canada (Express Entry / Provincial)">🇨🇦 Canada (Express Entry / PNP)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      LinkedIn or CV Portfolio Link
                    </label>
                    <input
                      type="url"
                      name="linkedInUrl"
                      value={formData.linkedInUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
              )}

              {/* COURSES FORM */}
              {pageType === 'courses' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Language
                    </label>
                    <select
                      name="courseLanguage"
                      value={formData.courseLanguage}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="German">🇩🇪 German (Deutsch)</option>
                      <option value="Spanish">🇪🇸 Spanish (Español)</option>
                      <option value="French">🇫🇷 French (Français)</option>
                      <option value="English">🇬🇧 English (Business / IELTS)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Sub-Category Field Focus
                    </label>
                    <select
                      name="courseField"
                      value={formData.courseField}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="IT & Software">IT & Software (Tech & Agile Vocab)</option>
                      <option value="Healthcare & Nursing">Healthcare & Nursing (Clinical Terminology)</option>
                      <option value="Engineering & Tech">Engineering & Industrial</option>
                      <option value="Business & Management">Business & Corporate Negotiation</option>
                      <option value="General & Academic">General CEFR & Exam Prep</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Proficiency Level Needed
                    </label>
                    <select
                      name="courseLevel"
                      value={formData.courseLevel}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="A1 (Beginner Foundation)">A1 (Beginner Foundation)</option>
                      <option value="A2 (Elementary Conversational)">A2 (Elementary Conversational)</option>
                      <option value="B1 (Intermediate Workplace)">B1 (Intermediate Workplace)</option>
                      <option value="B2 (Upper Intermediate Professional)">B2 (Upper Intermediate Professional)</option>
                      <option value="C1 (Advanced Academic / Technical)">C1 (Advanced Academic / Technical)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Batch Format Preference
                    </label>
                    <select
                      name="batchPreference"
                      value={formData.batchPreference}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Weekday Evening Batch">Weekday Evening Batch</option>
                      <option value="Weekend Intensive Batch">Weekend Intensive Batch</option>
                      <option value="Fast-Track Daily Super-Intensive">Fast-Track Daily Super-Intensive</option>
                      <option value="1-on-1 VIP Mentor Coaching">1-on-1 VIP Mentor Coaching</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PRODUCTS & TECH SUITE FORM */}
              {pageType === 'products' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Product or Tool of Interest
                    </label>
                    <select
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Intelli Coach AI Suite Demo">Intelli Coach AI Suite Demo</option>
                      <option value="Instant Eligibility Estimator Matrix">Instant Eligibility Estimator Matrix</option>
                      <option value="ILAS With You On-Ground Concierge Package">ILAS With You On-Ground Concierge</option>
                      <option value="Institutional University Partner API">Institutional Partner API</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Profile / Role
                    </label>
                    <select
                      name="userRole"
                      value={formData.userRole}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Prospective Student / Aspirant">Prospective Student / Aspirant</option>
                      <option value="Skilled Immigrant / Job Seeker">Skilled Immigrant / Job Seeker</option>
                      <option value="Academic Institution / University">Academic Institution / University</option>
                      <option value="Education Consultant / Partner">Education Consultant / Partner</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Expected Timeline
                    </label>
                    <select
                      name="travelTimeline"
                      value={formData.travelTimeline}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Ready for Immediate Demo">Ready for Immediate Demo</option>
                      <option value="Next 30 Days">Next 30 Days</option>
                      <option value="Planning for Next Academic Season">Planning for Next Season</option>
                    </select>
                  </div>
                </div>
              )}

              {/* REWARDS & GRANTS FORM */}
              {pageType === 'rewards' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Student / ILA Member ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="studentMemberId"
                      value={formData.studentMemberId}
                      onChange={handleChange}
                      placeholder="e.g. ILA-STU-88219"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Milestone Achieved
                    </label>
                    <select
                      name="milestoneType"
                      value={formData.milestoneType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Passed Language Certification (Goethe/IELTS)">Passed Official Language Test (Goethe/IELTS)</option>
                      <option value="Secured Global University Admit Letter">Secured Global University Offer</option>
                      <option value="Visa Successfully Stamped & Issued">Visa Successfully Stamped & Issued</option>
                      <option value="Successfully Referred a Candidate">Successful Friend Referral</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Grant / Redemption Request
                    </label>
                    <select
                      name="claimCategory"
                      value={formData.claimCategory}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Exam Fee Reimbursement Voucher">Exam Fee Reimbursement Voucher</option>
                      <option value="Tuition Fee Grant ($250-$500)">Tuition Fee Grant ($250–$500)</option>
                      <option value="ILA Points Cash Conversion">ILA Points Cash Conversion</option>
                      <option value="Free 1-on-1 Consular Mock Session">Free Consular Mock Session</option>
                    </select>
                  </div>
                </div>
              )}

              {/* GENERAL / FALLBACK FORM */}
              {pageType === 'general' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Primary Service of Interest
                    </label>
                    <select
                      name="destinationCountry"
                      value={formData.destinationCountry}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Study Abroad & Admissions">Study Abroad & Admissions</option>
                      <option value="Work & Study Dual Programs">Work & Study Dual Programs</option>
                      <option value="Visa Services & Consular Audit">Visa Services & Consular Audit</option>
                      <option value="Jobs with Visa Sponsorship">Jobs with Visa Sponsorship</option>
                      <option value="Professional Language Courses">Professional Language Courses</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Country
                    </label>
                    <select
                      name="travelTimeline"
                      value={formData.travelTimeline}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="United States">🇺🇸 United States</option>
                      <option value="Ireland">🇮🇪 Ireland</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Additional Notes / Questions */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Specific Inquiries, Background Details, or Questions</span>
                <span className="text-slate-400 font-normal">Optional</span>
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention any specific doubts, academic CGPA details, intake targets, or consular questions..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
              />
            </div>

            {/* 4. Action Button & Trust Footnote */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Strict Data Confidentiality • No spam policy • 100% Free Initial Assessment</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    <span>Submit Enquiry & Request Callback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
