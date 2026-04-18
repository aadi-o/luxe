import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase, isMock } from '../lib/supabase';

export default function ProtectedRoute() {
  const [user, setUser] = React.useState<any>(() => {
    const isAuthed = localStorage.getItem('luxe_admin_auth') === 'true';
    return isAuthed ? ({ email: 'ashu', user_metadata: { full_name: 'Administrator' } } as any) : null;
  });
  const [loading, setLoading] = React.useState(false);

  // Since we are using a simple local storage check, we don't need the complex Supabase auth listeners
  // but we can keep a simple check to ensure UI sync
  React.useEffect(() => {
    const isAuthed = localStorage.getItem('luxe_admin_auth') === 'true';
    if (!isAuthed) {
      setUser(null);
    }
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
