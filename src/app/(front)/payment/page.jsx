"use client";
import { useState, useContext, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import CartSidebar from "@/components/cart/CartSidebar";
import styles from "@/assets/css/cart/Cart.module.css";
import Title from "@/components/main/Title";
import { styled } from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import Skeleton from "@mui/material/Skeleton";
//images
import axios from "@/lib/axios";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import { SnakebarContext } from "@/context/snakebar";
import { useRouter } from "next/navigation";
// import CheckboxCustom from "@/components/constantElements/CheckboxCustom";
import TextareaCustom from "@/components/constantElements/TextareaCustom";
import { ResetApi } from "@/context/ResetApiContext";
import { CartContextSet } from "@/context/CartContext";
import ImageCustom from "@/components/constantElements/ImageCustom";

const CheckboxCustom = dynamic(
  () => import("@/components/constantElements/CheckboxCustom"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full my-2 h-[38px] px-4">
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%" }}
          height={38}
          animation="wave"
        />
      </div>
    ),
  }
);

//icon
const Tabs = dynamic(() => import("@mui/material/Tabs"), {
  ssr: false,
  loading: () => (
    <div className="h-[48px] w-full bg-gray-300 animate-pulse dark:bg-gray-700"></div>
  ),
});
const FormControlLabel = dynamic(
  () => import("@mui/material/FormControlLabel"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[38px] w-full bg-gray-300 animate-pulse dark:bg-gray-700"></div>
    ),
  }
);

const Radio = dynamic(() => import("@mui/material/Radio"), {
  ssr: false,
  loading: () => (
    <div className="h-[38px] w-[38px] ml-2 bg-gray-300 animate-pulse dark:bg-gray-700 rounded-full"></div>
  ),
});

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
});

const Tab = dynamic(() => import("@mui/material/Tab"), { ssr: false });

const Checkbox = dynamic(() => import("@mui/material/Checkbox"), {
  ssr: false,
});

const TextField = dynamic(() => import("@mui/material/TextField"), {
  ssr: false,
  loading: () => (
    <div className="h-[38px] w-full ml-2 bg-gray-300 animate-pulse dark:bg-gray-700"></div>
  ),
});

const ColorButtonOrder = styled(Button)(({ theme }) => ({
  color: "#fff",
  padding: ".5rem 0",
  width: "fit-content",

  "@media (max-width: 540px)": {
    marginTop: 15,
  },
  padding: ".5rem",
  backgroundColor: "var(--theme-color) !important",
  "&:hover": {
    backgroundColor: "var(--theme-color)",
  },
}));

