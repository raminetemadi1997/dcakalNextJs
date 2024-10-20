import React , { createContext, useState } from 'react';
export const ShownContext = createContext({});

export const ShownContextProvider = ({children}) => {
    const [shownSearchBox , setShownSearchBox] = useState(false);
    
    return (
        <ShownContext.Provider value={{shownSearchBox , setShownSearchBox}}>
            {children}
        </ShownContext.Provider>
    );
};

