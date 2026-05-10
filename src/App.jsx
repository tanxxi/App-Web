import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { PrivateRoute } from './modules/auth/components/PrivateRoute';
import LoginPage from './modules/auth/pages/LoginPage';
import { ROLES } from './constants/roles';
import OperadorLayout from './modules/operador/components/OperadorLayout';
import DashboardPage from './modules/operador/pages/DashboardPage';
import PedidosPage from './modules/operador/pages/PedidosPage';
import RepartidoresPage from './modules/operador/pages/RepartidoresPage';
import SeguimientoPage from './modules/operador/pages/SeguimientoPage';
import DashboardRepartidor from './modules/repartidor/pages/DashboardRepartidor';
import PerfilPage from './modules/repartidor/pages/PerfilPage';
function App() {
  const { isAuthenticated, user } = useAuth();

  function getHomePath(rol) {
    switch (rol) {
      case ROLES.ADMINISTRADOR:
      case ROLES.OPERADOR_LOGISTICO:
        return '/operador';
      case ROLES.REPARTIDOR:
        return '/repartidor';
      case ROLES.CLIENTE:
        return '/cliente';
      default:
        console.warn('Rol desconocido:', rol);
        return '/login';
    }
  }

  return (
    <Routes>
      {/* Login: si ya está autenticado, redirige a su home */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to={getHomePath(user?.rol)} replace /> : <LoginPage />
        }
      />

      {/* Rutas protegidas para operador y admin */}
      <Route element={<PrivateRoute allowedRoles={[ROLES.OPERADOR_LOGISTICO, ROLES.ADMINISTRADOR]} />}>
        <Route path="/operador" element={<OperadorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pedidos" element={<PedidosPage />} />
          <Route path="repartidores" element={<RepartidoresPage />} />
          <Route path="seguimiento" element={<SeguimientoPage />} />
        </Route>
      </Route>

      {/* Rutas protegidas para repartidor */}
      <Route element={<PrivateRoute allowedRoles={[ROLES.REPARTIDOR]} />}>
        <Route path="/repartidor" element={<OperadorLayout />}>
          <Route index element={<DashboardRepartidor />} />
          <Route path="perfil" element={<PerfilPage />} />
        </Route>
      </Route>

      {/* Rutas protegidas para cliente */}
      <Route element={<PrivateRoute allowedRoles={[ROLES.CLIENTE]} />}>
        <Route path="/cliente" element={<div>Panel del Cliente (próximamente)</div>} />
      </Route>

      {/* No autorizado */}
      <Route path="/no-autorizado" element={<div>No tienes permiso para acceder a esta sección.</div>} />

      {/* Redirigir raíz */}
      <Route path="/" element={<Navigate to={isAuthenticated ? getHomePath(user?.rol) : '/login'} replace />} />
    </Routes>
  );
}

export default App;
