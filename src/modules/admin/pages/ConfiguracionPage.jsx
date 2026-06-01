import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getConfiguracion, updateConfiguracion } from '../../../services/adminService';
import styles from './ConfiguracionPage.module.css';

export default function ConfiguracionPage() {
  const { token } = useAuth();
  const [configs, setConfigs] = useState([]);
  const [valores, setValores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarConfig = () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    setMensaje(null);
    getConfiguracion(token)
      .then((data) => {
        setConfigs(data);
        const vals = {};
        data.forEach((c) => { vals[c.id] = c.valor; });
        setValores(vals);
      })
      .catch(() => setError('Error al cargar configuración'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarConfig();
  }, [token]);

  const handleGuardar = async () => {
    setSaving(true);
    setMensaje(null);
    try {
      await Promise.all(
        configs.map((c) => {
          if (valores[c.id] !== c.valor) {
            return updateConfiguracion(c.id, valores[c.id], token);
          }
          return Promise.resolve();
        })
      );
      setMensaje({ tipo: 'ok', texto: 'Configuración guardada correctamente' });
    } catch {
      setMensaje({ tipo: 'error', texto: 'Error al guardar algunos cambios' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Configuración del Sistema</h1>
        <p className={styles.subtitle}>Parámetros generales y opciones del sistema</p>
      </div>

      {loading && <p className={styles.loaderText}>Cargando configuración...</p>}

      {error && (
        <div className={styles.errorBox}>
          <span>{error}</span>
          <button onClick={cargarConfig} className={styles.retryBtn}>Reintentar</button>
        </div>
      )}

      {mensaje && (
        <div className={mensaje.tipo === 'ok' ? styles.successBox : styles.errorBox}>
          <span>{mensaje.texto}</span>
        </div>
      )}

      {!loading && !error && configs.length > 0 && (
        <>
          <div className={styles.sections}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>⚙️</span>
                <h2 className={styles.sectionTitle}>Parámetros del Sistema</h2>
              </div>
              <div className={styles.settingsList}>
                {configs.map((config) => (
                  <div key={config.id} className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingName}>{config.descripcion || config.clave}</span>
                    </div>
                    {config.tipo === 'boolean' ? (
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={valores[config.id] === 'true'}
                          onChange={(e) => setValores({ ...valores, [config.id]: e.target.checked ? 'true' : 'false' })}
                        />
                        <span className={styles.toggleSlider}></span>
                      </label>
                    ) : config.tipo === 'number' ? (
                      <input
                        type="number"
                        className={styles.settingInput}
                        value={valores[config.id] ?? ''}
                        onChange={(e) => setValores({ ...valores, [config.id]: e.target.value })}
                      />
                    ) : (
                      <input
                        type="text"
                        className={styles.settingInput}
                        value={valores[config.id] ?? ''}
                        onChange={(e) => setValores({ ...valores, [config.id]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.saveBtn} onClick={handleGuardar} disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </>
      )}

      {!loading && !error && configs.length === 0 && (
        <p className={styles.emptyText}>No hay parámetros de configuración disponibles.</p>
      )}
    </div>
  );
}
