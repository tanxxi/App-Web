import {createContext, useContext, useState, useEffect} from 'react'
import { ROLES } from '../constants/roles';
import { authenticateUser } from '../mock/credentialsMock';
import { loginApi } from '../services/authService';
import { mapRoleApiToApp } from '../services/userService';

const AuthContext = createContext(null)

export function AuthProvider({children})
{
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loadingSession, setLoadingSession] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoadingSession(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginApi(email, password);
            const appRole = mapRoleApiToApp(data.rol);
            const userObj = {
                id: data.id,
                nombre: data.nombre,
                email: data.email,
                rol: appRole
            };
            setUser(userObj);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(userObj));
            console.log('AuthContext: estado actualizado (API real)', userObj);
        } catch (error) {
            console.error('Error en autenticación real, intentando fallback mock:', error);
            // Fallback si es un error de red o de conexión (el backend no responde)
            if (
                error.message.includes('Failed to fetch') || 
                error.message.includes('NetworkError') || 
                error.message.includes('Network request failed') || 
                error.message.includes('Failed to execute')
            ) {
                const response = await authenticateUser(email, password);
                setUser(response.user);
                setToken(response.token);
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                console.log('AuthContext: estado actualizado (Mock Fallback)', response.user);
                return;
            }
            throw error;
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const value = {
        user,
        token,
        isAuthenticated: !!token, // se genera autenticacion del sistema
        login,
        logout,
        loadingSession
    }

    return (
        <AuthContext.Provider value = {value}>
            {!loadingSession && children}
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