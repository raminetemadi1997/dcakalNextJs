'use client'
import React, { createContext, useState } from 'react';

export const AppBarContext = createContext(null)

const AppBarProvider = ({children}) => {
    const [appBarOpen , setAppBarOpen] = useState(false)
    return (
        <AppBarContext.Provider value={{appBarOpen , setAppBarOpen}}>
            {children}
        </AppBarContext.Provider>
    );
};

export default AppBarProvider;