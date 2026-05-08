// Bloque en el que se va a definir cada uno de los users para el Login

import { ROLES } from "../constants/roles";

export const mockUsuarios = [

    {
        // Cliente
        id = 1,
        nombre = "Pepit Perez",
        email = "cliente@test.com",
        password = "1234",
        rol = ROLES.CLIENTE
    },

    {
        // Operador Logistico
        id = 2,
        nombre = "Carlos Operador",
        email = "operador@test.com",
        password = "1234",
        rol = ROLES.OPERADOR_LOGISTICO
    },

    {
        // Repartidor
         id = 3,
         nombre = "Juan Repartidor",
         email = "repartidor@test.com",
         password = "1234",
         rol = ROLES.REPARTIDOR
    },

    {
        // Administrador
        id = "4",
        nombre = "Admin Sistema",
        email = "admin@test.com",
        password = "1234",
        rol = ROLES.ADMINISTRADOR
    }
]