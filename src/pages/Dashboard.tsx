import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  useStudentDashboard,
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
  CompassIcon,
  LogOutIcon,
} from '../components/common/Icons';

type TabKey = 'overview' | 'courses' | 'profile' | 'applications' | 'rewards';

export const Dashboard: React.FC = () => {
  const { openLogoutModal } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  // Connect to live DRF backend with resilient background queries & caching
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    updateProfile,
    isUpdatingProfile,
    uploadDocument,
    deleteDocument,
    toggleActivity,
  } = useStudentDashboard();

  console.log(data,"datasasas")

  const handleUpdateProfile = async (updates: Partial<StudentProfile>) => {
    await updateProfile(updates);
  };

  const handleToggleActivity = async (activityId: string) => {
    await toggleActivity(activityId);
  };

  const handleUploadDocument = async (doc: {
    name: string;
    category: StudentDocument['category'];
    file?: File | null;
    fileName?: string;
  }) => {
    await uploadDocument(doc);
  };

  const handleDeleteDocument = async (docId: string) => {
    await deleteDocument(docId);
  };

  const tabs: Array<{
    id: TabKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
  }> = [
    { id: 'overview', label: 'Overview & Activity', icon: CompassIcon },
    {
      id: 'courses',
      label: 'My Courses',
      icon: BookOpenIcon,
      badge: data?.enrolledCourses?.filter((c) => c.status === 'active')?.length || 0,
    },
    {
      id: 'profile',
      label: 'Details & Documents',
      icon: UserIcon,
      badge: `${data?.documents?.length || 0} docs`,
    },
    {
      id: 'applications',
      label: 'Visa & Applications',
      icon: ShieldCheckIcon,
      badge: data?.applications?.length || 0,
    },
    {
      id: 'rewards',
      label: 'Rewards & AI Coach',
      icon: AwardIcon,
      badge: `${data?.rewards?.pointsBalance || 0} pts`,
    },
  ];

  // Skeleton view during initial load if no cached data exists
  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          <div className="h-44 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  const { profile, rewards } = data;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Status & Sync Indicator Bar */}
        <div className="flex items-center justify-between text-xs font-semibold px-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isError ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isError ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              {isError ? 'Offline Snapshot Cache' : 'Backend Connected'}
            </span>
            {isFetching && (
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono animate-pulse">
                • Syncing live records...
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh dashboard data from DRF API"
          >
            <svg
              className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-indigo-600' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{isFetching ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>

        {/* Top Portal Banner with Campus Backdrop Image */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          {/* Subtle Campus Architectural Backdrop Image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1600&auto=format&fit=crop"
              alt="University campus architecture background"
              className="w-full h-full object-cover object-center opacity-10 dark:opacity-20"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900/75" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-xl shadow-indigo-600/30">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center" title="Active Session">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {profile.name || 'Student Portal'}
                  </h1>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {profile.identifierCode || 'ILA-STD-ACTIVE'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Enrolled Student
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                  <span>Target: <strong>{profile.destination || 'Germany 🇩🇪'}</strong></span>
                  <span>•</span>
                  <span>Program: <strong className="text-slate-700 dark:text-slate-300">{profile.targetProgram || 'Academic & Visa Pathway'}</strong></span>
                  <span>•</span>
                  <span>Current Level: <strong className="text-indigo-600 dark:text-indigo-400 font-mono">CEFR {profile.currentCefrLevel || 'B1'}</strong></span>
                </p>
              </div>
            </div>

            {/* Quick Action Chips & Sign Out */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
              <div className="px-3.5 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 shadow-sm">
                <AwardIcon className="w-4 h-4 text-amber-500" />
                <span>{rewards?.pointsBalance?.toLocaleString()} Pts ({rewards.tier})</span>
              </div>

              <button
                type="button"
                onClick={() => openLogoutModal()}
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
              isUpdating={isUpdatingProfile}
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
