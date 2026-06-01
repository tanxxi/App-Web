const API_BASE = 'http://localhost:8080';

const headers = (token) => ({ Authorization: `Bearer ${token}` });
const jsonHeaders = (token) => ({ ...headers(token), 'Content-Type': 'application/json' });

export const getPedidosAdmin = async (token) => {
  const res = await fetch(`${API_BASE}/api/pedidos?page=0&size=100`, { headers: headers(token) });
  if (!res.ok) throw new Error('Error al obtener pedidos');
  return await res.json();
};

export const getUsuariosAdmin = async (token) => {
  const res = await fetch(`${API_BASE}/api/usuarios`, { headers: headers(token) });
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return await res.json();
};

export const getRepartidoresAdmin = async (token) => {
  const res = await fetch(`${API_BASE}/api/usuarios/repartidores`, { headers: headers(token) });
  if (!res.ok) throw new Error('Error al obtener repartidores');
  return await res.json();
};

export const getConfiguracion = async (token) => {
  const res = await fetch(`${API_BASE}/api/config`, { headers: headers(token) });
  if (!res.ok) throw new Error('Error al obtener configuración');
  return await res.json();
};

export const updateConfiguracion = async (id, valor, token) => {
  const res = await fetch(`${API_BASE}/api/config/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify({ valor }),
  });
  if (!res.ok) throw new Error('Error al actualizar configuración');
  return await res.json();
};

export const getLogs = async (token) => {
  const res = await fetch(`${API_BASE}/api/logs?limit=100`, { headers: headers(token) });
  if (!res.ok) throw new Error('Error al obtener logs');
  return await res.json();
};

export const getReportes = async (token) => {
  const res = await fetch(`${API_BASE}/api/pedidos/reportes`, { headers: headers(token) });
  if (!res.ok) throw new Error('Error al obtener reportes');
  return await res.json();
};

export const getHistorialPedido = async (pedidoId, token) => {
  const res = await fetch(`${API_BASE}/api/pedidos/${pedidoId}/historial`, { headers: headers(token) });
  if (!res.ok) throw new Error('Error al obtener historial');
  return await res.json();
};
