const API_BASE = 'http://localhost:8080';

export const getPedidosRepartidor = async (repartidorId, token) => {
  const res = await fetch(`${API_BASE}/api/pedidos?repartidorId=${repartidorId}&size=50`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener pedidos');
  const data = await res.json();
  return data.content ?? data;
};

export const actualizarEstadoPedido = async (pedidoId, nuevoEstado, token) => {
  const res = await fetch(`${API_BASE}/api/pedidos/${pedidoId}/estado?nuevoEstado=${nuevoEstado}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al actualizar estado del pedido');
  return await res.json();
};

export const actualizarUbicacion = async (pedidoId, lat, lng, direccion, token) => {
  const res = await fetch(`${API_BASE}/api/pedidos/${pedidoId}/ubicacion`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ latitud: lat, longitud: lng, direccion })
  });
  if (!res.ok) throw new Error('Error al actualizar ubicación');
  return { success: true };
};
