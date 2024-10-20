export const metadata = {
  title: "نقد و بررسی ها",
  robots:"noindex",
};
import DashboardAside from "@/components/dashboard/DashboardAside"


const ReviewLayout = ({ children }) => {
  return (
    <>
      <DashboardAside />
      <div className="sm:col-span-4 col-span-5 rounded-lg border overflow-hidden">
        {children}
      </div>
    </>
  );
};

export default ReviewLayout;
