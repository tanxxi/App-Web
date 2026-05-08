import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'

// Pedidos para realizar las pruebas de interfaz
const PEDIDOS_MOCK = [
  { id: 'P001', origen: 'Centro', destino: 'Norte', clienteId: 'C1', repartidorId: null, estado: 'Pendiente', fecha: '2026-05-05 09:00' },
  { id: 'P002', origen: 'Sur', destino: 'Este', clienteId: 'C2', repartidorId: 'R1', estado: 'En tránsito', fecha: '2026-05-04 14:30' },
  { id: 'P003', origen: 'Oeste', destino: 'Centro', clienteId: 'C1', repartidorId: 'R2', estado: 'Entregado', fecha: '2026-05-03 10:00' },
  { id: 'P004', origen: 'Norte', destino: 'Sur', clienteId: 'C3', repartidorId: 'R1', estado: 'Asignado', fecha: '2026-05-05 11:15' },
  { id: 'P005', origen: 'Este', destino: 'Oeste', clienteId: 'C2', repartidorId: null, estado: 'Cancelado', fecha: '2026-05-02 08:00' },
]

//Los estados de los pedidos
const ESTADOS = ['Todos', 'Pendiente', 'Asignado', 'En tránsito', 'Entregado', 'Cancelado']


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
    const navigate = useNavigate();

    const pedidosFiltrados = PEDIDOS_MOCK.filter(p => {
        if (filtroEstado !== 'Todos' && p.estado !== filtroEstado) return false;
        if (filtroClienteID && !p.clienteId.toLowerCase().includes(filtroClienteID.toLowerCase())) return false;
        if (filtroRepartidorID && (!p.repartidorId || !p.repartidorId.toLowerCase().includes(filtroRepartidorID.toLowerCase()))) return false;
        if (filtroFechaDesde && p.fecha < filtroFechaDesde) return false;
        if (filtroFechaHasta && p.fecha > filtroFechaHasta + ' 23:59:59') return false;
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
                                    <button  onClick={() => alert(`Eliminar ${p.id} (mock)`)}> Eliminar </button>
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