export default function Page() {
  const { shipperIdContext } = useContext(CartContextSet);
  const [cartData, setCartData] = useState(null);
  const [value, setValue] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const discountRef = useRef();
  const [copan, setCopan] = useState("");
  const [copanId, setCopanId] = useState(null);
  const [copanAccept, setCopanAccept] = useState(null);
  const router = useRouter();
  const [checked, setChecked] = useState(true);
  const [textArea, setTextArea] = useState(null);
  const [radioId, setRadioId] = useState();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  //snakebar context
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  const [paymentSidebar, setPaymentSidebar] = useState({
    payPrice: null,
    orderAmount: null,
    discountAmount: null,
    deliveryAmount: null,
  });
  const [gateway, setGateway] = useState([]);
  const [gatewaySelect, setGatewaySelect] = useState(1);
  const { reset, setReset } = useContext(ResetApi);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const acceptHandler = () => {
    setDiscountCode(discountRef.current.value);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await axios.get("api/user");
        const fetchedData = await axios.get("api/payment");
        if (fetchedData.data.redirect != "") {
          router.push(fetchedData.data.redirect);
        } else {
          if (fetchedData) {
            setPaymentSidebar((prev) => ({
              ...prev,
              payPrice: fetchedData.data.data.order.pay_price,
              orderAmount: fetchedData.data.data.order.order_amount,
              discountAmount: fetchedData.data.data.order.discount_amount,
              deliveryAmount: fetchedData.data.data.order.delivery_amount,
            }));
            setGateway(fetchedData.data.data.gateways);
            setCopanId(fetchedData.data.data.copan);
            setRadioId(fetchedData.data.data.gateways[0].id);
          }
        }
      } catch (error) {
        router.push(`/login`);
        // router.push(`/${error.response.data.redirect}`);
      }
    };

    const getData = async () => {
      axios
        .get("api/cart")
        .then((response) => {
          setCartData(response.data.data.cart_items);
        })
        .catch((error) => {});
    };

    getData();

    getUser();
  }, [copanAccept, router, reset, shipperIdContext]);

  const copanHalder = (event) => {
    setCopan(event.target.value);
  };

  const acceptCopan = () => {
    axios
      .post("api/copan", {
        copan: copan,
      })
      .then((response) => {
        setCopanAccept(copan);
        setPaymentSidebar((prev) => ({
          ...prev,
          payPrice: response.data.data.order.pay_price,
          orderAmount: response.data.data.order.order_amount,
          discountAmount: response.data.data.order.discount_amount,
          deliveryAmount: response.data.data.order.delivery_amount,
        }));
        setOpenAlarm(true);
        setMessage("کوپن تخفیف اعمال شد");
        setModes("success");
        setReset(response.data.copan);
      })
      .catch((response) => {
        setOpenAlarm(true);
        setMessage(response.response.data.message);
        setModes("error");
      });
  };
  const deleteCopan = () => {
    axios
      .post("api/remove-copan")
      .then((response) => {
        setReset(response.data.data);

        // setPaymentSidebar((prev) => ({
        //   ...prev,
        //   payPrice: response.data.data.order.pay_price,
        //   orderAmount: response.data.data.order.order_amount,
        //   discountAmount: response.data.data.order.discount_amount,
        //   deliveryAmount: response.data.data.order.delivery_amount,
        // }));
        // setOpenAlarm(true);
        // setMessage("کوپن تخفیف اعمال شد");
        // setModes("success");
        // setReset(response.data.copan)
      })
      .catch((response) => {
        // setOpenAlarm(true);
        // setMessage(response.response.data.message);
        // setModes("error");
      });
  };

  const radioHandler = (event) => {
    setGatewaySelect(event.target.value);
    setRadioId(event.target.parentElement.getAttribute("id-data"));
  };

  return (
    <>
      <section className={styles.content}>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
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
            <Tab label="انتخاب روش پرداخت" {...a11yProps(0)} />
          </Tabs>
        </div>

        <div className="p-4 flex flex-col items-start">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={gatewaySelect}
            name="radio-buttons-group"
            onChange={radioHandler}
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1rem",
            }}
          >
            {gateway.length > 0 &&
              gateway.map((gatewayItems) => (
                <FormControlLabel
                  key={gatewayItems.id}
                  value={gatewayItems.type}
                  data-id={gatewayItems.id}
                  sx={{
                    margin: 0,
                    width: "100%",
                    "& .MuiFormControlLabel-label": { width: "100%" },
                  }}
                  control={
                    <Radio
                      id-data={gatewayItems.id}
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
                    <div className="border rounded-lg flex w-full p-4 items-center h-24">
                      <ImageCustom
                        data={gatewayItems.icon}
                        alt={gatewayItems.icon_alt}
                        title={gatewayItems.icon_alt}
                        loading={"lazy"}
                        fullWidth={false}
                        size="original"
                        width={59}
                        height={59}
                      />
                      <p className="text-sm">{gatewayItems.name}</p>
                    </div>
                  }
                />
              ))}
          </RadioGroup>

          <Title titleValue="کد تخفیف" position="head" className="mb-4" />
          <div className="w-full mb-4 flex gap-4">
            <TextFieldCustom
              size="small"
              onChange={copanHalder}
              value={copan ? copan : ""}
            />
            <ButtonCustom
              variant="contained"
              text="افزودن کد تخفیف"
              disabled={copan.length >= 1 ? false : true}
              onClick={acceptCopan}
            />
            {copanId && (
              <ButtonCustom
                variant="contained"
                text="حذف کد تخفیف"
                disabled={copanId ? false : true}
                onClick={deleteCopan}
                color="red"
              />
            )}
          </div>
          <Title titleValue="تایید سفارش" position="head" className="mb-4" />
          <div className="w-full mb-4">
            <TextareaCustom
              fullWidth
              size="small"
              label="توضیحات مورد نیاز درباره سفارش را وارد کنید"
              onChange={(event) => setTextArea(event.target.value)}
              value={textArea}
            />
          </div>
          <CheckboxCustom
            label="با شرایط و قوانین دی سی ای کالا موافقم"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </div>
      </section>
      <CartSidebar
        data={cartData}
        gatewaySelect={radioId}
        paymentSidebar={paymentSidebar}
        description={textArea}
        type="payment"
        approvment={checked}
      />
    </>
  );
}
