import React from "react";
//css
import styles from '../../assets/css/main/Discount.module.css'
import CountDownTimer from "../CountDownTimer";
import SwiperCarousel from "../SwiperCarousel";

const Discount = ({productDiscountSlider , endDate}) => {

  return (
    <div className={`w-full mb-16 sm:px-4 px-0 overflow-hidden dipslay-unique`}>
      <div
        className={`ticket w-full sm:h-auto h-fit border-dashed border-t-8 sm:border-r-8 sm:border-l-8 border-r-0 border-l-0 border-b-8 border-[#FFA500] sm:rounded-3xl rounded-none bg-white relative max-with-unique`}
      >
        <div
          className={`vector absolute w-24 h-24 sm:-top-[12%] -right-[50px] sm:right-[17%] z-10 bg-white rounded-full border-6 border-white rotate-[52deg]`}
        >
          <div
            className={`h-full w-full rounded-full border-8 border-[#FFA500]`}
          >
            <div
              className={`w-full h-full rounded-full border-dashed border-[#FFA500] border-8`}
            ></div>
          </div>
        </div>
        <div
          className={`w-full h-full bg-[#FFA500] right-0 sm:rounded-lg rounded-none flex justify-center items-center sm:p-2 p-0`}
        >
          <div
            className={`w-full h-full bg-white sm:rounded-lg rounded-none flex sm:flex-row flex-col justify-end items-center sm:py-2 sm:pl-2`}
          >
            <div className={`sm:absolute static sm:w-1/6 w-fit h-1/6 -right-[1%] top-[15%] ${styles.tag} flex justify-center items-center`}>
              <p className={`text-white font-normal sm:text-xl text-sm`}>تخفیف باکس</p>
            </div>
            <div className={`sm:w-[20%] w-fit h-fit sm:mt-16 mt-0 flex flex-col items-center`}>
              <p className={`text-black text-center lg:text-lg sm:w-2/3 w-fit text-sm mb-4`}>زمان باقی مانده تا اتمام تخفیف ها</p>
              <CountDownTimer type='discount' setDate={productDiscountSlider && productDiscountSlider[0].end_date} />
            </div>
            <div
              className={`sm:h-full h-4/5 sm:w-4/5 w-full bg-[white] rounded-se-lg rounded-ee-lg border-r-8 sm:border-dashed border-none border-[#FFA500]`}
            >
              <div
                className={`w-full h-full bg-[#FFA500] sm:rounded-se-lg sm:rounded-ee-lg sm:px-4 px-2 sm:py-4 py-8`}
              >
                <SwiperCarousel type='discount' productDiscountSlider={productDiscountSlider} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`vector absolute w-24 h-24 sm:-bottom-[12%] sm:right-[17%] sm:top-[unset] sm:left-[unset] -left-[50px] top-0 z-10 bg-white rounded-full border-6 border-[white] rotate-[52deg]`}
        >
          <div
            className={`h-full w-full rounded-full border-8 border-[#FFA500]`}
          >
            <div
              className={`w-full h-full rounded-full border-dashed border-[#FFA500] border-8`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
