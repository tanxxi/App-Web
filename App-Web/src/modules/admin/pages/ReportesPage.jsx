import styles from './ReportesPage.module.css';

const reportes = [
  {
    id: 1,
    titulo: 'Reporte de Pedidos',
    descripcion: 'Resumen de pedidos por período, estados y métricas de entrega.',
    icono: '📦',
    color: '#3b82f6',
  },
  {
    id: 2,
    titulo: 'Reporte de Repartidores',
    descripcion: 'Rendimiento de repartidores, pedidos entregados y tiempos promedio.',
    icono: '🚚',
    color: '#10b981',
  },
  {
    id: 3,
    titulo: 'Reporte de Actividad',
    descripcion: 'Registro de eventos del sistema, accesos y cambios realizados.',
    icono: '📋',
    color: '#f59e0b',
  },
  {
    id: 4,
    titulo: 'Reporte de Seguridad',
    descripcion: 'Intentos de acceso, alertas de seguridad y auditoría de usuarios.',
    icono: '🛡️',
    color: '#8b5cf6',
  },
];

export default function ReportesPage() {
  const handleGenerar = (titulo) => {
    alert(`Generando ${titulo}...`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Centro de Reportes</h1>
        <p className={styles.subtitle}>Genera reportes y análisis del sistema</p>
      </div>

      <div className={styles.reportsGrid}>
        {reportes.map((reporte) => (
          <div key={reporte.id} className={styles.reportCard}>
            <div
              className={styles.reportIcon}
              style={{ '--report-color': reporte.color }}
            >
              {reporte.icono}
            </div>
            <h3 className={styles.reportTitle}>{reporte.titulo}</h3>
            <p className={styles.reportDesc}>{reporte.descripcion}</p>
            <button
              onClick={() => handleGenerar(reporte.titulo)}
              className={styles.generateBtn}
            >
              Generar Reporte
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}