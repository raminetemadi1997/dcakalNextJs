// import React , { useContext} from "react";
import dynamic from "next/dynamic";
import Header from "@/layouts/Header";
import Navbar from "@/components/Navbar";
import { getGlobalPageMetadata, menuApi } from "@/data/loaders";
import QuickAccess from "@/layouts/QuickAccess";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "@/lib/axios";

import { SettingApi } from "@/context/api/Setting";
const menuData = await menuApi();

//dynamic parts
const Footer = dynamic(() => import("@/layouts/Footer"), { ssr: false });

export default async function Layout({ children }) {
  const phone = await axios.get('/api/boot-setting-api')
  
  // const { dataSetting } = useContext(SettingApi)

  // const mobile = useMediaQuery("(max-width:540px)");
  return (
    <>
        {/* {dataSetting && dataSetting.data.data.setting.slogun ? (
            <>
              {Math.floor(
                new Date( dataSetting && dataSetting.data.data.setting.slogun.end_date) - new Date() / (1000 * 60 * 60 * 24)
              ) >= 0 ? (
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: dataSetting && dataSetting.data.data.setting.slogun.body }}
                />
              ) : null}
            </>
          ) : null} */}
        <Header menuData={menuData.data} />
      <Navbar />

      {children}
      <Footer />
      <QuickAccess phone={phone.data.data.phones.top_desktop_phones} />
      {/* {mobile && (
        <QuickAccess
          phone={
            dataSetting && dataSetting.data.data.phones.bottom_desktop_phones
          }
        />
      )} */}
    </>
  );
}
