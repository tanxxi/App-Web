import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {PEDIDOS_MOCK} from '../../../mock/mockPedidos';
import {ESTADOS} from '../../../constants/estados'


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
    const[filtroUbicacion, setFiltroUbicacion] = useState('');
    const[filtroPedidoID, setFiltroPedidoID] = useState('');
    const[limite, setLimite] = useState(10)

    const [horaDesde, setHoraDesde] = useState('');
    const [horaHasta, setHoraHasta] = useState('');
    const [ordenFecha, setOrdenFecha] = useState('desc');
    const navigate = useNavigate();

    /*
    Esto es simplemente una simulacion. Necesitamos del back-end
    para pasar el argumento de limite, y los otros argumentos de filtrado
    una vez los tengamos listos
     */
    const pedidosFiltrados = PEDIDOS_MOCK.slice(0, limite)

    pedidosFiltrados.filter(p => {

        if (filtroEstado !== 'Todos' && p.estado !== filtroEstado) return false;
        if (filtroClienteID && parseInt(filtroClienteID) !== p.clienteId) return false;
        if (filtroRepartidorID && (!p.repartidorId || parseInt(filtroRepartidorID) !== p.repartidorId)) return false;
        if (filtroFechaDesde && p.fecha < filtroFechaDesde) return false;
        if (filtroUbicacion && (!p.ubicacion || !p.ubicacion.toLowerCase().includes(filtroUbicacion.toLowerCase()))) return false;
        if (filtroPedidoID && parseInt(filtroPedidoID) !== p.id) return false;

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

    const pedidosFiltradosYOrdenados = [...pedidosFiltrados].sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return ordenFecha === 'desc' ? fechaB - fechaA : fechaA - fechaB;
    });

    return(
        <div>
            <h1> Gestión de Pedidos </h1>
            <div>

                {/* Limite de instancias presentadas*/}
                <label>
                    Limite:
                    <input
                     type = "number"
                     value = {limite}
                     min = "1"
                     max = "200"
                     onChange = {e => setLimite(parseInt(e.target.value, 10) || 10)}
                    />
                </label>

                {/* Se filtra la búsqueda de los pedidos a su estado*/}
                <label> Estado:
                    <select value ={filtroEstado} onChange = {e => setFiltroEstado(e.target.value)}>
                        {ESTADOS.map(e=> <option key = {e}> {e} </option>)}
                    </select>
                </label>

                <label>
                    Ubicación:
                    <input
                    type="text"
                    value={filtroUbicacion}
                    onChange={e => setFiltroUbicacion(e.target.value)}
                    placeholder="ej. Calle 100 #13-39"
                    size="15"
                    />
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

                {/* Se filtra la búsqueda de los pedidos según el ID del cliente */}
                <label> ID cliente: 
                    <input type = "numeric" value = {filtroClienteID} 
                    onChange = {e => setFiltroClienteID(e.target.value)} placeholder = "ej. 1" size = "6"/>
                </label>

                 {/* Se filtra la búsqueda de los pedidos según el ID del repartidor */}
                <label> ID repartidor: 
                    <input type = "numeric" value = {filtroRepartidorID} 
                    onChange = {e => setFiltroRepartidorID(e.target.value)} placeholder = "ej. 1" size = "6"/>
                </label>

                {/* Se filtra la búsqueda de los pedidos según el ID del mismo */}
                <label> ID pedido: 
                    <input type = "numeric" value = {filtroPedidoID} 
                    onChange = {e => setFiltroPedidoID(e.target.value)} placeholder = "ej. 1" size = "6"/>
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
                        <th> Ubicación </th>
                        <th> Cliente ID </th>
                        <th> Repartidor ID </th>
                        <th> Estado </th>
                        <th onClick={() => setOrdenFecha(prev => prev === 'desc' ? 'asc' : 'desc')} style={{ cursor: 'pointer' }}>
                            Fecha {ordenFecha === 'desc' ? '▼' : '▲'}
                        </th>
                        <th> Acciones </th>
                    </tr>
                </thead>

                <tbody>
                    {pedidosFiltradosYOrdenados.length === 0 ? (
                        <tr>
                        <td colSpan={9}>No hay pedidos</td>
                        </tr>
                    ) : (
                        pedidosFiltradosYOrdenados.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.origen}</td>
                            <td>{p.destino}</td>
                            <td>{p.ubicacion}</td>
                            <td>{p.clienteId}</td>
                            <td>{p.repartidorId || '-'}</td>
                            <td>{p.estado}</td>
                            <td>{p.fecha}</td>
                            <td>
                            <button onClick={() => navigate(`/operador/pedidos/${p.id}`)}>Detalle</button>
                            <button onClick={() => navigate(`/operador/pedidos/${p.id}/editar`)}>Editar</button>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
            <button onClick = {() =>  navigate('/operador/pedidos/nuevo')}> + Nuevo Pedido </button>
        </div>
    )
}
