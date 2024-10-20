import React , {useEffect, useState , useContext} from "react";
import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SettingApi } from "@/context/api/Setting";



const User = ({className}) => {
  const { dataUser } = useContext(SettingApi);
  

  return (
    <Link
      rel="preload"
      href={`${dataUser ? '/dashboard' :  '/login' }`}
      className= {`bg-white flex w-fit h-full rounded-full items-center justify-center lg:px-2 px-1 ${className}`} 
    >
        <AccountCircleIcon sx={{ fontSize: "25px", color:'var(--theme-color-green)' }} />
        <p className="text-xs lg:block hidden mr-1">
          {dataUser ? 
            dataUser.data.first_name ?
             `${dataUser.data.first_name} ` 
             :'تکمیل اطلاعات'.split('').length > 9 ? "تکمیل اطل..."  : 'تکمیل اطلاعات'
             : 'وارد شوید' }
          </p>
    </Link>
    
  );
};

export default User;
