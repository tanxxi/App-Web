import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import styles from './OperadorLayout.module.css';

export default function OperadorLayout() {
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <Navbar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
