import Layout from "@/components/Layout";
import styles from "@/assets/css/category/MainCategory.module.css";
import React from 'react'

export default function tagLayout({children}) {
  return (
    <Layout>
      <main className={`flex flex-col items-center ${styles.mainContainer}`}>
        {children}
      </main>
    </Layout>
  )
}
