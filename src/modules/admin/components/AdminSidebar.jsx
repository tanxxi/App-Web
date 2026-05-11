import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './AdminSidebar.module.css';

const menuItems = [
  { name: 'Dashboard Admin', path: '/admin', icon: '📊', exact: true },
  { name: 'Usuarios', path: '/admin/usuarios', icon: '👥' },
  { name: 'Roles y Permisos', path: '/admin/roles', icon: '🔐' },
  { name: 'Pedidos', path: '/admin/pedidos', icon: '📦' },
  { name: 'Repartidores', path: '/admin/repartidores', icon: '🚚' },
  { name: 'Historial', path: '/admin/historial', icon: '📋' },
  { name: 'Configuración', path: '/admin/configuracion', icon: '⚙️' },
  { name: 'Reportes', path: '/admin/reportes', icon: '📈' },
  { name: 'Logs', path: '/admin/logs', icon: '📝' },
];

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🏢</span>
        <h2>Admin Panel</h2>
      </div>

      <div className={styles.userSection}>
        <div className={styles.avatar}>
          {user?.nombre?.charAt(0) || 'A'}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.nombre || 'Administrador'}</span>
          <span className={styles.userRole}>{user?.rol || 'ADMINISTRADOR'}</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={isActive(item) ? styles.active : ''}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <button onClick={logout} className={styles.logoutBtn}>
          🚪 Cerrar sesión
        </button>
      </div>
    </aside>
  );
}