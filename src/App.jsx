import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { PrivateRoute } from './modules/auth/components/PrivateRoute';
import LoginPage from './modules/auth/pages/LoginPage';
import { ROLES } from './constants/roles';

// Importaciones de operador logístico

import OperadorLayoutSpecific from './modules/operador/pages/OperadorLayoutSpecific';
import OperadorDashboard from './modules/operador/pages/OperadorDashboard';
import PedidosPage from './modules/operador/pages/PedidosPage';
import RepartidoresPage from './modules/operador/pages/RepartidoresPage';
import NuevoPedido from './modules/operador/pages/NuevoPedido';
import EditarPedido from './modules/operador/pages/EditarPedido';
import DetallePedido from './modules/operador/pages/DetallePedido';

// Importaciones de admin
import AdminLayout from './modules/admin/components/AdminLayout';
import AdminDashboardPage from './modules/admin/pages/AdminDashboardPage';
import UsuariosPage from './modules/admin/pages/UsuariosPage';
import RolesPage from './modules/admin/pages/RolesPage';
import { default as AdminPedidosPage } from './modules/admin/pages/PedidosPage';
import { default as AdminRepartidoresPage } from './modules/admin/pages/RepartidoresPage';
import HistorialPage from './modules/admin/pages/HistorialPage';
import ConfiguracionPage from './modules/admin/pages/ConfiguracionPage';
import ReportesPage from './modules/admin/pages/ReportesPage';

import LogsPage from './modules/admin/pages/LogsPage';

// Importaciones de repartidor

import OperadorLayout from './modules/operador/components/OperadorLayout'
import DashboardRepartidor from './modules/repartidor/pages/DashboardRepartidor';
import PerfilPage from './modules/repartidor/pages/PerfilPage';


function App() {
  const { isAuthenticated, user } = useAuth();

  function getHomePath(rol) {
    switch (rol) {
      case ROLES.ADMINISTRADOR:
        return '/admin'
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

      {/* Rutas protegidas para operador */}
      <Route element={<PrivateRoute allowedRoles = {[ROLES.OPERADOR_LOGISTICO]} />}>
        {/* Aquí irán las rutas del operador */}
        <Route path="/operador" element = {<OperadorLayoutSpecific/>}>
          <Route index element = {<OperadorDashboard/>}/>
          <Route path = "pedidos" element = {<PedidosPage/>}/>
          <Route path = "pedidos/:id" element = {<DetallePedido/>}/>
          <Route path = "pedidos/:id/editar" element = {<EditarPedido/>}/>
          <Route path = "pedidos/nuevo" element = {<NuevoPedido/>}/>
          <Route path = "repartidores" element = {<RepartidoresPage/>}/>
        </Route>
      </Route>

      {/* Rutas protegidas para admin */}
      <Route element={<PrivateRoute allowedRoles={[ROLES.ADMINISTRADOR]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="pedidos" element={<AdminPedidosPage />} />
          <Route path="repartidores" element={<AdminRepartidoresPage />} />
          <Route path="historial" element={<HistorialPage />} />
          <Route path="configuracion" element={<ConfiguracionPage />} />
          <Route path="reportes" element={<ReportesPage />} />
          
          <Route path="logs" element={<LogsPage />} />
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
      <Route element = {<PrivateRoute allowedRoles={[ROLES.CLIENTE]} />}>
        <Route path = "/cliente" element={<div>Panel del Cliente (próximamente)</div>} />
      </Route>

      {/* No autorizado */}
      <Route path = "/no-autorizado" element={<div>No tienes permiso para acceder a esta sección.</div>} />

      {/* Redirigir raíz */}
      <Route path = "/" element={<Navigate to = {isAuthenticated ? getHomePath(user?.rol) : '/login'} replace />} />
    </Routes>
  );
}

export default App;