import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import OperadorLayout from './pages/Operador/OperadorLayout';
import OperadorDashboard from './pages/Operador/OperadorDashboard';
import PedidosPage from './pages/Operador/PedidosPage';
import RepartidoresPage from './pages/Operador/RepartidoresPage';
import DetallePedido from './pages/Operador/DetallePedido'
//Aquí deben ir las importaciones de los componentes de las otras interfaces
import { ROLES } from './constants/roles';

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

      {/* Rutas protegidas para operador */}
      <Route element={<PrivateRoute allowedRoles = {[ROLES.OPERADOR_LOGISTICO]} />}>
        {/* Aquí irán las rutas del operador cuando las crees */}
        <Route path="/operador" element = {<OperadorLayout/>}>
          <Route index element = {<OperadorDashboard/>}/>
          <Route path = "pedidos" element = {<PedidosPage/>}/>
          <Route path = "pedidos/:id" element = {<DetallePedido/>}/>
          <Route path = "repartidores" element = {<RepartidoresPage/>}/>
        </Route>
      </Route>

      {/* Rutas protegidas para admin */}
      <Route element={<PrivateRoute allowedRoles = {[ROLES.ADMINISTRADOR]}/>}>
      </Route>

      {/* Rutas protegidas para repartidor */}
      <Route element = {<PrivateRoute allowedRoles={[ROLES.REPARTIDOR]} />}>
        <Route path = "/repartidor" element = {<div>Panel del Repartidor (próximamente)</div>} />
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
