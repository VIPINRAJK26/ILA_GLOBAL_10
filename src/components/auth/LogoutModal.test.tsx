import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { LogoutModal } from './LogoutModal';
import * as AuthContextModule from '../../context/AuthContext';

describe('LogoutModal component', () => {
  const mockConfirmLogout = vi.fn().mockResolvedValue(undefined);
  const mockCloseLogoutModal = vi.fn();

  const createMockAuth = (isOpen: boolean) => ({
    user: { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', identifierCode: 'STU1234' } as any,
    isAuthenticated: true,
    isLoadingSession: false,
    isAuthModalOpen: false,
    authModalDefaultMode: 'login' as const,
    authModalNotice: null,
    clearAuthModalNotice: vi.fn(),
    openAuthModal: vi.fn(),
    closeAuthModal: vi.fn(),
    login: vi.fn(),
    loginWithOtp: vi.fn(),
    requestLoginOtp: vi.fn(),
    requestRegistrationOtp: vi.fn(),
    registerStudent: vi.fn(),
    logout: vi.fn(),
    setUser: vi.fn(),
    isLogoutModalOpen: isOpen,
    openLogoutModal: vi.fn(),
    closeLogoutModal: mockCloseLogoutModal,
    confirmLogout: mockConfirmLogout,
    requestLogout: vi.fn(),
  });

  it('does not render when isLogoutModalOpen is false', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue(createMockAuth(false));

    render(
      <MemoryRouter>
        <LogoutModal />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Sign Out of Your Account/i)).not.toBeInTheDocument();
  });

  it('renders modal dialog with user info and confirmation buttons when open', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue(createMockAuth(true));

    render(
      <MemoryRouter>
        <LogoutModal />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign Out of Your Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to log out/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText(/Stay Signed In/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, Sign Out/i)).toBeInTheDocument();
  });

  it('calls closeLogoutModal when clicking Stay Signed In', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue(createMockAuth(true));

    render(
      <MemoryRouter>
        <LogoutModal />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Stay Signed In/i }));
    expect(mockCloseLogoutModal).toHaveBeenCalledTimes(1);
  });

  it('calls confirmLogout when clicking Yes, Sign Out', async () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue(createMockAuth(true));

    render(
      <MemoryRouter>
        <LogoutModal />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Yes, Sign Out/i }));
    await waitFor(() => {
      expect(mockConfirmLogout).toHaveBeenCalledTimes(1);
    });
  });

  it('calls closeLogoutModal when pressing Escape', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue(createMockAuth(true));

    render(
      <MemoryRouter>
        <LogoutModal />
      </MemoryRouter>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockCloseLogoutModal).toHaveBeenCalled();
  });
});

