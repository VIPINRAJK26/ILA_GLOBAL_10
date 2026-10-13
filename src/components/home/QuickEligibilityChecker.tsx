import React, { useState } from 'react';
import { 
  BotIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  CompassIcon 
} from '../common/Icons';

export const QuickEligibilityChecker: React.FC = () => {
  const [goal, setGoal] = useState<'study' | 'workstudy' | 'visa' | 'jobs'>('workstudy');
  const [country, setCountry] = useState<'germany' | 'canada' | 'uk' | 'ireland'>('germany');
  const [level, setLevel] = useState<'bachelor' | 'master' | 'experienced'>('bachelor');
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(true);
  };

  const getResults = () => {
    if (country === 'germany' && (goal === 'workstudy' || goal === 'study')) {
      return {
        score: '96%',
        verdict: 'High Match for Public University + Werkstudent Track',
        perks: [
          'Eligible for €0 tuition fees at top German public universities',
          'Legal right to work 140 full days / 280 half days per year (€14-€22/hr)',
          '18-month post-study job seeker visa upon graduation'
        ],
        intelliCoachTip: 'Prioritize German language A1/A2 while awaiting admissions to fast-track high-paying student tech & engineering roles!'
      };
    } else if (country === 'canada') {
      return {
        score: '91%',
        verdict: 'Strong Match for Co-op Program + PGWP Pathway',
        perks: [
          'Eligible for 24 hrs/week off-campus work during study terms',
          'Co-op integrated semesters count towards Canadian work experience',
          'Direct pathway to 3-year Post-Graduation Work Permit (PGWP)'
        ],
        intelliCoachTip: 'Focus on programs in British Columbia or Ontario with high Co-op employer networks.'
      };
    } else if (country === 'uk') {
      return {
        score: '93%',
        verdict: 'Excellent Match for 1-Year Fast Masters + Graduate Route',
        perks: [
          'Complete your Master’s in only 12 months, saving 50% living costs',
          '20 hrs/week student employment rights during semesters',
          'Automatic 2-year Graduate Route visa with no employer sponsorship needed'
        ],
        intelliCoachTip: 'Take advantage of January and September intakes with early bird university scholarships up to £5,000.'
      };
    } else {
      return {
        score: '89%',
        verdict: 'Optimal Match for European Tech & Work Hubs',
        perks: [
          'Stamp 2 Visa offers 20 hrs/week term-time & 40 hrs/week holidays',
          'High concentration of Fortune 500 tech headquarters in Dublin',
          '2-year Third Level Graduate Scheme (Stamp 1G)'
        ],
        intelliCoachTip: 'PPSN registration can be completed within 2 weeks of landing through ILAS With You.'
      };
    }
  };

  const result = getResults();

  return (
    <section id="eligibility-checker" className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-2 shadow-sm dark:shadow-none">
              <CompassIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Instant AI Assessment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Check Your Global Eligibility in 30 Seconds
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              Tell Intelli Coach your preference to preview your admission, visa approval, and student earning potential.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-6">
            {/* Step 1: Goal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                1. What is your primary objective?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'workstudy', label: 'Work & Study Dual Track' },
                  { id: 'study', label: 'Degree / Study Abroad' },
                  { id: 'visa', label: 'Opportunity / Job Visa' },
                  { id: 'jobs', label: 'Direct Job Placement' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setGoal(item.id as any); setIsCalculated(false); }}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                      goal === item.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                        : 'bg-white dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Country */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                2. Select Preferred Destination:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'germany', label: '🇩🇪 Germany (Free Uni)' },
                  { id: 'canada', label: '🇨🇦 Canada (Co-op & PR)' },
                  { id: 'uk', label: '🇬🇧 United Kingdom' },
                  { id: 'ireland', label: '🇮🇪 Ireland / Europe' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setCountry(item.id as any); setIsCalculated(false); }}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                      country === item.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                        : 'bg-white dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Education Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                3. Your Highest Education / Experience:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'bachelor', label: "Bachelor's Degree (Completed / Final Year)" },
                  { id: 'master', label: "Master's Degree (Postgraduate)" },
                  { id: 'experienced', label: "Working Professional (2+ Yrs Experience)" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setLevel(item.id as any); setIsCalculated(false); }}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                      level === item.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                        : 'bg-white dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 mx-auto shadow-lg shadow-purple-600/30 cursor-pointer"
              >
                <BotIcon className="w-5 h-5" />
                <span>Calculate My Eligibility Now</span>
                <SparklesIcon className="w-4 h-4 text-yellow-300" />
              </button>
            </div>
          </form>

          {/* Results Output */}
          {isCalculated && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 animate-fade-in space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      Match Score: {result.score}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Intelli Coach Verified</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{result.verdict}</h3>
                </div>

                <div className="w-full sm:w-auto">
                  <a
                    href="#intelli-coach"
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                  >
                    <span>Chat with Coach</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {result.perks.map((perk, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none">
                <SparklesIcon className="w-4 h-4 text-amber-500 dark:text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">AI Coach Recommendation: </strong>
                  {result.intelliCoachTip}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
