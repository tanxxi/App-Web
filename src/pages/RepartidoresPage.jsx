import { useState } from 'react';
import { repartidoresMock } from '../data/repartidoresMock';
import styles from './RepartidoresPage.module.css';

export default function RepartidoresPage() {
  const [repartidores] = useState(repartidoresMock);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Repartidores</h1>
        <button className={styles.btnPrimary}>+ Nuevo Repartidor</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Capacidad</th>
              <th>Pedidos Activos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {repartidores.map(repartidor => (
              <tr key={repartidor.id}>
                <td>#{repartidor.id}</td>
                <td>{repartidor.nombre}</td>
                <td>
                  <span className={`${styles.badge} ${styles[repartidor.estado]}`}>
                    {repartidor.estado}
                  </span>
                </td>
                <td>
                  <div className={styles.capacityBar}>
                    <div 
                      className={styles.capacityFill} 
                      style={{ width: repartidor.capacidad }}
                    ></div>
                    <span className={styles.capacityText}>{repartidor.capacidad}</span>
                  </div>
                </td>
                <td>{repartidor.pedidosActivos}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.btnIcon} title="Editar">✏️</button>
                    <button className={styles.btnIcon} title="Ver pedidos">📦</button>
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
