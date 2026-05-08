
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// El mismo mock que usa PedidosPage (temporalmente)
const PEDIDOS_MOCK = [
  { id: 'P001', origen: 'Centro', destino: 'Norte', clienteId: 'C1', descripcion: 'Paquete pequeño', estado: 'Pendiente', fecha: '2026-05-05' },
  { id: 'P002', origen: 'Sur', destino: 'Este', clienteId: 'C2', descripcion: 'Documentos', estado: 'En tránsito', fecha: '2026-05-04' },
  { id: 'P003', origen: 'Oeste', destino: 'Centro', clienteId: 'C1', descripcion: 'Varios', estado: 'Entregado', fecha: '2026-05-03' },
  { id: 'P004', origen: 'Norte', destino: 'Sur', clienteId: 'C3', descripcion: 'Electrónicos', estado: 'Asignado', fecha: '2026-05-05' },
  { id: 'P005', origen: 'Este', destino: 'Oeste', clienteId: 'C2', descripcion: 'Libros', estado: 'Cancelado', fecha: '2026-05-02' },
];

export default function FormularioPedidoPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    clienteId: '',
    descripcion: '',
  });

  const [loading, setLoading] = useState(false);

  // Cargar datos del pedido al montar
  useEffect(() => {

        if (id) {
        setLoading(true);
        // Simular una breve carga (como si consultara un API)
        setTimeout(() => {
            const pedido = PEDIDOS_MOCK.find(p => p.id === id);
            if (pedido) {
            setFormData({
                origen: pedido.origen || '',
                destino: pedido.destino || '',
                clienteId: pedido.clienteId || '',
                descripcion: pedido.descripcion || '',
            });
        }
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock de guardado
    alert(`Pedido ${id} actualizado (mock)\nOrigen: ${formData.origen}\nDestino: ${formData.destino}\nCliente: ${formData.clienteId}\nDescripción: ${formData.descripcion}`);
    navigate('/operador/pedidos');
  };

  if (loading) return <div>Cargando datos del pedido…</div>;

  return (
    <div>
      <h1>Editar Pedido {id}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Origen:
          <input type="text" name="origen" value={formData.origen} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Destino:
          <input type="text" name="destino" value={formData.destino} onChange={handleChange} required />
        </label>
        <br />
        <label>
          ID Cliente:
          <input type="text" name="clienteId" value={formData.clienteId} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Descripción:
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" />
        </label>
        <br />
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={() => navigate('/operador/pedidos')}>Cancelar</button>
      </form>
    </div>
  );
}