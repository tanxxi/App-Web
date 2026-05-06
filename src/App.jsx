import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
// Layouts y páginas futuras (por ahora no importados)
// import OperadorLayout from './pages/operador/OperadorLayout';

function App() {
  const { isAuthenticated, user } = useAuth();

  function getHomePath(rol) {
    switch (rol) {
      case 'Administrador':
      case 'OperadorLogistico':
        return '/operador';
      case 'Repartidor':
        return '/repartidor';
      case 'Cliente':
        return '/cliente';
      default:
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
      <Route element={<PrivateRoute allowedRoles={['OperadorLogistico', 'Administrador']} />}>
        {/* Aquí irán las rutas del operador cuando las crees */}
        <Route path="/operador" element={<div>Panel del Operador (próximamente)</div>} />
      </Route>

      {/* Rutas protegidas para repartidor */}
      <Route element={<PrivateRoute allowedRoles={['Repartidor']} />}>
        <Route path="/repartidor" element={<div>Panel del Repartidor (próximamente)</div>} />
      </Route>

      {/* Rutas protegidas para cliente */}
      <Route element={<PrivateRoute allowedRoles={['Cliente']} />}>
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
