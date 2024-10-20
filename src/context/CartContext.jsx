"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";
import { MainModalContext } from "./modal/mainModal";

export const CartContextSet = createContext(null);

const CartContext = ({ children }) => {
  const slug = usePathname();
  const [pageValue, setPageValue] = useState(0);
  const [cartItems, setCartItems] = useState();
  const [cardType, setCardType] = useState();
  const [totalDiscount, setTotalDiscount] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [change, setChange] = useState();
  const [shipperIdContext , setShipperIdContext] = useState(null)
  const [addressIdContext , setAddressIdContext] = useState(null)

  const [bootCartData , setBootCartData] = useState(null)

  const [sidebarBoot , setSidebarBoot] = useState({
    freeShipperPrice : null,
    tips: null ,
    dataAlert : null,
  })

  const [policy , setPolicy] = useState({
    policyLink :null ,
    policyTitle:null ,
  })
  const { url } = useContext(MainModalContext);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`api${slug}`)
        .then((response) => {
          setCartItems(pageValue == 0 ? response.data.data.cart_items.data : response.data.data.next_buy.data);
          setCardType(response.data.type);
          setTotalDiscount(pageValue == 0 ?response.data.data.cart_items.total_discount : response.data.data.next_buy.total_discount);
          setFinalPrice(pageValue == 0 ? response.data.data.cart_items.final_price : response.data.data.next_buy.final_price);
          setDiscountPrice(pageValue == 0 ?response.data.data.cart_items.discount_price : response.data.data.next_buy.discount_price);
        })
        .catch((error) => {
          // alert('صفحه مورد نظر فاقد داده است')
        });
    };
    getData();

    
    
  }, [slug, change, totalDiscount, url , pageValue]);


  useEffect(()=>{
    
    axios.get('api/boot-cart').then(response=>{
      setSidebarBoot(prev=>({
        ...prev,
        freeShipperPrice:response.data.data.boot.free_shipper_price,
        tips:response.data.data.boot.tips,
        dataAlert:response.data.data.boot.alert,
      }))
      setPolicy(prev=>({
        ...prev,
        policyLink:response.data.data.boot.policy_link,
        policyTitle:response.data.data.boot.policy_title
      }))
      setBootCartData(response.data)

    })
  }, [])


  return (
    <CartContextSet.Provider
      value={{
        cartItems,
        cardType,
        totalDiscount,
        finalPrice,
        discountPrice,
        change,
        setChange,
        pageValue,
        setPageValue,
        sidebarBoot,
        policy,
        bootCartData,
        shipperIdContext,
        setShipperIdContext,
        addressIdContext,
        setAddressIdContext
      }}
    >
      {children}
    </CartContextSet.Provider>
  );
};

export default CartContext;
