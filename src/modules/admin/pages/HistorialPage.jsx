import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getHistorialPedido } from '../../../services/adminService';
import styles from './HistorialPage.module.css';

const tipoColors = {
  CREADO:                { bg: '#dbeafe', color: '#1d4ed8', icon: '📝' },
  ASIGNADO:              { bg: '#e0f2fe', color: '#0369a1', icon: '👤' },
  ESTADO_CAMBIADO:       { bg: '#fef3c7', color: '#d97706', icon: '🔄' },
  ENTREGADO:             { bg: '#dcfce7', color: '#16a34a', icon: '✅' },
  CANCELADO:             { bg: '#fee2e2', color: '#dc2626', icon: '❌' },
  ACTUALIZADO:           { bg: '#f3e8ff', color: '#7c3aed', icon: '✏️' },
  UBICACION_ACTUALIZADA: { bg: '#ecfdf5', color: '#059669', icon: '📍' },
};

export default function HistorialPage() {
  const { token } = useAuth();
  const [historial, setHistorial] = useState([]);
  const [filtroPedido, setFiltroPedido] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buscado, setBuscado] = useState(false);

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!filtroPedido.trim()) return;
    setLoading(true);
    setError(null);
    setBuscado(true);
    try {
      const data = await getHistorialPedido(filtroPedido.trim(), token);
      setHistorial(data.content || data || []);
    } catch {
      setError('No se encontró historial para ese pedido o no tienes acceso.');
      setHistorial([]);
    } finally {
      setLoading(false);
    }
  };

  const sortedHistorial = [...historial].sort(
    (a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Historial de Actividad</h1>
          <p className={styles.subtitle}>Registro de eventos por pedido</p>
        </div>
      </div>

      <div className={styles.filters}>
        <form onSubmit={handleBuscar} className={styles.filterForm}>
          <div className={styles.filterGroup}>
            <label>ID de Pedido:</label>
            <input
              type="text"
              placeholder="Ej: 5"
              value={filtroPedido}
              onChange={(e) => setFiltroPedido(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button type="submit" className={styles.searchBtn} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
        {buscado && <span className={styles.count}>{sortedHistorial.length} eventos</span>}
      </div>

      {error && (
        <div className={styles.errorBox}>
          <span>{error}</span>
        </div>
      )}

      {!buscado && !error && (
        <p className={styles.hintText}>
          Ingresa el ID de un pedido para ver su historial.
        </p>
      )}

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
                  <span className={styles.eventType} style={{ backgroundColor: config.bg, color: config.color }}>
                    {evento.tipoEvento}
                  </span>
                  <span className={styles.eventTime}>
                    {new Date(evento.fechaHora).toLocaleString('es-CO')}
                  </span>
                </div>
                {evento.observacion && <p className={styles.eventObs}>{evento.observacion}</p>}
                <span className={styles.eventPedido}>Pedido #{evento.pedidoId ?? filtroPedido}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
