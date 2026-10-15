import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import VisaServices from './pages/VisaServices';
import WorkAndStudy from './pages/WorkAndStudy';
import StudyAbroad from './pages/StudyAbroad';
import JobsAndCareers from './pages/JobsAndCareers';
import Rewards from './pages/Rewards';
import Products from './pages/Products';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTES } from './routes/paths';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Main Application Router configuration following React Router best practices:
 * - Shared RootLayout with Navigation, Footer, ScrollToTop, and Floating Action Bar
 * - Type-safe, centralized route paths via ROUTES constant
 * - Clean semantic URL paths with legacy redirect aliases
 * - Dedicated 404 NotFound fallback route
 * - ThemeProvider supporting Light & Dark themes
 * - AuthProvider managing Student & Staff roles and authentication
 * - QueryClientProvider powering TanStack Queries & Mutations
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AuthModal />
            <Routes>
        {/* Parent Layout Route wrapping all top-level application views */}
        <Route path="/" element={<RootLayout />}>
          {/* Index Route: Home */}
          <Route index element={<Home />} />

          {/* Core Feature Pages */}
          <Route path={ROUTES.VISA_SERVICES} element={<VisaServices />} />
          <Route path={ROUTES.WORK_AND_STUDY} element={<WorkAndStudy />} />
          <Route path={ROUTES.STUDY_ABROAD} element={<StudyAbroad />} />
          <Route path={ROUTES.JOBS_AND_CAREERS} element={<JobsAndCareers />} />
          <Route path={ROUTES.REWARDS} element={<Rewards />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.COURSES} element={<Courses />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Convenient Semantic Aliases & Redirects */}
          <Route path="student/dashboard" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path="student" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path="all-courses" element={<Navigate to={ROUTES.COURSES} replace />} />
          <Route path="course" element={<Navigate to={ROUTES.COURSES} replace />} />
          <Route path="languages" element={<Navigate to={ROUTES.COURSES} replace />} />
          <Route path="visas" element={<Navigate to={ROUTES.VISA_SERVICES} replace />} />
          <Route path="visa" element={<Navigate to={ROUTES.VISA_SERVICES} replace />} />
          <Route path="work-study" element={<Navigate to={ROUTES.WORK_AND_STUDY} replace />} />
          <Route path="study" element={<Navigate to={ROUTES.STUDY_ABROAD} replace />} />
          <Route path="jobs" element={<Navigate to={ROUTES.JOBS_AND_CAREERS} replace />} />
          <Route path="careers" element={<Navigate to={ROUTES.JOBS_AND_CAREERS} replace />} />

          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
  </QueryClientProvider>
  );
}

export default App;
