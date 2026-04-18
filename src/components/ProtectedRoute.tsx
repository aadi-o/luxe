import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase, isMock } from '../lib/supabase';

export default function ProtectedRoute() {
  const [user, setUser] = React.useState<any>(() => {
    if (isMock) {
      const isAuthed = localStorage.getItem('luxe_mock_auth') === 'true';
      return isAuthed ? ({ email: 'authorized@luxe.com', user_metadata: { full_name: 'Authorized Administrator' } } as any) : null;
    }
    return null;
  });
  const [loading, setLoading] = React.useState(!isMock);

  React.useEffect(() => {
    if (isMock) {
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
