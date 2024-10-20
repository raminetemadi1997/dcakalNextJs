'use client'
import axios from '@/lib/axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ResetApi } from "@/context/ResetApiContext";



export const SettingApi = createContext()

const Setting = ({ children }) => {
  const { reset } = useContext(ResetApi)

  const [dataSetting, setDataSetting] = useState(null);
  const [dataUser, setDataUser] = useState(null)


  useEffect(() => {
    const getSetting = async () => {
      try {
        const fetchedSetting = await axios.get("api/boot-setting-api");
        setDataSetting(fetchedSetting);
      } catch (error) { }
    };


    getSetting();
  }, []);


  useEffect(() => {
    axios.get('api/user').then((result) => {
      setDataUser(result);
    }).catch((err) => {
      setDataUser(null)
    });
  }, [reset]);



  return (
    <SettingApi.Provider value={{ dataSetting, dataUser }}>
      {children}
    </SettingApi.Provider>
  );
};

export default Setting;