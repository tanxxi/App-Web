import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Si no está autenticado, redirige al login guardando la ruta intentada
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (allowedRoles && !allowedRoles.includes(user?.rol)) {

    return <Navigate to="/no-autorizado" replace />;
  }

  // Si está autorizado, renderiza las rutas hijas
  return <Outlet />;
}