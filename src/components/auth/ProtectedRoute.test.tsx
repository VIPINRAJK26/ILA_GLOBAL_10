import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import * as AuthContextModule from '../../context/AuthContext';

describe('ProtectedRoute component', () => {
  it('renders children when user is authenticated', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      isLoadingSession: false,
      user: { id: 1, name: 'Student One', email: 'student@example.com', role: 'student' } as any,
      openAuthModal: vi.fn(),
      closeAuthModal: vi.fn(),
      login: vi.fn(),
      loginWithOtp: vi.fn(),
      requestLoginOtp: vi.fn(),
      requestRegistrationOtp: vi.fn(),
      registerStudent: vi.fn(),
      logout: vi.fn(),
      isLogoutModalOpen: false,
      openLogoutModal: vi.fn(),
      closeLogoutModal: vi.fn(),
      confirmLogout: vi.fn(),
      requestLogout: vi.fn(),
      setUser: vi.fn(),
      isAuthModalOpen: false,
      authModalDefaultMode: 'login',
      authModalNotice: null,
      clearAuthModalNotice: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <ProtectedRoute>
          <div data-testid="protected-content">Secret Student Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Secret Student Content')).toBeInTheDocument();
  });

  it('renders session loading spinner when isLoadingSession is true', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      isLoadingSession: true,
      user: null,
      openAuthModal: vi.fn(),
      closeAuthModal: vi.fn(),
      login: vi.fn(),
      loginWithOtp: vi.fn(),
      requestLoginOtp: vi.fn(),
      requestRegistrationOtp: vi.fn(),
      registerStudent: vi.fn(),
      logout: vi.fn(),
      isLogoutModalOpen: false,
      openLogoutModal: vi.fn(),
      closeLogoutModal: vi.fn(),
      confirmLogout: vi.fn(),
      requestLogout: vi.fn(),
      setUser: vi.fn(),
      isAuthModalOpen: false,
      authModalDefaultMode: 'login',
      authModalNotice: null,
      clearAuthModalNotice: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <ProtectedRoute>
          <div>Secret Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/Verifying Student Session/i)).toBeInTheDocument();
    expect(screen.queryByText('Secret Content')).not.toBeInTheDocument();
  });

  it('redirects to home and triggers openAuthModal when unauthenticated', () => {
    const openAuthModalMock = vi.fn();

    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      isLoadingSession: false,
      user: null,
      openAuthModal: openAuthModalMock,
      closeAuthModal: vi.fn(),
      login: vi.fn(),
      loginWithOtp: vi.fn(),
      requestLoginOtp: vi.fn(),
      requestRegistrationOtp: vi.fn(),
      registerStudent: vi.fn(),
      logout: vi.fn(),
      isLogoutModalOpen: false,
      openLogoutModal: vi.fn(),
      closeLogoutModal: vi.fn(),
      confirmLogout: vi.fn(),
      requestLogout: vi.fn(),
      setUser: vi.fn(),
      isAuthModalOpen: false,
      authModalDefaultMode: 'login',
      authModalNotice: null,
      clearAuthModalNotice: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute redirectTo="/">
                <div>Secret Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>Public Home Landing</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Public Home Landing')).toBeInTheDocument();
    expect(screen.queryByText('Secret Content')).not.toBeInTheDocument();
    expect(openAuthModalMock).toHaveBeenCalledWith('student', 'login', expect.any(String));
  });
});
