import { Navigate, useLocation } from 'react-router-dom';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const savedUser = localStorage.getItem('quant_user');
  if (!savedUser) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return <>{children}</>;
}