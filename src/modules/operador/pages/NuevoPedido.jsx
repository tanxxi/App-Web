import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoPedido() {
    
  const navigate = useNavigate();
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [ubicacion, setUbicacion] = useState('')
  const [descripcion, setDescripcion] = useState('');
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origen || !destino || !clienteId || !descripcion) {
      alert('Por favor completa los campos obligatorios (origen, destino, cliente)');
      return;
    }

    // Simula creación exitosa
    alert(`Pedido creado con éxito (mock)\nOrigen: ${origen}\nDestino: ${destino}
      \nCliente: ${clienteId}\n\nNombre: ${nombre}\nUbicacion: ${ubicacion}`);
    navigate('/operador/pedidos');
  };

  return (
    <div>
      <h1>Nuevo Pedido</h1>
      <form onSubmit={handleSubmit}>
      {/* Origen y destino también deben ser validados como la dirección. Empero, regex es horrible!!!*/}
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

        {/*La validación de la dirección es mejor hacerlo desde el back-end para no depender de regex*/}
        <label>
          Ubicacion:
          <input type="text" value={ubicacion} onChange={e => setUbicacion(e.target.value)} required 
          placeholder = "ej. Calle 100 #13-39"/>
        </label>
        <br />

        <label>
          Cliente ID:
          <input type="numeric" 
          value={clienteId} 
          onChange={e => setClienteId(e.target.value)} 
          required 
          placeholder="ej. 1" />
        </label>
        <br />

        <label>
          Nombre (Cliente):
          <input type="text" 
          value={clienteId} 
          onChange={e => setNombre(e.target.value)} 
          required 
          placeholder="ej. Carlos Perez" />
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
