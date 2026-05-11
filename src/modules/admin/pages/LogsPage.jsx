import { useState } from 'react';
import styles from './LogsPage.module.css';

const logsMock = [
  { id: 1, timestamp: '2026-05-10 08:30:15', tipo: 'INFO', usuario: 'Admin General', descripcion: 'Inicio de sesión exitoso' },
  { id: 2, timestamp: '2026-05-10 08:25:00', tipo: 'INFO', usuario: 'Juan Operador', descripcion: 'Actualización de pedido #103' },
  { id: 3, timestamp: '2026-05-10 08:20:00', tipo: 'WARN', usuario: 'Sistema', descripcion: 'Intento de acceso con credenciales inválidas' },
  { id: 4, timestamp: '2026-05-10 07:45:32', tipo: 'INFO', usuario: 'Carlos Ruiz', descripcion: 'Cambio de estado de pedido a EnTransito' },
  { id: 5, timestamp: '2026-05-10 07:30:00', tipo: 'ERROR', usuario: 'Sistema', descripcion: 'Fallo en conexión a base de datos auxiliar' },
  { id: 6, timestamp: '2026-05-09 22:15:00', tipo: 'WARN', usuario: 'Unknown', descripcion: 'Intento de acceso fallido desde IP desconocida' },
  { id: 7, timestamp: '2026-05-09 18:30:45', tipo: 'INFO', usuario: 'Maria Cliente', descripcion: 'Creación de nuevo pedido' },
  { id: 8, timestamp: '2026-05-09 16:00:00', tipo: 'INFO', usuario: 'Admin General', descripcion: 'Exportación de reporte de pedidos' },
  { id: 9, timestamp: '2026-05-09 14:30:00', tipo: 'INFO', usuario: 'Sistema', descripcion: 'Respaldo automático completado' },
  { id: 10, timestamp: '2026-05-09 12:00:00', tipo: 'WARN', usuario: 'Sistema', descripcion: 'Uso alto de memoria detectado' },
];

const tipoColors = {
  INFO: { bg: '#dbeafe', color: '#1d4ed8' },
  WARN: { bg: '#fef3c7', color: '#d97706' },
  ERROR: { bg: '#fee2e2', color: '#dc2626' },
};

export default function LogsPage() {
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const tipos = ['todos', 'INFO', 'WARN', 'ERROR'];

  const filteredLogs = logsMock.filter((log) => {
    return filtroTipo === 'todos' || log.tipo === filtroTipo;
  });

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
              <option key={t} value={t}>
                {t === 'todos' ? 'Todos' : t}
              </option>
            ))}
          </select>
        </div>
        <span className={styles.count}>{filteredLogs.length} entradas</span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Tipo</th>
              <th>Usuario</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => {
              const colors = tipoColors[log.tipo] || { bg: '#f1f5f9', color: '#64748b' };
              return (
                <tr key={log.id}>
                  <td className={styles.timestamp}>{log.timestamp}</td>
                  <td>
                    <span
                      className={styles.tipoBadge}
                      style={{ backgroundColor: colors.bg, color: colors.color }}
                    >
                      {log.tipo}
                    </span>
                  </td>
                  <td>{log.usuario}</td>
                  <td className={styles.descripcion}>{log.descripcion}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}