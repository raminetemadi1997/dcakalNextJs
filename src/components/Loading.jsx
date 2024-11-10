"use client";
import React from "react";
import Image from "next/image";
import styles from "../assets/css/Loading.module.css"

export default function Loading() {
  return (
    <Image
      src='/images/dcakala-logo.gif'
      alt="Example GIF"
      width={320} // عرض تصویر
      height={500} // ارتفاع تصویر
      className={styles.container}
    />
  );
}

