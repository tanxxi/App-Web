import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { actualizarEstadoPedido } from '../services/repartidorServices';

function EstadoSelector({ pedido, onUpdate }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async (nuevoEstado) => {
    setLoading(true);
    setError(null);
    try {
      await actualizarEstadoPedido(pedido.id, nuevoEstado, token);
      onUpdate();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (pedido.estado === 'ENTREGADO') {
    return <div style={{ color: '#15803d', fontSize: '0.9rem', fontWeight: 600 }}>✓ Completado</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {error && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</span>}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {pedido.estado === 'ASIGNADO' && (
          <button
            onClick={() => handleUpdate('EN_TRANSITO')}
            disabled={loading}
            style={btnStyle('#0f172a')}
          >
            {loading ? '...' : 'Pasar a Tránsito'}
          </button>
        )}
        {pedido.estado === 'EN_TRANSITO' && (
          <button
            onClick={() => handleUpdate('ENTREGADO')}
            disabled={loading}
            style={btnStyle('#16a34a')}
          >
            {loading ? '...' : 'Marcar Entregado'}
          </button>
        )}
      </div>
    </div>
  );
}

const btnStyle = (color) => ({
  background: color,
  color: '#ffffff',
  border: `1px solid ${color}`,
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: 600,
  transition: 'all 0.15s ease',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
});

export default EstadoSelector;
