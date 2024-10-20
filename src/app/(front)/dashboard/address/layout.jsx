export const metadata = {
  title: "افزودن آدرس",
  robots:"noindex",
};

import DashboardAside from "@/components/dashboard/DashboardAside"


const AddressLayout = ({ children }) => {
  return (
    <>
      <DashboardAside />
      <div className="sm:col-span-4 col-span-5 rounded-lg border overflow-hidden">
        {children}
      </div>
    </>
  );
};

export default AddressLayout;
