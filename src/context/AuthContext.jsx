import {createContext, useContext, useState} from 'react'
import { ROLES } from '../constants/roles';


const AuthContext = createContext(null)

export function AuthProvider({children})
{
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    // Cliente
    {
        id = 1,
        nombre = "Pepito Perez",
        email = "cliente@test.com",
        password = "1234",
        rol = ROLES.CLIENTE
    };

    // Operador logistico
    {
        id = 2;
        nombre = "Carlos Operador";
        email = "operador@test.com";
        password = "1234";
        rol = ROLES.OPERADOR_LOGISTICO
    };

    // Repartidor
    {
        id = 3;
        nombre = "Juan Repartidor";
        email = "repartidor@test.com";
        password = "1234";
        rol = ROLES.REPARTIDOR
    };

    // Administrador
    {
        id = 4;
        nombre = "Admin Sistema";
        email = "admin@test.com";
        password = "1234";
        rol = ROLES.ADMINISTRADOR
    }

    const logout = () => {
        setToken(null)
        setUser(null)
    }

    const value = {
        user,
        token,
        isAuthenticated: !!token, 
        login,
        logout
    }

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth must be used inside an AuthProvider')
    }

    return context
}