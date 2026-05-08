import {createContext, useContext, useState} from 'react'
import { ROLES } from '../constants/roles';
import { mockUsuarios } from '../mock/mockUsuarios'; // Instruccion de importacion de usuarios desde el mockUsusarios de forma directa


const AuthContext = createContext(null)

export function AuthProvider({children})
{
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

// Login actualizado
const login = async (email, password) => {

    // Insrtuccion para buscar el usuario desde el mock
    const userFound = mockUsuarios.find(
        user =>
            user.email === email &&
            user.password === password
    )

    // Validacion de credenciales
    if (!userFound) {
        throw new Error('Credenciales invalidas')
    }

    // Simulacion de respuesta su existe usuario
    const mockResponse = {
        token: "123456", // valor ficticio para simulacion de autenticacion 
        user: userFound
    }

    // Almacenamiento de inicio de sesion
    setUser(mockResponse.user)
    setToken(mockResponse.token)

    console.log('AuthContext actualizado:', mockResponse.user)
}

    const logout = () => {
        setToken(null)
        setUser(null)
    }

    const value = {
        user,
        token,
        isAuthenticated: !!token, // se genera autenticacion del sistema
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