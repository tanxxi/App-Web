import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getLogs } from '../../../services/adminService';
import styles from './LogsPage.module.css';

const tipoColors = {
  INFO:  { bg: '#dbeafe', color: '#1d4ed8' },
  WARN:  { bg: '#fef3c7', color: '#d97706' },
  ERROR: { bg: '#fee2e2', color: '#dc2626' },
};

const tipos = ['todos', 'INFO', 'WARN', 'ERROR'];

export default function LogsPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    getLogs(token)
      .then(setLogs)
      .catch(() => setError('Error al cargar logs'))
      .finally(() => setLoading(false));
  }, [token]);

  const filteredLogs = logs.filter(
    (log) => filtroTipo === 'todos' || log.tipo === filtroTipo
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Logs del Sistema</h1>
        <p className={styles.subtitle}>Registro de eventos y actividad del sistema</p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Tipo de Evento:</label>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            {tipos.map((t) => (
              <option key={t} value={t}>{t === 'todos' ? 'Todos' : t}</option>
            ))}
          </select>
        </div>
        <span className={styles.count}>{filteredLogs.length} entradas</span>
      </div>

      {loading ? (
        <p>Cargando logs...</p>
      ) : error ? (
        <p style={{ color: '#ef4444' }}>{error}</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Tipo</th>
                <th>Usuario ID</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const colors = tipoColors[log.tipo] || { bg: '#f1f5f9', color: '#64748b' };
                return (
                  <tr key={log.id}>
                    <td className={styles.timestamp}>
                      {new Date(log.timestamp).toLocaleString('es-CO')}
                    </td>
                    <td>
                      <span className={styles.tipoBadge} style={{ backgroundColor: colors.bg, color: colors.color }}>
                        {log.tipo}
                      </span>
                    </td>
                    <td>{log.usuarioId || '—'}</td>
                    <td className={styles.descripcion}>{log.descripcion}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
