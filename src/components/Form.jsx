"use client";
import React, { useContext, useState } from "react";
import formImage from "../../public/images/Forms/calculate-1.png";
import Image from "next/image";
import ButtonCustom from "./constantElements/ButtonCustom";
import door from "../../public/images/Forms/door.png";
import store from "../../public/images/Forms/store.png";
import soole from "../../public/images/Forms/soole.png";
import window from "../../public/images/Forms/window.png";
import park from "../../public/images/Forms/park.png";
import automatic from "../../public/images/Forms/automatic.png";
import sixCm from "../../public/images/Forms/6cm.png";
import tenCm from "../../public/images/Forms/10cm.png";
import search from "../../public/images/Forms/search.png";
import computation from "../../public/images/Forms/computation.png";
import railPacking from "../../public/images/Forms/rail-packing.png";
import accessories from "../../public/images/Forms/accessories.png";
import SelectCustom from "./constantElements/SelectCustom";
import CheckboxCustom from "./constantElements/CheckboxCustom";
import styles from "@/assets/css/Form.module.css";
import { useFormContext } from "@/context/FormContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SnakebarContext } from "@/context/snakebar";
import CheckIcon from "@mui/icons-material/Check";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import axios from "@/lib/axios";
import useMediaQuery from '@mui/material/useMediaQuery';

import FormModal from "./modals/FormModal";

//first radio
const firstRadio = [
  { id: 1, name: "فروشگاه", value: 0, type: 1 },
  { id: 2, name: "پارکینگ", value: 31000, type: 2 },
  { id: 3, name: "پنجره", value: 42000, type: 3 },
  { id: 4, name: "سوله", value: 100000, type: 4 },
  { id: 5, name: "نفررو", value: 850000, type: 5 },
];
const rails = [
  { id: 1, name: "انتخاب خودکار براساس ارتفاع و عرض", value: 0 },
  { id: 2, name: "ریل 6 سانتیمتر آلومینیوم زواردار", value: 200000 },
  { id: 3, name: "ریل 6 سانتیمتر فولادی زواردار", value: 230000 },
  { id: 4, name: "ریل 10 سانتیمتر فولادی زواردار", value: 590000 },
  { id: 5, name: "ریل 15 سانتیمتر فولادی زواردار", value: 6000000 },
];

const firstSelect = [
  { id: 1, name: "نوع تیغه را انتخاب کنید", price: 0 },
  { id: 12, name: "تیغه آلومینیوم 8 سانت دوپل وزن استاندارد", price: 1160000 },
  { id: 2, name: "تیغه آلومینیوم 8 سانت دوپل وزن سبک", price: 990000 },
  { id: 3, name: "تیغه آلومینیوم 10 سانت دوپل وزن سبک", price: 1190000 },
  { id: 4, name: "تیغه آلومینیوم 10 سانت دوپل وزن استاندارد", price: 1290000 },
  { id: 5, name: "تیغه آلومینیوم 8 سانت تک پل آکرول", price: 1450000 },
  { id: 6, name: "تیغه آلومینیوم 10 سانت دوپل آکرول", price: 1700000 },
  { id: 7, name: "تیغه گالوانیزه فوم دار 8 سانت", price: 1600000 },
  { id: 8, name: "تیغه فولادی ضخامت 1 میلیمتر", price: 13000000 },
  { id: 9, name: "تیغه پلی کربنات 4 میلیمتر با لوله استیل", price: 1650000 },
  {
    id: 10,
    name: "تیغه پلی کربنات 2 میلیمتر با یراق آلومینیوم",
    price: 1480000,
  },
  { id: 11, name: "تیغه 8 سانت دوپل لمینت طرح چوب", price: 1480000 },
];

