const API_URL = 'http://localhost:8080';

const isMockToken = (token) => !token || token.startsWith('token-');

// --- Mock Data ---

const MOCK_CONFIG = [
  { id: '1', clave: 'MANTENIMIENTO', descripcion: 'Modo Mantenimiento', valor: 'false', tipo: 'boolean' },
  { id: '2', clave: 'MAX_PEDIDOS', descripcion: 'Máx. Pedidos/Día', valor: '1000', tipo: 'number' },
  { id: '3', clave: 'CORREO_ADMIN', descripcion: 'Correo de Administrador', valor: 'admin@test.com', tipo: 'text' },
];

const MOCK_LOGS = [
  { id: 1, timestamp: '2026-06-01T10:00:00', tipo: 'INFO', usuarioId: 1, descripcion: 'Sistema iniciado correctamente' },
  { id: 2, timestamp: '2026-06-01T10:05:00', tipo: 'WARN', usuarioId: 2, descripcion: 'Intento de acceso fallido de IP desconocida' },
  { id: 3, timestamp: '2026-06-01T10:10:00', tipo: 'ERROR', usuarioId: 3, descripcion: 'Fallo al procesar reporte analítico' },
];

const MOCK_REPARTIDORES = [
  { id: 1, nombre: 'Carlos', apellido: 'Ruiz', email: 'repartidor@test.com', telefono: '3001234567', vehiculo: 'Moto', capacidad: 'Pequeña', estado: 'DISPONIBLE' },
  { id: 2, nombre: 'Laura', apellido: 'Gómez', email: 'laura@test.com', telefono: '3007654321', vehiculo: 'Camioneta', capacidad: 'Grande', estado: 'OCUPADO' },
  { id: 3, nombre: 'Pedro', apellido: 'López', email: 'pedro@test.com', telefono: '3001122334', vehiculo: 'Bicicleta', capacidad: 'Pequeña', estado: 'DISPONIBLE' },
];

const MOCK_REPORTE = {
  totalPedidos: 5,
  porEstado: { PENDIENTE: 1, ASIGNADO: 1, EN_TRANSITO: 1, ENTREGADO: 1, CANCELADO: 1 },
};

const MOCK_PEDIDOS_PAGE = {
  content: [
    { id: 1, origen: 'Bogotá', destino: 'Medellín', estado: 'PENDIENTE', fechaCreacion: '2026-05-30T08:00:00', clienteId: 4, clienteNombre: 'María Cliente', repartidorId: null, repartidorNombre: null },
    { id: 2, origen: 'Cali', destino: 'Barranquilla', estado: 'ASIGNADO', fechaCreacion: '2026-05-30T09:00:00', clienteId: 4, clienteNombre: 'María Cliente', repartidorId: 1, repartidorNombre: 'Carlos Ruiz' },
    { id: 3, origen: 'Cartagena', destino: 'Santa Marta', estado: 'EN_TRANSITO', fechaCreacion: '2026-05-29T14:00:00', clienteId: 4, clienteNombre: 'María Cliente', repartidorId: 1, repartidorNombre: 'Carlos Ruiz' },
    { id: 4, origen: 'Bogotá', destino: 'Cali', estado: 'ENTREGADO', fechaCreacion: '2026-05-28T10:00:00', clienteId: 4, clienteNombre: 'María Cliente', repartidorId: 2, repartidorNombre: 'Laura Gómez' },
    { id: 5, origen: 'Medellín', destino: 'Pereira', estado: 'CANCELADO', fechaCreacion: '2026-05-28T16:00:00', clienteId: 4, clienteNombre: 'María Cliente', repartidorId: null, repartidorNombre: null },
  ],
  totalElements: 5,
  totalPages: 1,
  number: 0,
  size: 100,
};

