export const metadata = {
  title: " سفارش های شما",
  robots:"noindex",
};

import DashboardAside from "@/components/dashboard/DashboardAside";
import OrderDetails from "@/components/modals/OrderDetails";
import OrderDetailProvider from "@/context/dashboard/OrderDetailContext";
const OrderLayout = ({ children }) => {
  return (
    <>
      <DashboardAside />
      <OrderDetailProvider>
        <div className="sm:col-span-4 col-span-5 rounded-lg border overflow-hidden">
          {children}
        </div>
        <OrderDetails />
      </OrderDetailProvider>
    </>
  );
};

export default OrderLayout;
