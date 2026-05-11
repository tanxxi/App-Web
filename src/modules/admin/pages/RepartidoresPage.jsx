import { useState } from 'react';
import { repartidoresMock } from '../../../mock/repartidoresMock';
import styles from './RepartidoresPage.module.css';

const estadoColors = {
  Disponible: { bg: '#dcfce7', color: '#16a34a' },
  Ocupado: { bg: '#fef3c7', color: '#d97706' },
  Inactivo: { bg: '#fee2e2', color: '#dc2626' },
};

export default function RepartidoresPage() {
  const [repartidores] = useState(repartidoresMock);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroNombre, setFiltroNombre] = useState('');

  const estados = ['todos', 'Disponible', 'Ocupado', 'Inactivo'];

  const handleVerDetalle = (id) => {
    alert(`Ver detalle del repartidor #${id} (simulado)`);
  };

  const handleEditar = (id) => {
    alert(`Editar repartidor #${id} (simulado)`);
  };

  const filteredRepartidores = repartidores.filter((r) => {
    const matchEstado = filtroEstado === 'todos' || r.estado === filtroEstado;
    const matchNombre = r.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    return matchEstado && matchNombre;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Repartidores</h1>
          <p className={styles.subtitle}>Administra los repartidores del sistema</p>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Estado:</label>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            {estados.map((e) => (
              <option key={e} value={e}>{e === 'todos' ? 'Todos' : e}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Buscar:</label>
          <input
            type="text"
            placeholder="Nombre..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <span className={styles.count}>{filteredRepartidores.length} repartidores</span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Vehículo</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Pedidos Activos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepartidores.map((rep) => {
              const colors = estadoColors[rep.estado] || { bg: '#f1f5f9', color: '#64748b' };
              return (
                <tr key={rep.id}>
                  <td className={styles.idCell}>#{rep.id}</td>
                  <td>{rep.nombre}</td>
                  <td>{rep.email}</td>
                  <td>{rep.telefono}</td>
                  <td>{rep.vehiculo}</td>
                  <td>{rep.capacidad}</td>
                  <td>
                    <span
                      className={styles.estadoBadge}
                      style={{ backgroundColor: colors.bg, color: colors.color }}
                    >
                      {rep.estado}
                    </span>
                  </td>
                  <td>
                    <span className={styles.pedidosBadge}>{rep.pedidosActivos}</span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button onClick={() => handleVerDetalle(rep.id)} className={styles.actionBtn} title="Ver detalle">
                        👁️
                      </button>
                      <button onClick={() => handleEditar(rep.id)} className={styles.actionBtn} title="Editar">
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}