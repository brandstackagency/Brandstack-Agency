import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';

interface PortalData {
  id: string;
  client_name: string;
  brand_name: string;
  slug: string;
  accent_color?: string;
  drive_url?: string;
  recipient_email?: string;
}

const PortalContext = createContext<{ portal: PortalData | null; loading: boolean; logout: () => void }>({
  portal: null,
  loading: true,
  logout: () => {},
});

export const usePortalData = () => useContext(PortalContext);

export default function PortalProvider({ children }: { children: React.ReactNode }) {
  const [portal, setPortal] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    sessionStorage.removeItem('portal_id');
    sessionStorage.removeItem('portal_client_name');
    sessionStorage.removeItem('portal_brand_name');
    sessionStorage.removeItem('portal_slug');
    const basePath = (window as any).__BASE_PATH__ || '';
    window.location.href = `${basePath}/portal`;
  };

  useEffect(() => {
    let cancelled = false;

    const storedId = sessionStorage.getItem('portal_id');

    if (!storedId) {
      // No session — redirect to login
      setLoading(false);
      const basePath = (window as any).__BASE_PATH__ || '';
      window.location.href = `${basePath}/portal`;
      return;
    }

    // Fetch portal by stored ID
    supabase
      .from('client_portals')
      .select('id, client_name, brand_name, slug, accent_color, drive_url, recipient_email')
      .eq('id', storedId)
      .eq('status', 'active')
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        if (!data) {
          // Portal not found or inactive — clear session and redirect
          sessionStorage.clear();
          const basePath = (window as any).__BASE_PATH__ || '';
          window.location.href = `${basePath}/portal`;
          return;
        }
        setPortal(data);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PortalContext.Provider value={{ portal, loading, logout }}>
      {children}
    </PortalContext.Provider>
  );
}