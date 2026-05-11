export class User {
  constructor({ id, nombre, email, rol, token }) {
    this.id = id;
    this.nombre = nombre || '';
    this.email = email || '';
    this.rol = rol || '';
    this.token = token || '';
  }
}
