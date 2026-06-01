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

export default function ReportesPage() {
  const { token } = useAuth();
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    getReportes(token)
      .then(setReporte)
      .catch(() => setError('Error al cargar reportes'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Centro de Reportes</h1>
        <p className={styles.subtitle}>Estadísticas del sistema en tiempo real</p>
      </div>

      {loading && <p>Cargando reportes...</p>}
      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      {reporte && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <div className={styles.reportCard} style={{ maxWidth: 300 }}>
              <div className={styles.reportIcon} style={{ '--report-color': '#8b5cf6' }}>📦</div>
              <h3 className={styles.reportTitle}>Total de Pedidos</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>{reporte.totalPedidos}</p>
            </div>
          </div>

          <h2 style={{ marginBottom: '1rem' }}>Pedidos por Estado</h2>
          <div className={styles.reportsGrid}>
            {Object.entries(reporte.porEstado ?? {}).map(([estado, cantidad]) => (
              <div key={estado} className={styles.reportCard}>
                <div className={styles.reportIcon} style={{ '--report-color': estadoColors[estado] ?? '#64748b' }}>
                  📊
                </div>
                <h3 className={styles.reportTitle}>{estado}</h3>
                <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: estadoColors[estado] ?? '#64748b' }}>
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
