"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../assets/css/head/CartStatus.module.css";
import Link from "next/link";
import { ChevronLeft } from "@mui/icons-material";
import axios from "@/lib/axios";
import Image from "next/image";
import EmptyCart from "../../../public/images/EmptyCart.png";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonCustom from "../constantElements/ButtonCustom";
import { SnakebarContext } from "@/context/snakebar";
import { ResetApi } from "@/context/ResetApiContext";
import ImageCustom from "../constantElements/ImageCustom";
import Skeleton from "@mui/material/Skeleton";

const CartStatus = ({ hoverHandler, badgeNumber }) => {
  const { setOpenAlarm, setMessage, setDuration, setModes } =
    useContext(SnakebarContext);
  const { reset, setReset } = useContext(ResetApi);
  const [data, setData] = useState(null);

  const [count, setCount] = useState(null);

  const [isLoading, setIsLoading] = useState(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("api/basket");
        setData(response.data);
        setCount(
          response.data.data.cart_items.data.map((e) => Number(e.number))
        );
        badgeNumber(response.data.data.cart_items.data);
      } catch (error) {}
    };
    getData();
  }, [reset , trigger]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;

  const decreaseHandler = (index, id) => {
    const newArray = [...count];
    newArray[index] = newArray[index] - 1;
    setCount(newArray);

    axios
      .post(`api/add-cart-number/${id}`, {
        number: count[index] - 1,
      })
      .then((response) => {
        setReset(response.config.data);
        setDuration(3000);
        setOpenAlarm(true);
        setMessage("از تعداد محصولات با موفقیت کم شد");
        setModes("error");
      });
  };

  const increaseHandler = (index, id) => {
    const newArray = [...count];
    newArray[index] = newArray[index] + 1;
    setCount(newArray);

    axios.get("/sanctum/csrf-cookie");
    axios
      .post(`api/add-cart-number/${id}`, {
        number: count[index] + 1,
      })
      .then((response) => {
        setReset(response.config.data);
        setDuration(3000);
        setOpenAlarm(true);
        setMessage("به تعداد محصولات با موفقیت اضافه شد");
        setModes("success");
      });
  };

  const deleteHandler = (id) => {
    setIsLoading(id);
    axios.get(`api/remove-from-cart/${id}`).then((response) => {
      setTrigger((prevTrigger) => !prevTrigger);
      setOpenAlarm(true);
      setModes("error");
      setMessage("محصول مورد نظر با موفقیت حذف شد");
      setDuration(3000);
    }).finally(()=>{
      setIsLoading(null);
    })
    ;
  };

  return (
    data && (
      <div
        className={`${styles.container} ${
          hoverHandler == true ? styles.show : null
        } sm:block hidden`}
      >
        <div className={styles.head}>
          <p>کالا در سبد خرید شما</p>
          <Link href={`/cart`}>
            مشاهده بیشتر
            <ChevronLeft sx={{ fontSize: "1.2rem" }} />
          </Link>
        </div>
        <ul className={`${styles.body} flex flex-col gap-4`}>
          {data.data.cart_items.data.map((cart, i) =>
            isLoading == cart.id ? (
              <div key={cart.id} className="w-full h-[151px] pb-2">
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%" }}
                  height={151}
                  animation="wave"
                />
              </div>
            ) : (
              <li
                key={cart.id}
                className="border-b pb-2 last:border-b-0 flex flex-col gap-2"
              >
                <div className="flex gap-2">
                  {/* cart status picture */}
                  <Link href={cart.product.slug} title={cart.product.name}>
                    <ImageCustom
                      data={cart.product.image}
                      alt={cart.product.image_alt}
                      title={cart.product.image_alt}
                      loading={"lazy"}
                      width={106}
                      height={106}
                      size="small"
                    />
                  </Link>
                  {/* cart status picture */}

                  {/* cart status body */}
                  <div className="flex flex-col gap-2">
                    <Link
                      href={cart.product.slug}
                      title={cart.product.name}
                      className="text-sm"
                    >
                      {cart.product.name}
                    </Link>

                    {/* price and counter */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 items-center">
                        <IconButton
                          size="small"
                          disabled={count[i] <= 1 ? true : false}
                          onClick={() => decreaseHandler(i, cart.id)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <div className="w-7 border bg-white text-center">
                          {count[i]}
                        </div>
                        <IconButton
                          size="small"
                          onClick={() => increaseHandler(i, cart.id)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </div>

                      <div>
                        {cart.discount != cart.price && cart.discount != 0 ? (
                          <div className="flex flex-col gap-1">
                            <div className="text-xs line-through text-end">
                              {`${(
                                (cart.price / Number(cart.number)) *
                                count[i]
                              ).toLocaleString()} تومان`}
                            </div>
                            <div className="text-sm text-red-500 font-bold text-end">
                              {`${(
                                (cart.discount / Number(cart.number)) *
                                count[i]
                              ).toLocaleString()} تومان`}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-sm font-bold text-end">
                              {`${(
                                (cart.price / Number(cart.number)) *
                                count[i]
                              ).toLocaleString()} تومان`}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* price and counter */}
                  </div>
                  {/* cart status body */}
                </div>

                {/* metas */}
                <div className="flex justify-between items-center bg-[#f6f6f6] p-2 rounded-lg">
                  <ul>
                    {/* color */}
                    {cart.product.color && (
                      <li className="flex items-center gap-1">
                        <div className="text-sm">رنگ : </div>
                        <div
                          className="w-5 h-5 rounded-full border"
                          style={{
                            backgroundColor: cart.product.color.color_code,
                          }}
                        ></div>
                      </li>
                    )}
                    {/* color */}
                  </ul>

                  <IconButton
                    size="small"
                    // disabled={count <= 1 ? true : false}
                    onClick={() => deleteHandler(cart.id)}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </div>
                {/* metas */}
              </li>
            )
          )}
          {data.data.cart_items.data.length < 1 && (
            <span className="w-full h-auto mt-10 flex justify-center flex-col items-center">
              <Image src={EmptyCart} alt="empy cart" width={150} height={150} />
              <p className="mt-2">سبد خرید شما خالی است</p>
            </span>
          )}
        </ul>
        <div className={styles.footer}>
          <div>
            <p>تعداد موارد</p>
            <p>{data.data.cart_items.data.length}</p>
          </div>
          <div>
            <p>جمع کل (بدون مالیات)</p>
            <p>
              {Number(data.data.cart_items.final_price).toLocaleString()}
              <span>تومان</span>
            </p>
          </div>
          <div>
            <p>مجموع تخفیفات</p>
            <p className="text-red-500">
              {Number(data.data.cart_items.discount_price).toLocaleString()}
              <span>تومان</span>
            </p>
          </div>
          <div>
            <p>مبلغ نهایی</p>
            <p>
              {Number(data.data.cart_items.total_discount).toLocaleString()}
              <span>تومان</span>
            </p>
          </div>

          <ButtonCustom fullWidth text={"تکمیل فرایند خرید"} link={"/cart"} />
        </div>
      </div>
    )
  );
};

export default CartStatus;
