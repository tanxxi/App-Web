import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getPedidosRepartidor } from '../services/repartidorServices';
import TrackingComponent from '../components/TrackingComponent';
import EstadoSelector from '../components/EstadoSelector';
import styles from './DashboardRepartidor.module.css';

function DashboardRepartidor() {
  const { user, token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id && token) cargarPedidos();
  }, [user, token]);

  const cargarPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPedidosRepartidor(user.id, token);
      setPedidos(data);
    } catch (err) {
      setError('No se pudieron cargar los pedidos. Intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEstadoActualizado = () => {
    cargarPedidos();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Panel de Repartidor</h1>

      <div className={styles.card} style={{ marginBottom: '1rem', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{user?.nombre}</h3>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user?.email}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pedidos activos</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
            {pedidos.filter(p => p.estado !== 'ENTREGADO' && p.estado !== 'CANCELADO').length}
          </div>
        </div>
      </div>

      <div className={styles.trackingSection}>
        <TrackingComponent pedidos={pedidos} token={token} />
      </div>

      <section className={styles.pedidosSection}>
        <h2>Mis Pedidos Asignados</h2>
        {loading ? (
          <div className={styles.loader}>Cargando pedidos...</div>
        ) : error ? (
          <p style={{ color: '#ef4444' }}>{error}</p>
        ) : pedidos.length === 0 ? (
          <p className={styles.emptyState}>No tienes pedidos asignados en este momento.</p>
        ) : (
          <div className={styles.grid}>
            {pedidos.map(pedido => (
              <div key={pedido.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.pedidoId}>Pedido #{pedido.id}</span>
                  <span className={`${styles.badge} ${styles[pedido.estado]}`}>
                    {pedido.estado}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <p><strong>Cliente:</strong> {pedido.clienteNombre}</p>
                  <p><strong>Origen:</strong> {pedido.origen}</p>
                  <p><strong>Destino:</strong> {pedido.destino}</p>
                  {pedido.descripcion && <p><strong>Descripción:</strong> {pedido.descripcion}</p>}
                </div>
                <div className={styles.cardFooter}>
                  <EstadoSelector
                    pedido={pedido}
                    onUpdate={handleEstadoActualizado}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardRepartidor;
