import {createContext, useContext, useState} from 'react'
import { ROLES } from '../constants/roles';
import { mockUsuarios } from '../mock/mockUsuarios'; // Instruccion de importacion de usuarios desde el mockUsusarios de forma directa


import { authenticateUser } from '../mock/credentialsMock';

const AuthContext = createContext(null)

export function AuthProvider({children})
{
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const login = async (email, password) => {
        const response = await authenticateUser(email, password);
        setUser(response.user)
        setToken(response.token)
        console.log('AuthContext: estado actualizado', response.user);
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