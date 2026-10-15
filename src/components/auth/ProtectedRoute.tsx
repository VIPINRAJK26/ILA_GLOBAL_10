import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { setAuthRedirect } from '../../utils/pendingFormStorage';
import { ROUTES } from '../../routes/paths';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
  notice?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = ROUTES.HOME,
  notice = 'Please sign in with your student account to access your student portal.',
}) => {
  const { isAuthenticated, isLoadingSession, openAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoadingSession && !isAuthenticated) {
      const targetUrl = location.pathname + location.search;
      setAuthRedirect(targetUrl);
      openAuthModal('student', 'login', notice);
    }
  }, [isAuthenticated, isLoadingSession, location.pathname, location.search, openAuthModal, notice]);

  if (isLoadingSession) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg
              className="w-8 h-8 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Verifying Student Session...
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
          Securing your dashboard session and loading personalized curriculum and applications.
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
