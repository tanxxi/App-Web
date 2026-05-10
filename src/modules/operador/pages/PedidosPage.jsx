import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {PEDIDOS_MOCK} from '../../../mock/mockPedidos';
import {fetchPedidos} from '../services/orgServicios';
import {ESTADOS} from '../../../constants/estados'


export default function PedidosPage()
{   
    /*
    Hooks para los filtros de la tabla 
    */
    const [pedidos, setPedidos] = useState(PEDIDOS_MOCK); // Datos que se muestran en la tabla
    const [loading, setLoading] = useState(false);
    const [limite, setLimite] = useState(10)
    const [error, setError] = useState(null);
    const [ordenFecha, setOrdenFecha] =  useState('')
    const navigate = useNavigate();

    const [filtros, setFiltros] = useState({
        estado: 'Todos',
        clienteId: '',
        repartidorId: '',
        fechaDesde: '',
        fechaHasta: '',
        horaDesde: '',
        horaHasta: '',
        ubicacion: '',
        id: 0,
    });

    useEffect(() => {
        if (limite <= 3) {
            setPedidos(PEDIDOS_MOCK);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetchPedidos({ ...filtros, limite })
            .then(data => {
            setPedidos(data);
            setLoading(false);
            })
            .catch(err => {
            console.error(err);
            setLoading(false);
            });
        }, [limite, filtros]
    );

    const pedidosFiltrados = limite <= 15
    ? pedidos.slice(0, limite).filter(p => {
      // tu lógica local (idéntica a la de fetchPedidos)
      if (filtros.estado !== 'Todos' && p.estado !== filtros.estado) return false;
      // ... resto de condiciones ...
      return true;
    })
    : pedidos; // en modo servidor ya vienen filtrados y cortados

    const handleFiltroChange = (campo, valor) => {
        setFiltros(prev => ({ ...prev, [campo]: valor }));
    };

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
                    <select value ={filtros.estado} onChange = {e => handleFiltroChange('estado', e.target.value)}>
                        {ESTADOS.map(e=> <option key = {e}> {e} </option>)}
                    </select>
                </label>

                <label>
                    Ubicación:
                    <input
                    type="text"
                    value={filtros.ubicacion}
                    onChange={e => handleFiltroChange('ubicacion', e.target.value)}
                    placeholder="ej. Calle 100 #13-39"
                    size="15"
                    />
                </label>

                {/*Se filtra por hora*/}
                <label>
                    Hora desde:
                    <input
                    type="time"
                    value={filtros.horaDesde}
                    onChange={e => handleFiltroChange('horaDesde', e.target.value)}
                    />
                </label>

                <label>
                    Hora hasta:
                    <input
                    type="time"
                    value={filtros.horaHasta}
                    onChange={e => handleFiltroChange('horaHasta', e.target.value)}
                    />
                </label>

                {/* Se filtra la búsqueda de los pedidos según el ID del cliente */}
                <label> ID cliente: 
                    <input type = "numeric" value = {filtros.clienteId} 
                    onChange = {e => handleFiltroChange('clienteId', parseInt(e.target.value) || '')} placeholder = "ej. 1" size = "6"/>
                </label>

                 {/* Se filtra la búsqueda de los pedidos según el ID del repartidor */}
                <label> ID repartidor: 
                    <input type = "numeric" value = {filtros.repartidorId} 
                    onChange = {e => handleFiltroChange('repartidorId', parseInt(e.target.value) || '')} placeholder = "ej. 1" size = "6"/>
                </label>

                {/* Se filtra la búsqueda de los pedidos según el ID del mismo */}
                <label> ID pedido: 
                    <input type = "numeric" value = {filtros.id} 
                    onChange = {e => handleFiltroChange('id', parseInt(e.target.value) || '')} placeholder = "ej. 1" size = "6"/>
                </label>


                {/* Se filtra la búsqueda de los pedidos según la fecha de comienzo*/}
                <label> Desde: 
                    <input type = "date" value = {filtros.fechaDesde} onChange = {e => handleFiltroChange('fechaDesde',e.target.value)}/>
                </label>

                {/* Se filtra la búsqueda de los pedidos según la fecha hasta  */}
                <label> Hasta:
                    <input type = "date" value = {filtros.fechaHasta} onChange = {e => handleFiltroChange('fechaHasta', e.target.value)}/>
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
                    {pedidosFiltrados.length === 0 ? (
                        <tr>
                        <td colSpan={9}>No hay pedidos</td>
                        </tr>
                    ) : (
                        pedidosFiltrados.map(p => (
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
