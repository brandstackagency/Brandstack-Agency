import { useEffect, useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  portal: { id: string; client_name: string; brand_name: string; slug: string; accent_color?: string } | null;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, portal: null });
export const usePortalAuth = () => useContext(AuthContext);

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [portal, setPortal] = useState<AuthContextType['portal']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      const u = session?.user ?? null;
      setUser(u);
      if (!u) {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (!u) setLoading(false);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    supabase.from('client_portals')
      .select('id, client_name, brand_name, slug, accent_color')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error('Portal fetch error:', error);
        setPortal(data);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0B11] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    const basePath = (window as any).__BASE_PATH__ || '';
    window.location.href = `${basePath}/portal`;
    return null;
  }

  if (!portal) {
    return (
      <div className="min-h-screen bg-[#0C0B11] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#7C3AED]/10 flex items-center justify-center">
            <i className="ri-error-warning-line text-2xl text-[#a855f7]" />
          </div>
          <h2 className="font-editorial font-bold text-white text-2xl mb-3">Portal Not Found</h2>
          <p className="text-white/40 text-sm mb-6">
            No active client portal is linked to your account. Please contact your agency representative to get access.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-6 py-3 text-white text-sm font-semibold rounded-full bg-[#7C3AED] hover:bg-[#6b21a8] transition-colors whitespace-nowrap cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, portal }}>
      {children}
    </AuthContext.Provider>
  );
}