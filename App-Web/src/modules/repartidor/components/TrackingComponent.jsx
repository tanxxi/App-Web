import { useState, useEffect, useRef } from 'react';
import { actualizarUbicacion } from '../services/repartidorServices';
import styles from './TrackingComponent.alt.module.css';

function TrackingComponent({ repartidorId }) {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    // Cleanup al desmontar
    return () => stopTracking();
  }, []);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada por el navegador");
      return;
    }

    setIsTracking(true);
    setError(null);

    // Simulamos que al "Iniciar Ruta" se cambia algún estado general (esto se haría en Dashboard o contexto real)
    
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        
        try {
          // Enviar ubicación al backend
          await actualizarUbicacion(repartidorId, latitude, longitude, "Ubicación actual en ruta");
        } catch (err) {
          console.error("Error enviando ubicación:", err);
        }
      },
      (err) => {
        setError(err.message);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    setLocation(null);
  };

  return (
    <div className={`${styles.trackerContainer} ${isTracking ? styles.active : ''}`}>
      <div className={styles.info}>
        <div className={styles.statusIcon}>
          {isTracking ? <span className={styles.pulse}></span> : <span className={styles.dot}></span>}
        </div>
        <div>
          <h3 className={styles.title}>Transmisión GPS</h3>
          <p className={styles.subtitle}>
            {isTracking ? 'Enviando coordenadas en tiempo real' : 'Ruta inactiva'}
          </p>
          {location && isTracking && (
            <p className={styles.coords}>
              Lat: {location.lat.toFixed(5)} | Lng: {location.lng.toFixed(5)}
            </p>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
      <button 
        className={`${styles.actionBtn} ${isTracking ? styles.stop : styles.start}`}
        onClick={isTracking ? stopTracking : startTracking}
      >
        {isTracking ? 'Detener Ruta' : 'Iniciar Ruta'}
      </button>
    </div>
  );
}

export default TrackingComponent;
