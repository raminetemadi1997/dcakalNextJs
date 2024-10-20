export const metadata = {
  title: " پیام ها",
  robots:"noindex",
};

import DashboardAside from "@/components/dashboard/DashboardAside"
const NotificationsLayout = ({ children }) => {
  return (
    <>
    <DashboardAside />
    <div className="sm:col-span-4 col-span-5 rounded-lg border overflow-hidden">
      {children}
    </div>
    
    </>
  );
};

export default NotificationsLayout;
