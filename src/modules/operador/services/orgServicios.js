const API = 'http://localhost:8080'

//Para conseguir los pedidos en la tabla dinámica del org logistico 
//de acuerdo a los filtros establecidos. 
export const fetchPedidos = async (filtros, token) => {
  
  const params = new URLSearchParams();

  // Paginación y orden

  params.append('page', String(filtros.page ?? 0));
  params.append('size', String(filtros.limite ?? 10));
  if (filtros.ordenFecha) {
    params.append('sort', `fechaCreacion,${filtros.ordenFecha}`); // ej. fecha,desc
  } else {
    params.append('sort', 'fechaCreacion,desc');
  }

  // Filtros
  if (filtros.estado && filtros.estado !== 'Todos') params.append('estado', filtros.estado);
  if (filtros.clienteId) params.append('clienteId', filtros.clienteId);
  if (filtros.repartidorId) params.append('repartidorId', filtros.repartidorId);
  if (filtros.id) params.append('id', filtros.id);
  if (filtros.ubicacion) params.append('ubicacion', filtros.ubicacion);
  if (filtros.fechaDesde) params.append('fechaDesde', filtros.fechaDesde);
  if (filtros.fechaHasta) params.append('fechaHasta', filtros.fechaHasta);
  if (filtros.horaDesde) params.append('horaDesde', filtros.horaDesde);
  if (filtros.horaHasta) params.append('horaHasta', filtros.horaHasta);

  console.log(`${API}/api/pedidos?${params.toString()}`);

  const response = await fetch(`${API}/api/pedidos?${params.toString()}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error al cargar pedidos');
  }

  const data = await response.json();
  // data tiene la estructura: { content, totalPages, totalElements, number, size, ... }
  return data;
};


export const crearPedido = async (datosPedido, token) => {
  const response = await fetch(`${API}/api/pedidos/logistico`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosPedido),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al crear el pedido');
  }

  return await response.json(); // Retorna el PedidoResponseDTO
};

export const obtenerPedido = async(id, token) =>
{
  const response = await fetch(`${API}/api/pedidos/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al crear el pedido');
  }

  return await response.json();
}

export const fetchHistorialPedido = async (pedidoId, filtros, token) => {

  const params = new URLSearchParams();

  params.append('page', String(filtros.page ?? 0));
  params.append('size', String(filtros.limite ?? 10));
  if (filtros.sort) {
    params.append('sort', filtros.sort);
  } else {
    params.append('sort', 'fechaHora,desc');
  }

  if (filtros.tipoEvento) params.append('tipoEvento', filtros.tipoEvento);
  if (filtros.estado && filtros.estado !== 'Todos') params.append('estado', filtros.estado);
  if (filtros.fechaDesde) params.append('fechaDesde', filtros.fechaDesde);
  if (filtros.fechaHasta) params.append('fechaHasta', filtros.fechaHasta);
  if (filtros.observacion) params.append('observacion', filtros.observacion);

  const url = `${API}/api/pedidos/${pedidoId}/historial?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al cargar historial');
  }

  return await response.json(); // { content, totalPages, totalElements, ... }
};

// Actualización completa del pedido (PUT)
export const actualizarPedido = async (id, datos, token) => {
  const response = await fetch(`${API}/api/pedidos/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al actualizar el pedido');
  }
  return await response.json();
};

// Cambiar solo el estado (PATCH con query param)
export const cambiarEstadoPedido = async (id, nuevoEstado, token) => {
  const response = await fetch(`${API}/api/pedidos/${id}/estado?nuevoEstado=${encodeURIComponent(nuevoEstado)}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al cambiar el estado');
  }
  return await response.json();
};

// Asignar repartidor (PATCH con query param)
export const asignarRepartidorPedido = async (id, repartidorId, token) => {
  const response = await fetch(`${API}/api/pedidos/${id}/asignar?repartidorId=${repartidorId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al asignar repartidor');
  }
  return await response.json();
};

// orgServicios.js (añade esto después de fetchPedidos)
import { repartidoresMock } from '../../../data/repartidoresMock'; // Asegúrate de la ruta correcta

export async function fetchRepartidor(params) {
  const {
    nombre,
    id,
    capacidadLower,
    capacidadUpper,
    disponibilidad,
    limite,
  } = params;

  let resultado = [...repartidoresMock];

  // 1. Límite (simula que el backend ya devuelve recortado)
  if (limite !== undefined && limite !== null) {
    resultado = resultado.slice(0, limite);
  }

  // 2. Filtros
  if (nombre) {
    resultado = resultado.filter(r =>
      r.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (id) {
    resultado = resultado.filter(r => r.id === id);
  }

  if (disponibilidad && disponibilidad !== 'Todos') {
    resultado = resultado.filter(r =>
      r.disponibilidad?.toLowerCase() === disponibilidad.toLowerCase()
    );
  }

  // Filtro por capacidad (cota inferior y superior)
  const lower = parseInt(capacidadLower, 10);
  const upper = parseInt(capacidadUpper, 10);
  if (!isNaN(lower)) {
    resultado = resultado.filter(r => r.capacidad >= lower);
  }
  if (!isNaN(upper)) {
    resultado = resultado.filter(r => r.capacidad <= upper);
  }

  // 3. (Opcional) Ordenamiento – puedes añadir aquí un parámetro `orden` si quieres
  // resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return resultado;
}

