import React, { useState } from 'react';
import {
  GlobeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  XIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  AwardIcon,
  ShieldCheckIcon,
  PlaneIcon,
  BotIcon,
} from '../components/common/Icons';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';
import { useStudyAbroadData } from '../services/studyAbroad/hooks/useStudyAbroadData';
import { StudyAbroadDocModal } from '../components/studyabroad/StudyAbroadDocModal';
import { UniversityCourseMatcher } from '../components/studyabroad/UniversityCourseMatcher';
import { Upload } from 'lucide-react';

export const StudyAbroad: React.FC = () => {
  const { data: studyData, isBackendConnected } = useStudyAbroadData();

  // Active interaction states
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<'upload' | 'requirements' | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyTrack = (trackName: string) => {
    setSelectedTrack(trackName);
    scrollToSection('counselling-form');
  };

  const handleRequestService = (serviceName: string) => {
    setSelectedTrack(`Support Service: ${serviceName}`);
    scrollToSection('counselling-form');
  };

  const handleModalContinue = (contextInfo?: string) => {
    if (contextInfo) {
      setSelectedTrack(contextInfo);
    }
    scrollToSection('counselling-form');
  };

  const clearSelection = () => {
    setSelectedTrack(null);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* =========================================================================
          HERO SECTION: Full-Width Background Banner
          ========================================================================= */}
      <section className="relative w-full min-h-[560px] sm:min-h-[620px] flex items-center overflow-hidden bg-slate-950 text-white select-none py-16 sm:py-24">
        {/* Full-Bleed Background Image with Multilayer Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop"
            alt="Students on European university campus"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Multi-stage vignette gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40 sm:to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30 z-10" />
          <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] z-10" />
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Title, Subtitle & Primary Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
                <GlobeIcon className="w-4 h-4 text-purple-400" />
                <span>Global Education & Consular Pathways</span>
                {isBackendConnected && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    DRF Live
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                {studyData.hero.title}{' '}
                <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  {studyData.hero.highlightWord}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {studyData.hero.subtitle}
              </p>

              {/* Action Buttons: Explore Admissions & Upload Documents */}
              <div className="pt-2 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => scrollToSection('public-universities')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{studyData.hero.primaryCta}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setModalMode('upload')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-amber-300" />
                  <span>{studyData.hero.secondaryCta}</span>
                </button>
              </div>

              {/* Direct Quick Filter Navigation Pills */}
              <div className="pt-4 flex flex-wrap gap-2 text-xs">
                {studyData.hero.categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => scrollToSection(cat.targetSectionId)}
                    className="px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-purple-600/30 border border-slate-700/80 text-slate-200 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Frosted Glass Highlight Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl text-white space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-semibold text-purple-300">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span>150+ European Universities</span>
                  </div>
                  <span className="text-xs font-mono font-black text-white bg-purple-500/30 px-2.5 py-1 rounded border border-purple-500/40">
                    €0 Tuition
                  </span>
                </div>

                <div className="space-y-3">
                  {/* <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                    <SparklesIcon className="w-4 h-4 text-amber-300" />
                    <span>Free Tuition Pathways</span>
                  </div> */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Study Top Degree Programs at Zero Tuition Fee
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dedicated advising for undergraduate and master's admissions across leading German and European public institutions with full post-study work rights.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-slate-400">Average Savings</p>
                    <p className="text-lg font-black text-emerald-400">€24,000/yr</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-slate-400">Post-Study Visa</p>
                    <p className="text-lg font-black text-indigo-300">18 Months</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalMode('requirements')}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <GraduationCapIcon className="w-4 h-4" />
                  <span>Check Public Uni Requirements</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN BODY SECTIONS
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20 sm:space-y-24">
        {/* =======================================================================
            SECTION 1: 100% Free Tuition - German Public Universities
            ======================================================================= */}
        <section id="public-universities" className="scroll-mt-24 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <AwardIcon className="w-4 h-4" />
              <span>{studyData.publicUniversities.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {studyData.publicUniversities.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {studyData.publicUniversities.description}
            </p>
          </div>

          {/* 3 Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studyData.publicUniversities.programs.map((prog) => (
              <div
                key={prog.id}
                className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200/60 dark:border-purple-800">
                      {prog.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      €0 Tuition
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTrack(`Public University: ${prog.title}`);
                      setModalMode('requirements');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-purple-600 hover:text-white dark:bg-slate-800 dark:hover:bg-purple-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{prog.ctaText}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Guaranteed Benefits Grid */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold">Guaranteed Benefits</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {studyData.publicUniversities.guaranteedBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300">
                      {benefit.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {benefit.metricBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Two Interactive Action Callouts: Check Requirements & Upload Transcripts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Check Public Uni Requirements */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-transparent dark:from-purple-950/40 dark:via-indigo-950/40 border border-purple-200 dark:border-purple-800/60 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                <GraduationCapIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {studyData.publicUniversities.actions.checkRequirements.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {studyData.publicUniversities.actions.checkRequirements.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalMode('requirements')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{studyData.publicUniversities.actions.checkRequirements.ctaText}</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Upload Transcripts for Review */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-900/10 via-teal-900/10 to-transparent dark:from-emerald-950/40 dark:via-teal-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {studyData.publicUniversities.actions.uploadTranscripts.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {studyData.publicUniversities.actions.uploadTranscripts.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalMode('upload')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{studyData.publicUniversities.actions.uploadTranscripts.ctaText}</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION 2: Royal Lifetime Mentorship - Ilas With You Companion
            ======================================================================= */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border border-purple-800/50 p-6 sm:p-10 lg:p-12 text-white shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                {studyData.companionBanner.title}
              </h2>
              <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-2xl">
                {studyData.companionBanner.description}
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href={studyData.companionBanner.linkUrl}
                className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <BotIcon className="w-4 h-4 text-purple-700" />
                <span>{studyData.companionBanner.ctaText}</span>
              </a>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION 3: English Medium & Fast Track - German Private Universities
            ======================================================================= */}
        <section id="private-universities" className="scroll-mt-24 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <GlobeIcon className="w-4 h-4" />
              <span>{studyData.privateUniversities.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {studyData.privateUniversities.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {studyData.privateUniversities.description}
            </p>
          </div>

          {/* 3 Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studyData.privateUniversities.programs.map((prog) => (
              <div
                key={prog.id}
                className="group relative rounded-3xl bg-blue-400/30 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-800">
                      {prog.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {prog.intakeInfo}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleApplyTrack(`Private University: ${prog.title}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-blue-600/20"
                  >
                    <span>{prog.ctaText}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Key Private Uni Advantages */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Key Private Uni Advantages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {studyData.privateUniversities.keyAdvantages.map((adv) => (
                <div
                  key={adv.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {adv.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                      {adv.metricBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION 4: Earn While You Study - Ausbildung (Paid Vocational Training)
            ======================================================================= */}
        <section id="ausbildung" className="scroll-mt-24 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">
              <BriefcaseIcon className="w-4 h-4" />
              <span>{studyData.ausbildung.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {studyData.ausbildung.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {studyData.ausbildung.description}
            </p>
          </div>

          {/* 3 Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studyData.ausbildung.programs.map((prog) => (
              <div
                key={prog.id}
                className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200/60 dark:border-amber-800">
                      {prog.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                      Paid Stipend
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleApplyTrack(`Ausbildung: ${prog.title}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-amber-600/20"
                  >
                    <span>{prog.ctaText}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ausbildung Highlights */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
            <div className="flex items-center gap-2">
              {/* <SparklesIcon className="w-5 h-5 text-amber-400" /> */}
              <h3 className="text-base sm:text-lg font-bold">Ausbildung Highlights</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {studyData.ausbildung.highlights.map((hl) => (
                <div
                  key={hl.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">
                      {hl.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {hl.metricBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {hl.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION 5: End-to-End Assistance - Complimentary Support Services
            ======================================================================= */}
        <section id="support-services" className="scroll-mt-24 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <PlaneIcon className="w-4 h-4" />
              <span>{studyData.supportServices.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {studyData.supportServices.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {studyData.supportServices.description}
            </p>
          </div>

          {/* 6 Support Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyData.supportServices.services.map((srv) => (
              <div
                key={srv.id}
                className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {srv.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {srv.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleRequestService(srv.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supplementary Interactive Tools: University & Course Matcher */}
        <section id="course-matcher" className="scroll-mt-24">
          <UniversityCourseMatcher
            onApplyForCounselling={(details) => {
              if (details) {
                setSelectedTrack(
                  `Course Matcher: ${details.country} - ${details.field} (${details.qualification})`
                );
              }
              scrollToSection('counselling-form');
            }}
          />
        </section>

        {/* =======================================================================
            SECTION 6: Ready to Start Your European Journey? & Enquiry Form
            ======================================================================= */}
        <section id="counselling-form" className="scroll-mt-24 space-y-6">
          <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-purple-800/40 shadow-xl">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold">
                <GlobeIcon className="w-3.5 h-3.5" />
                <span>Admissions Advisory</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                {studyData.finalCta.title}
              </h2>
              <p className="text-sm sm:text-base text-purple-200 leading-relaxed">
                {studyData.finalCta.subtitle}
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
                  <span>{studyData.finalCta.ctaText}</span>
                  <ArrowRightIcon className="w-4 h-4 text-purple-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Context Banner when user clicked a specific program or service */}
          {selectedTrack && (
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 flex items-center justify-between text-xs sm:text-sm animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <CheckCircleIcon className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="text-slate-800 dark:text-slate-200">
                  Active Selected Program / Context:{' '}
                  <strong className="font-semibold text-purple-700 dark:text-purple-300">
                    {selectedTrack}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={clearSelection}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
                title="Clear selected track"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Dedicated Application & Enquiry Form */}
          <div id="study-abroad-enquiry-form">
            <PageEnquiryForm
              pageType="study-abroad"
              title="Apply for Counselling"
              subtitle="Tell us about your academic background and preferred destination to get started."
            />
          </div>
        </section>
      </div>

      {/* Interactive Modal: Document Upload & Bavarian Requirements Calculator */}
      <StudyAbroadDocModal
        isOpen={modalMode !== null}
        mode={modalMode}
        onClose={() => setModalMode(null)}
        onContinueToForm={handleModalContinue}
      />
    </div>
  );
};

export default StudyAbroad;
