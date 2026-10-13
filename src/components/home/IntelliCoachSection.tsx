import React, { useState } from 'react';
import { 
  BotIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  ZapIcon, 
  FileTextIcon, 
  ShieldCheckIcon, 
  CompassIcon, 
  SendIcon,
  AwardIcon
} from '../common/Icons';

export const IntelliCoachSection: React.FC = () => {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [customResponse, setCustomResponse] = useState<string | null>(null);

  const samplePrompts = [
    {
      question: "Assess my visa odds for Germany Chancenkarte (Opportunity Card)",
      category: "Visa & Immigration",
      answer: {
        headline: "Opportunity Card Match: 8.5 / 10 (High Probability)",
        keyPoints: [
          "Points Analysis: Recognized Bachelor's degree (+4 pts), 3+ years experience (+2 pts), Age under 35 (+2 pts), English B2 (+1 pt) = 9 points total (minimum threshold is 6 points).",
          "Fast-track Route: Eligible for immediate job search in Germany for up to 1 year with part-time work rights (up to 20 hours/week).",
          "Next Step: Get your Anabin database degree recognition certificate ready."
        ],
        actionLabel: "Generate Document Checklist"
      }
    },
    {
      question: "Review my Master's SOP for University of Toronto & suggest edits",
      category: "Education & SOP Review",
      answer: {
        headline: "SOP Audit: Academic rigor clear, strengthen professional impact",
        keyPoints: [
          "Strengths: Strong academic alignment with faculty research labs and clear career thesis.",
          "Recommendation: Quantify your past capstone project achievements with measurable metrics (e.g., latency reduction or data size handled).",
          "Grammar & Tone Score: 94/100, Academic Tone Match: High."
        ],
        actionLabel: "View Line-by-Line AI Annotations"
      }
    },
    {
      question: "What are the highest-paying student jobs in Ireland while studying?",
      category: "Work & Study",
      answer: {
        headline: "Top Student Roles: €12.70 - €22.00 / hour",
        keyPoints: [
          "Legal Limit: 20 hours/week during term-time, 40 hours/week during holidays (Stamp 2 Visa).",
          "Top Sectors: Tech QA internships (€18-€24/hr), university library & peer tutoring (€14-€16/hr), hospitality & barista roles (€12.70-€15/hr).",
          "PPSN Number: Required before your first paycheck. Intelli Coach provides the exact application steps."
        ],
        actionLabel: "Explore Student Job Portal"
      }
    },
    {
      question: "Mock Visa Interview: Why did you choose this specific university?",
      category: "Embassy Prep",
      answer: {
        headline: "AI Mock Response Evaluation: 92% Embassy Confidence",
        keyPoints: [
          "Crucial Angle: Highlight curriculum uniqueness (e.g. specialized modules) rather than generic rankings or desire to stay permanently.",
          "Red Flag Avoidance: Explicitly declare funding readiness and ties to home country / global career trajectory.",
          "Practice Drill: Complete the 5-question voice simulator to calibrate your delivery tone."
        ],
        actionLabel: "Launch Voice Mock Interview"
      }
    }
  ];

  const handlePromptClick = (index: number) => {
    setSelectedPromptIndex(index);
    setCustomResponse(null);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setCustomResponse(
        `Intelli Coach Assessment for: "${customInput}"\n\nBased on global visa regulations and university standards, our AI engine has analyzed your query. We recommend shortlisting programs aligned with your background, keeping language test scores at or above CEFR B2, and locking in pre-admission documentation at least 4 months prior to intake. Connect with an ILA advisor for human verification!`
      );
    }, 800);
  };

  const currentAnswer = samplePrompts[selectedPromptIndex].answer;

  const coachFeatures = [
    {
      icon: CompassIcon,
      title: "24/7 Academic & University Matchmaker",
      description: "Scans over 150+ global partner institutions across Germany, UK, USA, Canada, and Ireland to pinpoint degrees matching your budget, grades, and career dreams."
    },
    {
      icon: ShieldCheckIcon,
      title: "Real-Time Visa Eligibility & Risk Scoring",
      description: "Audits your profile against strict consulate requirements, identifying document gaps and scoring approval likelihood before you submit."
    },
    {
      icon: FileTextIcon,
      title: "AI SOP & Resume Polisher",
      description: "Generates tailored, ATS-proof Statement of Purpose (SOP) structures, Motivation Letters, and academic CVs that stand out to admissions boards."
    },
    {
      icon: ZapIcon,
      title: "Simulated Embassy Mock Interviews",
      description: "Practice real questions asked by German, US, and UK visa officers with instant AI evaluation of your answers, confidence, and phrasing."
    }
  ];

  return (
    <section id="intelli-coach" className="py-12 sm:py-20 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-200">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-3 shadow-sm dark:shadow-none">
            <SparklesIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Meet Intelli Coach • Powered by ILA Global AI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your 24/7 AI Counselor, Visa Analyst & Career Strategist
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            No more waiting days for answers. <strong className="text-indigo-600 dark:text-indigo-300 font-semibold">Intelli Coach</strong> combines millions of consular data points, global university admission criteria, and local work laws to guide every step of your international journey in real time.
          </p>
        </div>

        {/* Feature Grid: 4 Pillars of Intelli Coach */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {coachFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-sm dark:shadow-none group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-600/20 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-600/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Live AI Simulator */}
        <div className="mt-12 sm:mt-16 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-indigo-500/30 rounded-3xl p-4 sm:p-8 shadow-xl dark:shadow-2xl backdrop-blur-xl relative">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Left side: Interactive Prompt Selector & Custom input */}
            <div className="w-full lg:w-5/12 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BotIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Select a live prompt to simulate
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">Click to test</span>
              </div>

              {/* Sample Prompts List */}
              <div className="space-y-2.5">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePromptClick(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                      selectedPromptIndex === idx && !customResponse
                        ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-400 dark:border-indigo-500 text-slate-900 dark:text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                      <span>{p.category}</span>
                      {selectedPromptIndex === idx && !customResponse && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">● Active Query</span>
                      )}
                    </div>
                    <div className="font-medium line-clamp-2">"{p.question}"</div>
                  </button>
                ))}
              </div>

              {/* Custom Ask Box */}
              <form onSubmit={handleCustomSubmit} className="pt-2">
                <label htmlFor="custom-query" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Or ask Intelli Coach anything:
                </label>
                <div className="flex gap-2">
                  <input
                    id="custom-query"
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="e.g. Can I take family on Germany student visa?"
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isTyping}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                  >
                    <SendIcon className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right side: AI Response Screen */}
            <div className="w-full lg:w-7/12 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-inner">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
                    <BotIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      Intelli Coach Intelligence Engine
                      <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] rounded font-medium">
                        Live Response
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Context: Global Immigration & Academic Laws</div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                    Model: Intelli-V4-Pro
                  </span>
                </div>
              </div>

              {/* Response Body */}
              <div className="mt-4 min-h-[220px]">
                {isTyping ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    <p className="text-xs">Intelli Coach is analyzing global visa regulations & guidelines...</p>
                  </div>
                ) : customResponse ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 rounded-xl text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm font-semibold">
                      Custom AI Evaluation
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {customResponse}
                    </p>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => setCustomResponse(null)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      >
                        ← Return to preset queries
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 p-3 rounded-xl">
                      <SparklesIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-indigo-900 dark:text-indigo-200">
                          {currentAnswer.headline}
                        </div>
                        <div className="text-[11px] text-indigo-600/80 dark:text-indigo-300/80">
                          Verified against 2026 Consulate policies
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {currentAnswer.keyPoints.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <AwardIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                        <span>Confidence Score: <strong>96.8%</strong></span>
                      </div>

                      <button
                        type="button"
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                      >
                        {currentAnswer.actionLabel} →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
