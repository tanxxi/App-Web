import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import styles from './PerfilPage.module.css';

export default function PerfilPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: '300 123 4567', // Mock de datos adicionales
    vehiculo: 'Motocicleta (Placa: ABC-123)',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la llamada al API (ej. actualizarPerfilRepartidor)
    console.log('Guardando datos:', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mi Perfil</h1>
      
      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <h2>Información Personal</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.formGroup}>
              <label>Nombre Completo</label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre} 
                onChange={handleChange}
                className={styles.input}
                disabled // Usualmente el nombre no se cambia libremente
              />
            </div>

            <div className={styles.formGroup}>
              <label>Correo Electrónico / Usuario</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange}
                className={styles.input}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label>Teléfono de Contacto</label>
              <input 
                type="text" 
                name="telefono"
                value={formData.telefono} 
                onChange={handleChange}
                className={styles.input}
                placeholder="Ej. 300 123 4567"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Vehículo Registrado</label>
              <input 
                type="text" 
                name="vehiculo"
                value={formData.vehiculo} 
                onChange={handleChange}
                className={styles.input}
              />
              <span className={styles.hint}>Actualiza tu vehículo si ha cambiado para ajustar la capacidad de carga.</span>
            </div>

            <button type="submit" className={styles.submitBtn}>Guardar Cambios</button>
            {saved && <span className={styles.successMsg}>¡Perfil actualizado exitosamente!</span>}
          </form>
        </div>

        <div className={styles.sideCard}>
          <h2>Estadísticas del Mes</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>142</span>
              <span className={styles.statLabel}>Entregas Exitosas</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>4.9/5</span>
              <span className={styles.statLabel}>Calificación Promedio</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>2</span>
              <span className={styles.statLabel}>Cancelaciones</span>
            </div>
          </div>
          <div className={styles.warningBox}>
            <p>Mantener una calificación superior a 4.5 te da prioridad en la asignación de pedidos rentables.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