const colors = [
  { id: 0, color: "سفید", code: "#fff", value: 0 },
  { id: 1, color: "بژ", code: "#FFDEAD", value: 100000 },
  { id: 2, color: "شکلاتی", code: "#472402", value: 100000 },
  { id: 3, color: "قهوه ای", code: "#914D03", value: 100000 },
  { id: 4, color: "مشکی", code: "#000", value: 100000 },
  { id: 5, color: "قرمز", code: "#C72100", value: 100000 },
  { id: 6, color: "زرد", code: "#FFB600", value: 100000 },
  { id: 7, color: "آبی", code: "#1063B0", value: 10000 },
  { id: 8, color: "سبز", code: "#97AA00", value: 100000 },
  { id: 9, color: "نارنجی", code: "#F07722", value: 100000 },
  { id: 10, color: "خاکستری", code: "#808080", value: 100000 },
];

const rollingGateSelect = [
  { id: 1, name: "انتخاب خودکار(براساس ارتفاع و عرض)" },
  { id: 2, name: "انتخاب دستی" },
];

const rollingMotor = [
  { id: 1, name: "نوع موتور را انتخاب کنید", price: 0, type: 0 },
  {
    id: 11,
    name: "موتور توبلار 100 نیوتن تیونی",
    price: 3500000 + 800000,
    type: 1,
  },
  {
    id: 2,
    name: "موتور توبلار 140 نیوتن پاور",
    price: 3900000 + 800000,
    type: 1,
  },
  {
    id: 3,
    name: "موتور توبلار 140 نیوتن بارزانته",
    price: 4620000 + 800000,
    type: 1,
  },
  { id: 4, name: "موتور ساید 300 نیوتن تیونی", price: 3550000, type: 1 },
  { id: 5, name: "موتور ساید 600 نیوتن تیونی", price: 3950000, type: 1 },
  { id: 6, name: "موتور ساید 300 نیوتن بارزانته", price: 7900000, type: 1 },
  { id: 7, name: "موتور ساید 600 نیوتن بارزانته", price: 8300000, type: 1 },
  {
    id: 10,
    name: "موتور ساید 750 نیوتن بارزانته upsدار ",
    price: 15800000,
    type: 1,
  },
];

const ironing = [
  { id: 1, label: "خیر", price: 1000000, type: 0 },
  { id: 2, label: "بله", price: 0, type: 1 },
];

const install = [
  { id: 1, label: "خیر", type: 0 },
  { id: 2, label: "بله", type: 1 },
]

