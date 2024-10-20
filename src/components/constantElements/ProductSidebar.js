import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import SelectCustom from "./SelectCustom";
import Tooltip from "@mui/material/Tooltip";
import ButtonCustom from "../../components/constantElements/ButtonCustom";
import TimerCustom from "../constantElements/TimerCustom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "@/lib/axios";
import CartModal from "../modals/CartModal";
import MopedIcon from '@mui/icons-material/Moped';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { useMediaQuery } from "@mui/material";
import TransitionsModal from '@/components/modals/BetterPrice'
import { ResetApi } from "@/context/ResetApiContext";
import ImageCustom from "./ImageCustom";
import { SettingApi } from "@/context/api/Setting";
import { SignalCellularNullOutlined } from "@mui/icons-material";



const ProductSidebar = ({ data = null, relatedPackagesItems, discountHandler }) => {



  const { dataSetting } = useContext(SettingApi);
  //for semi product
  const [count, setCount] = useState(1);
  const [packageSelect, setPackageSelect] = useState(data.active_package[0]);
  const [selected, setSelected] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [services, setServices] = useState(
    data.active_package.length > 0 && packageSelect.services.map((e) => null)
  );

  const { setReset } = useContext(ResetApi)
  //for semi product

  // for simple product
  const [colorSelect, setColorSelect] = useState(0);

  const [colorData, setColorData] = useState(
    data.active_colors.length > 0 && data.active_colors[0]
  );

  const [metaData, setMetaData] = useState(
    data.active_metas.length > 0 && data.active_metas.map((e) => e.data[0])
  );

  const [metaSelect, setMetaSelect] = useState(
    data.active_metas.length > 0 && data.active_metas.map((e) => 0)
  );

  const [metaDataService, setMetaDataService] = useState(
    data.active_meta_services.length > 0 &&
    data.active_meta_services.map((e) => null)
  );

  const [serviceSelect, setServiceSelect] = useState(
    data.active_meta_services.length > 0 &&
    data.active_meta_services.map((e) => null)
  );

  const metaChange = (i, event) => {
    const newArray = [...metaSelect];
    newArray[i] = event.target.value;
    setMetaSelect(newArray);

    const newArrayValue = [...metaData];
    newArrayValue[i] = data.active_metas[i].data[event.target.value];
    setMetaData(newArrayValue);
  };

  const serviceChange = (i, event) => {
    const newArrayService = [...serviceSelect];
    newArrayService[i] = event.target.value;
    setServiceSelect(newArrayService);

    const newArrayServiceValue = [...metaDataService];
    newArrayServiceValue[i] =
      data.active_meta_services[i].data[event.target.value];
    setMetaDataService(newArrayServiceValue);
  };

  // for simple product

  let sumPrice = 0;
  let subPrice = 0;
  let metaArray = [];

  if (services) {
    services.map((e) => {
      if (e) {
        metaArray.push(e.id);
        sumPrice += Number(e.price_increase);
      }
    });
  }



  if (packageSelect) {
    if (!Array.isArray(packageSelect.discount)) {
      let calculate;
      if (packageSelect.discount.type == 0) {
        calculate =
          ((Number(packageSelect.price) + sumPrice) *
            packageSelect.discount.percentage) /
          100;
      } else {
        calculate =
          Number(packageSelect.price) +
          sumPrice -
          packageSelect.discount.percentage;
      }
      subPrice += Number(calculate);
    }
  }

  if (colorData.price_increase) {
    sumPrice += Number(colorData.price_increase);
  }

  if (metaDataService) {
    metaDataService.map((e) => {
      if (e) {
        sumPrice += Number(e.price_increase);
        if (!Array.isArray(e.discount)) {
          let calculate;
          if (e.discount.type == 0) {
            calculate =
              ((Number(data.price) + sumPrice) * e.discount.percentage) / 100;
          } else {
            calculate = Number(data.price) + sumPrice - e.discount.percentage;
          }
          subPrice += Number(calculate);
        }
        metaArray.push(e.id);
      }
    });
  }








  if (metaData) {
    metaData.map((e) => {
      if (e) {
        sumPrice += Number(e.price_increase);
        if (!Array.isArray(e.discount)) {
          let calculate;
          if (e.discount.type == 0) {
            calculate =
              ((Number(data.price) + sumPrice) * e.discount.percentage) / 100;
          } else {
            calculate = Number(data.price) + sumPrice - e.discount.percentage;
          }
          subPrice += Number(calculate);
        }
        metaArray.push(e.id);
      }
    });
  }

  if (colorData) {
    if (!Array.isArray(colorData.discount)) {
      let calculate;
      if (colorData.discount.type == 0) {
        calculate =
          ((Number(data.price) + sumPrice) * colorData.discount.percentage) /
          100;
      } else {
        calculate =
          Number(data.price) + sumPrice - colorData.discount.percentage;
      }

      // subPrice += Number(colorData.discount.discount_amount)
      subPrice += Number(calculate);
    }
    metaArray.push(colorData.id);
  }

  const setOpenData = (data) => {
    setOpenModal(data);
  };

  const packageChange = (event) => {
    setSelected(event.target.value);
    setPackageSelect(data.active_package[event.target.value]);
    setServices(packageSelect.services.map((e) => null));
  };

  const serviceHandler = (event, service, i) => {
    const value = service.items[event.target.value];
    const newArray = [...services];
    newArray[i] = value != undefined ? value : null;
    setServices(newArray);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios.get("/sanctum/csrf-cookie");
    if (packageSelect && packageSelect.marketable == 0) {
      axios
        .post(`api/add-to-cart-semi/${data.slug}`, {
          number: count,
          package: packageSelect.id,
          color_id: packageSelect.package_color_id,
          meta: metaArray
        })
        .then((response) => {

          setOpenModal(true);
          setReset(response.config.data);
        })
        .catch((error) => {
        });
    } else {
      if (data.marketable == 0 && data.price != 0) {
        axios
          .post(`api/add-to-cart/${data.slug}`, {
            number: count,
            meta: metaArray,
          })
          .then((response) => {
            setOpenModal(true);
            setReset(response.config.data);
          })
          .catch((error) => {
          });
      }
    }
  };
  const colorHandler = (color, i) => {
    setColorSelect(i);
    setColorData(color);
  };

  // realated packages
  useEffect(() => {
    if (packageSelect) {
      let slug = (`api/product-actions/related-package/${packageSelect.product_slug}`);
      axios.get(slug)
        .then((response) => {
          relatedPackagesItems(response.data.data.semi_relateds);
        }).catch(error => {
        })
    }
  }, [selected]);

  useEffect(() => {
    if (packageSelect) {
      if (!Array.isArray(packageSelect.discount)) {
        discountHandler(Math.floor(Number(subPrice / (Number(packageSelect.price) + sumPrice)).toFixed(2) * 100));
      } else {
        discountHandler(0)
      }
    } else {
      if (subPrice != 0) {
        discountHandler(Math.floor(Number(subPrice / (Number(data.price) + sumPrice)).toFixed(2) * 100));
      } else {
        discountHandler(0)
      }
    }
  })

  return data ? (
    <>
      <form
        className="bg-[#e7e7e761] h-full p-4 rounded-lg flex flex-col justify-between gap-4"
        onSubmit={submitHandler}
      >
        <section className="flex flex-col gap-4">
          {/* brand interview */}
          <section>
            <div className="sm:block hidden text-sm mb-2">برند سازنده: </div>
            <Link
              href={`/brand/${data.brand.slug}`}
              className="flex items-center justify-between rounded-lg bg-white p-2"
            >
              <p className={`text-xs`}>{data.brand.name}</p>
              <ImageCustom
                data={data.brand.image}
                alt={data.brand.image_alt}
                title={data.brand.image_alt}
                loading={"lazy"}
                width={35}
                height={35}
                size="small"
              />
            </Link>
          </section>
          {/* brand interview */}

          {/* packages and metas */}
          {data.active_metas.length > 0 ? (
            <>
              {data.active_metas.map((metas, i) => (
                <SelectCustom
                  key={metas.id}
                  data={metas.data}
                  label={metas.name}
                  selected={metaSelect[i]}
                  onChange={(event) => metaChange(i, event)}
                />
              ))}
            </>
          ) : null}


          {data.active_meta_services.length > 0 ? (
            <>
              {data.active_meta_services.map((service, i) => (
                <div key={i}>
                  <div className="text-sm mb-2">
                    نوع سرویس: {service.name}
                  </div>
                  <SelectCustom
                    data={service.data}
                    // label={service.name}
                    selected={serviceSelect[i] == null ? "service" : serviceSelect[i]}
                    onChange={(event) => serviceChange(i, event)}
                    type={"services"}
                  />

                </div>
              ))}
            </>
          ) : null}

          {data.active_package.length > 0 ? (
            <SelectCustom
              data={data.active_package}
              label="پکیج ها"
              onChange={packageChange}
              selected={selected}
            />

          ) : null}
          {/* packages */}

          {/* color */}
          {packageSelect ? (
            <section>
              <div className="text-sm mb-2">
                رنگ: {packageSelect.package_color_name}
              </div>
              <div className="flex gap-4 flex-wrap">
                <Tooltip arrow title={packageSelect.package_color_name}>
                  <div
                    className={`w-7 h-7 rounded-md border border-theme cursor-pointer`}
                    style={{ backgroundColor: packageSelect.package_color_code }}
                  ></div>
                </Tooltip>
              </div>
            </section>
          ) : null}

          {data.active_colors.length > 0 && (
            <section>
              <div className="text-sm mb-2">رنگ: {colorData.attribute_value}</div>
              <div className="flex gap-4 flex-wrap">
                {data.active_colors.map((color, i) =>
                  !Array.isArray(color.discount) ? (
                    Math.floor(
                      new Date(color.discount.end_date) -
                      new Date() / (1000 * 60 * 60 * 24)
                    ) ? (
                      <Badge
                        variant="dot"
                        color="error"
                        key={i}
                      >
                        <Tooltip arrow title={color.attribute_value}>
                          <div
                            className={`w-7 h-7 rounded-md border ${i == colorSelect ? "border-theme" : 'border-[#c4c4c4]'
                              } cursor-pointer`}
                            style={{ backgroundColor: color.color_code }}
                            onClick={() => colorHandler(color, i)}
                          ></div>
                        </Tooltip>
                      </Badge>
                    ) : null
                  ) : (
                    <Tooltip key={i} arrow title={color.attribute_value}>
                      <div
                        className={`w-7 h-7 rounded-md border ${i == colorSelect ? "border-theme" : 'border-[#c4c4c4]'
                          } cursor-pointer`}
                        style={{ backgroundColor: color.color_code }}
                        onClick={() => colorHandler(color, i)}
                      ></div>
                    </Tooltip>
                  )
                )}
              </div>
            </section>
          )}
          {/* color */}

          {/* services */}
          {packageSelect ? (
            <>
              {packageSelect.services.map((service, i) => (
                <div key={i}>
                  <div className="text-sm mb-2">
                    نوع سرویس: {service.title}
                  </div>
                  <SelectCustom
                    data={service.items}
                    // label={service.title}
                    selected={services[i] == null ? "service" : i}
                    onChange={(event) => serviceHandler(event, service, i)}
                    type="services"
                  />

                </div>
              ))}
            </>
          ) : null}
          {/* services */}

          {/* qauaranie */}

          <div className="sm:block flex items-center  sm:py-0 py-2 sm:border-t-0 sm:border-b-0 border-t border-b border-[#cfcfcf]">
            <div
              className={`w-full flex items-center first:border-b-0 sm:border-t border-t-0 sm:border-b  sm:pt-2 border-[#cfcfcf] sm:mb-2`}
            >
              {data.shipper ?
                <>

                  <RocketLaunchIcon
                    sx={{ color: "#009688", fontSize: "20px" }}
                  />
                  <p className="mr-2 lg:text-xs text-[10px]">{data.shipper}</p>
                </>
                :
                <>

                  <MopedIcon
                    sx={{ color: "#6d7083", fontSize: "20px" }}
                  />
                  <p className="mr-2 lg:text-xs text-[10px]">ارسال از 1 روز کاری دیگر</p>
                </>

              }
            </div>

            <div
              className={`w-full flex items-center sm:border-b border-b-0 sm:pb-2 border-[#cfcfcf] sm:mb-2`}
            >
              <WorkspacePremiumIcon
                sx={{ color: "#6d7083", fontSize: "20px" }}
              />
              {data.guarantee ?
                <p className="mr-2 lg:text-xs text-[10px]">گارانتی {data.guarantee}</p>
                :
                <p className="mr-2 lg:text-xs text-[10px]">ضمانت و اصالت کالا</p>
              }
            </div>
          </div>
          {/* qauaranie */}
        </section>

        <section className="flex flex-col gap-4">
          {/* timer */}
          {packageSelect ? (
            !Array.isArray(packageSelect.discount) ? (
              <>
                {packageSelect.discount.infinite_status == 0 &&
                  <div className="flex justify-between items-center">
                    <div className="text-[#DE1616] text-sm font-normal">
                      مدت زمان باقیمانده تا پایان تخفیف
                    </div>
                    <TimerCustom
                      endDate={packageSelect.discount.end_date}
                      icon={false}
                    />
                  </div>
                }
              </>
            ) : null
          ) : null}

          {!Array.isArray(data.discount) ? (
            <>
              {data.discount &&
              data.discount.infinite_status != 1 ?
                <div className="flex justify-between items-center">
                  <div className="text-[#DE1616] text-sm font-normal">
                    مدت زمان باقیمانده تا پایان تخفیف
                  </div>
                  <TimerCustom
                    endDate={data.discount.end_date}
                    icon={false}
                  />
                </div>
                :null
              }
            </>
          ) : null}
          {/* timer */}

          {/* price */}
          <div className="flex lg:flex-row sm:flex-col-reverse flex-row justify-between lg:items-center sm:items-start items-center">
            {packageSelect ?
              packageSelect.price != 0 ?
                <div className="flex gap-1 items-center lg:mt-0 sm:mt-4 mt-0">
                  <IconButton
                    size="small"
                    disabled={count <= 1 ? true : false}
                    onClick={() => setCount((prev) => prev - 1)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <div className="w-10 border bg-white text-center">{count}</div>
                  <IconButton
                    size="small"
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
                : null
              :
              data.marketable == 0
                && data.price != 0 ?

                <div className="flex gap-1 items-center lg:mt-0 sm:mt-4 mt-0">
                  <IconButton
                    size="small"
                    disabled={count <= 1 ? true : false}
                    onClick={() => setCount((prev) => prev - 1)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <div className="xl:w-10 lg:w-8 w-10 border bg-white text-center">{count}</div>
                  <IconButton
                    size="small"
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
                : null

            }

            {packageSelect ? (
              packageSelect.price != 0 &&
              <div>
                {!Array.isArray(packageSelect.discount) ? (
                  <>
                    {packageSelect.discount.type == 0 ? (
                      <div>
                        <div className="line-through text-end text-[#838383]">
                          {`${(
                            (Number(packageSelect.price) + sumPrice) *
                            count
                          ).toLocaleString()} تومان`}
                        </div>

                        <div className="font-bold text-red-500 text-xl">
                          {`${(
                            (Number(packageSelect.price) +
                              (sumPrice - subPrice)) *
                            count
                          ).toLocaleString()} تومان`}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                
                  <div className="font-bold text-end xl:text-xl lg:text-sm sm:text-xs text-xl xl:w-auto md:w-full w-auto">
                    {`${(
                    (Number(packageSelect.price) + sumPrice) *
                    count
                  ).toLocaleString()} تومان`}
                    </div>
                )}
              </div>
            ) : null}

            {data.marketable == 0 &&
              (data.price != 0 &&  data.type !=1 ) ? (
              <>
                {
                  subPrice == 0 ? (
                    !data.discount || Array.isArray(data.discount) ? (
                      <div className="font-bold text-end xl:text-xl lg:text-sm sm:text-xs text-xl xl:w-auto md:w-full w-auto">
                        {`${((Number(data.price) + sumPrice) * count).toLocaleString()} تومان`}
                      </div>
                    ) : data.discount.type == 0 ? (
                      <div className="w-full">
                        <div className="line-through text-end text-[#838383] xl:text-base lg:text-sm sm:text-xs text-base">
                          {`${(
                            (Number(data.price) + sumPrice) * count
                          ).toLocaleString()} تومان`}
                        </div>

                        <div className="font-bold text-end text-red-500 xl:text-xl lg:text-sm sm:text-xs text-xl">
                          {`${(
                            ((Number(data.price) + sumPrice) - ((Number(data.price) + sumPrice) * data.discount.percentage) /
                              100) * count
                          ).toLocaleString()} تومان`}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="line-through text-end text-[#838383] xl:text-base lg:text-sm sm:text-xs text-base">
                          {`${(
                            (Number(data.price) + sumPrice) * count
                          ).toLocaleString()} تومان`}
                        </div>

                        <div className="font-bold text-end text-red-500 xl:text-xl lg:text-sm sm:text-xs text-xl">
                          {`${(
                            ((Number(data.price) + sumPrice) - data.discount.percentage) * count
                          ).toLocaleString()} تومان`}
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="w-full">
                      <div className="line-through text-end text-[#838383] xl:text-base lg:text-sm sm:text-xs text-base">
                        {`${(
                          (Number(data.price) + sumPrice) * count
                        ).toLocaleString()} تومان`}
                      </div>

                      <div className="font-bold text-end text-red-500 xl:text-xl lg:text-sm sm:text-xs text-xl">
                        {`${(
                          ((Number(data.price) + (sumPrice - subPrice)) * count)
                        ).toLocaleString()} تومان`}
                      </div>
                    </div>
                  )}
              </>
            ) : null}
            {/* price */}
          </div>

          {/* submit button */}

          {packageSelect ?
            packageSelect.price != 0 ?
              <ButtonCustom
                text={"افزودن به سبد خرید"}
                fullWidth
              />

              :
              <ButtonCustom
                text={"تماس بگیرید"}
                fullWidth
                color={'#097969'}
                link={dataSetting.data.data.phones.top_desktop_phones ? `tel:${dataSetting.data.data.phones.top_desktop_phones}` : `#`}
              />
            :
            data.marketable != 1 ?
              <ButtonCustom
                text={
                  !packageSelect
                    ? data.marketable == 0
                      ?
                      data.price != 0 ?


                        "افزودن به سبد خرید"

                        :
                        "تماس بگیرید"



                      : data.marketable == 1
                        ? "تماس بگیرید"
                        : data.marketable == 2
                          ? "ناموجود"
                          : data.marketable == 3
                            ? "توقف تولید"
                            : null
                    : "افزودن به سبد خرید"
                }
                fullWidth
                color={
                  !packageSelect &&
                    data.marketable == 1 ? '#097969' : data.marketable == 2 ? '#D22B2B' : data.marketable == 3 ? "#808080" :


                      data.price != 0 ?

                        'var(--theme-color)'

                        :

                        '#097969'
                }
                disabled={
                  !packageSelect
                    ? data.marketable == 0 || data.marketable == 1
                      ? data.active_colors.length == 0
                        ? true
                        : false
                      : true
                    : false
                }
              />
              : dataSetting &&
              <ButtonCustom
                text={"تماس بگیرید"}
                fullWidth
                color={'#097969'}
                link={dataSetting.data.data.phones.top_desktop_phones ? `tel:${dataSetting.data.data.phones.top_desktop_phones}` : `#`}
              />
          }

          {/* submit button */}

          {/* time  update price */}
          {packageSelect ?
            <span className="lg:text-xs sm:text-[8px] text-sm mt-0 block text-center">بروزرسانی قیمت: {data.updated_at && data.updated_at}</span>
            : data.marketable == 0
            &&
            <span className="lg:text-xs sm:text-[8px] text-sm  mt-0 block text-center">بروزرسانی قیمت: {data.updated_at && data.updated_at}</span>
          }
          {/* time  update price */}
        </section>
      </form>
      <CartModal setOpen={setOpenData} openModal={openModal} />

      {/* <TransitionsModal /> */}

    </>
  ) : (
    "load"
  );
};

export default ProductSidebar;
