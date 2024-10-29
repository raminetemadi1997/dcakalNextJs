// import React , { useContext} from "react";
import dynamic from "next/dynamic";
import Header from "@/layouts/Header";
import Navbar from "@/components/Navbar";
import { getGlobalPageMetadata, menuApi } from "@/data/loaders";
import QuickAccess from "@/layouts/QuickAccess";
import axios from "@/lib/axios";

const menuData = await menuApi();

//dynamic parts
const Footer = dynamic(() => import("@/layouts/Footer"), { ssr: false });

export default async function Layout({ children }) {
  const phone = await axios.get("/api/boot-setting-api");

  return (
    <>
      <Header menuData={menuData.data} />
      <Navbar />

      {children}
      <Footer />
      <QuickAccess phone={phone.data.data.phones.top_desktop_phones} />
    </>
  );
}
