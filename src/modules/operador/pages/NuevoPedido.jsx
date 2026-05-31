import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearPedido } from '../services/orgServicios';

export default function NuevoPedidoPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    origen: '',
    destino: '',
    descripcion: '',
    clienteId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación de obligatorios
    if (!form.origen.trim() || !form.destino.trim() || !form.descripcion.trim() || !form.clienteId) {
      setError('Los campos Origen, Destino, Descripción e ID Cliente son obligatorios.');
      return;
    }

    const clienteIdNum = parseInt(form.clienteId, 10);
    if (isNaN(clienteIdNum) || clienteIdNum <= 0) {
      setError('El ID del cliente debe ser un número válido.');
      return;
    }

    // Construir payload exacto del DTO
    const payload = {
      origen: form.origen.trim(),
      destino: form.destino.trim(),
      descripcion: form.descripcion.trim(),
      clienteId: clienteIdNum
    };

    setLoading(true);
    try {
      const pedidoCreado = await crearPedido(payload, token);
      console.log('Pedido creado:', pedidoCreado);
      // Redirigir a la lista de pedidos
      navigate('/operador/pedidos');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Nuevo Pedido Logístico</h1>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>Error: {error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Origen: *
            <input
              type="text"
              name="origen"
              value={form.origen}
              onChange={handleChange}
              placeholder="ej. Calle 100 #13-39"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Destino: *
            <input
              type="text"
              name="destino"
              value={form.destino}
              onChange={handleChange}
              placeholder="ej. Carrera 15 #98-20"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Descripción: *
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Describe el paquete o envío"
              required
            />
          </label>
        </div>

        <div>
          <label>
            ID del Cliente: *
            <input
              type="number"
              name="clienteId"
              value={form.clienteId}
              onChange={handleChange}
              placeholder="ej. 5"
              min="1"
              required
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Pedido'}
        </button>
        <button type="button" onClick={() => navigate('/operador/pedidos')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}