import {PEDIDOS_MOCK} from '../../../mock/mockPedidos';

export async function fetchPedidos(params) {
  const { estado, 
    clienteId, 
    repartidorId, 
    fechaDesde, fechaHasta, 
    horaDesde, horaHasta, 
    ubicacion, id, 
    limite, orden = 'desc'} = params;
  
  //Aquí debe estar claro que es el primer parametro que el backend necesita para devolver una 
  //cantidad específica de instancias. Alteraciones con GET deben ser implementadas cuando 
  //haya un back-end

  let resultado = [... PEDIDOS_MOCK]

  if (limite !== undefined && limite !== null) {
    resultado = resultado.slice(0, limite);
  }

  if (estado && estado !== 'Todos') {
    resultado = resultado.filter(p => p.estado === estado);
  }

  if (ubicacion) {
    resultado = resultado.filter(p =>
      p.ubicacion && p.ubicacion.toLowerCase().includes(ubicacion.toLowerCase())
    );
  }

  if (clienteId){
    resultado = resultado.filter(p => p.clienteId === clienteId);
  }

  if (repartidorId){
    resultado = resultado.filter(p => p.repartidorId && p.repartidorId === repartidorId);
  }

  if (id) {
    resultado = resultado.filter(p => p.id === id);
  }


  if (fechaDesde || fechaHasta){
    resultado = resultado.filter(p => {
      const fechaPart = p.fecha.split(' ')[0];   // "2026-05-05"
      if (fechaDesde && fechaPart < fechaDesde) return false;
      if (fechaHasta && fechaPart > fechaHasta) return false;
      return true;
    });

  }

  if (horaDesde || horaHasta) {
    resultado = resultado.filter(p => {
      const horaPart = p.fecha.split(' ')[1]?.substring(0, 5) || ''; // "09:30"
      if (horaDesde && horaPart < horaDesde) return false;
      if (horaHasta && horaPart > horaHasta) return false;
      return true;
    });
  }

  resultado.sort((a, b) => {
    const diff = new Date(b.fecha) - new Date(a.fecha);
    return orden === 'asc' ? -diff : diff;
  });

  return resultado; 
}

// orgServicios.js (añade esto después de fetchPedidos)
import { repartidoresMock } from '../../../data/repartidoresMock'; // Asegúrate de la ruta correcta

export async function fetchRepartidor(params) {
  const {
    nombre,
    id,
    capacidadLower,
    capacidadUpper,
    disponibilidad,
    limite,
  } = params;

  let resultado = [...repartidoresMock];

  // 1. Límite (simula que el backend ya devuelve recortado)
  if (limite !== undefined && limite !== null) {
    resultado = resultado.slice(0, limite);
  }

  // 2. Filtros
  if (nombre) {
    resultado = resultado.filter(r =>
      r.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (id) {
    resultado = resultado.filter(r => r.id === id);
  }

  if (disponibilidad && disponibilidad !== 'Todos') {
    resultado = resultado.filter(r =>
      r.disponibilidad?.toLowerCase() === disponibilidad.toLowerCase()
    );
  }

  // Filtro por capacidad (cota inferior y superior)
  const lower = parseInt(capacidadLower, 10);
  const upper = parseInt(capacidadUpper, 10);
  if (!isNaN(lower)) {
    resultado = resultado.filter(r => r.capacidad >= lower);
  }
  if (!isNaN(upper)) {
    resultado = resultado.filter(r => r.capacidad <= upper);
  }

  // 3. (Opcional) Ordenamiento – puedes añadir aquí un parámetro `orden` si quieres
  // resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return resultado;
}

