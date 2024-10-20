export const metadata = {
  title: "تخفیف ها شما",
  robots:"noindex",
};
import DashboardAside from "@/components/dashboard/DashboardAside"

const DiscountLayout = ({ children }) => {
  return (
    <>
      <DashboardAside />
      <div className="sm:col-span-4 col-span-5 rounded-lg border overflow-hidden">
        {children}
      </div>
    </>
  );
};

export default DiscountLayout;
