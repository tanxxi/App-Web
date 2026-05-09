import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
// Importas el mock o el servicio. Por ahora, el mock directo.
import {PEDIDOS_MOCK} from '../../mock/mockPedidos';

export default function DetallePedido()
{ 
    const { id } = useParams(); // 'id' vale 'P001'
    const [pedido, setPedido] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    // Busca el pedido en los mocks locales
    const encontrado = PEDIDOS_MOCK.find(p => p.id === id);
    setPedido(encontrado);
    }, [id]); // Se ejecuta cuando el ID cambia

    // ... luego en el JSX usas `pedido` con seguridad
    if (!pedido) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Pedido: {pedido.id}</h2>

            <p>Origen: {pedido.origen}</p>
            <p>Destino: {pedido.destino}</p>
            <p>Ubicación: {pedido.ubicacion}</p>
            <p>Estado: {pedido.estado}</p>
            <p>ID Repartidor: {pedido.repartidorId || "-"} </p>
            <p>Descripción: {pedido.descripcion} </p>

            <button onClick={() => navigate('/operador/pedidos')}> Exit </button>
        </div>
    );

}