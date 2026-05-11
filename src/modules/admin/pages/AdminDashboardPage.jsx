import { useEffect, useState } from 'react';
import { MOCK_CREDENTIALS } from '../../../mock/credentialsMock';
import { pedidosMock } from '../../../mock/pedidosMock';
import { historialMock } from '../../../mock/historialMock';
import { repartidoresMock } from '../../../mock/repartidoresMock';
import styles from './AdminDashboardPage.module.css';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando dashboard...</div>;
  }

  const totalUsuarios = MOCK_CREDENTIALS.length;
  const totalPedidos = pedidosMock.length;
  const pedidosActivos = pedidosMock.filter(p => p.estado === 'EnTransito' || p.estado === 'Asignado').length;
  const pedidosCancelados = pedidosMock.filter(p => p.estado === 'Cancelado').length;
  const repartidoresActivos = repartidoresMock.filter(r => r.estado === 'Ocupado').length;
  const operadoresActivos = MOCK_CREDENTIALS.filter(u => u.rol === 'OperadorLogistico' || u.rol === 'Administrador').length;

  const actividadReciente = [...historialMock]
    .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora))
    .slice(0, 5);

  const kpis = [
    { label: 'Total Usuarios', value: totalUsuarios, icon: '👥', color: '#3b82f6' },
    { label: 'Total Pedidos', value: totalPedidos, icon: '📦', color: '#8b5cf6' },
    { label: 'Pedidos Activos', value: pedidosActivos, icon: '🚚', color: '#f59e0b' },
    { label: 'Pedidos Cancelados', value: pedidosCancelados, icon: '❌', color: '#ef4444' },
    { label: 'Repartidores Activos', value: repartidoresActivos, icon: '🏍️', color: '#10b981' },
    { label: 'Operadores Activos', value: operadoresActivos, icon: '👨‍💼', color: '#06b6d4' },
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
        <h2 className={styles.sectionTitle}>Actividad Reciente</h2>
        <div className={styles.activityList}>
          {actividadReciente.map((evento) => (
            <div key={evento.id} className={styles.activityItem}>
              <div className={styles.activityDot}></div>
              <div className={styles.activityContent}>
                <div className={styles.activityHeader}>
                  <span className={styles.activityType}>{evento.tipoEvento}</span>
                  <span className={styles.activityTime}>
                    {new Date(evento.fechaHora).toLocaleString('es-CO')}
                  </span>
                </div>
                <p className={styles.activityObs}>{evento.observacion}</p>
                <span className={styles.activityPedido}>Pedido #{evento.pedidoId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}