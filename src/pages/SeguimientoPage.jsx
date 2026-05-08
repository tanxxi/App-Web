import { useState } from 'react';
import { historialMock } from '../data/historialMock';
import { pedidosMock } from '../data/pedidosMock';
import styles from './SeguimientoPage.module.css';

export default function SeguimientoPage() {
  const [busquedaId, setBusquedaId] = useState('');
  const [pedidoActivo, setPedidoActivo] = useState(null);
  const [historialPedido, setHistorialPedido] = useState([]);

  const buscarPedido = () => {
    const id = parseInt(busquedaId);
    const pedido = pedidosMock.find(p => p.id === id);
    if (pedido) {
      setPedidoActivo(pedido);
      setHistorialPedido(historialMock.filter(h => h.pedidoId === id));
    } else {
      setPedidoActivo(null);
      setHistorialPedido([]);
      alert("Pedido no encontrado");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seguimiento de Pedidos</h1>
      
      <div className={styles.searchCard}>
        <div className={styles.searchGroup}>
          <input 
            type="text" 
            placeholder="Ingrese el ID del pedido (ej. 103, 104)" 
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={buscarPedido} className={styles.btnPrimary}>Buscar</button>
        </div>
      </div>

      {pedidoActivo && (
        <div className={styles.contentGrid}>
          <div className={styles.infoCard}>
            <h2>Detalle del Pedido #{pedidoActivo.id}</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Cliente:</label>
                <span>{pedidoActivo.cliente}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Estado Actual:</label>
                <span className={`${styles.badge} ${styles[pedidoActivo.estado]}`}>
                  {pedidoActivo.estado}
                </span>
              </div>
              <div className={styles.infoItem}>
                <label>Origen:</label>
                <span>{pedidoActivo.origen}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Destino:</label>
                <span>{pedidoActivo.destino}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Repartidor:</label>
                <span>{pedidoActivo.repartidor || 'Sin asignar'}</span>
              </div>
            </div>
          </div>

          <div className={styles.timelineCard}>
            <h2>Historial de Eventos</h2>
            {historialPedido.length > 0 ? (
              <ul className={styles.timeline}>
                {historialPedido.map(evento => (
                  <li key={evento.id}>
                    <div className={styles.timelinePoint}></div>
                    <div className={styles.timelineContent}>
                      <span className={styles.time}>{new Date(evento.fechaHora).toLocaleString()}</span>
                      <h4>{evento.tipoEvento}</h4>
                      <p>{evento.observacion}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyText}>No hay eventos registrados para este pedido.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
