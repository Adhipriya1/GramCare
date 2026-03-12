import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User, UserRole } from '@/lib/types';
import { Language, t as translate } from '@/lib/i18n';

interface AppContextType {
  user: User | null;
  loading: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  login: (user: User) => void;
  logout: () => Promise<void>;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('en');

  // Load from Supabase on mount
  useEffect(() => {
    async function initSession() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { role, full_name } = session.user.user_metadata || {};
        if (role) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: role,
            full_name: full_name || 'User',
            is_active: true,
            created_at: session.user.created_at,
          });
        }
      }
      setLoading(false);
    }

    initSession();

    // Listen for auth state changes (e.g., login from another tab)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { role, full_name } = session.user.user_metadata || {};
          if (role) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              role: role,
              full_name: full_name || 'User',
              is_active: true,
              created_at: session.user.created_at,
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const t = useCallback((key: string) => translate(key, language), [language]);

  return (
    <AppContext.Provider value={{ user, loading, language, setLanguage, login, logout, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
