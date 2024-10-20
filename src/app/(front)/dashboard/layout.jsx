// "use client";
// import React from "react";

import styles from "@/assets/css/dashboard/Dashboard.module.css";
import SnakebarContextProvider from "@/context/snakebar";
import AppBarProvider from "@/context/dashboard/AppBar";
import Layout from "@/components/Layout";
import FloatingButton from "@/components/FloatingButton";
import DashboardContext from "@/context/api/DashboardContext";

// export const metadata = {
//   title: "بنل کاربری",
// };

const DashboardLayout = ({ children }) => {
  // const mobile = useMediaQuery("(max-width:540px)");
  return (
    <>
      <title>داشبورد</title>
      <meta name="robots" content="noindex" />
      <DashboardContext>
        <SnakebarContextProvider>
          <AppBarProvider>
            {/* <AppBar /> */}
            <Layout>
              <main className={styles.container}>{children}</main>
              {/* {mobile && } */}
              <FloatingButton />
            </Layout>
            {/* <Footer /> */}
          </AppBarProvider>
        </SnakebarContextProvider>
      </DashboardContext>
    </>
  );
};

export default DashboardLayout;
