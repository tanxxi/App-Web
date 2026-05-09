import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { repartidoresMock } from '../../data/repartidoresMock';

export default function RepartidoresPage() {
  const [repartidores, setRepartidores] = useState(repartidoresMock);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroId, setFiltroId] = useState('')
  const [filtroCapacidad, setFiltroCapacidad] = useState('');
  const navigate = useNavigate();

  const filtrados = repartidores.filter(r => {
      if(filtroNombre && !r.nombre.toLowerCase().includes(filtroNombre.toLowerCase())) return false;
      if(filtroId && r.id !== filtroId) return false;
      if(filtroCapacidad && r.capacidad !== filtroCapacidad) return false;
      return true;
    });

  return (
    <div>
      <h1>Gestión de Repartidores</h1>

      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtroNombre}
          onChange={e => setFiltroNombre(e.target.value)}
        />
      </div>

      <div>
        <input
          type = "text"
          placeholder = "Buscar por id"
          value = {filtroId}
          onChange = {e => setFiltroId(e.target.value)}
        />
      </div>

      <div>
        <input
          type = "text"
          placeholder = "Filtrar por capacidad"
          value = {filtroCapacidad}
          onChange = {e => setFiltroCapacidad(e.target.value)}
          placeholder = "ej: 100"
        />
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Capacidad</th>
            <th>Activos</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.nombre}</td>
              <td>{r.email}</td>
              <td>{r.telefono}</td>
              <td>{r.capacidad}</td>
              <td>{r.pedidosActivos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}