import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  
  // Generar breadcrumb muy básico basado en la ruta
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumb = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'dashboard';

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.breadcrumb}>
          <span>Operador</span> &gt; <span className={styles.current}>{breadcrumb}</span>
        </div>
      </div>
      
      <div className={styles.center}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Buscar pedidos, repartidores..." className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.notificationBtn}>
          🔔 <span className={styles.badge}>3</span>
        </button>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            {user?.nombre?.charAt(0) || 'U'}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.nombre || 'Usuario'}</span>
            <span className={styles.userRole}>{user?.rol || 'Rol Desconocido'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
