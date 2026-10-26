import React, { useState, useEffect } from 'react';
import type { Course } from '../../data/coursesData';
import { useAuth } from '../../context/AuthContext';
import { 
  savePendingForm, 
  getPendingForm, 
  clearPendingForm 
} from '../../utils/pendingFormStorage';
import { submitCourseEnrollment } from '../../services/courses';
import { 
  XIcon, 
  CheckCircleIcon, 
  CalendarIcon, 
  ClockIcon, 
  AwardIcon, 
  BotIcon, 
  ArrowRightIcon,
  UserIcon,
  MailIcon,
  PhoneIcon
} from '../common/Icons';
import { addStudentCourseEnrollment } from '../../services/student';

const LIVE_TIME_SLOTS = [
  { id: 'morning', label: 'Morning Slot', hours: '09:00 - 12:00 CET', tag: 'Fast-Track' },
  { id: 'afternoon', label: 'Afternoon Slot', hours: '14:00 - 17:00 CET', tag: 'Standard' },
  { id: 'evening', label: 'Evening Slot', hours: '18:00 - 21:00 CET', tag: 'Most Popular' },
  { id: 'weekend', label: 'Weekend Intensive', hours: 'Sat & Sun (10:00 - 14:00 CET)', tag: 'Weekend' },
];

interface CourseEnrollmentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  learningPathTitle?: string;
  learningPathId?: string;
  finalPrice?: number;
}

