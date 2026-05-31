import { User } from '../models/User';
import { MOCK_CREDENTIALS } from '../mock/credentialsMock';

const API_BASE_URL = 'http://localhost:8080/api/usuarios';

// Helper to check if using a mock/development token
const isMockToken = (token) => !token || token.startsWith('token-');

// Helper to convert API roles to App roles
export const mapRoleApiToApp = (role) => {
  const mapping = {
    'ADMINISTRADOR': 'Administrador',
    'OPERADOR_LOGISTICO': 'OperadorLogistico',
    'REPARTIDOR': 'Repartidor',
    'CLIENTE': 'Cliente'
  };
  return mapping[role] || role;
};

// Helper to convert App roles to API roles
export const mapRoleAppToApi = (role) => {
  const mapping = {
    'Administrador': 'ADMINISTRADOR',
    'OperadorLogistico': 'OPERADOR_LOGISTICO',
    'Repartidor': 'REPARTIDOR',
    'Cliente': 'CLIENTE'
  };
  return mapping[role] || role;
};

export async function getUsuarios(token) {
  if (isMockToken(token)) {
    return MOCK_CREDENTIALS.map(item => new User({
      id: item.id,
      nombre: item.nombre,
      email: item.email,
      rol: item.rol
    }));
  }

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error al obtener usuarios: ${response.status}`);
    }

    const data = await response.json();
    return data.map(item => {
      const appRole = mapRoleApiToApp(item.rol);
      return new User({
        id: item.id,
        nombre: item.nombre,
        email: item.email,
        rol: appRole
      });
    });
  } catch (err) {
    if (
      err.message.includes('Failed to fetch') || 
      err.message.includes('NetworkError') || 
      err.message.includes('Network request failed') ||
      err.message.includes('Failed to execute')
    ) {
      console.warn('Conexión fallida al backend de usuarios, usando mock local.');
      return MOCK_CREDENTIALS.map(item => new User({
        id: item.id,
        nombre: item.nombre,
        email: item.email,
        rol: item.rol
      }));
    }
    throw err;
  }
}

export async function getUsuarioById(id, token) {
  if (isMockToken(token)) {
    const item = MOCK_CREDENTIALS.find(u => u.id === Number(id));
    if (!item) throw new Error('Usuario no encontrado');
    return new User({
      id: item.id,
      nombre: item.nombre,
      email: item.email,
      rol: item.rol
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error al obtener usuario: ${response.status}`);
    }

    const item = await response.json();
    const appRole = mapRoleApiToApp(item.rol);
    return new User({
      id: item.id,
      nombre: item.nombre,
      email: item.email,
      rol: appRole
    });
  } catch (err) {
    if (
      err.message.includes('Failed to fetch') || 
      err.message.includes('NetworkError') || 
      err.message.includes('Network request failed') ||
      err.message.includes('Failed to execute')
    ) {
      console.warn('Conexión fallida al backend de usuarios, usando mock local.');
      const item = MOCK_CREDENTIALS.find(u => u.id === Number(id));
      if (!item) throw new Error('Usuario no encontrado');
      return new User({
        id: item.id,
        nombre: item.nombre,
        email: item.email,
        rol: item.rol
      });
    }
    throw err;
  }
}

export async function createUsuario(userData, token) {
  if (isMockToken(token)) {
    const newId = Math.max(...MOCK_CREDENTIALS.map(u => u.id), 0) + 1;
    const newUser = {
      id: newId,
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol,
      token: `token-user-${newId}`
    };
    MOCK_CREDENTIALS.push(newUser);
    return new User({
      id: newUser.id,
      nombre: newUser.nombre,
      email: newUser.email,
      rol: newUser.rol
    });
  }

  try {
    const apiRole = mapRoleAppToApi(userData.rol);
    const payload = {
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password,
      rol: apiRole
    };

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error al crear usuario: ${response.status}`);
    }

    const item = await response.json();
    const appRole = mapRoleApiToApp(item.rol);
    return new User({
      id: item.id,
      nombre: item.nombre,
      email: item.email,
      rol: appRole
    });
  } catch (err) {
    if (
      err.message.includes('Failed to fetch') || 
      err.message.includes('NetworkError') || 
      err.message.includes('Network request failed') ||
      err.message.includes('Failed to execute')
    ) {
      console.warn('Conexión fallida al backend de usuarios, usando mock local.');
      const newId = Math.max(...MOCK_CREDENTIALS.map(u => u.id), 0) + 1;
      const newUser = {
        id: newId,
        nombre: userData.nombre,
        email: userData.email,
        rol: userData.rol,
        token: `token-user-${newId}`
      };
      MOCK_CREDENTIALS.push(newUser);
      return new User({
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol
      });
    }
    throw err;
  }
}

export async function updateUsuario(id, userData, token) {
  if (isMockToken(token)) {
    const index = MOCK_CREDENTIALS.findIndex(u => u.id === Number(id));
    if (index === -1) throw new Error('Usuario no encontrado');
    MOCK_CREDENTIALS[index] = {
      ...MOCK_CREDENTIALS[index],
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol
    };
    const item = MOCK_CREDENTIALS[index];
    return new User({
      id: item.id,
      nombre: item.nombre,
      email: item.email,
      rol: item.rol
    });
  }

  try {
    const apiRole = mapRoleAppToApi(userData.rol);
    const payload = {
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password || '', // Contraseña opcional
      rol: apiRole
    };

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error al actualizar usuario: ${response.status}`);
    }

    const item = await response.json();
    const appRole = mapRoleApiToApp(item.rol);
    return new User({
      id: item.id,
      nombre: item.nombre,
      email: item.email,
      rol: appRole
    });
  } catch (err) {
    if (
      err.message.includes('Failed to fetch') || 
      err.message.includes('NetworkError') || 
      err.message.includes('Network request failed') ||
      err.message.includes('Failed to execute')
    ) {
      console.warn('Conexión fallida al backend de usuarios, usando mock local.');
      const index = MOCK_CREDENTIALS.findIndex(u => u.id === Number(id));
      if (index === -1) throw new Error('Usuario no encontrado');
      MOCK_CREDENTIALS[index] = {
        ...MOCK_CREDENTIALS[index],
        nombre: userData.nombre,
        email: userData.email,
        rol: userData.rol
      };
      const item = MOCK_CREDENTIALS[index];
      return new User({
        id: item.id,
        nombre: item.nombre,
        email: item.email,
        rol: item.rol
      });
    }
    throw err;
  }
}

export async function deleteUsuario(id, token) {
  if (isMockToken(token)) {
    const index = MOCK_CREDENTIALS.findIndex(u => u.id === Number(id));
    if (index !== -1) {
      MOCK_CREDENTIALS.splice(index, 1);
    }
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error al eliminar usuario: ${response.status}`);
    }
  } catch (err) {
    if (
      err.message.includes('Failed to fetch') || 
      err.message.includes('NetworkError') || 
      err.message.includes('Network request failed') ||
      err.message.includes('Failed to execute')
    ) {
      console.warn('Conexión fallida al backend de usuarios, usando mock local.');
      const index = MOCK_CREDENTIALS.findIndex(u => u.id === Number(id));
      if (index !== -1) {
        MOCK_CREDENTIALS.splice(index, 1);
      }
      return;
    }
    throw err;
  }
}
