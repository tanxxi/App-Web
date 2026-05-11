import { useState } from 'react';
import { MOCK_CREDENTIALS } from '../../../mock/credentialsMock';
import styles from './UsuariosPage.module.css';

const getRolBadgeClass = (rol) => {
  switch (rol) {
    case 'Administrador': return styles.badgeAdmin;
    case 'OperadorLogistico': return styles.badgeOperador;
    case 'Repartidor': return styles.badgeRepartidor;
    case 'Cliente': return styles.badgeCliente;
    default: return styles.badgeDefault;
  }
};

const getRolLabel = (rol) => {
  switch (rol) {
    case 'Administrador': return 'Administrador';
    case 'OperadorLogistico': return 'Op. Logística';
    case 'Repartidor': return 'Repartidor';
    case 'Cliente': return 'Cliente';
    default: return rol;
  }
};

export default function UsuariosPage() {
  const [usuarios] = useState(MOCK_CREDENTIALS);
  const [filtroRol, setFiltroRol] = useState('todos');

  const handleCrear = () => {
    alert('Crear usuario - Funcionalidad en desarrollo');
  };

  const handleEditar = (id) => {
    alert(`Editar usuario #${id} - Funcionalidad en desarrollo`);
  };

  const handleEliminar = (id) => {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      alert(`Usuario #${id} eliminado (simulado)`);
    }
  };

  const toggleEstado = (id) => {
    alert(`Cambiar estado del usuario #${id} (simulado)`);
  };

  const filteredUsuarios = usuarios.filter((u) => {
    const matchRol = filtroRol === 'todos' || u.rol === filtroRol;
    return matchRol;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Usuarios</h1>
          <p className={styles.subtitle}>Administra los usuarios del sistema</p>
        </div>
        <button onClick={handleCrear} className={styles.createBtn}>
          + Crear Usuario
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Filtrar por Rol:</label>
          <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="Administrador">Administrador</option>
            <option value="OperadorLogistico">Operador Logístico</option>
            <option value="Repartidor">Repartidor</option>
            <option value="Cliente">Cliente</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <span className={`${styles.badge} ${getRolBadgeClass(usuario.rol)}`}>
                    {getRolLabel(usuario.rol)}
                  </span>
                </td>
                <td>
                  <span className={styles.estadoActivo}>Activo</span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button onClick={() => handleEditar(usuario.id)} className={styles.actionBtn} title="Editar">
                      ✏️
                    </button>
                    <button onClick={() => toggleEstado(usuario.id)} className={styles.actionBtn} title="Activar/Desactivar">
                      🔄
                    </button>
                    <button onClick={() => handleEliminar(usuario.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Eliminar">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}