import { Pedido } from '../models/Pedido';
import { User } from '../models/User';
import { Repartidor } from '../models/Repartidor';

// Adaptadores para convertir la respuesta de la API en instancias de Modelos de Dominio

export const adaptPedido = (apiResponse) => {
  return new Pedido(apiResponse);
};

export const adaptPedidosList = (apiResponseArray) => {
  return apiResponseArray.map(adaptPedido);
};

export const adaptUser = (apiResponse) => {
  return new User(apiResponse);
};

export const adaptRepartidor = (apiResponse) => {
  return new Repartidor(apiResponse);
};

export const adaptRepartidoresList = (apiResponseArray) => {
  return apiResponseArray.map(adaptRepartidor);
};
