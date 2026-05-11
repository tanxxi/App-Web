export class Pedido {
  constructor({ id, cliente, origen, destino, direccion, estado, repartidor, fecha, total, lat, lng }) {
    this.id = id;
    this.cliente = cliente || '';
    this.origen = origen || '';
    this.destino = destino || '';
    this.direccion = direccion || '';
    this.estado = estado || 'Pendiente';
    this.repartidor = repartidor || null;
    this.fecha = fecha || new Date().toISOString();
    this.total = total || 0;
    this.lat = lat || null;
    this.lng = lng || null;
  }
}
