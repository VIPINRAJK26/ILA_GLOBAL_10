import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import {
  useLanguageCourses,
  useResolvedLearningPaths,
  type BackendLanguageCourse,
  type BackendSpecialization,
  type BackendCourseLevel,
  type LearningPathOption,
  transformCourseLevelToCourse,
  DEFAULT_LANGUAGE_COURSES,
} from "../services/courses";
import { CourseEnrollmentModal } from "../components/courses/CourseEnrollmentModal";
import { PageEnquiryForm } from "../components/common/PageEnquiryForm";
import { getPendingForm } from "../utils/pendingFormStorage";
import { useAuth } from "../context/AuthContext";
import { type Course } from "../data/coursesData";
import {
  SparklesIcon,
  BookOpenIcon,
  ClockIcon,
  AwardIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  LaptopIcon,
  BriefcaseIcon,
} from "../components/common/Icons";

export type { LearningPathOption };

export const Courses: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { data: languageCourses = DEFAULT_LANGUAGE_COURSES, isLoading } =
    useLanguageCourses();

  const [selectedLanguageId, setSelectedLanguageId] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get("language");
      if (langParam) {
        const matched = DEFAULT_LANGUAGE_COURSES.find(
          (l) =>
            l.name.toLowerCase() === langParam.toLowerCase() ||
            l.id.toLowerCase() === langParam.toLowerCase(),
        );
        if (matched) return matched.id;
      }
    } catch {
      // ignore
    }
    return DEFAULT_LANGUAGE_COURSES[0]?.id || "german";
  });

  const [selectedSpecializationId, setSelectedSpecializationId] =
    useState<string>(() => {
      return (
        DEFAULT_LANGUAGE_COURSES[0]?.specializations[0]?.id || "it-software"
      );
    });

  const [selectedLevelId, setSelectedLevelId] = useState<string>(() => {
    const defaultLevel =
      DEFAULT_LANGUAGE_COURSES[0]?.specializations[0]?.levels?.[0]?.id;
    return defaultLevel || "de-it-a1a2";
  });

  const [selectedPathId, setSelectedPathId] = useState<string>("video-ai");

  const [activeCourseToEnroll, setActiveCourseToEnroll] =
    useState<Course | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const courseCardRef = useRef<HTMLDivElement>(null);

  // Handle URL ?language=... or ?course=... from Navbar navigation
  useEffect(() => {
    if (languageCourses.length === 0) return;

    const params = new URLSearchParams(location.search);
    const langParam = params.get("language");

    if (langParam) {
      const matched = languageCourses.find(
        (l) =>
          l.name.toLowerCase() === langParam.toLowerCase() ||
          l.id.toLowerCase() === langParam.toLowerCase(),
      );
      if (matched && matched.id !== selectedLanguageId) {
        setSelectedLanguageId(matched.id);
      }
    }
  }, [location.search, languageCourses]);

  // Selected Language Object
  const currentLanguage: BackendLanguageCourse | undefined =
    languageCourses.find((l) => l.id === selectedLanguageId);

  // Specializations for Current Language (filter out any that have no levels/courses)
  const currentSpecializations: BackendSpecialization[] = (
    currentLanguage?.specializations ||
    currentLanguage?.fields ||
    []
  ).filter((s) => {
    const lvls = s.levels || s.courses || [];
    return lvls.length > 0;
  });

  // When language changes, auto-select its first available specialization
  useEffect(() => {
    if (currentSpecializations.length > 0) {
      const exists = currentSpecializations.some(
        (s) => s.id === selectedSpecializationId,
      );
      if (!exists) {
        setSelectedSpecializationId(currentSpecializations[0].id);
      }
    } else {
      setSelectedSpecializationId("");
    }
  }, [currentLanguage, currentSpecializations, selectedSpecializationId]);

  // Selected Specialization Object
  const currentSpecialization: BackendSpecialization | undefined =
    currentSpecializations.find((s) => s.id === selectedSpecializationId);

  // Available Levels for Current Specialization
  const currentLevels: BackendCourseLevel[] =
    currentSpecialization?.levels || currentSpecialization?.courses || [];

  // When specialization changes, auto-select its first level
  useEffect(() => {
    if (currentLevels.length > 0) {
      const exists = currentLevels.some((l) => l.id === selectedLevelId);
      if (!exists) {
        setSelectedLevelId(currentLevels[0].id);
      }
    } else {
      setSelectedLevelId("");
    }
  }, [currentSpecialization, currentLevels, selectedLevelId]);

  // Selected Course Level Object
  const currentCourseLevel: BackendCourseLevel | undefined = currentLevels.find(
    (l) => l.id === selectedLevelId,
  );

  // DRF-friendly Resolved Learning Paths (level-specific override if present, else global paths)
  const { learningPaths, isLoading: isPathsLoading } =
    useResolvedLearningPaths(currentCourseLevel);

  // Synchronize selectedPathId if current selection is not valid in loaded paths
  useEffect(() => {
    if (learningPaths.length > 0) {
      const exists = learningPaths.some((p) => p.id === selectedPathId);
      if (!exists) {
        const preferred =
          learningPaths.find((p) => p.id === "video-ai") || learningPaths[0];
        setSelectedPathId(preferred.id);
      }
    }
  }, [learningPaths, selectedPathId]);

  // Active Learning Path
  const activePath = learningPaths.find((p) => p.id === selectedPathId) ||
    learningPaths[0] || {
      id: "video-ai",
      title: "Video + AI Masterclass",
      tagline:
        "Structured video modules combined with 24/7 AI practice — use anytime without fixed batches",
      badge: "Standard",
      badgeColor:
        "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800",
      priceMultiplier: 1.0,
      icon: LaptopIcon,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      features: [],
      deliverables: [],
      recommendedFor: "",
    };

  // Base price and adjusted final price
  const basePrice = currentCourseLevel
    ? typeof currentCourseLevel.price === "number"
      ? currentCourseLevel.price
      : parseFloat(String(currentCourseLevel.price)) || 199
    : 199;
  const finalCalculatedPrice = Math.round(
    basePrice * activePath.priceMultiplier,
  );

  // Convert to full Course entity for the enrollment modal
  const selectedCourseEntity: Course | null =
    currentCourseLevel && currentLanguage && currentSpecialization
      ? transformCourseLevelToCourse(
          currentCourseLevel,
          currentLanguage,
          currentSpecialization,
        )
      : null;

  // Restore pending course enrollment after login redirect
  useEffect(() => {
    if (isAuthenticated) {
      const pending = getPendingForm<any>("course_enrollment");
      if (pending?.data?.courseId && languageCourses.length > 0) {
        // Find course in nested language courses
        for (const lang of languageCourses) {
          const specs = lang.specializations || lang.fields || [];
          for (const spec of specs) {
            const lvls = spec.levels || spec.courses || [];
            const foundLvl = lvls.find((l) => l.id === pending.data.courseId);
            if (foundLvl) {
              const fullCourse = transformCourseLevelToCourse(
                foundLvl,
                lang,
                spec,
              );
              setActiveCourseToEnroll(fullCourse);
              setIsEnrollModalOpen(true);
              return;
            }
          }
        }
      }
    }
  }, [isAuthenticated, languageCourses]);

  const handleSelectLanguage = (langId: string) => {
    setSelectedLanguageId(langId);
    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleSelectSpecialization = (specId: string) => {
    setSelectedSpecializationId(specId);
    setTimeout(() => {
      step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleSelectLevel = (lvlId: string) => {
    setSelectedLevelId(lvlId);
    setTimeout(() => {
      step4Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleSelectPath = (pathId: string) => {
    setSelectedPathId(pathId);
    setTimeout(() => {
      courseCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  };

  const handleEnroll = () => {
    if (selectedCourseEntity) {
      setActiveCourseToEnroll(selectedCourseEntity);
      setIsEnrollModalOpen(true);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 min-h-screen">
      {/* Header Hero Section - Full Screen Banner in the Background */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] flex items-center overflow-hidden bg-slate-950 text-white select-none py-14 sm:py-20 lg:py-24">
        {/* Full-width Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
            alt="Students engaged in interactive European language classroom seminar"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Multi-stage Vignette Gradients for Crystal Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40 sm:to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 z-10" />
          <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] z-10" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md text-xs sm:text-sm font-semibold text-slate-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                  ILA Language & Industry Academy • CEFR Accredited
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Targeted European Language Courses for{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Global Careers
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Master German, English, French, and Spanish with certified native examiners. Select your specialized industry track (IT, Healthcare, Engineering), CEFR level, and pathway (1:1 Native Tutor, Video + AI, or 24/7 AI Tutor).
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    step2Ref.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer hover:scale-102 active:scale-98"
                >
                  <span>Configure My Course</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                <a
                  href="#intelli-coach"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/#intelli-coach";
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-md transition-colors"
                >
                  <SparklesIcon className="w-4 h-4 text-indigo-400" />
                  <span>Free AI Level Assessment</span>
                </a>
              </div>

              {/* Proof Points */}
              <div className="pt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-300 border-t border-slate-800">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Goethe, Telc & TestDaF Examination Centers
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  Clinical & Engineering Specialized Vocabulary
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  98.4% First-Attempt Pass Rate
                </span>
              </div>
            </div>

            {/* Right Frosted Glass Stat Card */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <SparklesIcon className="w-3.5 h-3.5 text-indigo-400" />
                    CEFR Progression Standard
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    A1 to C1
                  </span>
                </div>

                <div className="py-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
                    98.4%
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    Exam Pass Rate First-Attempt
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold">
                    <BookOpenIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Live Native & AI Hybrid</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Structured 8 to 12-week intensive cohorts designed for university admission, medical licenses, and work permits.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="text-slate-300 font-mono text-[11px]">Goethe · Telc · TestDaF</span>
                  <span className="text-indigo-400 font-semibold text-[11px]">✦ Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">

        {/* ================= STEP 1: SELECT LANGUAGE ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Choose Language Course
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {languageCourses.map((lang) => {
                const isSelected = selectedLanguageId === lang.id;
                const activeSpecsCount = (
                  lang.specializations ||
                  lang.fields ||
                  []
                ).filter(
                  (s) => (s.levels || s.courses || []).length > 0,
                ).length;

                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.id)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? "bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-600 ring-2 ring-indigo-500/30 shadow-md scale-[1.02]"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      <span className="text-3xl block mb-2">{lang.flag}</span>
                      <h3 className="font-black text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {lang.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {lang.description || "Fast-track CEFR curriculum"}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {activeSpecsCount} Specializations
                      </span>
                      {isSelected && (
                        <CheckCircleIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= STEP 2: SELECT SPECIALIZATION / FIELD ================= */}
        <div ref={step2Ref} className="space-y-4 pt-4 scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Choose Specialization / Field of Study
            </h2>
            {currentLanguage && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">
                {currentLanguage.flag} {currentLanguage.name}
              </span>
            )}
          </div>

          {currentSpecializations.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-slate-500 text-xs">
              Please select a language course above to see available
              specializations.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {currentSpecializations.map((spec) => {
                const isSelected = selectedSpecializationId === spec.id;
                const levelsCount = (spec.levels || spec.courses || []).length;

                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => handleSelectSpecialization(spec.id)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? "bg-purple-50/70 dark:bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30 shadow-md scale-[1.01]"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-slate-700 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                          <BriefcaseIcon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <CheckCircleIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>

                      <h3 className="text-sm font-black text-slate-900 dark:text-white mt-2.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {spec.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                        {spec.description ||
                          "Targeted vocabulary & workplace dialogues"}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">
                        {levelsCount} CEFR Levels
                      </span>
                      <span
                        className={`transition-colors ${isSelected ? "text-purple-600 dark:text-purple-400" : "text-slate-400 group-hover:text-purple-500"}`}
                      >
                        Select →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= STEP 3: SELECT LANGUAGE LEVEL ================= */}
        <div ref={step3Ref} className="space-y-4 pt-4 scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Choose Language Level
            </h2>
            {currentSpecialization && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
                {currentSpecialization.name}
              </span>
            )}
          </div>

          {currentLevels.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-slate-500 text-xs">
              No levels configured for this specialization yet. Please select
              another specialization.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5">
              {currentLevels.map((lvl) => {
                const isSelected = selectedLevelId === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => handleSelectLevel(lvl.id)}
                    className={`py-3 px-5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30 scale-105"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-400"
                    }`}
                  >
                    <span>CEFR Level {lvl.level}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                    >
                      Base: €{lvl.price}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= STEP 4: CHOOSE LEARNING PATHWAY ================= */}
        <div ref={step4Ref} className="space-y-4 pt-4 scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Choose Your Learning Path
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              Active: {activePath.title}
            </span>
          </div>

          {isPathsLoading && learningPaths.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {learningPaths.map((path) => {
                const isSelected = selectedPathId === path.id;
                const PathIcon = path.icon || LaptopIcon;
                const pathCalculatedPrice = Math.round(
                  basePrice * path.priceMultiplier,
                );

                return (
                  <div
                    key={path.id}
                    onClick={() => handleSelectPath(path.id)}
                    className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isSelected
                        ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-600 shadow-xl ring-2 ring-indigo-500/20 scale-[1.02]"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 hover:shadow-md"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400">
                        <CheckCircleIcon className="w-5 h-5" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${path.iconColor}`}
                        >
                          <PathIcon className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${path.badgeColor}`}
                        >
                          {path.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-slate-900 dark:text-white mt-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        {path.tagline}
                      </p>

                      <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">
                          €{pathCalculatedPrice}
                        </span>
                        <span className="text-xs text-slate-400">
                          / full level
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wider">
                          Included Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {path.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] text-slate-400 block italic leading-tight">
                        Recommended: {path.recommendedFor}
                      </span>
                      <button
                        type="button"
                        className={`w-full mt-3 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50 group-hover:text-indigo-600"
                        }`}
                      >
                        {isSelected ? "✓ Path Selected" : "Choose This Path"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= STEP 5: SELECTED COURSE DETAILS CARD & APPLY ================= */}
        {currentCourseLevel && (
          <div ref={courseCardRef} className="pt-4 scroll-mt-24">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-500/40 shadow-xl space-y-6">
              {/* Header Badges & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl">{currentLanguage?.flag}</span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {currentLanguage?.name} • {currentSpecialization?.name}
                    </span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {currentCourseLevel.level_tag ||
                        `CEFR ${currentCourseLevel.level}`}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      Path: {activePath.title}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {selectedPathId === "1-to-1"
                        ? `${currentCourseLevel.spots_remaining} Live Cohort Spots Left`
                        : "Instant 24/7 Access (Use Anytime)"}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                    {currentCourseLevel.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    {currentCourseLevel.full_desc ||
                      currentCourseLevel.short_desc}
                  </p>
                </div>

                {/* Pricing Box */}
                <div className="sm:text-right shrink-0">
                  <div className="flex sm:justify-end items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                      €{finalCalculatedPrice}
                    </span>
                    {currentCourseLevel.original_price && (
                      <span className="text-sm text-slate-400 line-through">
                        €
                        {Math.round(
                          (typeof currentCourseLevel.original_price === "number"
                            ? currentCourseLevel.original_price
                            : parseFloat(
                                String(currentCourseLevel.original_price),
                              ) || 299) * activePath.priceMultiplier,
                        )}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                    {activePath.title} • CEFR Verified
                  </span>
                </div>
              </div>

              {/* Specs & Keywords Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Specifications */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-indigo-500 font-bold">
                      <ClockIcon className="w-4 h-4" />
                      <span>
                        {selectedPathId === "1-to-1"
                          ? "Live Cohort Duration"
                          : "Access & Schedule"}
                      </span>
                    </div>
                    <div className="font-black text-sm text-slate-900 dark:text-white">
                      {selectedPathId === "1-to-1"
                        ? currentCourseLevel.duration
                        : "24/7 Anytime Access"}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {selectedPathId === "1-to-1"
                        ? `${currentCourseLevel.hours} (Batch & Time Slots)`
                        : "Self-Paced • Zero Scheduling Constraints"}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                      <AwardIcon className="w-4 h-4" />
                      <span>Certification</span>
                    </div>
                    <div className="font-black text-sm text-slate-900 dark:text-white">
                      CEFR {currentCourseLevel.level} Certified
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Official Exam Prepped
                    </div>
                  </div>
                </div>

                {/* Industry Keywords */}
                {currentCourseLevel.industry_keywords &&
                  currentCourseLevel.industry_keywords.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        <SparklesIcon className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Specialized Vocabulary Drills:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentCourseLevel.industry_keywords.map((word, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
                  <span>
                    Verified CEFR Framework • {activePath.title} • Official
                    Certificate Support
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleEnroll}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>
                    {selectedPathId === "1-to-1"
                      ? `Apply for 1:1 Live Cohort (Batch & Timing • €${finalCalculatedPrice})`
                      : `Start Learning Anytime (Instant 24/7 Access • €${finalCalculatedPrice})`}
                  </span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Page Enquiry Form at bottom */}
        <div className="pt-8">
          <PageEnquiryForm
            pageType="courses"
            title="Need Guidance on Language Level or Learning Path?"
            subtitle="Our academic counselors can assess your proficiency and match you with the right tutor or self-paced AI plan."
          />
        </div>
      </div>

      {/* Course Enrollment / Application Modal */}
      <CourseEnrollmentModal
        course={activeCourseToEnroll}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        learningPathTitle={activePath.title}
        learningPathId={activePath.id}
        finalPrice={finalCalculatedPrice}
      />
    </div>
  );
};

export default Courses;
