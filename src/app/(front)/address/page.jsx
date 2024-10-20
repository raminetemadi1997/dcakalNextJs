"use client";
import CartSidebar from "@/components/cart/CartSidebar";
import styles from "@/assets/css/cart/Cart.module.css";
import dynamic from "next/dynamic";
import Title from "@/components/main/Title";
import { useEffect, useState, useContext } from "react";
import AddAddress from "@/components/modals/AddAddress";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";
import axios from "@/lib/axios";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import { SnakebarContext } from "@/context/snakebar";
import { useRouter } from "next/navigation";
import { ResetApi } from "@/context/ResetApiContext";
import ImageCustom from "@/components/constantElements/ImageCustom";
import { SettingApi } from "@/context/api/Setting";
import { CartContextSet } from "@/context/CartContext";

const Tabs = dynamic(() => import("@mui/material/Tabs"), {
  ssr: false,
  loading: () => (
    <div className="h-[48px] w-full bg-gray-300 animate-pulse dark:bg-gray-700"></div>
  ),
});

const RadioGroup = dynamic(() => import("@mui/material/RadioGroup"), {
  ssr: false,
  loading: () => (
    <div className="h-[48px] w-full bg-gray-300 animate-pulse dark:bg-gray-700"></div>
  ),
});

const Radio = dynamic(() => import("@mui/material/Radio"), {
  ssr: false,
  loading: () => (
    <div className="h-[38px] w-[38px] ml-2 bg-gray-300 animate-pulse dark:bg-gray-700 rounded-full"></div>
  ),
});

const Tab = dynamic(() => import("@mui/material/Tab"), { ssr: false });

const FormControlLabel = dynamic(
  () => import("@mui/material/FormControlLabel"),
  { ssr: false }
);

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
});

const PsychologyAltIcon = dynamic(
  () => import("@mui/icons-material/PsychologyAlt"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="circular" animation="wave" width={100} height={100} />
    ),
  }
);

const overRide = () => ({
  display: "block",
  margin: "0 auto",
});

