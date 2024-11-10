"use client";
//React
import React, { useContext } from "react";
//Image
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PinDropIcon from "@mui/icons-material/PinDrop";
//nextTools
import Link from "next/link";
import Button from "@mui/material/Button";
import ImageCustom from "@/components/constantElements/ImageCustom";
import { SettingApi } from "@/context/api/Setting";
// styles

const Footer = ({}) => {
  const { dataSetting } = useContext(SettingApi);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  return dataSetting ? (
    <>
      <footer>
        {dataSetting.data.data.express.length > 0 && (
          <section className="w-full  sm:bg-[#E7E7E7] sm:py-4 py-0 flex justify-center">
            <section className="max-with-unique w-full grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:grid-rows-1 grid-rows-4 lg:gap-4 gap-1">
              {dataSetting.data.data.express.map((expressItems) => (
                <div
                  key={expressItems.id}
                  className="sm:border-none bg-[#E7E7E7] sm:py-0 py-2"
                >
                  <div className="relative w-full h-full flex flex-wrap items-center justify-center max-sm:justify-end max-sm:w-11/12 max-sm:mx-auto max-sm:h-full sm:flex-row flex-row-reverse">
                    <section>
                      <p className="w-full text-[#72777A] font-bold text-center text-base ml-4 h-12">
                        {expressItems.name}
                        <br />
                        <span className="text-xs font-thin">
                          {expressItems.description}
                        </span>
                      </p>
                    </section>
                    <div className=" h-full inline-flex justify-center items-center max-sm:pt-0 max-sm:left-8 max-sm:top-2 2xl:left-1/4 2xl:top-0">
                      <ImageCustom
                        data={expressItems.icon}
                        alt={expressItems.icon_alt}
                        title={expressItems.icon_alt}
                        // props
                        loading={"lazy"}
                        height={45}
                        width={45}
                        fullWidth={false}
                        size="original"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </section>
        )}
        <section className="w-full flex flex-wrap items-center justify-between  max-sm:h-auto">
          <div className="pay bg-[#72777A] w-full py-5">
            <section className="mx-auto max-with-unique pl-4 pr-8 grid xl:grid-cols-4 sm:grid-cols-5 grid-cols-1 sm:grid-rows-1 gap-4 place-items-center">
              <div className=" grid sm:grid-cols-3 grid-cols-2 gap-2 col-span-3  w-full">
                <ul className="grid grid-cols-1 xl:gap-2 gap-1">
                  <li className="text-right text-white font-bold">
                    خدمات مشتریان
                  </li>

                  {dataSetting.data.data.page_menu.bottom_right_menu.length >
                    0 &&
                    dataSetting.data.data.page_menu.bottom_right_menu.map(
                      (footerRightItems) => (
                        <li
                          key={footerRightItems.id}
                          className="text-right xl:text-base text-sm text-white mb-0 list-disc"
                        >
                          <Link href={`/${footerRightItems.url}`}>
                            {footerRightItems.name}
                          </Link>
                        </li>
                      )
                    )}
                </ul>

                <ul className="grid grid-cols-1 xl:gap-2 gap-1">
                  <li className="text-right text-white font-bold">
                    دی سی ای کالا
                  </li>
                  {dataSetting.data.data.page_menu.bottom_middle_menu.length >
                    0 &&
                    dataSetting.data.data.page_menu.bottom_middle_menu.map(
                      (footerMiddleItems) => (
                        <li
                          key={footerMiddleItems.id}
                          className="text-right text-white xl:text-base text-sm list-disc"
                        >
                          <Link href={`/${footerMiddleItems.url}`}>
                            {footerMiddleItems.name}
                          </Link>
                        </li>
                      )
                    )}
                </ul>

                {dataSetting.data.data.setting.footer.latest_categories.length >
                  0 && (
                  <>
                    <ul className="grid grid-cols-1 xl:gap-2 gap-1">
                      <li className="text-right text-white font-bold">
                        آخرین دسته بندی ها
                      </li>
                      {dataSetting.data.data.setting.footer.latest_categories.map(
                        (latest, i) => (
                          <li
                            key={i}
                            className="text-right text-white xl:text-base text-sm list-disc"
                          >
                            <Link
                              href={`/${latest.slug}`}
                              title={latest.main_name}
                            >
                              {latest.identity_name}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>

              {dataSetting.data.data.setting.footer &&
                dataSetting.data.data.setting.footer.trust && (
                  <div
                    className="trust w-full flex sm:gap-4 gap-2 justify-center xl:col-span-1 col-span-2"
                    dangerouslySetInnerHTML={{
                      __html: dataSetting.data.data.setting.footer.trust,
                    }}
                  />
                )}
            </section>
          </div>
          {dataSetting.data.data.socials.length > 0 && (
            <div className="address bg-theme  w-full h-full flex-wrap py-2 max-sm:w-full max-sm:p-0 max-sm:justify-center max-sm:flex-row-reverse">
              <div
                className="justify-between items-center flex sm:flex-row flex-col px-4 gap-2 p-2"
                style={{ maxWidth: "1358px", margin: "auto" }}
              >
                {dataSetting.data.data.setting.footer && (
                  <Button
                    variant="contained"
                    target="_blank"
                    sx={{
                      bgcolor: "#fff !important",
                      color: "#000",
                    }}
                    href={dataSetting.data.data.setting.footer.quick_link}
                    className={
                      "rounded-full w-80 max-sm:h-12 max-sm:d-inline-flex max-sm:items-center"
                    }
                  >
                    {dataSetting.data.data.setting.footer.quick_title}
                  </Button>
                )}
                <section className="max-with-unique flex justify-end">
                  <ul
                    className={`flex gap-4 items-center`}
                  >
                    {dataSetting.data.data.socials.map((socialItems) => (
                      <li
                        key={socialItems.id}
                        className="w-full h-full text-center"
                      >
                        <Link
                          title={socialItems.title}
                          href={socialItems.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ImageCustom
                            data={socialItems.image}
                            alt={socialItems.image_alt}
                            title={socialItems.image_alt}
                            // props
                            loading={"lazy"}
                            width={35}
                            height={35}
                            fullWidth={false}
                            size="original"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          )}
          <div className="phone bg-[#A1A3A8] w-full inline-flex flex-wrap py-5 h-full justify-around items-center max-sm:w-full max-sm:pt-4 max-sm:px-0">
            <section className="max-with-unique grid sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-4 place-items-start w-full px-4 items-center">
              <div className="map w-fit text-center max-sm:w-full max-sm:p-0 max-sm:mr-0 max-sm:text-sm max-sm:flex-wrap max-sm:px-0 row-span-2 sm:block flex flex-col items-start gap-4">
                {dataSetting.data.data.setting.footer.google_map && (
                  <div
                    className="google-map-code flex justify-center w-full"
                    dangerouslySetInnerHTML={{
                      __html: dataSetting.data.data.setting.footer.google_map,
                    }}
                  />
                )}
                <div className="address pt-0 text-center  max-sm:mr-0">
                  <p className="text-center m-0 font-weight-bold text-white font-semibold sm:text-sm text-xs max-sm:font-light">
                    <PinDropIcon sx={{ color: "white" }} />
                    آدرس:
                  </p>
                  <p className="text-white text-center mt-2 text-xs ">
                    {dataSetting.data.data.setting.address}
                  </p>
                </div>
              </div>
              <div className="w-full max-sm:my-0 max-sm:w-full row-span-1">
                <div className="w-full inline-flex flex-nowrap justify-center items-center pb-8 max-sm:pb-2 max-sm:justify-center max-sm:w-full">
                  <Link
                    className="text-white leading-loose text-2xl ml-2"
                    href={`tel:${dataSetting.data.data.phones.bottom_desktop_phones}`}
                  >
                    {dataSetting.data.data.phones.bottom_desktop_phones}
                  </Link>
                  <PhoneInTalkIcon sx={{ color: "white" }} />
                </div>
                <div
                  className="title m-0 text-white text-center text-sm max-sm:text-xs max-sm:font-light max-sm:w-full sm:leading-7 max-sm:leading-5"
                  dangerouslySetInnerHTML={{
                    __html: dataSetting.data.data.setting.footer.more_info,
                  }}
                />
              </div>
              <div className="shift w-full text-center mx-0 max-sm:my-0 max-sm:w-full flex sm:justify-center justify-center">
                <Link href={"/"} className="w-fit h-fit sm:mt-0 mt-5">
                  <picture>
                    <ImageCustom
                      data={dataSetting.data.data.setting.logo.logo}
                      alt={dataSetting.data.data.setting.logo.logo_alt}
                      title={dataSetting.data.data.setting.logo.logo_alt}
                      width={156}
                      height={63}
                      fullWidth={false}
                      size="original"
                    />
                  </picture>
                </Link>
              </div>
            </section>
          </div>
          <div className="w-full bg-[#72777A] text-xs p-1 py-4 max-sm:p-2 max-sm:text-xs sm:h-auto h-36">
            <p
              className="text-center text-white"
              dangerouslySetInnerHTML={{
                __html: dataSetting.data.data.setting.footer.copy_right,
              }}
            />
          </div>
        </section>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            dataSetting.data.data.setting.data_structure.local_business
          ),
        }}
      />
    </>
  ) : (
    <div className="h-[634.5px] w-full bg-gray-300 animate-pulse dark:bg-gray-700"></div>
  );
};

export default Footer;
