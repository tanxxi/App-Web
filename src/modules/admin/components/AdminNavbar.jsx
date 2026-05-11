import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './AdminNavbar.module.css';

const routeNames = {
  '': 'Dashboard',
  'dashboard': 'Dashboard',
  'usuarios': 'Usuarios',
  'roles': 'Roles y Permisos',
  'pedidos': 'Gestión de Pedidos',
  'repartidores': 'Repartidores',
  'historial': 'Historial de Actividad',
  'configuracion': 'Configuración',
  'reportes': 'Centro de Reportes',
  'seguridad': 'Seguridad',
  'logs': 'Logs del Sistema',
};

export function AdminNavbar() {
  const { user } = useAuth();
  const location = useLocation();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPage = pathParts.length > 1 ? pathParts[pathParts.length - 1] : '';

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.breadcrumb}>
          <span className={styles.module}>Administración</span>
          <span className={styles.separator}>&gt;</span>
          <span className={styles.current}>{routeNames[currentPage] || 'Dashboard'}</span>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.notificationBtn}>
          🔔
          <span className={styles.badge}>5</span>
        </button>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            {user?.nombre?.charAt(0) || 'A'}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.nombre || 'Administrador'}</span>
            <span className={styles.userRole}>{user?.rol || 'ADMINISTRADOR'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}