import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ROLES } from '../../../constants/roles';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = user?.rol === ROLES.REPARTIDOR 
    ? [
        { name: 'Dashboard', path: '/repartidor', icon: '🚚' },
        { name: 'Perfil', path: '/repartidor/perfil', icon: '👤' },
      ]
    : [
        { name: 'Dashboard', path: '/operador/dashboard', icon: '📊' },
        { name: 'Pedidos', path: '/operador/pedidos', icon: '📦' },
        { name: 'Repartidores', path: '/operador/repartidores', icon: '🚚' },
        { name: 'Seguimiento', path: '/operador/seguimiento', icon: '📍' },
      ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>📦 LogisWeb</h2>
      </div>
      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={location.pathname.startsWith(item.path) ? styles.active : ''}
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
          🚪 Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
