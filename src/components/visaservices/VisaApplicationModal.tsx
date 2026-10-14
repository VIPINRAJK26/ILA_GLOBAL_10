import React, { useState, useEffect, useRef } from 'react';
import { 
  useSubmitVisaApplication, 
  type VisaCountry, 
  type VisaType, 
  type VisaApplicationPayload, 
  type VisaApplicationResponse, 
  type DRFValidationError 
} from '../../services/visa';
import { useAuth } from '../../context/AuthContext';
import { 
  savePendingForm, 
  getPendingForm, 
  clearPendingForm 
} from '../../utils/pendingFormStorage';
import { 
  XIcon, 
  ShieldCheckIcon, 
  UploadIcon, 
  FileIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  DownloadIcon, 
  SparklesIcon, 
  UserIcon, 
  FileTextIcon 
} from '../common/Icons';

interface VisaApplicationModalProps {
  country: VisaCountry;
  visa: VisaType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VisaApplicationModal: React.FC<VisaApplicationModalProps> = ({
  country,
  visa,
  isOpen,
  onClose,
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    phone_country_code: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    nationality: string;
    country_of_residence: string;
    passport_number: string;
    passport_expiry_date: string;
    highest_qualification: string;
    field_of_study: string;
    institution_name: string;
    gpa_or_grade: string;
    intended_institution: string;
    intended_program: string;
    planned_travel_date: string;
    funds_proof_status: string;
    has_prior_refusal: boolean;
    prior_refusal_details: string;
    applicant_statement: string;
  }>({
    first_name: '',
    last_name: '',
    email: '',
    phone_country_code: '+91',
    phone_number: '',
    date_of_birth: '2001-05-15',
    gender: 'Male',
    nationality: 'Indian',
    country_of_residence: 'India',
    passport_number: '',
    passport_expiry_date: '2032-10-30',
    highest_qualification: "Bachelor's Degree",
    field_of_study: 'Computer Science & Engineering',
    institution_name: '',
    gpa_or_grade: '3.6 / 4.0 or 82%',
    intended_institution: '',
    intended_program: '',
    planned_travel_date: '2026-09-15',
    funds_proof_status: 'Blocked Account / GIC Approved & Ready',
    has_prior_refusal: false,
    prior_refusal_details: '',
    applicant_statement: '',
  });

  // File Upload State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const [submissionResult, setSubmissionResult] = useState<VisaApplicationResponse | null>(null);
  const [drfErrors, setDrfErrors] = useState<DRFValidationError>({});
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'consular' | 'documents'>('personal');

  // TanStack Mutation for Visa Application Submission
  const submitMutation = useSubmitVisaApplication({
    onSuccess: (result: VisaApplicationResponse) => {
      clearPendingForm('visa_application');
      setSubmissionResult(result);
    },
    onError: (err: DRFValidationError) => {
      setDrfErrors(err || { non_field_errors: ['An unexpected error occurred during submission.'] });
    },
  });

  const isSubmitting = submitMutation.isPending;

  // Pre-fill user data and check for saved pending form data
  useEffect(() => {
    if (isOpen) {
      const pending = getPendingForm<any>('visa_application');
      if (pending?.data?.formData) {
        setFormData(prev => ({
          ...prev,
          ...pending.data.formData,
          email: user?.email || pending.data.formData.email,
        }));
      } else if (user) {
        const names = (user.name || '').trim().split(' ');
        setFormData(prev => ({
          ...prev,
          first_name: names[0] || prev.first_name,
          last_name: names.slice(1).join(' ') || prev.last_name,
          email: user.email || prev.email,
          phone_number: user.phone || user.phone_number || prev.phone_number,
        }));
      }
    }
  }, [user, isOpen]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !visa) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear individual field errors
    if (drfErrors[name]) {
      setDrfErrors((prev: DRFValidationError) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Resume validation & upload handler
  const handleFileSelection = (file: File) => {
    setResumeError('');
    const validExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    if (!validExtensions.includes(extension)) {
      setResumeError('Please upload a valid document in PDF or Word format (.pdf, .doc, .docx)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File size exceeds the 5MB limit. Please upload an optimized PDF or document.');
      return;
    }

    setResumeFile(file);
    if (drfErrors['resume']) {
      setDrfErrors((prev: DRFValidationError) => {
        const next = { ...prev };
        delete next['resume'];
        return next;
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const validateClientSide = (): boolean => {
    const errors: DRFValidationError = {};

    if (!formData.first_name.trim()) errors.first_name = ['First name is required by embassy format.'];
    if (!formData.last_name.trim()) errors.last_name = ['Last name is required.'];
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = ['Valid email address is mandatory.'];
    if (!formData.phone_number.trim() || formData.phone_number.length < 6) errors.phone_number = ['Valid contact number is required.'];
    if (!formData.passport_number.trim()) errors.passport_number = ['Valid international passport number is required.'];
    if (!formData.intended_institution.trim()) errors.intended_institution = ['Target university, institution, or sponsor must be stated.'];
    if (!resumeFile) {
      errors.resume = ['A comprehensive CV / Resume is mandatory for consular profile evaluation.'];
      setResumeError('Please upload your Resume or CV before submitting.');
    }

    setDrfErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateClientSide()) {
      return;
    }

    if (!isAuthenticated || !user) {
      savePendingForm('visa_application', {
        countryId: country.id,
        visaId: visa.id,
        formData,
      });
      openAuthModal(
        'student',
        'login',
        `Please sign in to submit your ${country.name} visa application. Your form progress has been saved.`
      );
      return;
    }

    const payload: VisaApplicationPayload = {
      country_id: country.id,
      visa_type_id: visa.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_country_code: formData.phone_country_code,
      phone_number: formData.phone_number,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      nationality: formData.nationality,
      country_of_residence: formData.country_of_residence,
      passport_number: formData.passport_number,
      passport_expiry_date: formData.passport_expiry_date,
      highest_qualification: formData.highest_qualification,
      field_of_study: formData.field_of_study,
      institution_name: formData.institution_name,
      gpa_or_grade: formData.gpa_or_grade,
      intended_institution: formData.intended_institution,
      intended_program: formData.intended_program,
      planned_travel_date: formData.planned_travel_date,
      funds_proof_status: formData.funds_proof_status,
      has_prior_refusal: formData.has_prior_refusal,
      prior_refusal_details: formData.prior_refusal_details,
      applicant_statement: formData.applicant_statement,
      resume: resumeFile,
    };

    submitMutation.mutate(payload);
  };

  const handleDownloadSummary = () => {
    if (!submissionResult) return;
    const summaryData = {
      application_reference: submissionResult.application_reference,
      status: submissionResult.status_display,
      country: country.name,
      visa_track: visa.name,
      official_code: visa.officialCode,
      applicant: {
        name: submissionResult.applicant_name,
        email: submissionResult.applicant_email,
        passport_number: formData.passport_number,
        nationality: formData.nationality,
      },
      institution: formData.intended_institution,
      program: formData.intended_program,
      resume_submitted: submissionResult.resume_file_name,
      estimated_consular_decision: submissionResult.estimated_decision_date,
      assigned_advisor: submissionResult.assigned_consular_advisor,
      submitted_at: submissionResult.submitted_at,
    };

    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${submissionResult.application_reference}-receipt.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-scaleIn">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                  Official Visa Application Filing
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                  {visa.officialCode}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {country.name} • {visa.name} (Consular Fee: {visa.consularFee})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">

          {/* SUCCESS SCREEN */}
          {submissionResult ? (
            <div className="py-6 text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30 animate-bounce">
                <CheckCircleIcon className="w-12 h-12" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
                  Application Successfully Transmitted to Consular Audit
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Filing Completed for {submissionResult.applicant_name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your visa application data and uploaded resume have been encrypted and stored in our DRF immigration backend. An automated consular file has been generated.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="max-w-lg mx-auto p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-300 dark:border-emerald-500/30 shadow-md space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    Consular Reference Number
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                    Status: {submissionResult.status_display.split(' ')[0]}
                  </span>
                </div>

                <div className="font-mono text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 select-all tracking-wider">
                  {submissionResult.application_reference}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-emerald-200 dark:border-emerald-800/60">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Assigned Specialist:</span>
                    <strong className="text-slate-900 dark:text-white">{submissionResult.assigned_consular_advisor?.name || 'Consular Desk'}</strong>
                    <span className="text-slate-500 block text-[10px]">{submissionResult.assigned_consular_advisor?.title || 'Immigration Specialist'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Decision Target:</span>
                    <strong className="text-slate-900 dark:text-white">{submissionResult.estimated_decision_date || 'Standard Timeline'}</strong>
                    {submissionResult.checklist_status?.consular_readiness_score !== undefined && (
                      <span className="text-emerald-600 dark:text-emerald-400 block text-[10px] font-semibold">
                        Readiness: {submissionResult.checklist_status.consular_readiness_score}%
                      </span>
                    )}
                  </div>
                </div>

                {submissionResult.resume_file_name && (
                  <div className="pt-1 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <FileIcon className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Resume on file: <strong>{submissionResult.resume_file_name}</strong> {submissionResult.resume_file_size_kb ? `(${submissionResult.resume_file_size_kb} KB)` : ''}</span>
                  </div>
                )}

                {(submissionResult as any).backend_target_endpoint && (
                  <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/60 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Target DRF API:</span>
                    <code className="text-emerald-700 dark:text-emerald-300 font-mono bg-emerald-100/60 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      {(submissionResult as any).backend_target_endpoint}
                    </code>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadSummary}
                  className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download Application Filing Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* APPLICATION FORM */
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Server / Validation Error Notice */}
              {Object.keys(drfErrors).length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-100">
                    <AlertCircleIcon className="w-4 h-4 text-rose-600" />
                    <span>Please correct the following fields before submission:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 pl-2 text-[11px]">
                    {Object.entries(drfErrors).map(([field, errList]) => (
                      <li key={field}>
                        <strong className="capitalize">{field.replace(/_/g, ' ')}:</strong> {Array.isArray(errList) ? errList.join(', ') : String(errList)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation Tabs for Form Sections */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                {[
                  { id: 'personal', label: '1. Personal & Passport', icon: <UserIcon className="w-3.5 h-3.5" /> },
                  { id: 'academic', label: '2. Academic & Target Program', icon: <FileTextIcon className="w-3.5 h-3.5" /> },
                  { id: 'consular', label: '3. Financial & Consular', icon: <ShieldCheckIcon className="w-3.5 h-3.5" /> },
                  { id: 'documents', label: '4. Resume & Uploads', icon: <UploadIcon className="w-3.5 h-3.5" /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: PERSONAL & PASSPORT */}
              {activeTab === 'personal' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* First Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        First Legal Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Liam"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          drfErrors.first_name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Last / Family Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Vance"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          drfErrors.last_name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="liam.vance@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          drfErrors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Contact Phone <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="phone_country_code"
                          value={formData.phone_country_code}
                          onChange={handleInputChange}
                          className="w-24 px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+353">🇮🇪 +353</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+971">🇦🇪 +971</option>
                        </select>
                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          placeholder="98765 43210"
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Gender (Passport)
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Diverse / Non-binary">Diverse / Non-binary</option>
                      </select>
                    </div>

                    {/* Nationality */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Current Citizenship / Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        placeholder="e.g. Indian, Canadian, etc."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      />
                    </div>

                    {/* Passport Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        International Passport Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="passport_number"
                        value={formData.passport_number}
                        onChange={handleInputChange}
                        placeholder="e.g. Z9182341"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white text-xs sm:text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          drfErrors.passport_number ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                    </div>

                    {/* Passport Expiry Date */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Passport Expiry Date
                      </label>
                      <input
                        type="date"
                        name="passport_expiry_date"
                        value={formData.passport_expiry_date}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveTab('academic')}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Academic & Target Program</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ACADEMIC & TARGET PROGRAM */}
              {activeTab === 'academic' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Highest Qualification */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Highest Qualification Completed
                      </label>
                      <select
                        name="highest_qualification"
                        value={formData.highest_qualification}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      >
                        <option value="Bachelor's Degree">Bachelor's Degree (B.Sc / B.Tech / B.A)</option>
                        <option value="Master's Degree">Master's Degree (M.Sc / M.Tech / MBA)</option>
                        <option value="High School (12th Grade)">High School (12th Grade / Abitur Equivalent)</option>
                        <option value="Polytechnic Diploma">Polytechnic / Vocational Diploma</option>
                      </select>
                    </div>

                    {/* Major / Field of Study */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Major / Field of Study
                      </label>
                      <input
                        type="text"
                        name="field_of_study"
                        value={formData.field_of_study}
                        onChange={handleInputChange}
                        placeholder="e.g. Computer Science, Mechanical, Nursing"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      />
                    </div>

                    {/* Previous Institution */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Previous College / University
                      </label>
                      <input
                        type="text"
                        name="institution_name"
                        value={formData.institution_name}
                        onChange={handleInputChange}
                        placeholder="e.g. National Institute of Technology"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      />
                    </div>

                    {/* Current GPA / Marks */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Academic GPA / Grade Percentage
                      </label>
                      <input
                        type="text"
                        name="gpa_or_grade"
                        value={formData.gpa_or_grade}
                        onChange={handleInputChange}
                        placeholder="e.g. 8.2 CGPA or 82%"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      />
                    </div>

                    {/* Target Institution in Country */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Intended {country.name} University / Employer <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="intended_institution"
                        value={formData.intended_institution}
                        onChange={handleInputChange}
                        placeholder={country.id === 'germany' ? 'e.g. Technical University of Munich (TUM)' : 'e.g. University of Toronto'}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          drfErrors.intended_institution ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                    </div>

                    {/* Program Title */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Intended Degree / Program / Job Title
                      </label>
                      <input
                        type="text"
                        name="intended_program"
                        value={formData.intended_program}
                        onChange={handleInputChange}
                        placeholder="e.g. M.Sc. Data Engineering & Analytics"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab('personal')}
                      className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 text-xs font-semibold cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('consular')}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Financial & Consular</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: FINANCIAL & CONSULAR */}
              {activeTab === 'consular' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Planned Travel Date */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Target Travel / Intake Date
                      </label>
                      <input
                        type="date"
                        name="planned_travel_date"
                        value={formData.planned_travel_date}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      />
                    </div>

                    {/* Proof of Funds Status */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Proof of Living Funds Status ({visa.financialRequirement.slice(0, 24)}...)
                      </label>
                      <select
                        name="funds_proof_status"
                        value={formData.funds_proof_status}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm"
                      >
                        <option value="Blocked Account / GIC Approved & Ready">Blocked Account / GIC Deposit Ready & Funded</option>
                        <option value="Approved Education Loan Sanction Letter">Approved Education Loan Sanction Letter</option>
                        <option value="Full Scholarship / Sponsorship Letter">Full Scholarship / Sponsorship Letter</option>
                        <option value="Arranging Funds in Progress (30 Days)">Arranging Funds in Progress (within 30 days)</option>
                      </select>
                    </div>

                    {/* Prior Refusal Question */}
                    <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="has_prior_refusal"
                          name="has_prior_refusal"
                          checked={formData.has_prior_refusal}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="has_prior_refusal" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                          Have you ever had a visa refusal, rejection, or deportation for {country.name} or any other country?
                        </label>
                      </div>

                      {formData.has_prior_refusal && (
                        <div className="pt-2 animate-fadeIn">
                          <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                            Please provide details (Country, Year, Visa subclass, Refusal clause/reason):
                          </label>
                          <textarea
                            name="prior_refusal_details"
                            rows={2}
                            value={formData.prior_refusal_details}
                            onChange={handleInputChange}
                            placeholder="e.g. Student visa refusal in 2024 due to incomplete financial statement documentation..."
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white resize-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* Motivation / Remarks */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Statement of Intent / Special Consular Remarks (Optional)
                      </label>
                      <textarea
                        name="applicant_statement"
                        rows={2}
                        value={formData.applicant_statement}
                        onChange={handleInputChange}
                        placeholder="Mention any specific consular requests, accompanying family members, or fast-track timeline needs..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab('academic')}
                      className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 text-xs font-semibold cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('documents')}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Resume & Uploads</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: RESUME & DOCUMENT UPLOADS */}
              {activeTab === 'documents' && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Resume / CV Upload Dropzone */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <UploadIcon className="w-4 h-4 text-emerald-500" />
                        <span>Upload Curriculum Vitae (CV) / Resume <span className="text-rose-500">*</span></span>
                      </label>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">PDF, DOC, DOCX up to 5MB</span>
                    </div>

                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleDrop}
                      className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
                        isDragOver
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : resumeFile
                          ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                          : drfErrors.resume || resumeError
                          ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20'
                          : 'border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileSelection(e.target.files[0]);
                          }
                        }}
                      />

                      {resumeFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <FileIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-sm">
                              {resumeFile.name}
                            </p>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {(resumeFile.size / 1024).toFixed(1)} KB • Ready for Consular Transmission
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setResumeFile(null);
                            }}
                            className="mt-1 text-xs text-rose-500 hover:text-rose-600 font-semibold underline cursor-pointer"
                          >
                            Remove and select different file
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <UploadIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              Drag and drop your CV / Resume here, or <span className="text-emerald-600 dark:text-emerald-400 underline">browse files</span>
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                              Chronological format with employment, degrees, and language competencies.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {(resumeError || drfErrors.resume) && (
                      <p className="text-xs text-rose-500 font-medium">
                        {resumeError || drfErrors.resume?.[0]}
                      </p>
                    )}
                  </div>

                  {/* Consular Filing Summary Info */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-slate-800/60 border border-emerald-200 dark:border-emerald-800/40 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                      <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
                      <span>Embassy Data Security & DRF Payload Specifications</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      By submitting, your data will be packed as multipart/form-data for the Django REST Framework consular API. The file payload is verified for strict anti-fraud and embassy format compliance.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab('consular')}
                      className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 text-xs font-semibold cursor-pointer"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/25 flex items-center gap-2 disabled:opacity-60 cursor-pointer hover:scale-102 active:scale-98 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Filing Visa Application to DRF...</span>
                        </>
                      ) : (
                        <>
                          <SparklesIcon className="w-4 h-4 text-yellow-300" />
                          <span>Submit Official Visa Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