const Page = () => {
  const { dataUser } = useContext(SettingApi);
  const { reset, setReset } = useContext(ResetApi);
  const { setAddressIdContext , setShipperIdContext } = useContext(CartContextSet);
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const mobile = useMediaQuery("(max-width:540px)");
  const tablet = useMediaQuery("(min-width: 540px) and (max-width: 768px)");
  const [firstName, setFirstName] = useState(null);
  const [family, setFamily] = useState(null);
  const [editData, setEditData] = useState("");
  const [onChange, setOnchange] = useState();
  const [accesPayment, setAccessPayment] = useState(false);

  //snakebar context
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);

  const [result, setResult] = useState(null);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
       
        const fetchedData = await axios.get("api/address");
        
        if (fetchedData.data.redirect != "") {
          router.push(fetchedData.data.redirect);
        } else {
          if (fetchedData) {
            setResult(fetchedData);
            setAccessPayment(fetchedData.data.data.access_payment);
          }
        }
      } catch (error) {
        router.push(`/login`);
        // router.push(`/${error.response.data.redirect}`);
      }
    };
    // if (dataUser) {
    //   if (dataUser.data.activation == 1) {
    //     axios.get("api/address").then((response) => {
    //       setResult(response);
    //       setAccessPayment(response.data.data.access_payment);
    //     });
    //   }
    // } else {
    //   router.push("/login");
    // }

    const getData = async () => {
      axios
        .get("api/cart")
        .then((response) => {
          setCartData(response.data.data.cart_items);
        })
        .catch((error) => {});
    };

    getData();
    getUser()
  }, [router, onChange, reset, dataUser]);

  const openHandler = () => {
    setOpenModal(true);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const data = (data) => {
    setOpenModal(data);
  };

  const acceptHandler = () => {
    axios.get("/sanctum/csrf-cookie");
    axios
      .post("api/user-profile", {
        first_name: firstName,
        last_name: family,
      })
      .then((response) => {
        if (response.data.data.access_payment == false) {
          if (response.data.data.user.activation == 1) {
            setOpenAlarm(true);
            setMessage("اطلاعات شما با موفقیت ثبت شد");
            setReset("success");
          }
        }
      })
      .catch((error) => {
        setOpenAlarm(true);
        setMessage(error.response.data.message);
        setModes("error");
      });
  };

  const [addressId, setAddressId] = useState(null);
  const [shipperChange, setShipperChange] = useState([]);
  const [shipperId, setShipperId] = useState("");
  const [shipperPrice , setShipperPrice] = useState(0)


  const handleAddressChange = (event) => {
    setShipperPrice(null)
    setShipperId("");
    setAddressId(event.target.value);
    setAddressIdContext(event.target.value);
    axios
      .get(`api/shipper/${event.target.value}`)
      .then((response) => {
        setShipperChange(response.data);
      })
      .catch((error) => {
        setOpenAlarm(true);
        setMessage(error.response.data.message);
        setModes("error");
      });
  };

  const handleShipperChange = (event) => {
    setShipperId(event.target.value);
    setShipperIdContext(event.target.value)
    setShipperPrice(event.target.name);
    
  };

  const editHandler = (address) => {
    setOpenModal(true);
    setEditData(address);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditData("");
  };

  const changeData = (data) => {
    setOnchange(data);
    setOpenModal(false);
  };

  return (
    <>
      <section className={styles.content}>
        <div>
          <Tabs
            value={value}
            aria-label="basic tabs example"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root.Mui-selected": {
                color: "var(--theme-color)",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "var(--theme-color)",
              },
            }}
          >
            <Tab
              label={
                dataUser && dataUser.data.activation == 1
                  ? "انتخاب آدرس و نحوه ارسال"
                  : "تکمیل اطلاعات"
              }
              {...a11yProps(0)}
            />
          </Tabs>
        </div>
        <div className="p-4 flex flex-col items-start w-full">
          <Title
            titleValue={
              dataUser && dataUser.data.activation == 1
                ? "انتخاب آدرس"
                : "تکمیل اطلاعات"
            }
            position="head"
            className="mb-4"
          />

          {dataUser && dataUser.data.activation == 1 ? (
            <>
              {result && result.data.data.addresses.length > 0 && (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  // defaultValue="address_1"
                  name="radio-buttons-group"
                  sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                  onChange={handleAddressChange}
                  value={addressId}
                >
                  {result.data.data.addresses.map((address) => (
                    <li key={address.id} className="list-none">
                      <FormControlLabel
                        value={address.id}
                        sx={{
                          margin: 0,
                          width: "100%",
                          "& .MuiFormControlLabel-label": { width: "100%" },
                        }}
                        control={
                          <Radio
                            size="small"
                            sx={{
                              marginRight: 1,
                              color: "var(--theme-color)",
                              "&.Mui-checked": {
                                color: "var(--theme-color)",
                              },
                            }}
                          />
                        }
                        label={
                          <div className="flex items-center">
                            <div className="border rounded-lg w-full p-4 text-sm leading-6 flex justify-between items-start">
                              <span>
                                تحویل گیرنده: {address.recipient_name} <br />
                                تلفن همراه: {address.mobile} <br />
                                {address.phone && (
                                  <>
                                    تلفن ثابت: {address.phone} <br />
                                  </>
                                )}
                                آدرس: {address.full_address} <br />
                                کد پستی: {address.postal_code} <br />
                              </span>
                              <ButtonCustom
                                text="ویرایش"
                                variant="text"
                                onClick={() => editHandler(address)}
                              />
                            </div>
                          </div>
                        }
                      />
                    </li>
                  ))}
                </RadioGroup>
              )}
              <ButtonCustom
                text="افزودن آدرس جدید"
                fullWidth
                onClick={() => setOpenModal(true)}
              />
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <TextFieldCustom
                size="small"
                label="نام"
                required={true}
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName ? firstName : ""}
                //   focused={phoneNumber && true}
              />
              <TextFieldCustom
                size="small"
                label="نام خانوادگی"
                required={true}
                onChange={(event) => setFamily(event.target.value)}
                value={family ? family : ""}
                //   focused={phoneNumber && true}
              />

              <ButtonCustom
                variant="contained"
                text="تکمیل اطلاعات"
                fullWidth
                onClick={acceptHandler}
              />
            </div>
          )}

          {dataUser && dataUser.data.activation == 1 && (
            <>
              <Title titleValue="نحوه ارسال" position="head" className="mb-4" />
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                onChange={handleShipperChange}
                name="radio-buttons-group"
                defaultValue={shipperId}
                sx={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
                }}
              >
                {result && shipperChange.length > 0
                  ? shipperChange.map((shipper) => (
                      <FormControlLabel
                        
                        key={shipper.id}
                        defaultValue={shipperId}
                        value={shipper.id}
                        sx={{
                          margin: 0,
                          width: "100%",
                          "& .MuiFormControlLabel-label": { width: "100%" },
                        }}
                        control={
                          <Radio
                            name={shipper.price}
                            size="small"
                            sx={{
                              marginRight: 1,
                              color: "var(--theme-color)",
                              "&.Mui-checked": {
                                color: "var(--theme-color)",
                              },
                            }}
                          />
                        }
                        label={
                          <div className="border rounded-lg w-full p-4 grid grid-cols-4 gap-2 items-center ">
                            <ImageCustom
                              data={shipper.image}
                              alt={shipper.image_alt}
                              title={shipper.image_alt}
                              // props
                              loading={"lazy"}
                              width={59}
                              height={59}
                              fullWidth={false}
                            />
                            <p className="text-sm text-center">
                              {shipper.name}
                            </p>
                            <p className="text-sm text-center">
                              {shipper.duration}
                            </p>
                            {shipper.price_type == 1 ? (
                              <p className="text-sm text-center">پس کرایه</p>
                            ) : shipper.price_type == 2 ? (
                              <p className="text-sm text-center">رایگان</p>
                            ) : shipper.price_type == 0 ? (
                              <p className="text-sm text-center">{`${Number(
                                shipper.price
                              ).toLocaleString()} تومان`}</p>
                            ) : null}
                          </div>
                        }
                      />
                    ))
                  : result &&
                    result.data.data.shippers.map((shipper) => (
                      <FormControlLabel
                        key={shipper.id}
                        value={shipper.id}
                        sx={{
                          margin: 0,
                          width: "100%",
                          "& .MuiFormControlLabel-label": { width: "100%" },
                        }}
                        control={
                          <Radio
                            checked={false}
                            size="small"
                            sx={{
                              marginRight: 1,
                              color: "var(--theme-color)",
                              "&.Mui-checked": {
                                color: "var(--theme-color)",
                              },
                            }}
                          />
                        }
                        label={
                          <div className="border rounded-lg w-full p-4 grid grid-cols-4 gap-2 items-center ">
                            <ImageCustom
                              data={shipper.image}
                              alt={shipper.image_alt}
                              title={shipper.image_alt}
                              // props
                              loading={"lazy"}
                              width={59}
                              height={59}
                              fullWidth={false}
                            />
                            <p className="text-sm text-center">
                              {shipper.name}
                            </p>
                            <p className="text-sm text-center">
                              {shipper.duration}
                            </p>
                            <p className="text-sm text-center">{`${Number(
                              shipper.price
                            ).toLocaleString()} تومان`}</p>
                          </div>
                        }
                      />
                    ))}
              </RadioGroup>
            </>
          )}
        </div>
      </section>
      <CartSidebar
        addressId={addressId}
        shipperId={shipperId}
        type="address"
        pageValue={value}
        disabled={accesPayment && addressId && shipperId ? false : true}
        data={cartData}
        shipperPrice={shipperPrice}
      />

      {openModal && (
        <AddAddress
          provinces={result && result.data.data.provinces}
          openModal={openModal}
          onClose={closeModal}
          onClick={closeModal}
          editData={editData}
          onChangeHanler={changeData}
          userData={dataUser}
          
        />
      )}
    </>
  );
};

export default Page;