const MOCK_HISTORIAL = {
  content: [
    { id: 1, fechaHora: '2026-05-30T08:00:00', tipoEvento: 'CREADO', estado: 'PENDIENTE', observacion: 'Pedido creado por operador logístico' },
    { id: 2, fechaHora: '2026-05-30T08:15:00', tipoEvento: 'ASIGNADO', estado: 'ASIGNADO', observacion: 'Asignado a Carlos Ruiz' },
    { id: 3, fechaHora: '2026-05-30T09:00:00', tipoEvento: 'ESTADO_CAMBIADO', estado: 'EN_TRANSITO', observacion: 'Repartidor confirmó recogida' },
    { id: 4, fechaHora: '2026-05-30T15:30:00', tipoEvento: 'UBICACION_ACTUALIZADA', estado: 'EN_TRANSITO', observacion: 'Ubicación actualizada: Av. Principal 123' },
  ],
  totalElements: 4,
  totalPages: 1,
  number: 0,
  size: 10,
};

// --- Service Functions ---

export const getPedidosAdmin = async (token) => {
  if (isMockToken(token)) return MOCK_PEDIDOS_PAGE;
  try {
    const response = await fetch(`${API_URL}/api/pedidos?page=0&size=100`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error fetching pedidos');
    return response.json();
  } catch {
    console.warn('Fallback a mock de pedidos.');
    return MOCK_PEDIDOS_PAGE;
  }
};

function mockUsuariosSinCredenciales(list) {
  return list.map((u) => ({ id: u.id, email: u.email, nombre: u.nombre, rol: u.rol }));
}

export const getUsuariosAdmin = async (token) => {
  if (isMockToken(token)) {
    const { MOCK_CREDENTIALS } = await import('../mock/credentialsMock');
    return mockUsuariosSinCredenciales(MOCK_CREDENTIALS);
  }
  try {
    const response = await fetch(`${API_URL}/api/usuarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error fetching usuarios');
    return response.json();
  } catch {
    console.warn('Fallback a mock de usuarios.');
    const { MOCK_CREDENTIALS } = await import('../mock/credentialsMock');
    return mockUsuariosSinCredenciales(MOCK_CREDENTIALS);
  }
};

export const getRepartidoresAdmin = async (token) => {
  if (isMockToken(token)) return MOCK_REPARTIDORES;
  try {
    const response = await fetch(`${API_URL}/api/usuarios/repartidores`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error fetching repartidores');
    return response.json();
  } catch {
    console.warn('Fallback a mock de repartidores.');
    return MOCK_REPARTIDORES;
  }
};

export const getConfiguracion = async (token) => {
  if (isMockToken(token)) return MOCK_CONFIG;
  try {
    const response = await fetch(`${API_URL}/api/config`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error fetching configuración');
    return response.json();
  } catch {
    console.warn('Fallback a mock de configuración.');
    return MOCK_CONFIG;
  }
};

export const updateConfiguracion = async (id, valor, token) => {
  if (isMockToken(token)) {
    const item = MOCK_CONFIG.find((c) => c.id === id);
    if (item) item.valor = valor;
    return { status: 'ok' };
  }
  try {
    const response = await fetch(`${API_URL}/api/config/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ valor }),
    });
    if (!response.ok) throw new Error('Error updating configuración');
    return response.json();
  } catch {
    console.warn('Fallback a mock de updateConfig.');
    const item = MOCK_CONFIG.find((c) => c.id === id);
    if (item) item.valor = valor;
    return { status: 'ok' };
  }
};

export const getLogs = async (token) => {
  if (isMockToken(token)) return MOCK_LOGS;
  try {
    const response = await fetch(`${API_URL}/api/logs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error fetching logs');
    return response.json();
  } catch {
    console.warn('Fallback a mock de logs.');
    return MOCK_LOGS;
  }
};

export const getReportes = async (token) => {
  if (isMockToken(token)) return MOCK_REPORTE;
  try {
    const response = await fetch(`${API_URL}/api/pedidos/reportes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error fetching reportes');
    return response.json();
  } catch {
    console.warn('Fallback a mock de reportes.');
    return MOCK_REPORTE;
  }
};

export const getHistorialPedido = async (pedidoId, token) => {
  if (isMockToken(token)) return MOCK_HISTORIAL;
  try {
    const response = await fetch(`${API_URL}/api/pedidos/${pedidoId}/historial`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Error fetching historial');
    return response.json();
  } catch {
    console.warn('Fallback a mock de historial.');
    return MOCK_HISTORIAL;
  }
};
