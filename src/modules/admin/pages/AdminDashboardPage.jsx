import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getPedidosAdmin, getUsuariosAdmin } from '../../../services/adminService';
import styles from './AdminDashboardPage.module.css';

export default function AdminDashboardPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    Promise.all([getPedidosAdmin(token), getUsuariosAdmin(token)])
      .then(([pedidosData, usuariosData]) => {
        setPedidos(pedidosData.content || []);
        setUsuarios(usuariosData || []);
      })
      .catch(() => setError('Error al cargar datos'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <div className={styles.loading}>Cargando dashboard...</div>;
  }

  if (error) {
    return <div style={{ color: '#ef4444', padding: '1rem' }}>{error}</div>;
  }

  const totalUsuarios = usuarios.length;
  const totalPedidos = pedidos.length;
  const pedidosActivos = pedidos.filter(p => p.estado === 'EN_TRANSITO' || p.estado === 'ASIGNADO').length;
  const pedidosCancelados = pedidos.filter(p => p.estado === 'CANCELADO').length;
  const pedidosPendientes = pedidos.filter(p => p.estado === 'PENDIENTE').length;
  const pedidosEntregados = pedidos.filter(p => p.estado === 'ENTREGADO').length;

  const kpis = [
    { label: 'Total Usuarios', value: totalUsuarios, icon: '👥', color: '#3b82f6' },
    { label: 'Total Pedidos', value: totalPedidos, icon: '📦', color: '#8b5cf6' },
    { label: 'Pendientes', value: pedidosPendientes, icon: '⏳', color: '#f59e0b' },
    { label: 'Activos', value: pedidosActivos, icon: '🚚', color: '#06b6d4' },
    { label: 'Entregados', value: pedidosEntregados, icon: '✅', color: '#10b981' },
    { label: 'Cancelados', value: pedidosCancelados, icon: '❌', color: '#ef4444' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Administrativo</h1>
        <p className={styles.subtitle}>Resumen global del sistema</p>
      </div>

      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard} style={{ '--accent-color': kpi.color }}>
            <div className={styles.kpiIcon}>{kpi.icon}</div>
            <div className={styles.kpiContent}>
              <span className={styles.kpiValue}>{kpi.value}</span>
              <span className={styles.kpiLabel}>{kpi.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Pedidos Recientes</h2>
        <div className={styles.activityList}>
          {pedidos.slice(0, 5).map((pedido) => (
            <div key={pedido.id} className={styles.activityItem}>
              <div className={styles.activityDot}></div>
              <div className={styles.activityContent}>
                <div className={styles.activityHeader}>
                  <span className={styles.activityType}>{pedido.estado}</span>
                  <span className={styles.activityTime}>
                    {pedido.fechaCreacion && new Date(pedido.fechaCreacion).toLocaleString('es-CO')}
                  </span>
                </div>
                <p className={styles.activityObs}>{pedido.origen} → {pedido.destino}</p>
                <span className={styles.activityPedido}>Pedido #{pedido.id} — {pedido.clienteNombre || 'Sin cliente'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}