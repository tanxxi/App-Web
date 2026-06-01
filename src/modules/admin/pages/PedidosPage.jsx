import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getPedidosAdmin } from '../../../services/adminService';
import styles from './PedidosPage.module.css';

const estadoColors = {
  PENDIENTE: { bg: '#fef3c7', color: '#d97706' },
  ASIGNADO: { bg: '#dbeafe', color: '#1d4ed8' },
  EN_TRANSITO: { bg: '#e0f2fe', color: '#0369a1' },
  ENTREGADO: { bg: '#dcfce7', color: '#16a34a' },
  CANCELADO: { bg: '#fee2e2', color: '#dc2626' },
};

export default function PedidosPage() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    getPedidosAdmin(token)
      .then(data => setPedidos(data.content || []))
      .catch(() => setError('Error al cargar pedidos'))
      .finally(() => setLoading(false));
  }, [token]);
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const estados = ['todos', 'Pendiente', 'Asignado', 'EnTransito', 'Entregado', 'Cancelado'];

  const handleVerDetalle = (id) => {
    alert(`Ver detalle del pedido #${id} (simulado)`);
  };

  const handleEditar = (id) => {
    alert(`Editar pedido #${id} (simulado)`);
  };

  const filteredPedidos = pedidos.filter((p) => {
    return filtroEstado === 'todos' || p.estado === filtroEstado;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Pedidos</h1>
          <p className={styles.subtitle}>Administra todos los pedidos del sistema</p>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Filtrar por Estado:</label>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            {estados.map((e) => (
              <option key={e} value={e}>
                {e === 'todos' ? 'Todos los estados' : e}
              </option>
            ))}
          </select>
        </div>
        <span className={styles.count}>{filteredPedidos.length} pedidos</span>
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
            {filteredPedidos.map((pedido) => {
              const colors = estadoColors[pedido.estado] || { bg: '#f1f5f9', color: '#64748b' };
              return (
                <tr key={pedido.id}>
                  <td className={styles.idCell}>#{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.origen}</td>
                  <td>{pedido.destino}</td>
                  <td>
                    <span
                      className={styles.estadoBadge}
                      style={{ backgroundColor: colors.bg, color: colors.color }}
                    >
                      {pedido.estado}
                    </span>
                  </td>
                  <td>{pedido.repartidor || '—'}</td>
                  <td>{pedido.fecha}</td>
                  <td>
                    <div className={styles.actions}>
                      <button onClick={() => handleVerDetalle(pedido.id)} className={styles.actionBtn} title="Ver detalle">
                        👁️
                      </button>
                      <button onClick={() => handleEditar(pedido.id)} className={styles.actionBtn} title="Editar">
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}