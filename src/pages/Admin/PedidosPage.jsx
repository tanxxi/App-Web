import { useState } from 'react';
import { pedidosMock } from '../../data/pedidosMock';
import styles from './PedidosPage.module.css';

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState(pedidosMock);
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const pedidosFiltrados = filtroEstado === 'Todos' 
    ? pedidos 
    : pedidos.filter(p => p.estado === filtroEstado);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Pedidos</h1>
        <button className={styles.btnPrimary}>+ Crear Pedido</button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Filtrar por Estado:</label>
          <select 
            value={filtroEstado} 
            onChange={(e) => setFiltroEstado(e.target.value)}
            className={styles.select}
          >
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Asignado">Asignado</option>
            <option value="EnTransito">En Tránsito</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Estado</th>
              <th>Repartidor</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map(pedido => (
              <tr key={pedido.id}>
                <td>#{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.origen}</td>
                <td>{pedido.destino}</td>
                <td>
                  <span className={`${styles.badge} ${styles[pedido.estado]}`}>
                    {pedido.estado}
                  </span>
                </td>
                <td>{pedido.repartidor || <span className={styles.unassigned}>Sin asignar</span>}</td>
                <td>{pedido.fecha}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.btnIcon} title="Ver detalle">👁️</button>
                    <button className={styles.btnIcon} title="Editar">✏️</button>
                    <button className={styles.btnIcon} title="Asignar repartidor">🚚</button>
                  </div>
                </td>
              </tr>
            ))}
            {pedidosFiltrados.length === 0 && (
              <tr>
                <td colSpan="8" className={styles.emptyState}>No se encontraron pedidos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
