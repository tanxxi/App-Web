import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getPedidosRepartidor } from '../services/repartidorServices';
import TrackingComponent from '../components/TrackingComponent';
import EstadoSelector from '../components/EstadoSelector';
// import styles from './DashboardRepartidor.alt.module.css';
import styles from './DashboardRepartidor.module.css';

function DashboardRepartidor() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPedidos();
  }, [user]);

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
