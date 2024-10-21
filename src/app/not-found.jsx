import Link from "next/link";
import React from "react";
import Image from "next/image";
import UnPower from "../../public/images/page/unpower.png";
import styles from "@/assets/css/NotFound.module.css";
import HomeIcon from '@mui/icons-material/Home';




const NotFound = () => {
  
  return (
    <div className={styles.body}>
      <div className={styles.parentPage}>
        <Image src={UnPower} alt="404-image" />
        <div className={`${styles.formReturn} absolute top-[25%] left-[10%]`}>
          <div className="text-center font-bold">
            ای گمشده ، این راه <br />
            آدرس اشتباه است
          </div>

          <span>
            <HomeIcon sx={{position:'absolute',top:'20px'}} />
            <Link href={"/"}>
              <p>بازگشت به صفحه اصلی</p>
            </Link>
          </span>
        </div>
        <div className={styles.errorReturn}>
          <h1>Not Found</h1>
          <h1>404</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
