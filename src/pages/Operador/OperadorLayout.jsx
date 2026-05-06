import {useNavigate, Outlet, Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext"

export default function OperadorLayout()
{
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate('/login', {replace : true})
    };

    return (
        <div>
            {/* Barra lateral */}
           <aside>
              <h2> Seguimiento </h2>
              <nav>
                <Link to = "/operador"> Inicio </Link>
              </nav>
              <button onClick = {handleLogout}> Close session </button>
           </aside>

           <main>
              <Outlet/>
           </main>
        </div>
    )
}