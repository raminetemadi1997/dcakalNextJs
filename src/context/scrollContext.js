'use client';

import { createContext, useState, useEffect } from "react";
export const ScrollContext = createContext({});

export const ScrollContextProvider = ({ children }) => {
    const [clientWindowHeight, setClientWindowHeight] = useState(0);
    
    const onScroll = () => {
        const { scrollY } = window;
        setClientWindowHeight(scrollY);
    }
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);
    return (
        <ScrollContext.Provider value={{ clientWindowHeight, setClientWindowHeight }}>
            {children}
        </ScrollContext.Provider>
    )
};