const Form = ({ id }) => {
  const mobile = useMediaQuery("(max-width:540px)");
  let allPages = 8;
  const {
    setWidth,
    setHeight,
    setRollingGate,
    width,
    setBalde,
    setColorBlade,
    setRollingMotorValue,
    accessoriesValue,
    setAccessoriesValue,
    setIronValue,
    finalprice,
    setTrigger,
    setSupport,
    setRefresh,
    setProductType,
    productType,
    area,
    bladePrice,
    rollingGate,
    rollingMotorValue,
    supportPrice
  } = useFormContext();
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);

  const [widthBlur, setWidthBlur] = useState("");
  const [heightBlur, setHeightBlur] = useState("");
  const [widthValue, setWidthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    family: "",
    phoneNumber: "",
  });
  const [type, setType] = useState(1);

  const [page, setPage] = useState(0);
  const [radioSelect, setRadioSelect] = useState(0);
  const [radioSelect3, setRadioSelect3] = useState(0);
  const [colorSelect, setColorSelect] = useState(1);
  const [rollingGateSelected, setRollingGateSelected] = useState(0);
  const [accessory, setAccessory] = useState([]);

  const customCheckBox = [
    { id: 1, label: "جا قفلی هوشمند", value: 250000 },
    { id: 3, label: "کاور موتور ساید", value: 250000 },
    { id: 7, label: "کاور موتور رول", value: 250000 },
    { id: 4, label: "چشمی (فتوسل)", value: 800000 },
    { id: 5, label: "فلاشر", value: 800000 },
    { id: 6, label: "قفل برقی کرکره", value: 800000 },
  ];

  const [size, setSize] = useState([]);

  const [firstRadioValue, setFirstRadioValue] = useState("فروشگاه");
  const [secondRadioValue, setSecondRadioValue] = useState(1);
  const [bladeValue, setBladeValue] = useState(1);
  const [motorValue, setMotorValue] = useState(1);
  const [acceptCalculate, setAcceptCalculate] = useState("1");
  const [railName, setRailName] = useState(rails[0].name);
  const [bladeName, setBladeName] = useState(firstSelect[0].name);
  const [colorName, setColorName] = useState(colors[0].color);
  const [motorName, setMotorName] = useState(rollingMotor[0].name);
  const [motorType, setMotorType] = useState(rollingMotor[0].type);
  const [ironingValue , setIroningValue] = useState(1);
  const [ironingType , setIroningType] = useState(0)
  const [ironingPrice , setIroningPrice] = useState(ironing[0].price)
  const [installValue , setInstallValue] = useState(2);
  const [installtype , setInstalltype] = useState(install[1].type);
  const [orderType , setOrderType] = useState('')

  const firstRadioHandler = (event) => {
    setFirstRadioValue(event.target.name);
  };
  const railHandler = (event, price, id) => {
    setSecondRadioValue(event.target.value);
    setRollingGate(Number(price));
    setRailName(rails.find((item) => item.id == id)?.name);
  };

  const fisrtSelectHandler = (event) => {
    setBladeValue(event.target.value);
    setBalde(firstSelect.find((item) => item.id == event.target.value)?.price);
    setBladeName(
      firstSelect.find((item) => item.id == event.target.value)?.name
    );
  };

  const pageHandler = (event) => {
    event.preventDefault();

    if (page < allPages) {
      if (widthValue > 700 || heightValue > 700) {
        setPage("error");
      } else {
        setPage((prev) => prev + 1);
      }

      setTrigger((prevTrigger) => !prevTrigger);
    }
  };

  const pageHandlerSumbit = (event) => {
    event.preventDefault();

    if (page < allPages && width > 50) {
      setPage((prev) => prev + 1);
    } else {
      setOpenAlarm(true);
      setModes("error");
      setMessage("عرض باید بالای 50 سانتی متر باشد");
    }
  };

  const pageHandlerIncrease = (event) => {
    event.preventDefault();
    setPage((prev) => prev - 1);
  };

  const colorHandler = (index, value, event, name) => {
    setColorName(name);
    setColorSelect(event.target.name);
    setColorBlade(Number(value));
  };

  const rollingMotorHandler = (event) => {
    setMotorValue(event.target.value);
    setRollingMotorValue(
      rollingMotor.find((item) => item.id == event.target.value)?.price
    );
    setMotorName(
      rollingMotor.find((item) => item.id == event.target.value)?.name
    );
    setMotorType(
      rollingMotor.find((item) => item.id == event.target.value)?.type
    );
  };

  const accessoriesHandler = (event, id) => {
    const name = customCheckBox.find((item) => item.id == id)?.label;
    const price = customCheckBox.find((item) => item.id == id)?.value;

    if (event.target.checked) {
      setAccessory((prev) => [...prev, { name: name, price: price }]);
      setAccessoriesValue((prev) => [...prev, Number(event.target.value)]);
    } else {
      setAccessoriesValue(
        accessoriesValue.filter((num) => num !== Number(event.target.value))
      );
      setAccessory(accessory.filter((item) => item.name !== name));
    }
  };

  const ironHandler = (event) => {
    setIronValue(ironing.find((item) => item.id == event.target.value)?.price);
    setIroningValue(event.target.value)
    setIroningPrice(ironing.find((item) => item.id == event.target.value)?.price);
    setIroningType(ironing.find((item) => item.id == event.target.value)?.type);
  };

  const onBlurHandler = (event, type) => {
    if (type == "width") {
      setWidthBlur(
        event.target.value.length > 0 ? Number(event.target.value) : ""
      );
    } else {
      setHeightBlur(
        event.target.value.length > 0 ? Number(event.target.value) : ""
      );
    }
  };

  const onChangeHandler = (event, type) => {
    if (type == "width") {
      setWidthValue(
        event.target.value.length > 0 ? Number(event.target.value) : ""
      );
      //ارسال عرض به محاسبه گر
      setWidth(
        event.target.value.length > 0
          ? Number(event.target.value) / 100
          : Number(0)
      );
    } else {
      setHeightValue(
        event.target.value.length > 0 ? Number(event.target.value) : ""
      );
      // ارسال طول به محاسبه گر
      setHeight(
        event.target.value.length > 0
          ? (Number(event.target.value) + 30) / 100
          : Number(0)
      );
    }
  };

  const setectTypeHandler = (type, name) => {
    setType(type);
    setProductType(name);
  };
  const backHandler = () => {
    setPage(1);
  };

  const acceptHandler = (event) => {
    setAcceptCalculate(event.target.value);
    setSupport(install.find((item) => item.id == event.target.value)?.type);
    setInstalltype(install.find((item) => item.id == event.target.value)?.type);
  };

  const refreshHandler = () => {
    setPage(0);
    setRefresh((prevRefresh) => !prevRefresh);
  };
  const finalHandler = (event) => {
    setOrderType(event.target.title);
    
    setPage("final");
  };

  const resultHandler = () => {
    setOpenModal(true);
    axios.get("/sanctum/csrf-cookie");
    axios
      .post(`api/invoice-price/${id}`, {
        first_name: userInfo.name.length > 0 ? userInfo.name : "",
        last_name: userInfo.family.length > 0 ? userInfo.family : "",
        mobile: userInfo.phoneNumber.length > 0 ? userInfo.phoneNumber : "",
        invoice_type: productType.length > 0 ? productType : "",
        width: widthValue > 0 ? widthValue : "",
        height: heightValue > 0 ? heightValue : "",
        area: area > 0 ? area.toFixed(2) : "",
        rail: railName,
        rail_price: rollingGate,
        blade: bladeName,
        blade_price: Math.round(bladePrice),
        blade_color: colorName,
        motor_type: motorType,
        motor: motorName,
        motor_price: rollingMotorValue,
        accessories: accessory,
        ironing:ironingType,
        ironing_price : ironingPrice,
        install : installtype,
        install_price : supportPrice,
        order_type: orderType,
        final_price : finalprice
      })
      .then((result) => {})
      .catch((err) => {});
  };

  return (
    <section
      className={`border-2 rounded-lg border-theme-green mb-12  ${styles.container}`}
    >
      {page == 0 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            محاسبه و دریافت آنلاین پیش فاکتور
          </div>
          {/* heade */}

          {/* body */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            <Image src={formImage} alt="محاسبه قیمت" width={500} height={270} />
            <div className="flex flex-col sm:py-4 p-4 items-center justify-between">
              <div>
                برای برآورد دقیق هزینه پروژه کرکره برقی خود بر روی گزینه زیر
                کلیک کنید.
              </div>
              <ButtonCustom
                text="شروع محاسبه"
                color="#009688"
                onClick={pageHandler}
                title="شروع محاسبه"
              />
            </div>
          </div>
          {/* body */}
        </>
      ) : page == 1 ? (
        <form onSubmit={pageHandlerSumbit}>
          {/* head */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4 ">
            نوع و کارکرد کرکره برقی
          </div>
          {/* head */}

          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            {/* body */}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  نوع کاربری کرکره برقی را مشخص کنید
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  // value={value}
                  onChange={firstRadioHandler}
                  value={type}
                >
                  {firstRadio.map((first) => (
                    <FormControlLabel
                      onChange={() => setectTypeHandler(first.type, first.name)}
                      key={first.id}
                      value={first.type}
                      control={<Radio size="small" />}
                      label={first.name}
                      name={first.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <div className="flex flex-col gap-4">
                <div className="text-base">ابعاد ورودی را مشخص کنید (cm)</div>
                <div>
                  <div className="text-sm flex items-end">
                    عرض دهانه ورودی{" "}
                    <div className="px-2">
                      <Input
                        size="small"
                        dir="ltr"
                        type="number"
                        onBlur={(event) => onBlurHandler(event, "width")}
                        onChange={(event) => onChangeHandler(event, "width")}
                        sx={{ width: "50px", textAlign: "center" }}
                        error={widthBlur && widthBlur < 50 ? true : false}
                        value={widthValue}
                      />
                    </div>
                    سانتی متر
                  </div>
                  <div className="h-6">
                    {widthBlur && widthBlur < 50 && (
                      <FormHelperText error ext id="component-error-text">
                        عرض باید بالای 50 سانتی متر باشد
                      </FormHelperText>
                    )}
                  </div>
                </div>

                <div className="text-sm flex items-end">
                  ارتفاع دهانه ورودی
                  <div className="px-2">
                    <Input
                      size="small"
                      type="number"
                      dir="ltr"
                      onBlur={(event) => onBlurHandler(event, "height")}
                      onChange={(event) => onChangeHandler(event, "height")}
                      sx={{ width: "50px" }}
                      error={heightBlur && heightBlur < 50 ? true : false}
                      value={heightValue}
                    />
                  </div>
                  سانتی متر
                </div>
                <div className="h-6">
                  {heightBlur && heightBlur < 50 && (
                    <FormHelperText error ext id="component-error-text">
                      ارتفاع باید بالای 50 سانتی متر باشد
                    </FormHelperText>
                  )}
                </div>
              </div>

              <Image
                className="col-start-3"
                alt="محاسبه قیمت"
                width={300}
                height={225}
                src={
                  firstRadioValue == "فروشگاه"
                    ? store
                    : firstRadioValue == "پارکینگ"
                    ? park
                    : firstRadioValue == "پنجره"
                    ? window
                    : firstRadioValue == "سوله"
                    ? soole
                    : firstRadioValue == "نفررو"
                    ? door
                    : null
                }
              />
            </div>
            {/* body */}

            {/* footer */}
            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="مرحله قبلی"
                title="مرحله قبلی"
                color="#009688"
                onClick={pageHandlerIncrease}
              />
              <ButtonCustom
                text="مرحله بعدی"
                title="مرحله بعدی"
                color={
                  widthValue &&
                  widthValue >= 50 &&
                  heightValue &&
                  heightValue >= 50
                    ? "#009688"
                    : "#a4a4a4"
                }
                onClick={pageHandler}
                disabled={
                  widthValue &&
                  widthValue >= 50 &&
                  heightValue &&
                  heightValue >= 50
                    ? false
                    : true
                }
              />
            </div>
            {/* footer */}
          </section>
        </form>
      ) : page == 2 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            ریل کرکره برقی
          </div>
          {/* heade */}
          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            {/* body */}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  نوع ریل کرکره را انتخاب کنید
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={secondRadioValue}
                >
                  {rails.map((rail) =>
                    widthValue <= 400 ? (
                      <FormControlLabel
                        key={rail.id}
                        onChange={(event) =>
                          railHandler(event, rail.value, rail.id)
                        }
                        value={rail.id}
                        control={<Radio size="small" />}
                        label={rail.name}
                        name={rail.name}
                      />
                    ) : (
                      rail.id != 2 &&
                      rail.id != 3 && (
                        <FormControlLabel
                          key={rail.id}
                          onChange={(event) =>
                            railHandler(event, rail.value, rail.id)
                          }
                          value={rail.id}
                          control={<Radio size="small" />}
                          label={rail.name}
                          name={rail.name}
                        />
                      )
                    )
                  )}
                </RadioGroup>
              </FormControl>

              <Image
                className="col-start-3"
                alt="محاسبه قیمت"
                width={300}
                height={225}
                src={
                  secondRadioValue == "انتخاب خودکار براساس ارتفاع و عرض"
                    ? automatic
                    : secondRadioValue == "ریل 6 سانتیمتر فولادی زواردار"
                    ? tenCm
                    : sixCm
                }
              />
            </div>
            {/* body */}

            {/* footer */}
            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="مرحله قبلی"
                title="مرحله قبلی"
                color="#009688"
                onClick={pageHandlerIncrease}
              />
              <ButtonCustom
                text="مرحله بعدی"
                title="مرحله بعدی"
                color="#009688"
                onClick={pageHandler}
              />
            </div>
            {/* footer */}
          </section>
        </>
      ) : page == 3 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            تیغه کرکره برقی
          </div>
          {/* heade */}

          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            {/* body */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 px-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm">نوع تیغه را انتخاب کنید: </div>
                {/* <SelectCustom data={data} selected={0} /> */}
                <FormControl fullWidth size="small">
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    value={bladeValue}
                    // label="Age"

                    onChange={fisrtSelectHandler}
                  >
                    {firstSelect.map((firstSelect) =>
                      widthValue > 600 ? (
                        firstSelect.id != 12 &&
                        firstSelect.id != 2 &&
                        firstSelect.id != 5 &&
                        firstSelect.id != 7 &&
                        firstSelect.id != 8 &&
                        firstSelect.id != 9 &&
                        firstSelect.id != 8 &&
                        firstSelect.id != 10 &&
                        firstSelect.id != 11 && (
                          <MenuItem
                            key={firstSelect.id}
                            value={firstSelect.id}
                            name={firstSelect.value}
                          >
                            {firstSelect.name}
                          </MenuItem>
                        )
                      ) : widthValue > 400 ? (
                        firstSelect.id != 12 &&
                        firstSelect.id != 2 &&
                        firstSelect.id != 5 &&
                        firstSelect.id != 8 &&
                        firstSelect.id != 8 &&
                        firstSelect.id != 10 &&
                        firstSelect.id != 11 && (
                          <MenuItem
                            key={firstSelect.id}
                            value={firstSelect.id}
                            name={firstSelect.value}
                          >
                            {firstSelect.name}
                          </MenuItem>
                        )
                      ) : (
                        <MenuItem
                          key={firstSelect.id}
                          value={firstSelect.id}
                          name={firstSelect.value}
                        >
                          {firstSelect.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                <div className="text-sm">
                  مساحت کرکره شما با دورپیچ و کسر اندازه قوطی 0.1488 مترمربع
                  محاسبه گردید.
                </div>
                <div className="text-xs">
                  راهنمایی:
                  <br />
                  برای مساحت های زیر 30 متر مربع تیغه های 8 سانتیمتر یا پلی
                  کربنات لوله آلومینیومی پیشنهاد می شود.
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm">رنگ تیغه را انتخاب کنید: </div>
                {colors.length > 0 && (
                  <div className="grid grid-cols-11 gap-2">
                    {colors.map((color, i) => (
                      <label
                        key={color.id}
                        htmlFor={color.id}
                        className="w-5 h-5 cursor-pointer rounded-sm flex items-center justify-center"
                        style={{
                          backgroundColor: color.code,
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
                        }}
                      >
                        <input
                          value={color.value}
                          type="checkbox"
                          id={color.id}
                          name={color.id}
                          className="hidden"
                          onClick={(event) =>
                            colorHandler(i, color.value, event, color.color)
                          }
                        />
                        {colorSelect == i && (
                          <CheckIcon
                            fontSize="small"
                            sx={{ color: i == 0 ? "#000" : "#fff" }}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                )}
                <div className="text-xs">
                  *با انتخاب هررنگ به جز رنگ سفید مبلغ نهایی فاکتور بیشتر خواهد
                  شد.
                </div>
              </div>
            </div>
            {/* body */}

            {/* footer */}
            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="مرحله قبلی"
                title="مرحله قبلی"
                color="#009688"
                onClick={pageHandlerIncrease}
              />
              <ButtonCustom
                text="مرحله بعدی"
                title="مرحله بعدی"
                color="#009688"
                onClick={pageHandler}
              />
            </div>
            {/* footer */}
          </section>
        </>
      ) : page == 4 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            موتور کرکره برقی
          </div>
          {/* heade */}

          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            {/* body */}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 px-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm">نوع موتور کرکره را انتخاب کنید</div>
                <SelectCustom
                  data={rollingGateSelect}
                  selected={rollingGateSelected}
                  onChange={(event) =>
                    setRollingGateSelected(event.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                {rollingGateSelected == 1 && (
                  <>
                    <div className="text-sm">
                      نوع موتور کرکره دلخواه را انتخاب کنید
                    </div>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={motorValue}
                        onChange={rollingMotorHandler}
                        size="small"
                      >
                        {rollingMotor.map((motor) =>
                          widthValue > 600 || heightValue > 600 ? (
                            motor.id != 2 &&
                            motor.id != 3 &&
                            motor.id != 11 && (
                              <MenuItem
                                name={motor.type}
                                value={motor.id}
                                key={motor.id}
                              >
                                {motor.name}
                              </MenuItem>
                            )
                          ) : (
                            <MenuItem
                              name={motor.type}
                              value={motor.id}
                              key={motor.id}
                            >
                              {motor.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </>
                )}
              </div>
              <div className="flex justify-end col-start-3">
                <Image
                  alt="جستجو"
                  title="جستجو"
                  width={125}
                  height={300}
                  src={search}
                />
              </div>
            </div>
            {/* body */}

            {/* footer */}
            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="مرحله قبلی"
                title="مرحله قبلی"
                color="#009688"
                onClick={pageHandlerIncrease}
              />
              <ButtonCustom
                text="مرحله بعدی"
                title="مرحله بعدی"
                color="#009688"
                onClick={pageHandler}
              />
            </div>
            {/* footer */}
          </section>
        </>
      ) : page == 5 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            متعلقات کرکره برقی
          </div>
          {/* heade */}

          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            {/* body */}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm">
                  اگر گزینه اضافی دیگری مدنظر دارید، آن را انتخاب کنید.
                </div>
                <FormGroup>
                  {customCheckBox.map((item) =>
                    type == 2
                      ? item.id != 1 &&
                        item.id != 2 && (
                          <FormControlLabel
                            onChange={(event) =>
                              accessoriesHandler(event, item.id)
                            }
                            key={item.id}
                            control={
                              <Checkbox size="small" value={item.value} />
                            }
                            label={item.label}
                          />
                        )
                      : item.id != 4 &&
                        item.id != 5 && (
                          <FormControlLabel
                            onChange={(event) =>
                              accessoriesHandler(event, item.id)
                            }
                            key={item.id}
                            control={
                              <Checkbox size="small" value={item.value} />
                            }
                            label={item.label}
                          />
                        )
                  )}
                </FormGroup>
              </div>

              <Image
                className="col-start-3"
                alt="محاسبه قیمت"
                width={200}
                // height={270}
                src={accessories}
              />
            </div>
            {/* body */}

            {/* footer */}
            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="مرحله قبلی"
                title="مرحله قبلی"
                color="#009688"
                onClick={pageHandlerIncrease}
              />
              <ButtonCustom
                text="مرحله بعدی"
                title="مرحله بعدی"
                color="#009688"
                onClick={pageHandler}
              />
            </div>
            {/* footer */}
          </section>
        </>
      ) : page == 6 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            هزینه آهن کشی کرکره برقی
          </div>
          {/* heade */}

          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            {/* body */}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
              <div className="flex flex-col gap-2">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    آیا آهن کشی برای ورودی انجام شده است؟
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={ironingValue}
                    name="radio-buttons-group"
                    onChange={ironHandler}
                  >
                    {ironing.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio size="small" />}
                        label={item.label}
                      />
                    ))}
                    {/* <FormControlLabel
                      value="1000000"
                      control={<Radio size="small" />}
                      label="خیر"
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio size="small" />}
                      label="بله"
                    /> */}
                  </RadioGroup>
                </FormControl>
              </div>

              <Image
                className="col-start-3"
                alt="محاسبه قیمت"
                width={200}
                // height={270}
                src={railPacking}
              />
            </div>
            {/* body */}

            {/* footer */}
            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="مرحله قبلی"
                title="مرحله قبلی"
                color="#009688"
                onClick={pageHandlerIncrease}
              />
              <ButtonCustom
                text="مرحله بعدی"
                title="مرحله بعدی"
                color="#009688"
                onClick={pageHandler}
              />
            </div>
            {/* footer */}
          </section>
        </>
      ) : page == 7 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            هزینه نصب کرکره برقی
          </div>
          {/* heade */}

          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            {/* body */}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
              <div className="flex flex-col gap-2">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={installValue}
                  name="radio-buttons-group"
                  onChange={acceptHandler}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    آیا مایل به محاسبه هزینه نصب هم هستید؟
                  </FormLabel>
                  {
                    install.map(item=>(
                      <FormControlLabel
                        value={item.id}
                        key={item.id}
                        control={<Radio size="small" />}
                        label={item.label}
                      />
                    ))
                  }
                  {/* <FormControlLabel
                    value={1}
                    control={<Radio size="small" />}
                    label="بله"
                  /> */}
                </RadioGroup>
              </div>

              <Image
                className="col-start-3"
                alt="محاسبه قیمت"
                width={120}
                // height={270}
                src={computation}
              />
            </div>
            {/* body */}

            {/* footer */}
            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="محاسبه نهایی و دریافت پیش فاکتور"
                title="محاسبه نهایی و دریافت پیش فاکتور"
                color={"#009688"}
                onClick={pageHandler}
              />
            </div>
            {/* footer */}
          </section>
        </>
      ) : page == 8 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            جمع کل
          </div>
          {/* heade */}
          <section
            className={`${styles.item_container} flex flex-col justify-between pt-12`}
          >
            {/* body */}
            <div className="flex items-center justify-center gap-2">
              مبلغ نهایی پروژه شما
              <div className="font-bold text-lg">
                {finalprice.toLocaleString()}
              </div>
              <div>تومان</div>
              خواهد بود
            </div>
            {/* body */}

            {/* footer */}
            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="سفارش خرید"
                title="سفارش خرید"
                color="#009688"
                // onClick={refreshHandler}
              />
              <ButtonCustom
                text="دریافت پیش فاکتور"
                title="دریافت پیش فاکتور"
                color="#009688"
                onClick={finalHandler}
              />
              <ButtonCustom
                text="محاسبه مجدد"
                title="محاسبه مجدد"
                color="#009688"
                onClick={refreshHandler}
              />
            </div>
            {/* footer */}
          </section>
        </>
      ) : page == "error" ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            خطا در محاسبه ابعاد
          </div>
          {/* heade */}
          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            <div className="text-red-600 font-bold text-lg text-center">
              به علت غیر استاندارد بودن ابعاد با این شماره تماس حاصل فرمایید
            </div>

            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                text="تماس بگیرید"
                title="تماس بگیرید"
                link="tel:+989128436042"
                color="#009688"
              />
              <ButtonCustom
                text="بازگشت"
                title="بازگشت"
                color="#009688"
                onClick={backHandler}
              />
            </div>
          </section>
        </>
      ) : page == "final" ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            ثبت اطلاعات
          </div>
          {/* heade */}
          <section
            className={`${styles.item_container} flex flex-col justify-between`}
          >
            <div className="grid grid-cols-2 p-2">
              <div className="col-span-1 grid grid-cols-2 gap-6">
                <TextFieldCustom
                  size="small"
                  fullWidth
                  label="نام"
                  onChange={(event) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  value={userInfo.name}
                />
                <TextFieldCustom
                  size="small"
                  fullWidth
                  label="نام خانوادگی"
                  onChange={(event) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      family: event.target.value,
                    }))
                  }
                  value={userInfo.family}
                />
                <TextFieldCustom
                  size="small"
                  fullWidth
                  label="موبایل"
                  onChange={(event) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      phoneNumber: event.target.value,
                    }))
                  }
                  type="number"
                  value={userInfo.phoneNumber}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <ButtonCustom
                onClick={resultHandler}
                text="ثبت اطلاعات"
                title="ثبت اطلاعات"
                color={
                  userInfo.name.length > 1 &&
                  userInfo.family.length > 1 &&
                  userInfo.phoneNumber.length > 10
                    ? "#009688"
                    : "#a4a4a4"
                }
                disabled={
                  userInfo.name.length > 1 &&
                  userInfo.family.length > 1 &&
                  userInfo.phoneNumber.length > 10
                    ? false
                    : true
                }
              />
            </div>
          </section>
        </>
      ) : null}

      <FormModal
        open={openModal}
        close={() => setOpenModal(false)}
        userInfo={userInfo}
      />
    </section>
  );
};

export default Form;
