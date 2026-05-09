import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoPedido() {
    
  const navigate = useNavigate();
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origen || !destino || !clienteId) {
      alert('Por favor completa los campos obligatorios (origen, destino, cliente)');
      return;
    }
    // Simula creación exitosa
    alert(`Pedido creado con éxito (mock)\nOrigen: ${origen}\nDestino: ${destino}\nCliente: ${clienteId}`);
    navigate('/operador/pedidos');
  };

  return (
    <div>
      <h1>Nuevo Pedido</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Origen:
          <input type="text" value={origen} onChange={e => setOrigen(e.target.value)} required />
        </label>
        <br />
        <label>
          Destino:
          <input type="text" value={destino} onChange={e => setDestino(e.target.value)} required />
        </label>
        <br />
        <label>
          Cliente ID:
          <input type="text" 
          value={clienteId} 
          onChange={e => setClienteId(e.target.value)} 
          required 
          pattern="^R\d+$"
          title="Formato: C seguido de números (ej. C1, C25)"
          placeholder="C1, C2..." />
        </label>
        <br />
        <label>
          Descripción:
          <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} rows={3} />
        </label>
        <br />
        <button type="submit">Crear Pedido</button>
        <button type="button" onClick={() => navigate('/operador/pedidos')}>Cancelar</button>
      </form>
    </div>
  );
}
