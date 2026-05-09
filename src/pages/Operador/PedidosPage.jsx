import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {PEDIDOS_MOCK} from '../../mock/mockPedidos';
import {ESTADOS} from '../../constants/estados'


export default function PedidosPage()
{   
    /*
    Hooks para los filtros de la tabla 
    */
    const[filtroEstado, setFiltroEstado] = useState('Todos');
    const[filtroClienteID, setFiltroClienteID] = useState('');
    const[filtroRepartidorID, setFiltroRepartidorID] = useState('');
    const[filtroFechaDesde, setFiltroFechaDesde] = useState('');
    const[filtroFechaHasta, setFiltroFechaHasta] = useState('');
    const [horaDesde, setHoraDesde] = useState('');
    const [horaHasta, setHoraHasta] = useState('');
    const navigate = useNavigate();

    const pedidosFiltrados = PEDIDOS_MOCK.filter(p => {
        if (filtroEstado !== 'Todos' && p.estado !== filtroEstado) return false;
        if (filtroClienteID && !p.clienteId.toLowerCase().includes(filtroClienteID.toLowerCase())) return false;
        if (filtroRepartidorID && (!p.repartidorId || !p.repartidorId.toLowerCase().includes(filtroRepartidorID.toLowerCase()))) return false;
        if (filtroFechaDesde && p.fecha < filtroFechaDesde) return false;
         // filtro por fecha (solo la parte de la fecha)
        if (filtroFechaDesde || filtroFechaHasta) {
            const fechaPart = p.fecha.split(' ')[0]; // "2026-05-05"
            if (filtroFechaDesde && fechaPart < filtroFechaDesde) return false;
            if (filtroFechaHasta && fechaPart > filtroFechaHasta) return false;
        }
        // filotr por hora (solo la parte de la hora)
        if (horaDesde || horaHasta) {
            const horaPart = p.fecha.split(' ')[1]?.substring(0, 5) || ''; // "09:30"
            if (horaDesde && horaPart < horaDesde) return false;
            if (horaHasta && horaPart > horaHasta) return false;
        }
        return true;
    })

    return(
        <div>
            <h1> Gestión de Pedidos </h1>
            <div>

                {/* Se filtra la búsqueda de los pedidos a su estado*/}
                <label> Estado:
                    <select value ={filtroEstado} onChange = {e => setFiltroEstado(e.target.value)}>
                        {ESTADOS.map(e=> <option key = {e}> {e} </option>)}
                    </select>
                </label>

                {/*Se filtra por hora*/}
                <label>
                    Hora desde:
                    <input
                    type="time"
                    value={horaDesde}
                    onChange={e => setHoraDesde(e.target.value)}
                    />
                </label>

                <label>
                    Hora hasta:
                    <input
                    type="time"
                    value={horaHasta}
                    onChange={e => setHoraHasta(e.target.value)}
                    />
                </label>

                {/* Se filtra la búsqueda de los pedidos según el ID del cliente*/}
                <label> ID cliente: 
                    <input type = "text" value = {filtroClienteID} 
                    onChange = {e => setFiltroClienteID(e.target.value)} placeholder = "ej. C1" size = "6"/>
                </label>

                 {/* Se filtra la búsqueda de los pedidos según el ID del repartidor*/}
                <label> ID repartidor: 
                    <input type = "text" value = {filtroRepartidorID} 
                    onChange = {e => setFiltroRepartidorID(e.target.value)} placeholder = "ej. R1" size = "6"/>
                </label>

                {/* Se filtra la búsqueda de los pedidos según la fecha de comienzo*/}
                <label> Desde: 
                    <input type = "date" value = {filtroFechaDesde} onChange = {e => setFiltroFechaDesde(e.target.value)}/>
                </label>

                {/* Se filtra la búsqueda de los pedidos según la fecha hasta  */}
                <label> Hasta:
                    <input type = "date" value = {filtroFechaHasta} onChange = {e => setFiltroFechaHasta(e.target.value)}/>
                </label>
            </div>


            <table border = "1">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Origen </th>
                        <th> Destino </th>
                        <th> Cliente ID </th>
                        <th> Repartidor ID </th>
                        <th> Estado </th>
                        <th> Fecha </th>
                        <th> Acciones </th>
                    </tr>
                </thead>

                <tbody>
                    {pedidosFiltrados.lenght === 0 ? (<tr colspan = "8"> No hay pedidos </tr>) :
                    (
                        pedidosFiltrados.map(p => (
                            <tr key = {p.id}>
                                <td>{p.id}</td>
                                <td>{p.origen}</td>
                                <td>{p.destino}</td>
                                <td>{p.clienteId}</td>
                                <td>{p.repartidorId || '-'}</td>
                                <td>{p.estado}</td>
                                <td>{p.fecha}</td>
                                <td>
                                    <button onClick = {() => navigate(`/operador/pedidos/${p.id}`)}> Detalle </button>
                                    <button onClick={() => navigate(`/operador/pedidos/${p.id}/editar`)}> Editar </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <button onClick = {() =>  alert("Nuevp pedido (mock)")}> + Nuevo Pedido </button>
        </div>
    )
}
