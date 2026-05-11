import { useState } from 'react';
import { historialMock } from '../../../mock/historialMock';
import styles from './HistorialPage.module.css';

const tipoColors = {
  Creación: { bg: '#dbeafe', color: '#1d4ed8', icon: '📝' },
  Asignación: { bg: '#e0f2fe', color: '#0369a1', icon: '👤' },
  'Cambio de Estado': { bg: '#fef3c7', color: '#d97706', icon: '🔄' },
  Entrega: { bg: '#dcfce7', color: '#16a34a', icon: '✅' },
  Cancelación: { bg: '#fee2e2', color: '#dc2626', icon: '❌' },
};

export default function HistorialPage() {
  const [historial] = useState(historialMock);
  const [filtroPedido, setFiltroPedido] = useState('');

  const handleFiltrar = (e) => {
    e.preventDefault();
    // El filtrado se hace en tiempo real
  };

  const filteredHistorial = historial.filter((h) => {
    if (!filtroPedido) return true;
    return h.pedidoId.toString().includes(filtroPedido);
  });

  const sortedHistorial = [...filteredHistorial].sort(
    (a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Historial de Actividad</h1>
          <p className={styles.subtitle}>Registro de eventos y auditoria del sistema</p>
        </div>
      </div>

      <div className={styles.filters}>
        <form onSubmit={handleFiltrar} className={styles.filterForm}>
          <div className={styles.filterGroup}>
            <label>Filtrar por ID de Pedido:</label>
            <input
              type="text"
              placeholder="Ej: 103"
              value={filtroPedido}
              onChange={(e) => setFiltroPedido(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </form>
        <span className={styles.count}>{sortedHistorial.length} eventos</span>
      </div>

      <div className={styles.timeline}>
        {sortedHistorial.map((evento) => {
          const config = tipoColors[evento.tipoEvento] || { bg: '#f1f5f9', color: '#64748b', icon: '📋' };
          return (
            <div key={evento.id} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <div className={styles.timelineDot} style={{ backgroundColor: config.color }}>
                  <span className={styles.timelineIcon}>{config.icon}</span>
                </div>
                <div className={styles.timelineLine}></div>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.eventHeader}>
                  <span
                    className={styles.eventType}
                    style={{ backgroundColor: config.bg, color: config.color }}
                  >
                    {evento.tipoEvento}
                  </span>
                  <span className={styles.eventTime}>
                    {new Date(evento.fechaHora).toLocaleString('es-CO')}
                  </span>
                </div>
                <p className={styles.eventObs}>{evento.observacion}</p>
                <span className={styles.eventPedido}>Pedido #{evento.pedidoId}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}