import React from "react";
import styles from "@/assets/css/head/Notification.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notification = ({ position, title, date }) => {
  return position == "dashboard" ? (
    <div className={styles.dashboard}>
      <div
        style={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <span style={{ fontSize: ".75rem" }}>{date}</span>
        <AccessTimeIcon sx={{ ml: 1, color: "#828282" }} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: title }} />
      <div className={styles.bell}>
        <NotificationsIcon sx={{ color: "#828282" }} />
      </div>
    </div>
  ) : (
    <div
      className={`w-full py-2 flex items-center justify-center ${styles.container} relative z-40`}
    >
      <p className="text-white text-sm">
        <span className="text-yellow-300">فروش ویژه </span>
        دوربین های داهوا (فروش محدود)
      </p>
    </div>
  );
};

export default Notification;
