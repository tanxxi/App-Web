
import {Link} from 'react-router-dom';
import {useAuth} from '../../../context/AuthContext';
import styles from './OperadorDashboard.module.css'

export default function OperadorDashboard()
{
    const {user} = useAuth();

    return(
      <div className={styles.container}>
        <h1 className={styles.title}>Panel de Control</h1>
        <p className={styles.welcome}>
            Bienvenido, <strong>{user.nombre} (ID: {user.id})</strong>. ¿Qué deseas gestionar?
        </p>

        <ul className={styles.menu}>
            <li className={styles.menuItem}>
            <Link to="/operador/pedidos" className={styles.menuLink}>
                <span className={styles.icon}>📦</span> Pedidos
            </Link>
            </li>
            <li className={styles.menuItem}>
            <Link to="/operador/repartidores" className={styles.menuLink}>
                <span className={styles.icon}>👥</span> Repartidores
            </Link>
            </li>
        </ul>
      </div>
    )
}