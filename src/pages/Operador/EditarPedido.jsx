
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {PEDIDOS_MOCK} from '../../mock/mockPedidos'


export default function FormularioPedidoPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    clienteId: '',
    repartidorId: '',
    descripcion: '',
    nombre: '',
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
                repartidorId: pedido.repartidorId || '',
                estado: pedido.estado || '',
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
    alert(`Pedido ${id} actualizado (mock)
      \nOrigen: ${formData.origen}\nDestino: ${formData.destino}
      \nCliente: ${formData.clienteId}\nRepartidor: ${formData.repartidorId}
      \nDescripción: ${formData.descripcion}\nEstado: ${formData.estado}`
    );
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
          Ubicacion:
          <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Nombre (cliente):
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <br />
        <label>
          ID Cliente:
          <input type="text" name="clienteId" value={formData.clienteId} onChange={handleChange} required />
        </label>
        <br />
        <label>
          ID Repartidor:
          <input type="text" name="repartidorId" value={formData.repartidorId} onChange={handleChange}/>
        </label>
        <br />
        <label>
          Descripción:
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" />
        </label>
        <br />
        <label><strong>Cambiar estado:</strong></label>
        <select name = "estado" value = {formData.estado} onChange = {handleChange}>
          <option value = ""> -- Mantener actual --</option>
          <option value = "Asignado"> Asignado </option>
          <option value = "Entregado"> Entregado </option>
          <option value = "Pendiente"> Pendiente </option>
        </select>
        <br/>
        <button type="submit"> Guardar Cambios </button>
        <button type="button" onClick={() => navigate('/operador/pedidos')}> Cancelar </button>
      </form>
    </div>
  );
}