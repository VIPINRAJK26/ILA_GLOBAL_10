import React, { useState, useRef } from 'react';
import { 
  SearchIcon, 
  UploadIcon, 
  FileTextIcon, 
  XIcon, 
  AlertCircleIcon, 
  ClockIcon, 
  ArrowRightIcon,
  CheckCircleIcon
} from '../common/Icons';

interface UniversityCourseMatcherProps {
  onApplyForCounselling: (details?: {
    country: string;
    qualification: string;
    field: string;
    transcriptName?: string;
  }) => void;
}

export const COUNTRIES = [
  { id: 'Germany', name: 'Germany', flag: '🇩🇪' },
  { id: 'Austria', name: 'Austria', flag: '🇦🇹' },
  { id: 'Switzerland', name: 'Switzerland', flag: '🇨🇭' },
  { id: 'Ireland', name: 'Ireland', flag: '🇮🇪' },
  { id: 'France', name: 'France', flag: '🇫🇷' },
  { id: 'UK', name: 'UK', flag: '🇬🇧' },
  { id: 'Canada', name: 'Canada', flag: '🇨🇦' },
  { id: 'Australia', name: 'Australia', flag: '🇦🇺' },
];

export const QUALIFICATIONS = [
  "High School / 12th Grade",
  "Bachelor's Degree",
  "Master's Degree",
  "Diploma / Vocational Certificate"
];

export const FIELDS_OF_STUDY = [
  'Computer Science & IT',
  'Data Science & Artificial Intelligence',
  'Mechanical & Automotive Engineering',
  'Electrical & Electronics Engineering',
  'Business Administration & Management',
  'Healthcare & Life Sciences',
  'Renewable Energy & Environmental Engineering',
  'Architecture & Civil Engineering'
];

export const UniversityCourseMatcher: React.FC<UniversityCourseMatcherProps> = ({
  onApplyForCounselling
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Germany');
  const [selectedQualification, setSelectedQualification] = useState<string>("Bachelor's Degree");
  const [selectedField, setSelectedField] = useState<string>('Computer Science & IT');
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file?: File) => {
    setFileError(null);
    if (!file) return;

    const validExtensions = ['.pdf', '.docx'];
    const lowerName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => lowerName.endsWith(ext));

    if (!isValid) {
      setFileError('Invalid file type. Please upload a PDF or DOCX file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds the 10MB limit. Please upload a smaller transcript.');
      return;
    }

    setTranscriptFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    validateAndSetFile(file);
  };

  const handleRemoveFile = () => {
    setTranscriptFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate query execution to provide immediate feedback
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 450);
  };

  const handleResetSearch = () => {
    setHasSearched(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section id="course-matcher" className="scroll-mt-24">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm transition-colors">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-3">
            <SearchIcon className="w-3.5 h-3.5" />
            <span>Academic Profiler</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            University & Course Matcher
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
            Specify your destination preference, academic background, and intended specialization to evaluate study options.
          </p>
        </div>

        {!hasSearched ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Destination Country */}
              <div className="space-y-2">
                <label 
                  htmlFor="destination-country-select"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  Destination Country
                </label>
                <select
                  id="destination-country-select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors cursor-pointer"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Qualification */}
              <div className="space-y-2">
                <label 
                  htmlFor="academic-qualification-select"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  Current Academic Qualification
                </label>
                <select
                  id="academic-qualification-select"
                  value={selectedQualification}
                  onChange={(e) => setSelectedQualification(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors cursor-pointer"
                >
                  {QUALIFICATIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intended Field of Study */}
              <div className="space-y-2">
                <label 
                  htmlFor="field-of-study-select"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  Intended Field of Study
                </label>
                <select
                  id="field-of-study-select"
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors cursor-pointer"
                >
                  {FIELDS_OF_STUDY.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Transcript Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Upload Academic Transcript <span className="text-slate-400 font-normal lowercase">(Optional · PDF, DOCX up to 10MB)</span>
              </label>

              {!transcriptFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-400 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/40"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  aria-label="Upload transcript file in PDF or DOCX format"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                    id="transcript-file-input"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <UploadIcon className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      Click to browse or drag and drop your transcript
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Supported formats: PDF (.pdf) or Microsoft Word (.docx)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <FileTextIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {transcriptFile.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatFileSize(transcriptFile.size)} · Ready for evaluation
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Remove file"
                    aria-label="Remove uploaded transcript file"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              )}

              {fileError && (
                <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 mt-2">
                  <AlertCircleIcon className="w-4 h-4 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>

            {/* Submission Action */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg">
                Course matching queries verified institutional requirements. Uploading your transcript enables precise prerequisite and credit assessment.
              </p>

              <button
                type="submit"
                disabled={isSearching}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Querying Options...</span>
                  </>
                ) : (
                  <>
                    <SearchIcon className="w-4 h-4" />
                    <span>Find Matching Courses</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Submission Result: Honest Enquiry / Integration-Pending State */
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
              <div className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-amber-900 dark:text-amber-100">
                    Direct Course Matcher Integration in Progress
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-800/90 dark:text-amber-300 leading-relaxed">
                    Live programmatic university query endpoints are currently being integrated. In accordance with admissions compliance, university matches and eligibility verification require certified advisor review rather than unverified automated estimations.
                  </p>
                </div>
              </div>
            </div>

            {/* Captured Profile Parameters */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Profile Parameters Captured for Assessment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-xs">Destination:</span>
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                    {COUNTRIES.find(c => c.name === selectedCountry)?.flag} {selectedCountry}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-xs">Qualification:</span>
                  <span className="font-semibold text-slate-900 dark:text-white block mt-0.5">
                    {selectedQualification}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-xs">Field of Study:</span>
                  <span className="font-semibold text-slate-900 dark:text-white block mt-0.5">
                    {selectedField}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-xs">Transcript Status:</span>
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                    {transcriptFile ? (
                      <>
                        <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="truncate">{transcriptFile.name}</span>
                      </>
                    ) : (
                      <span className="text-slate-400 font-normal">Not attached</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetSearch}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Modify Search Criteria
              </button>

              <button
                type="button"
                onClick={() => onApplyForCounselling({
                  country: selectedCountry,
                  qualification: selectedQualification,
                  field: selectedField,
                  transcriptName: transcriptFile?.name
                })}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Advisor Evaluation</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
