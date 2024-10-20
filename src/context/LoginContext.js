'use client'
import React , {createContext, useState} from 'react';

export const LoginContext = createContext()
const LoginContextProvider = ({children}) => {
    const [token , setToken] = useState(null)
    const [phone , setPhone] = useState(null)
    return (
        <LoginContext.Provider value={{token , setToken , phone , setPhone}}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;