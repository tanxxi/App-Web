import { useState, useEffect } from 'react';
import { pedidosMock } from '../data/pedidosMock';
import { repartidoresMock } from '../data/repartidoresMock';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const [kpis, setKpis] = useState({
    pendientes: 0,
    asignados: 0,
    enTransito: 0,
    entregados: 0,
    cancelados: 0,
    repartidoresDisponibles: 0
  });

  useEffect(() => {
    // Calcular KPIs
    const kpiData = {
      pendientes: pedidosMock.filter(p => p.estado === 'Pendiente').length,
      asignados: pedidosMock.filter(p => p.estado === 'Asignado').length,
      enTransito: pedidosMock.filter(p => p.estado === 'EnTransito').length,
      entregados: pedidosMock.filter(p => p.estado === 'Entregado').length,
      cancelados: pedidosMock.filter(p => p.estado === 'Cancelado').length,
      repartidoresDisponibles: repartidoresMock.filter(r => r.estado === 'Disponible').length,
    };
    setKpis(kpiData);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard Operativo</h1>
      
      <div className={styles.kpiGrid}>
        <div className={`${styles.kpiCard} ${styles.warning}`}>
          <h3>Pendientes</h3>
          <p className={styles.kpiNumber}>{kpis.pendientes}</p>
        </div>
        <div className={`${styles.kpiCard} ${styles.info}`}>
          <h3>Asignados</h3>
          <p className={styles.kpiNumber}>{kpis.asignados}</p>
        </div>
        <div className={`${styles.kpiCard} ${styles.primary}`}>
          <h3>En Tránsito</h3>
          <p className={styles.kpiNumber}>{kpis.enTransito}</p>
        </div>
        <div className={`${styles.kpiCard} ${styles.success}`}>
          <h3>Entregados</h3>
          <p className={styles.kpiNumber}>{kpis.entregados}</p>
        </div>
        <div className={`${styles.kpiCard} ${styles.danger}`}>
          <h3>Cancelados</h3>
          <p className={styles.kpiNumber}>{kpis.cancelados}</p>
        </div>
        <div className={`${styles.kpiCard} ${styles.neutral}`}>
          <h3>Repartidores Disponibles</h3>
          <p className={styles.kpiNumber}>{kpis.repartidoresDisponibles}</p>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <h2>Actividad Reciente</h2>
          <ul className={styles.timeline}>
            <li>
              <span className={styles.time}>10:00 AM</span>
              <p>Pedido #103 asignado a Ana López</p>
            </li>
            <li>
              <span className={styles.time}>09:30 AM</span>
              <p>Nuevo pedido #106 creado</p>
            </li>
            <li>
              <span className={styles.time}>08:15 AM</span>
              <p>Pedido #104 entregado con éxito</p>
            </li>
          </ul>
        </div>
        
        <div className={styles.card}>
          <h2>Resumen de Pedidos</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidosMock.slice(0, 4).map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.cliente}</td>
                  <td><span className={`${styles.badge} ${styles[p.estado]}`}>{p.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
