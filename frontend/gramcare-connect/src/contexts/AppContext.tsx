import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Language, t as translate } from '@/lib/i18n';

export type UserRole = 'patient' | 'doctor' | 'pharmacist' | 'admin';

interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AppContextType {
  user: User | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  login: (email: string, role: UserRole, name?: string) => void;
  logout: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  // Load from static local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('gramcare_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }
  }, []);

  const login = useCallback((email: string, role: UserRole, name?: string) => {
    const names: Record<UserRole, string> = {
      patient: 'Ramesh Kumar',
      doctor: 'Dr. Anita Sharma',
      pharmacist: 'Vikram Patel',
      admin: 'Admin User',
    };
    
    const newUser = { email, role, name: name || names[role] };
    setUser(newUser);
    localStorage.setItem('gramcare_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('gramcare_user');
  }, []);

  const t = useCallback((key: string) => translate(key, language), [language]);

  return (
    <AppContext.Provider value={{ user, language, setLanguage, login, logout, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
