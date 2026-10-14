import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  checkLogin, 
  loginPassword, 
  logout as apiLogout, 
  registerDirect,
  registerRequestOtp, 
  registerVerifyOtp, 
  otpRequest, 
  otpVerifyLogin,
  type AuthUser, 
  type UserRole, 
  type RegisterRequestOtpPayload, 
  type RegisterVerifyOtpPayload 
} from '../services/auth';

export type { UserRole };
export type User = AuthUser;

export interface StudentRegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  otp_code?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  isAuthModalOpen: boolean;
  authModalDefaultMode: 'login' | 'register';
  authModalNotice: string | null;
  clearAuthModalNotice: () => void;
  openAuthModal: (firstArg?: string, secondArg?: 'login' | 'register' | string, thirdArg?: string) => void;
  closeAuthModal: () => void;
  login: (credentials: { email?: string; identifier?: string; password: string; role?: UserRole }) => Promise<{ success: boolean; error?: string; user?: User }>;
  loginWithOtp: (credentials: { identifier: string; otp_code: string }) => Promise<{ success: boolean; error?: string; user?: User }>;
  requestLoginOtp: (identifier: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  requestRegistrationOtp: (payload: RegisterRequestOtpPayload) => Promise<{ success: boolean; error?: string; message?: string }>;
  registerStudent: (data: StudentRegistrationData) => Promise<{ success: boolean; error?: string; user?: User; message?: string }>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const STORAGE_KEY = 'ila_auth_user';

// Pre-seeded demo credentials for quick access / preview

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultMode, setAuthModalDefaultMode] = useState<'login' | 'register'>('login');
  const [authModalNotice, setAuthModalNotice] = useState<string | null>(null);

  // Verify real session on mount with DRF backend check-login
  useEffect(() => {
    let isMounted = true;
    checkLogin()
      .then((res) => {
        if (!isMounted) return;
        if (res.isAuthenticated && res.user) {
          setUser(res.user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
        }
      })
      .catch(() => {
        // Leave local state intact if network offline
      })
      .finally(() => {
        if (isMounted) setIsLoadingSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const openAuthModal = (
    firstArg: string = 'login', 
    secondArg?: 'login' | 'register' | string,
    thirdArg?: string
  ) => {
    let mode: 'login' | 'register' = 'login';
    let notice: string | null = null;

    if (firstArg === 'student' || firstArg === 'staff') {
      if (secondArg === 'login' || secondArg === 'register') {
        mode = secondArg;
      }
      if (typeof thirdArg === 'string') {
        notice = thirdArg;
      }
    } else if (firstArg === 'login' || firstArg === 'register') {
      mode = firstArg;
      if (typeof secondArg === 'string') {
        notice = secondArg;
      }
    } else if (typeof firstArg === 'string' && (firstArg.length > 10 || firstArg.includes(' '))) {
      notice = firstArg;
    }

    setAuthModalDefaultMode(mode);
    setAuthModalNotice(notice || null);
    setIsAuthModalOpen(true);
  };

  const clearAuthModalNotice = () => {
    setAuthModalNotice(null);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalNotice(null);
  };

  // Password-based Login (Student & Staff/SuperAdmin)
  const login = async ({
    email,
    identifier,
    password,
    role
  }: {
    email?: string;
    identifier?: string;
    password: string;
    role?: UserRole;
  }): Promise<{ success: boolean; error?: string; user?: User }> => {
    const cleanId = (identifier || email || '').trim();

    try {
      const response = await loginPassword({
        identifier: cleanId,
        password,
        role,
      });

      if (response.user) {
        setUser(response.user);
        closeAuthModal();
        return { success: true, user: response.user };
      }
    } catch (err: any) {
      // If error from DRF API, check if demo account is used as offline fallback
      const errorMsg =
        err?.non_field_errors?.[0] ||
        err?.detail ||
        err?.identifier?.[0] ||
        err?.password?.[0] ||
        'Authentication failed.';

      // Check if credentials match demo accounts for development preview


      return { success: false, error: errorMsg };
    }

    return { success: false, error: 'Unable to login at this time.' };
  };

  // Passwordless OTP Login
  const loginWithOtp = async ({
    identifier,
    otp_code
  }: {
    identifier: string;
    otp_code: string;
  }): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      const response = await otpVerifyLogin({
        identifier: identifier.trim(),
        otp_code: otp_code.trim(),
      });

      if (response.user) {
        setUser(response.user);
        closeAuthModal();
        return { success: true, user: response.user };
      }
      return { success: false, error: response.message || 'OTP verification failed.' };
    } catch (err: any) {
      const msg = err?.non_field_errors?.[0] || err?.otp_code?.[0] || err?.identifier?.[0] || err?.detail || 'Invalid OTP code.';
      return { success: false, error: msg };
    }
  };

  // Request Login OTP
  const requestLoginOtp = async (identifier: string): Promise<{ success: boolean; error?: string; message?: string }> => {
    try {
      const res = await otpRequest({ identifier: identifier.trim(), purpose: 'login' });
      return { success: true, message: res.message };
    } catch (err: any) {
      const msg = err?.non_field_errors?.[0] || err?.identifier?.[0] || err?.detail || 'Failed to dispatch OTP.';
      return { success: false, error: msg };
    }
  };

  // Request Registration OTP
  const requestRegistrationOtp = async (payload: RegisterRequestOtpPayload): Promise<{ success: boolean; error?: string; message?: string }> => {
    try {
      const res = await registerRequestOtp(payload);
      return { success: true, message: res.message };
    } catch (err: any) {
      const msg = err?.error?.[0] || err?.email?.[0] || err?.phone?.[0] || err?.non_field_errors?.[0] || 'Failed to request registration OTP.';
      return { success: false, error: msg };
    }
  };

  // Student Registration (Verify OTP or Direct Registration)
  const registerStudent = async (data: StudentRegistrationData): Promise<{ success: boolean; error?: string; user?: User; message?: string }> => {
    const names = data.name.trim().split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    // If OTP code is provided, verify via DRF register/verify-otp/
    if (data.otp_code) {
      try {
        const payload: RegisterVerifyOtpPayload = {
          email: data.email.trim(),
          phone: data.phone?.trim(),
          otp_code: data.otp_code.trim(),
          password: data.password,
          first_name: firstName,
          last_name: lastName,
          name: data.name.trim(),
          role: 'student',
        };

        const res = await registerVerifyOtp(payload);
        if (res.user) {
          return { 
            success: true, 
            user: res.user, 
            message: res.message || 'Account registered successfully! Please sign in with your credentials.' 
          };
        }
        return { success: false, error: res.message || 'Registration failed.' };
      } catch (err: any) {
        const msg = err?.otp_code?.[0] || err?.error?.[0] || err?.email?.[0] || err?.non_field_errors?.[0] || 'Registration failed.';
        return { success: false, error: msg };
      }
    }

    // Direct registration via DRF /api/auth/register/
    try {
      const res = await registerDirect({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        phone: data.phone?.trim(),
        role: 'student',
      });

      if (res.user) {
        // PER REQUIREMENT: "when a user is just registered, redirect them to login"
        // Return success without calling setUser or closeAuthModal so UI redirects to login tab
        return { 
          success: true, 
          user: res.user, 
          message: res.message || 'Account registered successfully! Please sign in with your email and password.' 
        };
      }
      return { success: false, error: res.message || 'Registration failed.' };
    } catch (err: any) {
      const msg =
        err?.email?.[0] ||
        err?.password?.[0] ||
        err?.phone?.[0] ||
        err?.name?.[0] ||
        err?.detail ||
        err?.error?.[0] ||
        err?.non_field_errors?.[0] ||
        (typeof err === 'string' ? err : 'Registration failed. Please check your details.');
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch {
      // Ignore
    } finally {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingSession,
        isAuthModalOpen,
        authModalDefaultMode,
        authModalNotice,
        clearAuthModalNotice,
        openAuthModal,
        closeAuthModal,
        login,
        loginWithOtp,
        requestLoginOtp,
        requestRegistrationOtp,
        registerStudent,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
