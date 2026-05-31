import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import * as userService from '../../../services/userService';
import { ROLES } from '../../../constants/roles';
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
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroRol, setFiltroRol] = useState('todos');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('crear'); // 'crear' | 'editar'
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  // Form State
  const [formState, setFormState] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: ''
  });
  const [errorForm, setErrorForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Deletion Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast notification
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const cargarUsuarios = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsuarios(token);
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudieron cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, [token]);

  const handleCrear = () => {
    setModalType('crear');
    setSelectedUsuario(null);
    setFormState({
      nombre: '',
      email: '',
      password: '',
      rol: ''
    });
    setErrorForm(null);
    setShowModal(true);
  };

  const handleEditar = (usuario) => {
    setModalType('editar');
    setSelectedUsuario(usuario);
    setFormState({
      nombre: usuario.nombre,
      email: usuario.email,
      password: '', // Vacío por defecto al editar
      rol: usuario.rol
    });
    setErrorForm(null);
    setShowModal(true);
  };

  const handleOpenDelete = (usuario) => {
    setUserToDelete(usuario);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      setDeleting(true);
      await userService.deleteUsuario(userToDelete.id, token);
      showNotification('Usuario eliminado con éxito');
      setShowDeleteModal(false);
      setUserToDelete(null);
      cargarUsuarios();
    } catch (err) {
      showNotification(`Error al eliminar: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorForm(null);

    // Validation
    if (!formState.nombre.trim() || !formState.email.trim() || !formState.rol) {
      setErrorForm('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (modalType === 'crear' && !formState.password) {
      setErrorForm('La contraseña es requerida para nuevos usuarios.');
      return;
    }

    try {
      setSubmitting(true);
      if (modalType === 'crear') {
        await userService.createUsuario(formState, token);
        showNotification('Usuario creado con éxito');
      } else {
        await userService.updateUsuario(selectedUsuario.id, formState, token);
        showNotification('Usuario actualizado con éxito');
      }
      setShowModal(false);
      cargarUsuarios();
    } catch (err) {
      setErrorForm(err.message || 'Error al procesar la solicitud');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsuarios = usuarios.filter((u) => {
    const matchRol = filtroRol === 'todos' || u.rol === filtroRol;
    return matchRol;
  });

  return (
    <div className={styles.page}>
      {/* Toast Notification */}
      {notification && (
        <div className={styles.toast}>
          <span className={styles.toastIcon}>✨</span>
          <span className={styles.toastText}>{notification}</span>
        </div>
      )}

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
            <option value={ROLES.ADMINISTRADOR}>Administrador</option>
            <option value={ROLES.OPERADOR_LOGISTICO}>Operador Logístico</option>
            <option value={ROLES.REPARTIDOR}>Repartidor</option>
            <option value={ROLES.CLIENTE}>Cliente</option>
          </select>
        </div>
      </div>

      {error && (
        <div className={styles.errorBox}>
          <span>⚠️ {error}</span>
          <button onClick={cargarUsuarios} className={styles.retryBtn}>Reintentar</button>
        </div>
      )}

      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p>Cargando usuarios...</p>
        </div>
      ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" className={styles.emptyRow}>
                      No se encontraron usuarios.
                    </td>
                  </tr>
                ) : (
                  filteredUsuarios.map((usuario) => (
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
                      <div className={styles.actions}>
                        <button onClick={() => handleEditar(usuario)} className={styles.actionBtn} title="Editar">
                          ✏️
                        </button>
                        <button onClick={() => handleOpenDelete(usuario)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Eliminar">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
      )}

      {/* Form Modal (Create / Edit) */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {modalType === 'crear' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
              </h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {errorForm && <div className={styles.formError}>⚠️ {errorForm}</div>}

              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre Completo*</label>
                <input
                  type="text"
                  id="nombre"
                  value={formState.nombre}
                  onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                  required
                  placeholder="Ej. Juan Pérez"
                  className={styles.input}
                  disabled={submitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email / Usuario*</label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  placeholder="juan.perez@test.com"
                  className={styles.input}
                  disabled={submitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">
                  Contraseña{modalType === 'editar' ? ' (Dejar en blanco para conservar)' : '*'}
                </label>
                <input
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                  placeholder={modalType === 'editar' ? 'Sin cambios' : '••••••••'}
                  required={modalType === 'crear'}
                  className={styles.input}
                  disabled={submitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rol">Rol*</label>
                <select
                  id="rol"
                  value={formState.rol}
                  onChange={(e) => setFormState({ ...formState, rol: e.target.value })}
                  required
                  className={styles.select}
                  disabled={submitting}
                >
                  <option value="">Selecciona un rol</option>
                  <option value={ROLES.ADMINISTRADOR}>Administrador</option>
                  <option value={ROLES.OPERADOR_LOGISTICO}>Operador Logístico</option>
                  <option value={ROLES.REPARTIDOR}>Repartidor</option>
                  <option value={ROLES.CLIENTE}>Cliente</option>
                </select>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={submitting}
                >
                  {submitting ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div className={`${styles.modalContent} ${styles.deleteModalContent}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Confirmar Eliminación</h2>
              <button className={styles.closeBtn} onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <p>¿Estás seguro de que deseas eliminar al usuario <strong>{userToDelete?.nombre}</strong>?</p>
              <p className={styles.deleteWarning}>Esta acción no se puede deshacer y revocará todos sus accesos al sistema.</p>
            </div>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={`${styles.btnPrimary} ${styles.btnDanger}`}
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Eliminando...' : 'Eliminar Usuario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}