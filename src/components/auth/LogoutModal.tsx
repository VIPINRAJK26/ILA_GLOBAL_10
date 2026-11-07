import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { LogOutIcon, XIcon, AlertCircleIcon } from '../common/Icons';

export const LogoutModal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLogoutModalOpen, closeLogoutModal, confirmLogout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLogoutModalOpen && !isLoggingOut) {
        closeLogoutModal();
      }
    };

    if (isLogoutModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLogoutModalOpen, closeLogoutModal, isLoggingOut]);

  if (!isLogoutModalOpen) return null;

  const handleConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await confirmLogout();
      // If logging out while in the protected student dashboard, navigate gracefully to home
      if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/student')) {
        navigate('/', { replace: true });
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoggingOut) {
          closeLogoutModal();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={closeLogoutModal}
          disabled={isLoggingOut}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 cursor-pointer"
          aria-label="Close logout dialog"
        >
          <XIcon className="w-4 h-4" />
        </button>

        {/* Header with Icon */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200/80 dark:border-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 shadow-sm">
            <LogOutIcon className="w-6 h-6" />
          </div>
          <div>
            <h3
              id="logout-dialog-title"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              Sign Out of Your Account
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Are you sure you want to log out? You will need your credentials to sign back in to access your portal.
            </p>
          </div>
        </div>

        {/* Signed-in Account Details Card */}
        {user && (
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-mono">
                  {user.email || user.identifierCode || 'Signed in'}
                </p>
              </div>
            </div>
            <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              Active Session
            </span>
          </div>
        )}

        {/* Informative Notice */}
        <div className="mt-4 flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs">
          <AlertCircleIcon className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>Any unsaved application drafts will be securely saved to your account.</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={closeLogoutModal}
            disabled={isLoggingOut}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer disabled:opacity-50"
          >
            Stay Signed In
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoggingOut}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm shadow-rose-600/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin text-white"
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
                <span>Signing Out...</span>
              </>
            ) : (
              <>
                <LogOutIcon className="w-4 h-4" />
                <span>Yes, Sign Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

