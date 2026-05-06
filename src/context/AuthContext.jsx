import {createContext, useContext, useState} from 'react'

const AuthContext = createContext(null)

export function AuthProvide({children})
{
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const login = async (email, password) => {
        
        const MockResponse = {
            token: "123456",
            user: {
                id: 1,
                nombre: "Pepito Perez",
                rol: "Operador Logístico"
            }
        }

        setUser(MockResponse.user)
        setToken(MockResponse.token)
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