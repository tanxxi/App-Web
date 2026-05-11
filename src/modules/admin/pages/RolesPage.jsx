import styles from './RolesPage.module.css';

const rolesData = [
  {
    id: 1,
    nombre: 'Administrador',
    descripcion: 'Acceso completo al sistema. Puede gestionar usuarios, pedidos, repartidores y toda la configuración del sistema.',
    permisos: ['Gestionar usuarios', 'Gestionar pedidos', 'Gestionar repartidores', 'Ver reportes', 'Configurar sistema', 'Ver logs', 'Seguridad'],
    color: '#7c3aed',
  },
  {
    id: 2,
    nombre: 'Operador Logístico',
    descripcion: 'Gestiona operaciones diarias: pedidos, asignaciones y seguimiento. No tiene acceso a configuración avanzada.',
    permisos: ['Gestionar pedidos', 'Asignar repartidores', 'Seguimiento de pedidos', 'Ver historial', 'Generar reportes operativos'],
    color: '#0369a1',
  },
  {
    id: 3,
    nombre: 'Repartidor',
    descripcion: 'Acceso limitado para gestionar sus propios pedidos y actualizar estados de entrega.',
    permisos: ['Ver sus pedidos', 'Actualizar estado de entrega', 'Ver su perfil'],
    color: '#16a34a',
  },
  {
    id: 4,
    nombre: 'Cliente',
    descripcion: 'Acceso para realizar pedidos y hacer seguimiento del estado de sus entregas.',
    permisos: ['Crear pedidos', 'Ver sus pedidos', 'Seguimiento de entrega'],
    color: '#d97706',
  },
];

export default function RolesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Roles y Permisos</h1>
          <p className={styles.subtitle}>Define los roles disponibles en el sistema y sus permisos asociados</p>
        </div>
      </div>

      <div className={styles.rolesGrid}>
        {rolesData.map((rol) => (
          <div key={rol.id} className={styles.roleCard}>
            <div className={styles.roleHeader} style={{ '--role-color': rol.color }}>
              <div className={styles.roleIcon}>🔐</div>
              <div>
                <h3 className={styles.roleName}>{rol.nombre}</h3>
                <span className={styles.roleBadge}>Activo</span>
              </div>
            </div>
            <p className={styles.roleDesc}>{rol.descripcion}</p>
            <div className={styles.permisosSection}>
              <h4 className={styles.permisosTitle}>Permisos:</h4>
              <div className={styles.permisosList}>
                {rol.permisos.map((permiso) => (
                  <span key={permiso} className={styles.permisoTag}>
                    ✓ {permiso}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}