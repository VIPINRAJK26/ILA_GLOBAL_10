import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import ScrollToTop from '../common/ScrollToTop';
import { FloatingMobileBar } from '../home/FloatingMobileBar';
import { ROUTES } from '../../routes/paths';

export const RootLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunchCoach = () => {
    navigate('/#intelli-coach');
    const el = document.getElementById('intelli-coach');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreServices = () => {
    navigate('/#services-overview');
    const el = document.getElementById('services-overview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckEligibility = () => {
    navigate('/#eligibility-checker');
    const el = document.getElementById('eligibility-checker');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewRewards = () => {
    navigate(ROUTES.REWARDS);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-14 sm:pb-0 transition-colors duration-200">
      <ScrollToTop />
      
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Page View via Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Bottom Action Bar for Mobile Screens */}
      <FloatingMobileBar
        onLaunchCoach={handleLaunchCoach}
        onExploreServices={handleExploreServices}
        onCheckEligibility={handleCheckEligibility}
        onViewRewards={handleViewRewards}
      />
    </div>
  );
};

export default RootLayout;
