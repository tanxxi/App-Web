// simulacion
export const repartidoresMock = [
  { id: 3, nombre: "Carlos Ruiz", email: "repartidor@test.com", telefono: "3001234567", vehiculo: "Moto (ABC-123)", estado: "Ocupado", capacidad: "50%", pedidosActivos: 1 },
  { id: 5, nombre: "Ana López", email: "ana.lopez@test.com", telefono: "3007654321", vehiculo: "Camioneta (XYZ-987)", estado: "Ocupado", capacidad: "100%", pedidosActivos: 1 },
  { id: 6, nombre: "Miguel Sánchez", email: "miguel.s@test.com", telefono: "3101112233", vehiculo: "Bicicleta", estado: "Disponible", capacidad: "0%", pedidosActivos: 0 },
  { id: 7, nombre: "Laura Vargas", email: "laura.v@test.com", telefono: "3204445566", vehiculo: "Moto (DEF-456)", estado: "Disponible", capacidad: "0%", pedidosActivos: 0 },
];

export const getRepartidores = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...repartidoresMock]);
    }, 800);
  });
};

