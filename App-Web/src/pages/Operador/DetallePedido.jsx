import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPedidos } from '../../../mock/pedidosMock';

export default function DetallePedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);   // null = aún no cargado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPedidos()                                // llamamos al mock asíncrono
      .then(data => {
        // data es el array completo de pedidos mock
        const encontrado = data.find(p => p.id === id);   // 'id' es string
        if (!encontrado) {
          setError('Pedido no encontrado');
        }
        setPedido(encontrado || null);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar el pedido');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando pedido…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!pedido) return <p>Pedido no existe</p>;

  return (
    <div>
      <h2>Pedido: {pedido.id}</h2>
      <p>Origen: {pedido.origen}</p>
      <p>Destino: {pedido.destino}</p>
      <p>Fecha (hora): {pedido.fecha}</p>
      <p>Ubicación: {pedido.direccion}</p>
      <p>Estado: {pedido.estado}</p>
      <p>ID Repartidor: {pedido.repartidorId || '-'}</p>
      <p>ID Cliente: {pedido.clienteId}</p>
      <p>Descripción: {pedido.descripcion}</p>

      <button onClick={() => navigate('/operador/pedidos')}>Volver</button>
    </div>
  );
}