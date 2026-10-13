import React, { useState } from 'react';
import type { Course } from '../../data/coursesData';
import { useAuth } from '../../context/AuthContext';
import { 
  XIcon, 
  CheckCircleIcon, 
  CreditCardIcon, 
  CalendarIcon, 
  ClockIcon, 
  SparklesIcon, 
  AwardIcon, 
  BotIcon, 
  ArrowRightIcon 
} from '../common/Icons';

interface CourseEnrollmentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseEnrollmentModal: React.FC<CourseEnrollmentModalProps> = ({
  course,
  isOpen,
  onClose
}) => {
  const { user } = useAuth();

  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sepa' | 'paypal'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');

  // Auto-fill when course or user changes
  React.useEffect(() => {
    if (course) {
      setSelectedBatch(course.batchDates[0] || '');
      setApplicantName(user?.name || '');
      setApplicantEmail(user?.email || '');
      setRedeemPoints(false);
      setIsSuccess(false);
    }
  }, [course, user]);

  if (!isOpen || !course) return null;

  const pointsDiscount = redeemPoints ? 50 : 0;
  const finalPrice = Math.max(course.price - pointsDiscount, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate payment authorization & seat reservation
    await new Promise((resolve) => setTimeout(resolve, 800));
    setEnrollmentId(`ILA-CRS-${Math.floor(10000 + Math.random() * 90000)}`);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{course.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {course.language} • {course.field} Track
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Level {course.level}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
              {isSuccess ? 'Enrollment Confirmed!' : `Enroll in ${course.title}`}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* SUCCESS VIEW */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <CheckCircleIcon className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Enrollment ID: {enrollmentId}
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Welcome to the Cohort!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your seat in <strong>{course.title}</strong> has been secured for <strong>{selectedBatch}</strong>. An onboarding kit with Google Calendar invites and textbook links has been emailed to <strong>{applicantEmail}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <BotIcon className="w-4 h-4 text-indigo-500" />
                <span>Bonus Included: Intelli Coach AI Vocabulary Assistant</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Start practicing your specialized {course.field} vocabulary drills right now before your live class starts.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Close & Return
              </button>
              <a
                href="/#intelli-coach"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5"
              >
                <span>Launch Intelli Coach Vocab Trainer</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Field Vocabulary Highlight Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <SparklesIcon className="w-3.5 h-3.5 text-indigo-500" />
                  Target Industry Vocabulary Highlights:
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {course.field}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {course.industryKeywords.map((word, i) => (
                  <span 
                    key={i} 
                    className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-300"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Course Key Specs */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <ClockIcon className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Duration</span>
                <span className="font-bold text-slate-900 dark:text-white">{course.duration}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <CalendarIcon className="w-4 h-4 mx-auto text-purple-500 mb-1" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Hours</span>
                <span className="font-bold text-slate-900 dark:text-white">{course.hours.split('+')[0]}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <AwardIcon className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Certificate</span>
                <span className="font-bold text-slate-900 dark:text-white">CEFR {course.level}</span>
              </div>
            </div>

            {/* Batch Schedule Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Choose Upcoming Batch Schedule:
              </label>
              <div className="space-y-1.5">
                {course.batchDates.map((batch, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedBatch === batch
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="batch"
                        value={batch}
                        checked={selectedBatch === batch}
                        onChange={() => setSelectedBatch(batch)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{batch}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      {course.spotsRemaining} spots left
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Applicant Details */}
            <div className="space-y-3">
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Student Contact Details:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="WhatsApp / Phone Number (for class link)"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* ILA Points Scholarship Discount Toggle */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AwardIcon className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Redeem 1,000 ILA Reward Points</div>
                  <div className="text-[11px] text-amber-700 dark:text-amber-300">Instant €50 Academic Scholarship Credit</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={redeemPoints}
                onChange={(e) => setRedeemPoints(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Payment Mode:
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <CreditCardIcon className="w-3.5 h-3.5" />
                  <span>Card / Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('sepa')}
                  className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'sepa'
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>SEPA / Bank</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>PayPal / UPI</span>
                </button>
              </div>
            </div>

            {/* Price Summary & Submit Button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">€{finalPrice}</span>
                  <span className="text-xs text-slate-400 line-through">€{course.originalPrice}</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  {redeemPoints ? 'Includes €50 ILA Scholarship Discount' : 'Official CEFR Examination Prep Included'}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Confirm & Pay €{finalPrice}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
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
