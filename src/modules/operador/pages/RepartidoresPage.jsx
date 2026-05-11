import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { repartidoresMock } from '../../../mock/repartidoresMock';

export default function RepartidoresPage() {
  
  const [repartidores, setRepartidores] = useState(repartidoresMock);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroId, setFiltroId] = useState(0)
  const [filtroCapacidadLower, setFiltroCapacidadLower] = useState(0);
  const [filtroCapacidadUpper, setFiltroCapacidadUpper] = useState(100);
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState('');
  const [limiteInstancias, setLimiteInstancias] = useState(10)

  const navigate = useNavigate();

  // Limite de instancias simuladas con mock. 
  // Esto se debe implementar para que funcione con el back-end

  const filtrados = repartidores.slice(0, limiteInstancias).filter(r => {
      if(filtroNombre && !r.nombre.toLowerCase().includes(filtroNombre.toLowerCase())) return false;
      if(filtroId && parseInt(filtroId) !== r.id) return false;
      if (filtroDisponibilidad !== 'Todos' && !r.estado.toLowerCase().includes(filtroDisponibilidad.toLowerCase())) return false;
      const capNum = parseInt(r.capacidad) || 0;
      if((filtroCapacidadLower || filtroCapacidadUpper) && !(capNum <= filtroCapacidadUpper && capNum >= filtroCapacidadLower)) return false;
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
          <label> Estado:
              <select value ={filtroDisponibilidad} onChange = {e => setFiltroDisponibilidad(e.target.value)}>
                  <option key = 'Todos'> Todos </option>
                  <option key = 'Disponible'> Disponible </option>
                  <option key = 'Ocupado'> Ocupado </option>
              </select>
          </label>
      </div>

      <div>
        <label>
          Buscar por id: 
          <input
          type = "number"
          value = {filtroId}
          min = "0"
          onChange = {e => setFiltroId(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Filtrar por capacidad (cota inferior): 
          <input
          type = "number"
          value = {filtroCapacidadLower}
          min ="0"
          max = "100"
          onChange = {e => setFiltroCapacidadLower(e.target.value)}
        />
        </label>
      </div>
      
      <div>
        <label>
          Filtrar por capacidad (cota superior):
          <input
          type = "number"
          value = {filtroCapacidadUpper}
          min = "0"
          max = "100"
          onChange = {e => setFiltroCapacidadUpper(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Maximo de instancias:
          <input
          type = "number"
          value = {limiteInstancias}
          min = "1"
          max = "200"
          onChange = {e => setLimiteInstancias(parseInt(e.target.value, 10) || 10)}
          />
        </label>
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
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.length !== 0 ? (filtrados.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.nombre}</td>
              <td>{r.email}</td>
              <td>{r.telefono}</td>
              <td>{r.capacidad}</td>
              <td>{r.pedidosActivos}</td>
              <td>{r.estado}</td>
            </tr>
          ))): (<td colSpan = "7"> No se encontraron repartidores </td>)}
        </tbody>
      </table>
    </div>
  );
}