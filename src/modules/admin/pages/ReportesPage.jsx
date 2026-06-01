import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getReportes } from '../../../services/adminService';
import styles from './ReportesPage.module.css';

const estadoColors = {
  PENDIENTE:   '#f59e0b',
  ASIGNADO:    '#3b82f6',
  EN_TRANSITO: '#06b6d4',
  ENTREGADO:   '#10b981',
  CANCELADO:   '#ef4444',
};

const estadoLabels = {
  PENDIENTE: 'Pendientes',
  ASIGNADO: 'Asignados',
  EN_TRANSITO: 'En Tránsito',
  ENTREGADO: 'Entregados',
  CANCELADO: 'Cancelados',
};

export default function ReportesPage() {
  const { token } = useAuth();
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarReportes = () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    getReportes(token)
      .then(setReporte)
      .catch(() => setError('Error al cargar reportes'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarReportes();
  }, [token]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Centro de Reportes</h1>
        <p className={styles.subtitle}>Estadísticas del sistema en tiempo real</p>
      </div>

      {loading && <p>Cargando reportes...</p>}

      {error && (
        <div className={styles.errorBox}>
          <span>{error}</span>
          <button onClick={cargarReportes} className={styles.retryBtn}>Reintentar</button>
        </div>
      )}

      {reporte && (
        <>
          <div className={styles.totalCard}>
            <div className={styles.reportCard}>
              <div className={styles.reportIcon}>📦</div>
              <h3 className={styles.reportTitle}>Total de Pedidos</h3>
              <p className={styles.reportValue}>{reporte.totalPedidos}</p>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Pedidos por Estado</h2>
          <div className={styles.reportsGrid}>
            {Object.entries(reporte.porEstado ?? {}).map(([estado, cantidad]) => (
              <div key={estado} className={styles.reportCard}>
                <div className={styles.reportIcon} style={{ backgroundColor: `${estadoColors[estado] ?? '#64748b'}20` }}>
                  📊
                </div>
                <h3 className={styles.reportTitle}>{estadoLabels[estado] || estado}</h3>
                <p className={styles.reportValue} style={{ color: estadoColors[estado] ?? '#64748b' }}>
                  {cantidad}
                </p>
                <p className={styles.reportDesc}>
                  {reporte.totalPedidos > 0
                    ? `${((cantidad / reporte.totalPedidos) * 100).toFixed(1)}% del total`
                    : '—'}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
