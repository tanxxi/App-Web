import {useNavigate, Outlet, Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext"
import styles from "./OperadorLayout.module.css"

export default function OperadorLayout()
{
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate('/login', {replace : true})
    };

    return (
    <div className={styles.layout}>
        {/* Barra lateral */}
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
            <span>📋</span> Seguimiento
            </div>
            <button className = {styles.logoutBtn} onClick = {() => {navigate('/operador')}}> 
                Inicio
            </button>
            <button className={styles.logoutBtn} onClick = {handleLogout}>
                Cerrar sesión
            </button>
        </aside>

        {/* Contenido principal */}
        <main className={styles.main}>
            <Outlet />
        </main>
    </div>
  )
}