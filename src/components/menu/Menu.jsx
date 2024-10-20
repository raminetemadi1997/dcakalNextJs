import React, { useEffect , useState } from "react";
import MenuIcon from '@mui/icons-material/Menu'

// const MenuIcon = dynamic(() => import("@mui/icons-material/Menu"), {
//   ssr: false,
//   loading: () => <Skeleton variant="rounded" width={30} height={22} />,
// });
// const Submenu = dynamic(() => import("@/components/menu/Submenu"), {
//   ssr: false,
// });
//context
import { getGlobalPageMetadata } from "@/data/loaders";
// const metaData = await getGlobalPageMetadata("api/home/header");
//component
import Submenu from "@/components/menu/Submenu";

const Menu = ({ position , className , mainMenu , menuCover }) => {
  const  [hover, setHover ] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  useEffect(() => {
    position === "navbar"
      ? isHovering
        ? (document.body.style.overflow = `hidden`)
        : (document.body.style.overflow = `auto`)
      : null;
  });


  return (
    <ul className={`relative xl:flex hidden ${className}`}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <li
        className={`text-xs text-white items-center hover:text-gray-300 cursor-pointer z-20 flex`}
      >
        <MenuIcon
          sx={{
            fontSize: `22px`,
            mr:.5
          }}
        />
        <div>
          دسته بندی محصولات
        </div>
        <Submenu hoverHandler={hover} mainMenu={mainMenu} menuCover={menuCover} />
      </li>
    </ul>
  );
};

export default Menu;
