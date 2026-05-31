import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPedidos } from '../services/orgServicios';
import { ESTADOS } from '../../../constants/estados';

export default function PedidosPage() {

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token'); // o como manejes el token

  console.log(token);

  // Estados
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

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
    limite: 10,
    ordenFecha: 'desc',
  });

  // Cargar pedidos cuando cambien filtros, página o límite
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    // Preparar objeto con los filtros que no estén vacíos
    const params = {
      ...filtros,
      page,
    };
    // Eliminar campos vacíos o 'Todos' para no enviarlos
    if (params.estado === 'Todos') delete params.estado;
    if (!params.clienteId) delete params.clienteId;
    if (!params.repartidorId) delete params.repartidorId;
    if (!params.id) delete params.id;
    if (!params.ubicacion) delete params.ubicacion;
    if (!params.fechaDesde) delete params.fechaDesde;
    if (!params.fechaHasta) delete params.fechaHasta;
    if (!params.horaDesde) delete params.horaDesde;
    if (!params.horaHasta) delete params.horaHasta;

    fetchPedidos(params, token)
      .then(data => {
        setPedidos(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        // Si la página actual es mayor que totalPages-1, resetear
        if (data.totalPages > 0 && page >= data.totalPages) {
          setPage(data.totalPages - 1);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [filtros, page, token]); // cuando cambie page o filtros, recarga

  // Manejadores de filtros
  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
    setPage(0); // reiniciar página al cambiar filtros
  };

  // Cambiar orden (asc/desc) al hacer clic en la columna Fecha
  const toggleOrden = () => {
    const nuevoOrden = filtros.ordenFecha === 'desc' ? 'asc' : 'desc';
    handleFiltroChange('ordenFecha', nuevoOrden);
  };

  // Limpiar filtros (opcional)
  const limpiarFiltros = () => {
    setFiltros({
      estado: 'Todos',
      clienteId: '',
      repartidorId: '',
      fechaDesde: '',
      fechaHasta: '',
      horaDesde: '',
      horaHasta: '',
      ubicacion: '',
      id: 0,
      limite: 10,
      ordenFecha: 'desc',
    });
    setPage(0);
  };

  // Si hay error, mostrar mensaje
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Gestión de Pedidos</h1>
      <div>
        {/* Límite */}
        <label>
          Límite:
          <input
            type="number"
            value={filtros.limite}
            min="1"
            max="200"
            onChange={e => handleFiltroChange('limite', parseInt(e.target.value, 10) || 10)}
          />
        </label>

        {/* Filtro de estado */}
        <label>
          Estado:
          <select value={filtros.estado} onChange={e => handleFiltroChange('estado', e.target.value)}>
            {ESTADOS.map(e => <option key={e}>{e}</option>)}
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

        <label>
          ID cliente:
          <input
            type="number"
            value={filtros.clienteId}
            onChange={e => handleFiltroChange('clienteId', parseInt(e.target.value) || '')}
            placeholder="ej. 1"
            size="6"
          />
        </label>

        <label>
          ID repartidor:
          <input
            type="number"
            value={filtros.repartidorId}
            onChange={e => handleFiltroChange('repartidorId', parseInt(e.target.value) || '')}
            placeholder="ej. 1"
            size="6"
          />
        </label>

        <label>
          ID pedido:
          <input
            type="number"
            value={filtros.id}
            onChange={e => handleFiltroChange('id', parseInt(e.target.value) || '')}
            placeholder="ej. 1"
            size="6"
          />
        </label>

        <label>
          Desde:
          <input
            type="date"
            value={filtros.fechaDesde}
            onChange={e => handleFiltroChange('fechaDesde', e.target.value)}
          />
        </label>

        <label>
          Hasta:
          <input
            type="date"
            value={filtros.fechaHasta}
            onChange={e => handleFiltroChange('fechaHasta', e.target.value)}
          />
        </label>

        <button onClick={limpiarFiltros}>Limpiar filtros</button>
      </div>

      {loading && <p>Cargando...</p>}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Ubicación</th>
            <th>Cliente ID</th>
            <th>Repartidor ID</th>
            <th>Estado</th>
            <th onClick={toggleOrden} style={{ cursor: 'pointer' }}>
              Fecha {filtros.ordenFecha === 'desc' ? '▼' : '▲'}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length === 0 ? (
            <tr>
              <td colSpan="9">No hay pedidos</td>
            </tr>
          ) : (
            pedidos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.origen}</td>
                <td>{p.destino}</td>
                <td>{p.ubicacion || '-'}</td>
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

      {/* Controles de paginación */}
      <div>
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Anterior</button>
        <span> Página {page + 1} de {totalPages} </span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>Siguiente</button>
      </div>
      <div>Total de pedidos: {totalElements}</div>

      <button onClick={() => navigate('/operador/pedidos/nuevo')}>+ Nuevo Pedido</button>
    </div>
  );
}