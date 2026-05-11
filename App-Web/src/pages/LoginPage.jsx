import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor ingresa usuario y contraseña.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
    } catch (err) {
      setError('Usuario o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };



  return (
     <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>📦</div>
          <h1 className={styles.title}>LogisWeb</h1>
          <p className={styles.subtitle}>Gestión y Seguimiento de Pedidos</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorBox}>
              <span>⚠️ {error}</span>
              <button type="button" onClick={() => setError(null)} className={styles.closeError}>×</button>
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Usuario / Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ej. usuario@correo.com"
              disabled={loading}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              className={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}