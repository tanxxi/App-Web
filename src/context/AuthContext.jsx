import {createContext, useContext, useState} from 'react'
import { ROLES } from '../constants/roles';


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