export class Repartidor {
  constructor({ id, nombre, estado, capacidad, pedidosActivos }) {
    this.id = id;
    this.nombre = nombre || '';
    this.estado = estado || 'Inactivo';
    this.capacidad = capacidad || '0%';
    this.pedidosActivos = pedidosActivos || 0;
  }
}
