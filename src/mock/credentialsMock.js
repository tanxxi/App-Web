import { ROLES } from '../constants/roles';

export const MOCK_CREDENTIALS = [
  {
    id: 1,
    email: 'admin@test.com',
    password: 'password123',
    nombre: 'Admin General',
    rol: ROLES.ADMINISTRADOR,
    token: 'token-admin-123456'
  },
  {
    id: 2,
    email: 'operador@test.com',
    password: 'password123',
    nombre: 'Juan Operador',
    rol: ROLES.OPERADOR_LOGISTICO,
    token: 'token-operador-123456'
  },
  {
    id: 3,
    email: 'repartidor@test.com',
    password: 'password123',
    nombre: 'Carlos Ruiz',
    rol: ROLES.REPARTIDOR,
    token: 'token-repartidor-123456'
  },
  {
    id: 4,
    email: 'cliente@test.com',
    password: 'password123',
    nombre: 'Maria Cliente',
    rol: ROLES.CLIENTE,
    token: 'token-cliente-123456'
  }
];

export const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simulamos un retraso de red
    setTimeout(() => {
      const user = MOCK_CREDENTIALS.find(u => u.email === email && u.password === password);
      if (user) {
        // Clonamos el objeto y quitamos el password para no devolverlo
        const { password: _, ...userWithoutPassword } = user;
        resolve({
          token: user.token,
          user: userWithoutPassword
        });
      } else {
        reject(new Error('Credenciales incorrectas'));
      }
    }, 1000);
  });
};
