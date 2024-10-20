import React from "react";
import DashboardAside from "@/components/dashboard/DashboardAside";
export const metadata = {
  title: "اطلاعات حساب کاربری",
  robots:"noindex",
};

const IdinityLayout = ({children}) => {
  return (
    <>
    <DashboardAside />
    <div className="sm:col-span-4 col-span-5 rounded-lg border overflow-hidden">
      {children}
    </div>
    
    </>
  );
};

export default IdinityLayout;
