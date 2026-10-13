import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'super_admin' | 'staff' | 'hr';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  destination?: string;
  program?: string;
  department?: string;
  identifierCode?: string;
}

export interface StudentRegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  destination: string;
  program?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalDefaultTab: 'student' | 'staff';
  authModalDefaultMode: 'login' | 'register';
  openAuthModal: (tab?: 'student' | 'staff', mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (credentials: { email: string; password: string; role?: UserRole }) => Promise<{ success: boolean; error?: string }>;
  registerStudent: (data: StudentRegistrationData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const STORAGE_KEY = 'ila_auth_user';

// Pre-seeded demo credentials for quick access
export const DEMO_ACCOUNTS: Record<UserRole, { email: string; name: string; role: UserRole; department?: string; identifierCode: string; defaultDestination?: string }> = {
  student: {
    email: 'student@example.com',
    name: 'Ananya Sharma',
    role: 'student',
    defaultDestination: '🇩🇪 Germany (TU Munich)',
    identifierCode: 'ILA-STU-8821'
  },
  super_admin: {
    email: 'admin@ilaglobal.com',
    name: 'Dr. Vikram Malhotra',
    role: 'super_admin',
    department: 'Executive Governance & Platform Super Admin',
    identifierCode: 'ILA-ROOT-001'
  },
  staff: {
    email: 'staff@ilaglobal.com',
    name: 'Elena Rostova',
    role: 'staff',
    department: 'Consular Processing & Senior Visa Strategist',
    identifierCode: 'ILA-EMP-104'
  },
  hr: {
    email: 'hr@ilaglobal.com',
    name: 'Sarah Jenkins',
    role: 'hr',
    department: 'Global Human Resources & Talent Recruitment',
    identifierCode: 'ILA-HR-208'
  }
};

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

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'student' | 'staff'>('student');
  const [authModalDefaultMode, setAuthModalDefaultMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const openAuthModal = (tab: 'student' | 'staff' = 'student', mode: 'login' | 'register' = 'login') => {
    // If staff tab is requested, enforce 'login' only
    setAuthModalDefaultTab(tab);
    setAuthModalDefaultMode(tab === 'staff' ? 'login' : mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async ({ email, password, role }: { email: string; password: string; role?: UserRole }) => {
    // Simulate network latency for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 350));

    const cleanEmail = email.trim().toLowerCase();

    // Check pre-configured demo matches or general pattern
    if (cleanEmail === DEMO_ACCOUNTS.super_admin.email.toLowerCase() || (role === 'super_admin')) {
      const newUser: User = {
        id: 'usr_superadmin',
        name: DEMO_ACCOUNTS.super_admin.name,
        email: cleanEmail,
        role: 'super_admin',
        department: DEMO_ACCOUNTS.super_admin.department,
        identifierCode: DEMO_ACCOUNTS.super_admin.identifierCode
      };
      setUser(newUser);
      closeAuthModal();
      return { success: true };
    }

    if (cleanEmail === DEMO_ACCOUNTS.staff.email.toLowerCase() || (role === 'staff')) {
      const newUser: User = {
        id: 'usr_staff',
        name: DEMO_ACCOUNTS.staff.name,
        email: cleanEmail,
        role: 'staff',
        department: DEMO_ACCOUNTS.staff.department,
        identifierCode: DEMO_ACCOUNTS.staff.identifierCode
      };
      setUser(newUser);
      closeAuthModal();
      return { success: true };
    }

    if (cleanEmail === DEMO_ACCOUNTS.hr.email.toLowerCase() || (role === 'hr')) {
      const newUser: User = {
        id: 'usr_hr',
        name: DEMO_ACCOUNTS.hr.name,
        email: cleanEmail,
        role: 'hr',
        department: DEMO_ACCOUNTS.hr.department,
        identifierCode: DEMO_ACCOUNTS.hr.identifierCode
      };
      setUser(newUser);
      closeAuthModal();
      return { success: true };
    }

    // Default to student login
    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Student Member',
      email: cleanEmail,
      role: 'student',
      destination: '🇩🇪 Germany / 🇨🇦 Canada',
      identifierCode: `ILA-STU-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setUser(newUser);
    closeAuthModal();
    return { success: true };
  };

  const registerStudent = async (data: StudentRegistrationData) => {
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (!data.name || !data.email || !data.password) {
      return { success: false, error: 'Please provide all required fields.' };
    }

    if (data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: User = {
      id: `usr_stu_${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      role: 'student',
      destination: data.destination,
      program: data.program || 'Higher Education & Co-op Track',
      identifierCode: `ILA-STU-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setUser(newUser);
    closeAuthModal();
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalDefaultTab,
        authModalDefaultMode,
        openAuthModal,
        closeAuthModal,
        login,
        registerStudent,
        logout
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
