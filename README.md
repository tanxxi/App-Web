# LogisWeb — Frontend

Sistema web para gestión de pedidos y seguimiento de entregas. Frontend React 19 + Vite 8 conectado a un backend de microservicios Spring Boot.

## 🏗️ Stack Tecnológico

- **React 19.2.5** — UI framework
- **Vite 8.0.14** — Build tool
- **React Router DOM 7.15.0** — Client-side routing
- **Vite** — Hot Module Replacement (HMR)

## 📦 Estructura de Módulos

```
src/modules/
├── auth/           # Autenticación (login)
├── admin/          # Panel administrativo (ADMINISTRADOR)
├── operador/       # Gestión de pedidos (OPERADOR_LOGISTICO)
└── repartidor/     # Panel de entrega (REPARTIDOR)
```

## 👥 Roles y Acceso

| Rol | Ruta | Funcionalidades |
|-----|------|-----------------|
| **Administrador** | `/admin` | Dashboard, usuarios, roles, pedidos, repartidores, historial, configuración |
| **Operador Logístico** | `/operador` | Dashboard, crear/editar pedidos, filtrar, asignar repartidores |
| **Repartidor** | `/repartidor` | Ver pedidos asignados, cambiar estado, tracking GPS en tiempo real |
| **Cliente** | `/cliente` | Placeholder (próximamente) |

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

La aplicación se ejecuta en `http://localhost:5173` por defecto.

## 🔐 Autenticación

### Credenciales de Prueba (Mock)

| Email | Password | Rol |
|-------|----------|-----|
| admin@test.com | pass123 | Administrador |
| operador@test.com | password123 | Operador Logístico |
| repartidor@test.com | password123 | Repartidor |
| cliente@test.com | password123 | Cliente |

### Flujo de Autenticación

1. `POST /auth/login` → API real (backend Spring Boot)
2. Si el backend no responde → fallback a credenciales mock
3. JWT guardado en `localStorage` (key: `token`)
4. Token incluido en header: `Authorization: Bearer {token}`

## 🔌 Integración Backend

### API Base
```
http://localhost:8080 (Gateway)
```

### Endpoints Conectados

#### Autenticación
- `POST /auth/login` — Login con email/password

#### Usuarios
- `GET /api/usuarios` — Listar usuarios (Admin, Operador)
- `GET /api/usuarios/{id}` — Obtener usuario
- `POST /api/usuarios` — Crear usuario (Admin)
- `PUT /api/usuarios/{id}` — Actualizar usuario (Admin)
- `DELETE /api/usuarios/{id}` — Eliminar usuario (Admin)

#### Pedidos (Operador + Repartidor)
- `GET /api/pedidos?repartidorId={id}` — Pedidos del repartidor
- `GET /api/pedidos?...` — Filtrar pedidos (estado, cliente, fecha, ubicación)
- `GET /api/pedidos/{id}` — Detalle de pedido
- `POST /api/pedidos/logistico` — Crear pedido (Operador)
- `PATCH /api/pedidos/{id}/estado?nuevoEstado={estado}` — Cambiar estado
- `POST /api/pedidos/{id}/ubicacion` — Registrar ubicación GPS (Repartidor)

### Estados de Pedido
```
PENDIENTE → ASIGNADO → EN_TRANSITO → ENTREGADO
                    ↳ CANCELADO
```

## 🗺️ Tracking GPS (Módulo Repartidor)

**Nueva funcionalidad:** El repartidor puede iniciar tracking GPS en tiempo real.

1. Click en "Iniciar Ruta" en el Dashboard
2. El navegador solicita permiso de geolocalización
3. Coordenadas enviadas a backend: `POST /api/pedidos/{id}/ubicacion`
4. Historial actualizado en tiempo real

**Requisitos:**
- HTTPS (en producción)
- Permiso de geolocalización del navegador

## 📝 Cambios Recientes

### Rama: `conexion-modulo-repartidor`
Conectar el módulo Repartidor al backend:

✅ **Cambios implementados:**
- Reemplazar mocks locales con llamadas reales a `/api/pedidos`
- Implementar cambio de estado: `PATCH /api/pedidos/{id}/estado`
- Implementar tracking GPS: `POST /api/pedidos/{id}/ubicacion`
- Autenticación con JWT desde AuthContext
- Mapeo correcto de estados backend: `ASIGNADO`, `EN_TRANSITO`, `ENTREGADO`

**Archivos modificados:**
- `src/modules/repartidor/services/repartidorServices.js`
- `src/modules/repartidor/components/EstadoSelector.jsx`
- `src/modules/repartidor/components/TrackingComponent.jsx`
- `src/modules/repartidor/pages/DashboardRepartidor.jsx`

## 🧪 Testing

Para probar el módulo repartidor conectado:

1. Asegúrate que el backend esté corriendo: `docker-compose up`
2. Ejecuta el frontend: `npm run dev`
3. Login como repartidor: `repartidor@test.com` / `password123`
4. Verifica que carguen pedidos reales del backend
5. Cambia estado de pedido → debe actualizarse en backend
6. Inicia tracking GPS → coordenadas enviadas a backend

## 📊 Estado de Módulos

| Módulo | Estado | Conectado al Backend |
|--------|--------|----------------------|
| Auth | ✅ Completo | ✅ Sí |
| Admin | ⚠️ Parcial | ⚠️ Parcial (dashboard usa mocks) |
| Operador | ✅ Completo | ✅ Sí |
| Repartidor | ✅ Completo | ✅ Sí (rama: `conexion-modulo-repartidor`) |

## 🔄 Fallback Mechanism

Si el backend no está disponible:
- **Login:** Usa credenciales mock (credentialsMock.js)
- **Usuarios:** Usa MOCK_CREDENTIALS como fallback
- **Pedidos:** No tiene fallback (requiere backend real)

## 🛠️ Desarrollo

### Agregar un nuevo servicio

```javascript
// src/services/miServicio.js
const API_BASE = 'http://localhost:8080';

export const miEndpoint = async (id, token) => {
  const res = await fetch(`${API_BASE}/api/ruta/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error');
  return await res.json();
};
```

### Proteger una ruta

```jsx
// Usa PrivateRoute del módulo auth
<Route
  path="/admin/*"
  element={<PrivateRoute allowedRoles={[ROLES.ADMINISTRADOR]} />}
/>
```

## 📄 Licencia

Este proyecto es parte del sistema LogisWeb.

## 👤 Contacto

Para preguntas o reportar bugs, contacta al equipo de desarrollo.
