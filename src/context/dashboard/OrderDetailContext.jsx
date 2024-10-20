'use client'
import React, { createContext , useState } from 'react';

export const OrderDetailsContext = createContext()
const OrderDetailProvider = ({children}) => {
    const [openModal , setOpenModal] = useState(false)
    return (
        <OrderDetailsContext.Provider value={{openModal , setOpenModal}}>
            {children}
        </OrderDetailsContext.Provider>
    );
};

export default OrderDetailProvider;