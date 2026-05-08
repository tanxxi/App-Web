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
    <div>
      <h1>Login</h1>
      <form onSubmit = {handleSubmit}>
        {error && (
          <div style={{ background: '#fff0f0', padding: '1rem', marginBottom: '1rem' }}>
            <span>⚠️ {error}</span>
            <button type="button" onClick={() => setError(null)}>×</button>
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder = "ej. username@gmail.com"
            disabled={loading}
            autoComplete = "username"
          />
        </div>
        <div>
          <label htmlFor="password" >Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            autoComplete = "current-password"
          />
        </div>
        <button type="submit" disabled={false}>
          {loading ? 'Verificando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}