export class PedidoClienteModel { // Creacion de tabla reutilizable

    constructor(data) { // Se va a tener una informacion directa del pedido
        this.id = data.id // Guarda el id recibido
        this.estado = data.estado 
        this.fecha = data.fecha
        this.total = data.total
    }
}