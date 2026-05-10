import { pedidosMock } from '../../../mock/pedidosMock';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const getPedidosRepartidor = async (repartidorId) => {
  await delay(800); // simula delay de red
  return pedidosMock.filter(p => p.repartidorId === repartidorId);
};

export const actualizarEstadoPedido = async (pedidoId, nuevoEstado) => {
  await delay(600);
  // Validar flujo de estados lógicamente
  const pedido = pedidosMock.find(p => p.id === pedidoId);
  if (!pedido) throw new Error("Pedido no encontrado");
  
  // Pendiente -> Asignado -> EnTransito -> Entregado
  const estados = ['Pendiente', 'Asignado', 'EnTransito', 'Entregado'];
  const currentIndex = estados.indexOf(pedido.estado);
  const newIndex = estados.indexOf(nuevoEstado);

  if (newIndex <= currentIndex) {
      throw new Error("Transición de estado inválida.");
  }
  
  pedido.estado = nuevoEstado;
  return { success: true, pedido };
};

export const actualizarUbicacion = async (repartidorId, lat, lng, direccion) => {
  // Simulamos que enviamos la ubicación
  console.log(`[Mock API] Ubicación actualizada - Repartidor: ${repartidorId} | Lat: ${lat}, Lng: ${lng} | Dir: ${direccion}`);
  return { success: true };
};
