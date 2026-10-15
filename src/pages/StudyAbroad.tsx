import React, { useState } from 'react';
import { 
  GlobeIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  SparklesIcon,
  XIcon
} from '../components/common/Icons';
import { UniversityCourseMatcher } from '../components/studyabroad/UniversityCourseMatcher';
import { WhyStudyAbroad } from '../components/studyabroad/WhyStudyAbroad';
import { AdmissionProcess } from '../components/studyabroad/AdmissionProcess';
import { StudentSupportServices } from '../components/studyabroad/StudentSupportServices';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';

export const StudyAbroad: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [matcherQuery, setMatcherQuery] = useState<{
    country: string;
    qualification: string;
    field: string;
    transcriptName?: string;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSupport = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollToSection('counselling-form');
  };

  const handleApplyFromMatcher = (details?: {
    country: string;
    qualification: string;
    field: string;
    transcriptName?: string;
  }) => {
    if (details) {
      setMatcherQuery(details);
    }
    scrollToSection('counselling-form');
  };

  const clearSelection = () => {
    setSelectedService(null);
    setMatcherQuery(null);
  };

  return (
    <div className="py-8 sm:py-14 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* A. Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold">
                <GlobeIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>European & Global Higher Education</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Study in Germany & Europe with{' '}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  ILA
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                From university selection and admission guidance to visa preparation and student settlement, get support throughout your study abroad journey.
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => scrollToSection('course-matcher')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Find My Course</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('support-services')}
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <span>Explore Support Services</span>
                </button>
              </div>

              {/* Concise Proof Points */}
              <div className="pt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                  Verified Public University Pathways
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                  Structured APS & Visa Compliance
                </span>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
                  alt="Students on European university campus"
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-medium w-fit mb-2">
                    <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
                    <span>European Higher Education</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-snug">
                    Dedicated advising for undergraduate and master's admissions across leading German and European institutions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* B. University & Course Matcher */}
        <UniversityCourseMatcher onApplyForCounselling={handleApplyFromMatcher} />

        {/* C. Why Study Abroad? */}
        <WhyStudyAbroad />

        {/* D. Admission Process */}
        <AdmissionProcess />

        {/* E. Student Support Services */}
        <StudentSupportServices onRequestSupport={handleRequestSupport} />

        {/* F. Final CTA & Enquiry Section */}
        <section id="counselling-form" className="scroll-mt-24 space-y-6">
          <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-purple-800/40 shadow-lg">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold">
                <GlobeIcon className="w-3.5 h-3.5" />
                <span>Admissions Advisory</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Ready to Begin Your Study Abroad Journey?
              </h2>
              <p className="text-sm sm:text-base text-purple-200 leading-relaxed">
                Tell us about your academic background and preferred destination to get started.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('study-abroad-enquiry-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Apply for Counselling</span>
                  <ArrowRightIcon className="w-4 h-4 text-purple-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Context Banner when user clicked a specific service or course matcher */}
          {(selectedService || matcherQuery) && (
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="text-slate-800 dark:text-slate-200">
                  {selectedService && (
                    <>Enquiring for: <strong className="font-semibold text-purple-700 dark:text-purple-300">{selectedService}</strong></>
                  )}
                  {matcherQuery && !selectedService && (
                    <>
                      Matched Preference: <strong className="font-semibold text-purple-700 dark:text-purple-300">{matcherQuery.country}</strong> · {matcherQuery.field}
                      {matcherQuery.transcriptName ? ` (Transcript: ${matcherQuery.transcriptName})` : ''}
                    </>
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={clearSelection}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
                title="Clear filter context"
                aria-label="Clear active context"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Existing Application / Enquiry Flow */}
          <div id="study-abroad-enquiry-form">
            <PageEnquiryForm 
              pageType="study-abroad" 
              title="Apply for Counselling"
              subtitle="Tell us about your academic background and preferred destination to get started."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default StudyAbroad;