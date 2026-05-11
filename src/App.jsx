import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import { ROLES } from './constants/roles';
import ClienteRoutes from './modules/cliente/routes/ClienteRoutes';
// Layouts y páginas futuras (por ahora no importados)
// import OperadorLayout from './pages/operador/OperadorLayout';

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

      {/* Rutas protegidas para operador y admin (ejemplo) */}
      <Route element={<PrivateRoute allowedRoles={[ROLES.OPERADOR_LOGISTICO, ROLES.ADMINISTRADOR]} />}>
        {/* Aquí irán las rutas del operador cuando las crees */}
        <Route path="/operador" element={<div>Panel del Operador (próximamente)</div>} />
      </Route>

      {/* Rutas protegidas para repartidor */}
      <Route element={<PrivateRoute allowedRoles={[ROLES.REPARTIDOR]} />}>
        <Route path="/repartidor" element={<div>Panel del Repartidor (próximamente)</div>} />
      </Route>

      {/* Modulo Cliente */}
      <ClienteRoutes/>

      {/* No autorizado */}
      <Route path="/no-autorizado" element={<div>No tienes permiso para acceder a esta sección.</div>} />

      {/* Redirigir raíz */}
      <Route path="/" element={<Navigate to={isAuthenticated ? getHomePath(user?.rol) : '/login'} replace />} />
    </Routes>
  );
}

export default App;
