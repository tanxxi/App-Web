import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { obtenerPedido, fetchHistorialPedido } from '../services/orgServicios';
import { ESTADOS } from '../../../constants/estados'; // Ajustá la ruta

export default function DetallePedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Pedido
  const [pedido, setPedido] = useState(null);
  const [loadingPedido, setLoadingPedido] = useState(true);
  const [error, setError] = useState(null);

  // Filtros y paginación del historial
  const [historialFiltros, setHistorialFiltros] = useState({
    tipoEvento: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: '',
    observacion: '',
    page: 0,
    limite: 10,
    sort: 'fechaHora,desc',
  });

  const [historialData, setHistorialData] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
  });
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  // Cargar pedido
  useEffect(() => {
    if (!token) {
      setError('No hay sesión activa');
      setLoadingPedido(false);
      return;
    }
    setLoadingPedido(true);
    obtenerPedido(id, token)
      .then(data => setPedido(data))
      .catch(err => setError(err.message))
      .finally(() => setLoadingPedido(false));
  }, [id, token]);

  // Cargar historial cuando cambien los filtros (incluyendo page y limite)
  const cargarHistorial = useCallback(() => {
    if (!token) return;

    setLoadingHistorial(true);
    const filtrosParaApi = {
      ...historialFiltros,
      tipoEvento: historialFiltros.tipoEvento || undefined,
      estado: historialFiltros.estado && historialFiltros.estado !== 'Todos' ? historialFiltros.estado : undefined,
      fechaDesde: historialFiltros.fechaDesde || undefined,
      fechaHasta: historialFiltros.fechaHasta || undefined,
      observacion: historialFiltros.observacion.trim() || undefined,
    };

    fetchHistorialPedido(id, filtrosParaApi, token)
      .then(data => {
        setHistorialData({
          content: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
        });
        // Si la página actual es mayor que el nuevo total de páginas, resetear
        if (data.totalPages > 0 && historialFiltros.page >= data.totalPages) {
          setHistorialFiltros(prev => ({ ...prev, page: data.totalPages - 1 }));
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoadingHistorial(false));
  }, [id, token, historialFiltros]);

  useEffect(() => {
    cargarHistorial();
  }, [cargarHistorial]);

  // Manejadores de filtros (resetean página a 0)
  const handleFiltroChange = (campo, valor) => {
    setHistorialFiltros(prev => ({ ...prev, [campo]: valor, page: 0 }));
  };

  const limpiarFiltros = () => {
    setHistorialFiltros({
      tipoEvento: '',
      estado: '',
      fechaDesde: '',
      fechaHasta: '',
      observacion: '',
      page: 0,
      limite: 10,
      sort: 'fechaHora,desc',
    });
  };

  if (loadingPedido) return <p>Cargando pedido…</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!pedido) return <p>No se encontró el pedido.</p>;

  return (
    <div>
      <h2>Pedido #{pedido.id}</h2>

      <p><strong>Origen:</strong> {pedido.origen}</p>
      <p><strong>Destino:</strong> {pedido.destino}</p>
      <p><strong>Estado:</strong> {pedido.estado}</p>
      <p><strong>Fecha creación:</strong> {pedido.fechaCreacion}</p>
      <p><strong>Cliente:</strong> {pedido.clienteNombre} (ID: {pedido.clienteId})</p>
      <p><strong>Repartidor:</strong> {pedido.repartidorNombre ? `${pedido.repartidorNombre} (ID: ${pedido.repartidorId})` : 'Sin asignar'}</p>
      {pedido.descripcion && <p><strong>Descripción:</strong> {pedido.descripcion}</p>}

      <hr />

      <h3>Historial del Pedido</h3>

      {/* Filtros */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <label>
          Límite:
          <input
            type="number"
            value={historialFiltros.limite}
            min="1"
            max="100"
            onChange={e => handleFiltroChange('limite', parseInt(e.target.value, 10) || 10)}
            style={{ width: '60px' }}
          />
        </label>

        <label>
          Tipo evento:
          <input
            type="text"
            value={historialFiltros.tipoEvento}
            onChange={e => handleFiltroChange('tipoEvento', e.target.value)}
            placeholder="CREADO, ASIGNADO..."
          />
        </label>

        <label>
          Estado:
          <select value={historialFiltros.estado} onChange={e => handleFiltroChange('estado', e.target.value)}>
            {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </label>

        <label>
          Desde:
          <input
            type="date"
            value={historialFiltros.fechaDesde}
            onChange={e => handleFiltroChange('fechaDesde', e.target.value)}
          />
        </label>

        <label>
          Hasta:
          <input
            type="date"
            value={historialFiltros.fechaHasta}
            onChange={e => handleFiltroChange('fechaHasta', e.target.value)}
          />
        </label>

        <label>
          Observación:
          <input
            type="text"
            value={historialFiltros.observacion}
            onChange={e => handleFiltroChange('observacion', e.target.value)}
            placeholder="contiene..."
          />
        </label>

        <button onClick={limpiarFiltros}>Limpiar filtros</button>
      </div>

      {/* Tabla */}
      {loadingHistorial ? (
        <p>Cargando historial…</p>
      ) : historialData.content.length === 0 ? (
        <p>No hay eventos con los filtros aplicados.</p>
      ) : (
        <>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Tipo de Evento</th>
                <th>Estado</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {historialData.content.map(evento => (
                <tr key={evento.id}>
                  <td>{new Date(evento.fechaHora).toLocaleString()}</td>
                  <td>{evento.tipoEvento}</td>
                  <td>{evento.estado}</td>
                  <td>{evento.observacion || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Controles de paginación */}
          <div style={{ marginTop: '1rem' }}>
            <button
              disabled={historialFiltros.page === 0}
              onClick={() => setHistorialFiltros(prev => ({ ...prev, page: prev.page - 1 }))}
            >
              Anterior
            </button>
            <span> Página {historialFiltros.page + 1} de {historialData.totalPages} </span>
            <button
              disabled={historialFiltros.page + 1 >= historialData.totalPages}
              onClick={() => setHistorialFiltros(prev => ({ ...prev, page: prev.page + 1 }))}
            >
              Siguiente
            </button>
          </div>
          <div>Total de eventos: {historialData.totalElements}</div>
        </>
      )}

      <button onClick={() => navigate('/operador/pedidos')} style={{ marginTop: '1rem' }}>Volver</button>
    </div>
  );
}