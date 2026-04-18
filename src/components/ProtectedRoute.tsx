import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth, isMock } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function ProtectedRoute() {
  const [user, setUser] = React.useState<User | null>(() => {
    if (isMock) {
      const isAuthed = localStorage.getItem('luxe_mock_auth') === 'true';
      return isAuthed ? ({ email: 'authorized@luxe.com', displayName: 'Authorized Administrator' } as any) : null;
    }
    return null;
  });
  const [loading, setLoading] = React.useState(!isMock);

  React.useEffect(() => {
    if (isMock) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
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
