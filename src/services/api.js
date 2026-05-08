
// Configuracion base mientras tanto

const BASE_URL = 'http://localhost:8080/api';

// Función auxiliar para hacer fetch con token y manejar errores
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  return mockRequest(endpoint, options);

}