import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { repartidoresMock } from '../../../data/repartidoresMock';
import { fetchRepartidor } from '../services/orgServicios'; // ajusta la ruta

export default function RepartidoresPage() {
  const [repartidores, setRepartidores] = useState(repartidoresMock);
  const [loading, setLoading] = useState(false);
  const [limite, setLimite] = useState(10);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    nombre: '',
    id: 0,
    capacidadLower: 0,
    capacidadUpper: 100,
    disponibilidad: 'Todos',
  });

  // Efecto para toggle local/servidor
  useEffect(() => {
    if (limite <= 15) {
      setRepartidores(repartidoresMock);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchRepartidor({ ...filtros, limite })
      .then(data => {
        setRepartidores(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar repartidores');
        setLoading(false);
      });
  }, [limite, filtros]);

  // Filtrado local solo cuando los datos vienen del mock
  const repartidoresFiltrados = limite <= 15
    ? repartidores.slice(0, limite).filter(r => {
        if (filtros.nombre && !r.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) return false;
        if (filtros.id && r.id !== filtros.id) return false;
        if (filtros.disponibilidad !== 'Todos' && r.estado !== filtros.disponibilidad) return false;
        if (filtros.capacidadLower && r.capacidad < filtros.capacidadLower) return false;
        if (filtros.capacidadUpper && r.capacidad > filtros.capacidadUpper) return false;
        return true;
      })
    : repartidores; // en modo servidor ya vienen filtrados y cortados

  // Helper para actualizar filtros
  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <div>
      <h1>Gestión de Repartidores</h1>

      <div>
        <label>
          Límite:
          <input
            type="number"
            value={limite}
            min="1"
            max="200"
            onChange={e => setLimite(parseInt(e.target.value, 10) || 10)}
          />
        </label>
      </div>

      <div>
        <label>
          Nombre:
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filtros.nombre}
            onChange={e => handleFiltroChange('nombre', e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>Disponibilidad:
          <select value={filtros.disponibilidad} onChange={e => handleFiltroChange('disponibilidad', e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Disponible">Disponible</option>
            <option value="Ocupado">Ocupado</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          ID:
          <input
            type="number"
            value={filtros.id}
            min="0"
            onChange={e => handleFiltroChange('id', parseInt(e.target.value, 10) || 0)}
          />
        </label>
      </div>

      <div>
        <label>
          Cap. mínima:
          <input
            type="number"
            value={filtros.capacidadLower}
            min="0"
            max="100"
            onChange={e => handleFiltroChange('capacidadLower', parseInt(e.target.value, 10) || 0)}
          />
        </label>
      </div>

      <div>
        <label>
          Cap. máxima:
          <input
            type="number"
            value={filtros.capacidadUpper}
            min="0"
            max="100"
            onChange={e => handleFiltroChange('capacidadUpper', parseInt(e.target.value, 10) || 100)}
          />
        </label>
      </div>

      {loading && <p>Cargando repartidores desde el servidor…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
          {repartidoresFiltrados.length === 0 ? (
            <tr><td colSpan="7">No se encontraron repartidores</td></tr>
          ) : (
            repartidoresFiltrados.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.nombre}</td>
                <td>{r.email}</td>
                <td>{r.telefono}</td>
                <td>{r.capacidad}</td>
                <td>{r.pedidosActivos}</td>
                <td>{r.estado}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}