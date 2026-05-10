import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getPedidosRepartidor } from '../services/repartidorServices';
import TrackingComponent from '../components/TrackingComponent';
import EstadoSelector from '../components/EstadoSelector';
import { getRepartidores } from '../../../mock/repartidoresMock';
// import styles from './DashboardRepartidor.alt.module.css';
import styles from './DashboardRepartidor.module.css';

function DashboardRepartidor() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [repartidorInfo, setRepartidorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPedidos();
    cargarInfoRepartidor();
  }, [user]);

  const cargarInfoRepartidor = async () => {
    try {
      const data = await getRepartidores();
      const info = data.find(r => r.id === user?.id);
      if (info) setRepartidorInfo(info);
    } catch (error) {
      console.error("Error cargando info del repartidor:", error);
    }
  };

  const cargarPedidos = async () => {
    setLoading(true);
    try {
      const data = await getPedidosRepartidor(user?.id);
      setPedidos(data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEstadoActualizado = () => {
    cargarPedidos(); // Recargar pedidos al actualizar el estado
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Panel de Repartidor</h1>
      
      {repartidorInfo && (
        <div className={styles.card} style={{ marginBottom: '1rem', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{repartidorInfo.nombre}</h3>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{repartidorInfo.vehiculo}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Capacidad</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)' }}>{repartidorInfo.capacidad}</div>
          </div>
        </div>
      )}

      <div className={styles.trackingSection}>
        <TrackingComponent repartidorId={user?.id} />
      </div>

      <section className={styles.pedidosSection}>
          <h2>Mis Pedidos Asignados</h2>
          {loading ? (
            <div className={styles.loader}>Cargando pedidos...</div>
          ) : pedidos.length === 0 ? (
            <p className={styles.emptyState}>No tienes pedidos asignados en este momento.</p>
          ) : (
            <div className={styles.grid}>
              {pedidos.map(pedido => (
                <div key={pedido.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.pedidoId}>Pedido #{pedido.id}</span>
                    <span className={`${styles.badge} ${styles[pedido.estado.replace(' ', '')]}`}>
                      {pedido.estado}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <p><strong>Cliente:</strong> {pedido.cliente}</p>
                    <p><strong>Dirección:</strong> {pedido.direccion}</p>
                    <p className={styles.price}>${pedido.total.toLocaleString()}</p>
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
