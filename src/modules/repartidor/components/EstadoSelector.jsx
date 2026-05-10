import { useState } from 'react';
import { actualizarEstadoPedido } from '../services/repartidorServices';

function EstadoSelector({ pedido, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async (nuevoEstado) => {
    setLoading(true);
    setError(null);
    try {
      await actualizarEstadoPedido(pedido.id, nuevoEstado);
      onUpdate(); // Notifica al padre para recargar la vista
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Solo mostrar acciones si no está entregado
  if (pedido.estado === 'Entregado') {
    return <div style={{ color: '#15803d', fontSize: '0.9rem', fontWeight: 600 }}>✓ Completado</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {error && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</span>}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        
        {pedido.estado === 'Asignado' && (
          <button 
            onClick={() => handleUpdate('En Tránsito')}
            disabled={loading}
            style={btnStyle('#0f172a')} // Dark slate
          >
            {loading ? '...' : 'Pasar a Tránsito'}
          </button>
        )}

        {pedido.estado === 'En Tránsito' && (
          <button 
            onClick={() => handleUpdate('Entregado')}
            disabled={loading}
            style={btnStyle('#16a34a')} // Green
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
  color: color === '#f1f5f9' ? '#1e293b' : '#ffffff', // For light bg like '#f1f5f9', use dark text
  border: `1px solid ${color === '#f1f5f9' ? '#cbd5e1' : color}`,
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: 600,
  transition: 'all 0.15s ease',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
});

export default EstadoSelector;
