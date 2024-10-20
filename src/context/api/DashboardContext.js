'use client'
import React, { createContext, useState, useMemo } from 'react';
import axios from "@/lib/axios";


export const DashboardApi = createContext()

const DashboardContext = ({ children }) => {


    const [dashboardData, setDashboardData] = useState(null)


    useMemo(() => {
        axios.get('api/dashboard').then(response => {
            setDashboardData(response.data.data);
        })
    }, [])



    return (
        <DashboardApi.Provider value={{ dashboardData, setDashboardData }}>
            {children}
        </DashboardApi.Provider>
    );
};

export default DashboardContext;