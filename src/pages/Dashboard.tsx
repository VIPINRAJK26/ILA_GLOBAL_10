import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getStudentDashboardData,
  updateStudentProfileData,
  toggleActivityItemStatus,
  addStudentDocumentRecord,
  deleteStudentDocumentRecord,
  type StudentDashboardData,
  type StudentProfile,
  type StudentDocument,
} from '../services/student';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { DashboardCourses } from '../components/dashboard/DashboardCourses';
import { DashboardProfile } from '../components/dashboard/DashboardProfile';
import { DashboardApplications } from '../components/dashboard/DashboardApplications';
import { DashboardRewards } from '../components/dashboard/DashboardRewards';
import {
  BookOpenIcon,
  ShieldCheckIcon,
  AwardIcon,
  UserIcon,
  SparklesIcon,
  LogOutIcon,
} from '../components/common/Icons';

type TabKey = 'overview' | 'courses' | 'profile' | 'applications' | 'rewards';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [data, setData] = useState<StudentDashboardData>(() =>
    getStudentDashboardData(user)
  );

  // Sync when user changes
  useEffect(() => {
    setData(getStudentDashboardData(user));
  }, [user]);

  const handleUpdateProfile = (updates: Partial<StudentProfile>) => {
    const next = updateStudentProfileData(updates, user);
    setData({ ...next });
  };

  const handleToggleActivity = (activityId: string) => {
    const next = toggleActivityItemStatus(activityId, user);
    setData({ ...next });
  };

  const handleUploadDocument = (
    doc: Omit<StudentDocument, 'id' | 'uploadedAt' | 'status'>
  ) => {
    const next = addStudentDocumentRecord(doc, user);
    setData({ ...next });
  };

  const handleDeleteDocument = (docId: string) => {
    const next = deleteStudentDocumentRecord(docId, user);
    setData({ ...next });
  };

  const tabs: Array<{
    id: TabKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
  }> = [
    { id: 'overview', label: 'Overview & Activity', icon: SparklesIcon },
    {
      id: 'courses',
      label: 'My Courses',
      icon: BookOpenIcon,
      badge: data.enrolledCourses.filter((c) => c.status === 'active').length,
    },
    {
      id: 'profile',
      label: 'Details & Documents',
      icon: UserIcon,
      badge: `${data.documents.length} docs`,
    },
    {
      id: 'applications',
      label: 'Visa & Applications',
      icon: ShieldCheckIcon,
      badge: data.applications.length,
    },
    {
      id: 'rewards',
      label: 'Rewards & AI Coach',
      icon: AwardIcon,
      badge: `${data.rewards.pointsBalance} pts`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Portal Banner */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-xl shadow-indigo-600/30">
                  {data.profile.name.charAt(0)}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center" title="Active Session">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {data.profile.name}
                  </h1>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {data.profile.identifierCode}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Enrolled Student
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                  <span>Target: <strong>{data.profile.destination} 🇩🇪</strong></span>
                  <span>•</span>
                  <span>Program: <strong className="text-slate-700 dark:text-slate-300">{data.profile.targetProgram}</strong></span>
                  <span>•</span>
                  <span>Current Level: <strong className="text-indigo-600 dark:text-indigo-400 font-mono">CEFR {data.profile.currentCefrLevel}</strong></span>
                </p>
              </div>
            </div>

            {/* Quick Action Chips & Sign Out */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
              <div className="px-3.5 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 shadow-sm">
                <AwardIcon className="w-4 h-4 text-amber-500" />
                <span>{data.rewards.pointsBalance.toLocaleString()} Pts ({data.rewards.tier})</span>
              </div>

              <button
                type="button"
                onClick={() => logout()}
                className="px-3.5 py-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <LogOutIcon className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]'
                      : 'bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-300">
          {activeTab === 'overview' && (
            <DashboardOverview
              data={data}
              onTabChange={(tab) => setActiveTab(tab as TabKey)}
              onToggleActivity={handleToggleActivity}
            />
          )}

          {activeTab === 'courses' && (
            <DashboardCourses courses={data.enrolledCourses} />
          )}

          {activeTab === 'profile' && (
            <DashboardProfile
              profile={data.profile}
              documents={data.documents}
              onUpdateProfile={handleUpdateProfile}
              onUploadDocument={handleUploadDocument}
              onDeleteDocument={handleDeleteDocument}
            />
          )}

          {activeTab === 'applications' && (
            <DashboardApplications applications={data.applications} />
          )}

          {activeTab === 'rewards' && (
            <DashboardRewards rewards={data.rewards} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
