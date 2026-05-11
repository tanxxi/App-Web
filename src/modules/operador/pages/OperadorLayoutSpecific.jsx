import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./OperadorLayoutSpecific.module.css";

const navItems = [
  { name: "Inicio",       path: "/operador",            icon: "📊", exact: true },
];

export default function OperadorLayoutSpecific() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isActive = (path, exact = false) =>
    exact
      ? location.pathname === path
      : location.pathname.startsWith(path);

  return (
    <div className={styles.layout}>
      {/* Barra lateral */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>📦 LogisWeb</h2>
        </div>

        <nav className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  className={`${styles.navBtn} ${
                    isActive(item.path, item.exact) ? styles.active : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}