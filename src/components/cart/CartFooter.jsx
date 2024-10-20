'use client'
import React, { useContext } from "react";
import styles from "../../assets/css/cart/Cart.module.css";
import {CartContextSet } from '@/context/CartContext'

const CartFooter = () => {
  const {bootCartData} = useContext(CartContextSet)

  return bootCartData && (
    bootCartData.data.boot.footer &&
     <footer className={styles.footer} dangerouslySetInnerHTML={{__html: bootCartData.data.boot.footer}}/>
  );
};

export default CartFooter;
