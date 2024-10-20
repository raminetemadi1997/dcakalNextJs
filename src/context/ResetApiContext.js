'use client'
import React , {createContext , useState} from 'react';

export const ResetApi = createContext();

const ResetApiContext = ({children}) => {
    const [reset , setReset] = useState(null)
    return (
        <ResetApi.Provider value={{reset , setReset}}>
            {children}
        </ResetApi.Provider>
    );
};

export default ResetApiContext;