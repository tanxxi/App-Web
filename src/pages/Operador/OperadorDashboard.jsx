
import {Link} from 'react-router-dom'

export default function OperadorDashboard()
{
    return(
        <div>
            <h1> Panel de Operador</h1>
            <p>Bienvenido! Seleciona una sección:</p>
            <ul>
                <li><Link to = "/operador/pedidos"> Gestión de Pedidos </Link></li>
                <li><Link to = "/operador/repartidores"> Gestión de Repartidores </Link></li>
            </ul>
        </div>
    )
}