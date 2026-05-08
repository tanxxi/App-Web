
import {Link} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

export default function OperadorDashboard()
{
    const {user} = useAuth();

    return(
        <div>
            <h1> Panel de Operador</h1>
            <p> Bienvenido {user.nombre} con id {user.id}! Seleciona una sección: </p>
            <ul>
                <li><Link to = "/operador/pedidos"> Gestión de Pedidos </Link></li>
                <li><Link to = "/operador/repartidores"> Gestión de Repartidores </Link></li>
            </ul>
        </div>
    )
}