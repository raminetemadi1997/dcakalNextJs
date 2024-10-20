import React from "react";
//css
import styles from "../../assets/css/main/MainSlider.module.css";
//components
import SelectedCategories from "../SelectedCategories";
import SwiperCarousel from "@/components/SwiperCarousel";
import Banner from "../Banner";

const MainSlider = ({ imageSlider, partItems }) => {
  
  return (
    <div
      className={`w-full h-auto pb-0 grid sm:grid-cols-4 grid-cols-1 sm:grid-flow-col-dense sm:gap-4 gap-y-8 sm:grid-rows-[repeat(3,max-content)] grid-rows-[repeat(2,max-content)] p-4 px-0 ${styles.container} mb-8 max-sm:h-fit`}
    >
     
      {partItems &&
        partItems.map((items) => {
          return (
            <div key={items.id} className="sm:col-span-1 sm:block hidden">
              <Banner src={items} />
            </div>
          );
        })}

      <div className="sm:col-span-4 sm:row-span-2 row-span-1 col-span-1">
        <SwiperCarousel type="banner" imageSlider={imageSlider} />
      </div>
      
    </div>
  );
};

export default MainSlider;
