import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerPedido } from '../services/orgServicios';

export default function DetallePedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('No hay sesión activa');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    obtenerPedido(id, token)
      .then(data => {
        setPedido(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, token]);

  if (loading) return <p>Cargando pedido…</p>;
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

      {/* Si el backend incluye 'descripcion', podés mostrarla así: */}
      {pedido.descripcion && <p><strong>Descripción:</strong> {pedido.descripcion}</p>}

      <button onClick={() => navigate('/operador/pedidos')}>Volver</button>
    </div>
  );
}