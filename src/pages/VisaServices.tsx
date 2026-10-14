import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  useVisaCountries, 
  useVisaApplicationStatus, 
  type VisaCountry, 
  type VisaType 
} from '../services/visa';
import { useAuth } from '../context/AuthContext';
import { getPendingForm } from '../utils/pendingFormStorage';
import { VisaCountrySelector } from '../components/visaservices/VisaCountrySelector';
import { VisaTypeDetailsCard } from '../components/visaservices/VisaTypeDetailsCard';
import { VisaApplicationModal } from '../components/visaservices/VisaApplicationModal';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';
import { 
  ShieldCheckIcon, 
  BotIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  FilterIcon,
  SearchIcon,
  AlertCircleIcon
} from '../components/common/Icons';
import { ROUTES } from '../routes/paths';

export const VisaServices: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Fetch dynamic Visa Countries with nested tracks from backend
  const { data: countries = [], isLoading, isError, refetch } = useVisaCountries();

  // Selected Country State
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  
  // Category Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Application Modal State
  const [activeVisaToApply, setActiveVisaToApply] = useState<VisaType | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Status Tracking Widget State (Connected to DRF live endpoint)
  const [trackingReference, setTrackingReference] = useState('');
  const [submittedQueryRef, setSubmittedQueryRef] = useState('');
  
  const { 
    data: trackedStatus, 
    isFetching: isTrackingLoading, 
    isError: isTrackingError 
  } = useVisaApplicationStatus(submittedQueryRef, { 
    enabled: Boolean(submittedQueryRef) 
  });

  // Sync selected country when countries are loaded
  useEffect(() => {
    if (countries.length > 0) {
      if (!selectedCountryId || !countries.some(c => c.id === selectedCountryId)) {
        setSelectedCountryId(countries[0].id);
      }
    }
  }, [countries, selectedCountryId]);

  // Restore pending visa application after login redirect
  useEffect(() => {
    if (countries.length > 0 && isAuthenticated) {
      const pending = getPendingForm<{
        countryId: string;
        visaId: string;
        formData: any;
      }>('visa_application');

      if (pending?.data) {
        const foundCountry = countries.find(c => String(c.id) === String(pending.data.countryId));
        if (foundCountry) {
          setSelectedCountryId(foundCountry.id);
          const foundVisa = foundCountry.visaTypes.find(v => String(v.id) === String(pending.data.visaId));
          if (foundVisa) {
            setActiveVisaToApply(foundVisa);
            setIsApplyModalOpen(true);
          }
        }
      }
    }
  }, [countries, isAuthenticated]);

  const activeCountry: VisaCountry | null = 
    countries.find(c => c.id === selectedCountryId) || (countries.length > 0 ? countries[0] : null);

  // Filter visa types based on search and category
  const filteredVisaTypes = activeCountry
    ? activeCountry.visaTypes.filter(visa => {
        const matchesCategory = selectedCategory === 'all' || visa.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          !query ||
          visa.name.toLowerCase().includes(query) ||
          visa.officialCode.toLowerCase().includes(query) ||
          visa.shortDescription.toLowerCase().includes(query) ||
          visa.tags.some(t => t.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      })
    : [];

  // Available categories in the active country
  const availableCategories = React.useMemo(() => {
    if (!activeCountry) return [];
    const catMap = new Map<string, string>();
    activeCountry.visaTypes.forEach(v => {
      catMap.set(v.category, v.categoryDisplay || v.category);
    });
    return Array.from(catMap.entries()).map(([id, label]) => ({ id, label }));
  }, [activeCountry]);

  const handleOpenApplyModal = (visa: VisaType) => {
    setActiveVisaToApply(visa);
    setIsApplyModalOpen(true);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingReference.trim()) return;
    setSubmittedQueryRef(trackingReference.trim().toUpperCase());
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>Consular-Grade Visa Excellence • Live Official Endpoints</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Apply for <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">Study & Work Visas</span> with 98.7% Confidence
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Select your desired destination country, explore tailored visa tracks (Student Visas, Opportunity Cards, Post-Graduation Work Permits), and file your application directly with resume verification.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('visa-tracks');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 cursor-pointer hover:scale-102 active:scale-98 transition-all"
            >
              <span>Explore Visa Tracks by Country</span>
              <span>↓</span>
            </button>

            <Link
              to="/#intelli-coach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              <BotIcon className="w-4 h-4 text-emerald-500" />
              <span>Simulate Embassy Interview with AI</span>
            </Link>

            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Connecting to Visa Central Registry...</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Fetching verified immigration routes, consular processing timelines, and real-time eligibility criteria.
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {!isLoading && isError && (
          <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 text-center space-y-3">
            <AlertCircleIcon className="w-8 h-8 text-rose-500 mx-auto" />
            <h3 className="font-bold text-rose-800 dark:text-rose-300 text-base">
              Failed to load Visa Jurisdictions
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400 max-w-md mx-auto">
              Unable to communicate with the consular endpoints. Please check your network connection or backend tunnel status.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* MAIN VISA CONTENT */}
        {!isLoading && !isError && activeCountry && (
          <>
            {/* SECTION 1: INTERACTIVE COUNTRY SELECTOR */}
            <div id="visa-tracks" className="scroll-mt-24 space-y-6">
              <VisaCountrySelector
                countries={countries}
                selectedCountry={activeCountry}
                onSelectCountry={(country) => {
                  setSelectedCountryId(country.id);
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              />
            </div>

            {/* SECTION 2: SEARCH & VISA CATEGORY FILTERS */}
            <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Category Chips */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                  <FilterIcon className="w-3.5 h-3.5" /> Filter:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-750'
                  }`}
                >
                  All ({activeCountry.visaTypes.length})
                </button>
                {availableCategories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-72">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <SearchIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeCountry.name} visas...`}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* SECTION 3: VISA TYPES CARDS GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Available Visa Tracks in {activeCountry.name} ({filteredVisaTypes.length})
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Click 'Apply for this Visa' on any card to submit your application & resume
                </span>
              </div>

              {filteredVisaTypes.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <span className="text-4xl">🔍</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">No matching visa tracks found</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Try clearing your search query or switching to 'All' category filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredVisaTypes.map(visa => (
                    <VisaTypeDetailsCard
                      key={visa.id}
                      visa={visa}
                      country={activeCountry}
                      onApply={handleOpenApplyModal}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* SECTION 4: REAL-TIME APPLICATION TRACKER WIDGET */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ClockIcon className="w-4 h-4" />
                <span>Live Consular Portal Status Tracker</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Already Filed a Visa Application? Track Your File Here
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Enter your ILA application tracking reference (e.g. <code>ILA-VISA-DE-364217</code>) to inspect real-time embassy transmission, document verification, and consular interview scheduling status.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                value={trackingReference}
                onChange={(e) => setTrackingReference(e.target.value)}
                placeholder="e.g. ILA-VISA-DE-364217"
                className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
              />
              <button
                type="submit"
                disabled={isTrackingLoading}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs whitespace-nowrap cursor-pointer transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isTrackingLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Querying DRF...</span>
                  </>
                ) : (
                  <span>Track File</span>
                )}
              </button>
            </form>
          </div>

          {/* Tracked Status Display via TanStack Query */}
          {isTrackingLoading && (
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center gap-3 py-6">
              <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-slate-300 font-medium">Fetching real-time consular status from backend...</span>
            </div>
          )}

          {!isTrackingLoading && isTrackingError && submittedQueryRef && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-3">
              <AlertCircleIcon className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <p className="font-semibold text-rose-300">Reference lookup failed</p>
                <p className="text-[11px] text-rose-300/80">Could not find active record for "{submittedQueryRef}". Check your reference code or file a new application.</p>
              </div>
            </div>
          )}

          {!isTrackingLoading && trackedStatus && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-emerald-400 font-bold text-base">
                    {trackedStatus.application_reference}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    {trackedStatus.status_display || trackedStatus.status}
                  </span>
                </div>
                {trackedStatus.created_at && (
                  <span className="text-[11px] text-slate-400">
                    Filed on {new Date(trackedStatus.created_at).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-700/60">
                <div>
                  <span className="text-slate-400 text-[11px] block">Applicant</span>
                  <span className="font-semibold text-white">
                    {trackedStatus.first_name} {trackedStatus.last_name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Target Track</span>
                  <span className="font-semibold text-emerald-300">
                    {trackedStatus.country_flag} {trackedStatus.country_name} • {trackedStatus.visa_type_name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Intended Institution</span>
                  <span className="font-semibold text-white">
                    {trackedStatus.intended_institution || 'Consular Standard'}
                  </span>
                </div>
              </div>

              {trackedStatus.checklist_status && (
                <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                  <span className="flex items-center gap-1">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                    Resume: {trackedStatus.checklist_status.resume_uploaded ? 'Verified' : 'Pending'}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span>Academic Audit: <strong>{trackedStatus.checklist_status.academic_audit}</strong></span>
                  <span className="text-slate-500">•</span>
                  <span>Financial Audit: <strong>{trackedStatus.checklist_status.financial_audit}</strong></span>
                  {trackedStatus.checklist_status.consular_readiness_score !== undefined && (
                    <>
                      <span className="text-slate-500">•</span>
                      <span className="font-bold text-emerald-400">
                        Score: {trackedStatus.checklist_status.consular_readiness_score}%
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 5: INTELLI COACH AI CONSULAR MOCK CALLOUT */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-500/30 shadow-md dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
              <SparklesIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Intelli Coach Real-Time Consular Risk Audit</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Want to simulate the Embassy Visa Interview before filing?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Intelli Coach simulates official consular questions (German Embassy, US F-1 Visa Officer, UK CAS compliance officer) and evaluates your financial answers with instant feedback.
            </p>
          </div>

          <Link
            to="/#intelli-coach"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm whitespace-nowrap text-center transition-colors shadow-lg"
          >
            Launch Consular Interview Simulator →
          </Link>
        </div>

        {/* SECTION 6: GENERAL CONSULTATION DESK */}
        <div id="visa-enquiry" className="pt-4">
          <PageEnquiryForm 
            pageType="visa" 
            title="Request Personalized Visa & Immigration Counseling"
            subtitle="Need assistance choosing between Germany National Student Visa vs Chancenkarte, or Canada SDS vs Non-SDS? Get in touch with our certified consular desk."
          />
        </div>
      </div>

      {/* FULL DRF-OPTIMIZED VISA APPLICATION MODAL */}
      {activeCountry && (
        <VisaApplicationModal
          country={activeCountry}
          visa={activeVisaToApply}
          isOpen={isApplyModalOpen}
          onClose={() => {
            setIsApplyModalOpen(false);
            setActiveVisaToApply(null);
          }}
        />
      )}
    </div>
  );
};

export default VisaServices;