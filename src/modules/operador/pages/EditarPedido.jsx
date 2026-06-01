
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { obtenerPedido, actualizarPedido } from '../services/orgServicios';

export default function FormularioPedidoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Intentar obtener el pedido del estado de navegación
  const pedidoFromState = location.state?.pedido;

  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    descripcion: '',
    clienteId: '',
    repartidorId: '',
    estado: '',
  });

  const [loading, setLoading] = useState(!pedidoFromState);
  const [error, setError] = useState(null);

  // Cargar datos del pedido si no vienen por estado
  useEffect(() => {
    if (pedidoFromState) {
      setFormData({
        origen: pedidoFromState.origen || '',
        destino: pedidoFromState.destino || '',
        descripcion: pedidoFromState.descripcion || '',
        clienteId: String(pedidoFromState.clienteId || ''),
        repartidorId: String(pedidoFromState.repartidorId || ''),
        estado: pedidoFromState.estado || '',
      });
      setLoading(false);
      return;
    }

    if (!token || !id) return;

    setLoading(true);
    obtenerPedido(id, token)
      .then(data => {
        setFormData({
          origen: data.origen || '',
          destino: data.destino || '',
          descripcion: data.descripcion || '',
          clienteId: String(data.clienteId || ''),
          repartidorId: String(data.repartidorId || ''),
          estado: data.estado || '',
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token, pedidoFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Construir el DTO para el PUT
    const payload = {
      origen: formData.origen.trim() || null,
      destino: formData.destino.trim() || null,
      descripcion: formData.descripcion.trim() || null,
      clienteId: formData.clienteId ? parseInt(formData.clienteId, 10) : null,
      repartidorId: formData.repartidorId ? parseInt(formData.repartidorId, 10) : null,
      estado: formData.estado || null,
    };

    try {
      await actualizarPedido(id, payload, token);
      // Redirigir a la lista
      navigate('/operador/pedidos');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Cargando datos del pedido…</div>;

  return (
    <div>
      <h1>Editar Pedido #{id}</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Origen:
          <input type="text" name="origen" value={formData.origen} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Destino:
          <input type="text" name="destino" value={formData.destino} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Descripción:
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" />
        </label>
        <br />
        <label>
          ID Cliente:
          <input type="number" name="clienteId" value={formData.clienteId} onChange={handleChange} required />
        </label>
        <br />
        <label>
          ID Repartidor:
          <input type="number" name="repartidorId" value={formData.repartidorId} onChange={handleChange} />
        </label>
        <br />
        <label>
          Estado:
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="">-- No cambiar --</option>
            <option value="ASIGNADO"> ASIGNADO </option>
            <option value="CANCELADO"> CANCELADO </option>
            <option value="PENDIENTE"> PENDIENTE </option>
          </select>
        </label>
        <br />
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={() => navigate('/operador/pedidos')}>Cancelar</button>
      </form>
    </div>
  );
}