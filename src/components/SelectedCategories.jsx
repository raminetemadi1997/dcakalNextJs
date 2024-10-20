'use client'
import React from "react";
//nextTools
import Link from "next/link";
import Title from "@/components/main/Title";
import styles from '@/assets/css/main/SelectedCategory.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageCustom from "./constantElements/ImageCustom";

const SelectedCategories = ({ type, simpleCategory }) => {

  const miniMobile = useMediaQuery("(max-width:375px)")
  const mobile = useMediaQuery("(max-width:600px)");
  const portraitTablets = useMediaQuery("(min-width:600px)  and (max-width:768px) ");
  const landscapeTablets = useMediaQuery("(min-width:768px) and (max-width:992px)");
  const laptops = useMediaQuery("(min-width:992px) and (max-width:1200px)");


  function response(porpose) {

      if (porpose == "width") {
          if (miniMobile) {
              return 114
          } else if (mobile) {
              return 140
          } else if (portraitTablets) {
              return 150
          } else if (landscapeTablets) {
              return 110
          } else if (laptops) {
              return 147
          } else {
              return 150
          }
      }

      else if (porpose == "height") {
          if (miniMobile) {
              return 114
          } else if (mobile) {
              return 140
          } else if (portraitTablets) {
              return 150
          } else if (landscapeTablets) {
              return 110
          } else if (laptops) {
              return 147
          } else {
              return 150
          }
      }

  }


  
  if (type == "topPage") {
    return (
      <>
        <section className="w-full flex justify-center items-center h-full mb-12">
          <div
            className={`w-full grid lg:grid-cols-6 sm:grid-cols-6 grid-cols-3 max-with-unique place-items-center sm:gap-4 gap-2  sm:px-4 px-2`}
          >
            {simpleCategory &&
              simpleCategory.map((item) => {
                
                return (
                  <div
                    key={item.id}
                    className="w-auto h-full inline-flex justify-center items-center sm:group"
                  >
                    <Link
                      href={item.link}
                      className="sm:hover:scale-110 transition-transform"
                    >
                      <div className="w-auto inline-flex justify-center items-center flex-wrap">
                        <div className="ease-in duration-400 transition-all rounded-full inline-flex justify-center items-center w-full group-hover:bg-whitel">
                         
                          <ImageCustom 
                            data={item.image}
                            alt={item.image_alt}
                            title={item.image_alt}

                            mobileData={item.mobile_image}
                            mobileAlt={item.mobile_image_alt}
                            mobileTitle={item.mobile_image_alt}

                            size="original"

                            loading={"lazy"}
                            fullWidth={false}
                            width={response("width")}
                            height={response("height")}
                          />
                        </div>
                        <p className="ease-in duration-400 transition-all lg:text-xs text-[10px] font-semibold mt-5 group-hover:text-[#ff7900]">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
      </>
    );
  } else if (type == "middlePage") {
    return (
      <>
        <section className="w-full flex flex-wrap justify-center h-full mb-6">
          <Title titleValue="دسته های منتخب" />
          <div className="w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-3 max-with-unique place-items-center sm:gap-4 gap-2 sm:px-4 px-2">
            {simpleCategory &&
              simpleCategory.map((item) => {
                return (
                  <div key={item.id}>
                    <Link href={item.link} title={item.title} className={`group ${styles.container} block h-60`}>
                      <div
                        style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 10px 0px" }}
                        className={`ease-in duration-400 transition-all w-fit h-fit bg-[#fff] group-hover:shadow-none  border-1 border-[#${item.border_color}] rounded-full p-1 mx-auto z-10 relative flex justify-center items-center`}
                      >
                        <ImageCustom 
                            data={item.image}
                            alt={item.image_alt}
                            title={item.image_alt}

                            mobileData={item.mobile_image}
                            mobileAlt={item.mobile_image_alt}
                            mobileTitle={item.mobile_image_alt}

                            loading={"lazy"}
                            width={response("width")}
                            height={response("height")}
                            fullWidth={false}
                            size="original"
                          />
                      </div>
                      <div
                        style={{ borderColor: `#${item.border_color}` }}
                        className={`w-full h-32 border rounded-2xl mx-auto flex flex-col justify-end pb-4 relative -top-12`}
                      >
                        <p className=" group-hover:text-white text-center">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
      </>
    );
  }
};
export default SelectedCategories;
