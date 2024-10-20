"use client";
import React, { createContext, useEffect, useState , useContext } from "react";
import { MainModalContext } from "@/context/modal/mainModal";
import axios from "@/lib/axios";

export const CartStatusContext = createContext();
const CartStatusContextProvider = ({ children }) => {
  const {url} =
  useContext(MainModalContext);
  const [dataStatus, setDataStatus] = useState();
  const [changeHandler , setChangeHandler] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try{
        const response = await axios.get("api/cart");
        setDataStatus(response.data);
      }
      catch (error) {
      }
    };
    getData();
  }, [changeHandler]);

  return (
    <CartStatusContext.Provider value={{ dataStatus, setDataStatus , changeHandler , setChangeHandler}}>
      {children}
    </CartStatusContext.Provider>
  );
};

export default CartStatusContextProvider;
