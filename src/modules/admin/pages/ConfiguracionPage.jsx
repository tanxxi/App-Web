import styles from './ConfiguracionPage.module.css';

const generalSettings = [
  { id: 1, name: 'Nombre de la Empresa', value: 'LogisWeb', type: 'text' },
  { id: 2, name: 'Zona Horaria', value: 'America/Bogota', type: 'select', options: ['America/Bogota', 'America/Mexico_City', 'America/Buenos_Aires'] },
  { id: 3, name: 'Moneda Predeterminada', value: 'COP', type: 'select', options: ['COP', 'USD', 'EUR'] },
];

const estadosSistema = [
  { id: 4, name: 'Sistema en Mantenimiento', enabled: false },
  { id: 5, name: 'PermitirNuevos Registros', enabled: true },
  { id: 6, name: 'Notificaciones por Email', enabled: true },
];

const operativaSettings = [
  { id: 7, name: 'Tiempo Máximo de Espera (minutos)', value: '30', type: 'number' },
  { id: 8, name: 'Radio de Cobertura (km)', value: '50', type: 'number' },
  { id: 9, name: 'Auto-asignar Repartidores', enabled: false },
];

export default function ConfiguracionPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Configuración del Sistema</h1>
        <p className={styles.subtitle}>Parámetros generales y opciones del sistema</p>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>⚙️</span>
            <h2 className={styles.sectionTitle}>Parámetros Generales</h2>
          </div>
          <div className={styles.settingsList}>
            {generalSettings.map((setting) => (
              <div key={setting.id} className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingName}>{setting.name}</span>
                </div>
                {setting.type === 'select' ? (
                  <select className={styles.settingSelect} defaultValue={setting.value}>
                    {setting.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : setting.type === 'number' ? (
                  <input type="number" className={styles.settingInput} defaultValue={setting.value} />
                ) : (
                  <input type="text" className={styles.settingInput} defaultValue={setting.value} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>📊</span>
            <h2 className={styles.sectionTitle}>Estados del Sistema</h2>
          </div>
          <div className={styles.settingsList}>
            {estadosSistema.map((setting) => (
              <div key={setting.id} className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingName}>{setting.name}</span>
                </div>
                <label className={styles.toggle}>
                  <input type="checkbox" defaultChecked={setting.enabled} />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>🔧</span>
            <h2 className={styles.sectionTitle}>Configuración Operativa</h2>
          </div>
          <div className={styles.settingsList}>
            {operativaSettings.slice(0, 2).map((setting) => (
              <div key={setting.id} className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingName}>{setting.name}</span>
                </div>
                <input type="number" className={styles.settingInput} defaultValue={setting.value} />
              </div>
            ))}
            {operativaSettings.slice(2).map((setting) => (
              <div key={setting.id} className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingName}>{setting.name}</span>
                </div>
                <label className={styles.toggle}>
                  <input type="checkbox" defaultChecked={setting.enabled} />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.saveBtn} onClick={() => alert('Configuración guardada (simulado)')}>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}