export const CourseEnrollmentModal: React.FC<CourseEnrollmentModalProps> = ({
  course,
  isOpen,
  onClose,
  learningPathTitle = 'Video + AI Masterclass',
  learningPathId,
  finalPrice
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const isHumanTutor = learningPathTitle.toLowerCase().includes('human') || 
                       learningPathTitle.toLowerCase().includes('1-to-1') ||
                       learningPathId === '1-to-1';


  const [selectedBatchDate, setSelectedBatchDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Evening Slot (18:00 - 21:00 CET)');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-fill when course or user changes, or restore pending
  useEffect(() => {
    if (course) {
      const pending = getPendingForm<any>('course_enrollment');
      if (pending?.data && pending.data.courseId === course.id) {
        setSelectedBatchDate(pending.data.selectedBatchDate || course.batchDates[0] || '');
        setSelectedTimeSlot(pending.data.selectedTimeSlot || 'Evening Slot (18:00 - 21:00 CET)');
        setApplicantName(user?.name || pending.data.applicantName || '');
        setApplicantEmail(user?.email || pending.data.applicantEmail || '');
        setApplicantPhone(user?.phone || user?.phone_number || pending.data.applicantPhone || '');
        setLearningGoals(pending.data.learningGoals || '');
      } else {
        setSelectedBatchDate(course.batchDates[0] || '');
        setSelectedTimeSlot('Evening Slot (18:00 - 21:00 CET)');
        setApplicantName(user?.name || '');
        setApplicantEmail(user?.email || '');
        setApplicantPhone(user?.phone || user?.phone_number || '');
        setLearningGoals('');
      }
      setIsSuccess(false);
      setErrorMessage('');
    }
  }, [course, user]);

  const effectiveBatch = isHumanTutor
    ? `${selectedBatchDate || course?.batchDates[0] || 'Upcoming Cohort'} • ${selectedTimeSlot}`
    : 'Instant 24/7 Access (Self-Paced Anytime)';

  if (!isOpen || !course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isAuthenticated || !user) {
      savePendingForm('course_enrollment', {
        courseId: course.id,
        selectedBatch: effectiveBatch,
        selectedBatchDate,
        selectedTimeSlot,
        applicantName,
        applicantEmail,
        applicantPhone,
        learningGoals,
        learningPathTitle,
        learningPathId,
      });
      openAuthModal(
        'student',
        'login',
        `Please sign in to submit your application for ${course.title}. Your details have been saved.`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const calculatedPrice = finalPrice !== undefined ? finalPrice : course.price;

      // Trigger the real DRF backend API endpoint: POST /api/enrollments/
      const result = await submitCourseEnrollment({
        applicant_name: applicantName.trim() || user.name || 'Student Applicant',
        applicant_email: applicantEmail.trim() || user.email,
        applicant_phone: applicantPhone.trim() || user.phone || user.phone_number || '+91 9876543210',
        selected_batch: effectiveBatch,
        final_price: calculatedPrice.toFixed(2),
        course: course.id,
        course_level: course.id,
        payment_method: 'card',
        redeem_points: false,
        learning_goals: learningGoals.trim(),
        learning_path: learningPathTitle,
        learning_path_id: learningPathId,
      });


      const refId = result.enrollment_id || `ILA-ENR-${result.id || Math.floor(100000 + Math.random() * 900000)}`;

      // Record in local student dashboard state
      addStudentCourseEnrollment(
        course,
        learningPathTitle,
        effectiveBatch,
        calculatedPrice,
        refId,
        user
      );

      clearPendingForm('course_enrollment');
      setApplicationId(refId);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Course enrollment submission failed:', err);
      let errMsg = 'Failed to submit application. Please check your network and try again.';
      if (typeof err === 'string') {
        errMsg = err;
      } else if (err?.detail) {
        errMsg = err.detail;
      } else if (err?.message) {
        errMsg = err.message;
      } else if (typeof err === 'object') {
        const errorList = Object.entries(err)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
          .join(' | ');
        if (errorList) errMsg = errorList;
      }
      setErrorMessage(errMsg);
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl">{course.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {course.language} • {course.field}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Level {course.level}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {learningPathTitle}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
              {isSuccess ? 'Application Received!' : `Apply for ${course.title}`}
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
                Application Reference: {applicationId}
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Application Successfully Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your application for <strong>{course.title}</strong> under the <strong>{learningPathTitle}</strong> pathway {isHumanTutor ? <>scheduled for <strong>{effectiveBatch}</strong></> : <>with <strong>Instant 24/7 Anytime Access</strong></>} has been logged directly with the admissions team. An academic counselor will contact you via WhatsApp / email at <strong>{applicantEmail}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <BotIcon className="w-4 h-4 text-indigo-500" />
                <span>Preparation Bonus: Intelli Coach AI Vocabulary Assistant</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Start practicing specialized {course.field} vocabulary drills right now before your live class orientation.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close & Return
              </button>
              <a
                href="/#intelli-coach"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Intelli Coach Vocab Drills</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          /* APPLICATION FORM VIEW */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <span className="font-bold">Error:</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <ClockIcon className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {isHumanTutor ? 'Duration' : 'Schedule'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {isHumanTutor ? course.duration : '24/7 Anytime'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <CalendarIcon className="w-4 h-4 mx-auto text-purple-500 mb-1" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {isHumanTutor ? 'Live Hours' : 'Access Hours'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {isHumanTutor ? course.hours.split('+')[0] : 'Unlimited 24/7'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <AwardIcon className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Certificate</span>
                <span className="font-bold text-slate-900 dark:text-white">CEFR {course.level}</span>
              </div>
            </div>

            {/* Batch & Timing Selection vs Instant AI Access */}
            {isHumanTutor ? (
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white">
                    1. Preferred Live Cohort Batch:
                  </label>
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                    1:1 Human Tutor
                  </span>
                </div>

                <div className="space-y-1.5">
                  {course.batchDates.map((batch, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedBatchDate === batch
                          ? 'bg-amber-100/70 dark:bg-amber-950/70 border-amber-500 text-amber-950 dark:text-amber-100 font-bold shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="batchDate"
                          value={batch}
                          checked={selectedBatchDate === batch}
                          onChange={() => setSelectedBatchDate(batch)}
                          className="text-amber-600 focus:ring-indigo-500"
                        />
                        <span>{batch}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        {course.spotsRemaining} spots left
                      </span>
                    </label>
                  ))}
                </div>

                {/* 1:1 Live Timing Slot */}
                <div className="pt-1">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                    2. Preferred 1:1 Live Session Time Slot:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {LIVE_TIME_SLOTS.map((slot) => {
                      const isSlotActive = selectedTimeSlot.includes(slot.label);
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(`${slot.label} (${slot.hours})`)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            isSlotActive
                              ? 'bg-amber-100/70 dark:bg-amber-950/70 border-amber-500 text-amber-950 dark:text-amber-100 font-bold shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{slot.label}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                              {slot.tag}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-normal mt-0.5">
                            {slot.hours}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Instant 24/7 Access For AI Learners - No Batches or Timing Required */
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-indigo-50/90 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                      <BotIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        Instant 24/7 On-Demand Access
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        No batch dates or fixed time schedules required
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Active 24/7
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Batch schedules and fixed timing are reserved only for human tutors. Under your <strong>{learningPathTitle}</strong> pathway, you can use the AI tutor and interactive curriculum <strong>anytime</strong> at your own convenience — 24 hours a day, 7 days a week, with zero wait time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Practice Anytime</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Self-Paced Rhythm</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Immediate Activation</span>
                  </div>
                </div>
              </div>
            )}

            {/* Applicant Details */}
            <div className="space-y-3">
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Applicant Information:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="relative">
                  <MailIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="relative">
                <PhoneIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp / Phone (with country code)"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Learning Goals & Specific Requests:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Preparing for German Blue Card visa interview, IT team communication, or Goethe B1 exam..."
                  value={learningGoals}
                  onChange={(e) => setLearningGoals(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-base font-black text-slate-900 dark:text-white block">
                  Course Fee: €{finalPrice !== undefined ? finalPrice : course.price}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  {learningPathTitle} Deliverables Included
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting to Admissions...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
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
