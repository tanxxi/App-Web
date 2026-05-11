// simulacion
export const historialMock = [
  { id: 1, pedidoId: 103, fechaHora: "2026-05-06T10:00:00", tipoEvento: "Creación", observacion: "Pedido registrado en sistema" },
  { id: 2, pedidoId: 103, fechaHora: "2026-05-06T11:30:00", tipoEvento: "Asignación", observacion: "Asignado a Ana López" },
  { id: 3, pedidoId: 103, fechaHora: "2026-05-06T12:00:00", tipoEvento: "Cambio de Estado", observacion: "Pedido en tránsito" },
  { id: 4, pedidoId: 104, fechaHora: "2026-05-05T08:00:00", tipoEvento: "Creación", observacion: "Pedido registrado en sistema" },
  { id: 5, pedidoId: 104, fechaHora: "2026-05-05T15:00:00", tipoEvento: "Entrega", observacion: "Entregado con éxito" },
];

export const getHistorial = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...historialMock]);
    }, 600);
  });
};

