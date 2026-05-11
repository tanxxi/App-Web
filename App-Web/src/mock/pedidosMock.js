// simulacion
export const pedidosMock = [
  { id: 101, cliente: "Juan Pérez", origen: "Centro de Distribución Norte", destino: "Av. Siempre Viva 123", direccion: "Av. Siempre Viva 123", estado: "Pendiente", repartidor: null, repartidorId: null, fecha: "2026-05-07", total: 45000, lat: 4.7110, lng: -74.0721 },
  { id: 102, cliente: "María Gómez", origen: "Bodega Sur", destino: "Calle Falsa 456", direccion: "Calle Falsa 456", estado: "Asignado", repartidor: "Carlos Ruiz", repartidorId: 3, fecha: "2026-05-07", total: 32000, lat: 4.6097, lng: -74.0817 },
  { id: 103, cliente: "Empresa XYZ", origen: "Puerto", destino: "Parque Industrial", direccion: "Parque Industrial", estado: "EnTransito", repartidor: "Ana López", repartidorId: 5, fecha: "2026-05-06", total: 55000, lat: 4.6500, lng: -74.1000 },
  { id: 104, cliente: "Luis Torres", origen: "Centro de Distribución Norte", destino: "Av. Libertad 88", direccion: "Av. Libertad 88", estado: "Entregado", repartidor: "Carlos Ruiz", repartidorId: 3, fecha: "2026-05-05", total: 28000, lat: 4.7110, lng: -74.0721 },
  { id: 105, cliente: "Carmen Díaz", origen: "Bodega Central", destino: "Plaza Mayor", direccion: "Plaza Mayor", estado: "Cancelado", repartidor: null, repartidorId: null, fecha: "2026-05-04", total: 15000, lat: 4.6097, lng: -74.0817 },
];

export const getPedidos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...pedidosMock]);
    }, 800);
  });
};

