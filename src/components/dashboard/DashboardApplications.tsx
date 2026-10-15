import React, { useState } from 'react';
import type { ApplicationTrack } from '../../services/student';
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '../common/Icons';

interface DashboardApplicationsProps {
  applications: ApplicationTrack[];
}

export const DashboardApplications: React.FC<DashboardApplicationsProps> = ({ applications }) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(
    applications[0]?.id || ''
  );

  const selectedApp =
    applications.find((a) => a.id === selectedAppId) || applications[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheckIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Application & Consular Visa Trackers</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time milestone tracking for your embassy filings, university admissions, and consular document verifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            {applications.length} Active Dossiers
          </span>
        </div>
      </div>

      {/* Main Grid: Application Selector & Detailed Stepper View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Application Cards */}
        <div className="lg:col-span-5 space-y-3">
          {applications.map((app) => {
            const isSelected = app.id === selectedApp?.id;
            const isApproved = app.status === 'approved';

            return (
              <div
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer text-left relative ${
                  isSelected
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-500/60 dark:border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
                      {app.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {app.type.replace('_', ' ')}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isApproved
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                              : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                          }`}
                        >
                          {app.statusLabel}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 line-clamp-1">
                        {app.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono text-[11px]">{app.referenceNumber}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Filed: {app.submittedDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Application Milestone Timeline */}
        {selectedApp && (
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedApp.flag}</span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    {selectedApp.country} • Reference: {selectedApp.referenceNumber}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedApp.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Desk: <strong className="text-slate-700 dark:text-slate-300">{selectedApp.consularDesk}</strong>
                </p>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold shrink-0">
                {selectedApp.statusLabel}
              </span>
            </div>

            {/* Officer Notes Banner */}
            {selectedApp.officerNotes && (
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <span className="text-base">📋</span>
                  <span>Consular Officer & Admissions Advisory Note:</span>
                </div>
                <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed pl-6">
                  {selectedApp.officerNotes}
                </p>
              </div>
            )}

            {/* Full Milestone Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                Milestone Execution Stepper
              </h4>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {selectedApp.steps.map((step, idx) => {
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';

                  return (
                    <div key={idx} className="relative flex items-start gap-4 z-10">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : isCurrent
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20 shadow-md animate-pulse'
                            : 'bg-white dark:bg-slate-850 border-2 border-slate-300 dark:border-slate-700 text-slate-400'
                        }`}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1 p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/80">
                        <div className="flex items-center justify-between gap-2">
                          <h5
                            className={`text-xs font-bold ${
                              isCompleted
                                ? 'text-slate-800 dark:text-slate-200'
                                : isCurrent
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {step.name}
                          </h5>
                          {step.date && (
                            <span className="text-[10px] font-mono text-slate-400">
                              {step.date}
                            </span>
                          )}
                        </div>
                        {isCurrent && (
                          <div className="mt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                            <span>Currently being processed by authorities</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Official tracking docket registered with VFS Global.
              </span>
              <button
                type="button"
                onClick={() =>
                  alert(
                    `Inquiry transmitted to consular officer for ${selectedApp.referenceNumber}. You will receive a response within 24 hours.`
                  )
                }
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Inquire with Officer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
