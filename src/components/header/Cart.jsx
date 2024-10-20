import React, { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import CartStatus from "@/components/header/CartStatus";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";

const Cart = ({ type }) => {
  const [hover, setHover] = useState(false);
  const mobile = useMediaQuery("(max-width:540px)");

  const [number, setNumber] = useState(0);

  const badgeNumber = (count) => {
    setNumber(count.length);
  };



  return (
    <>
      <Badge badgeContent={number} color="error">
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`${
            type == `quickAccess`
              ? `rounded-full w-14 h-14`
              : `rounded-lg w-10 h-8`
          }  bg-white flex items-center justify-center relative cursor-pointer`}
        >
             <Link 
        href={'/cart'}>
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: "25px",
              color: "var(--theme-color-green)",
            }}
            className={`${type == `quickAccess` ? `` : ``} `}
          />
          </Link>
          <CartStatus hoverHandler={hover} badgeNumber={badgeNumber} />
          {/* {!mobile && (
            
          )} */}
        </div>
      </Badge>
    </>
  );
};

export default Cart;
