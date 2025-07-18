// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthStore } from '../TasksManagementWithZustand/useAuthStore';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.loggedInUser);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
