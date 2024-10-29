'use client'
import React, { useState } from "react";
import formImage from "../../public/images/Forms/calculate-1.png";
import Image from "next/image";
import ButtonCustom from "./constantElements/ButtonCustom";
import RadioCustom from "./constantElements/RadioCustom";
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
import TextFieldCustom from "./constantElements/TextFieldCustom";
import SelectCustom from "./constantElements/SelectCustom";
import CheckboxCustom from "./constantElements/CheckboxCustom";
import styles from "@/assets/css/Form.module.css";
import { useFormContext } from '@/context/FormContext';

const data = [
  { id: 1, name: "تیغه آلومینیوم 8 سانت دوپل وزن استاندارد" },
  { id: 2, name: "تیغه آلومینیوم 8 سانت تک پل" },
  { id: 3, name: "تیغه آلومینیوم 10 سانت دوپل وزن استاندارد" },
  { id: 4, name: "تیغه آلومینیوم 10 سانت دوپل وزن سبک" },
  { id: 5, name: "تیغه آلومینیوم 8 سانت دوپل وزن سبک" },
  { id: 6, name: "تیغه پلی کربنات 4 میلیمتر با لوله استیل" },
  { id: 7, name: "تیغه فولادی ضخامت 1 میلیمتر" },
  { id: 8, name: "تیغه گالوانیزه فوم دار 8 سانت" },
  { id: 9, name: "تیغه آلومینیوم 10 سانت دوپل آکرول" },
  { id: 10, name: "تیغه پلی کربنات 2 میلیمتر با یراق آلومینیوم" },
  { id: 11, name: "تیغه 8 سانت دوپل لمینت طرح چوب" },
];

const colors = [
  { id: 1, color: "سفید", code: "#fff" },
  { id: 2, color: "بژ", code: "#FFDEAD" },
  { id: 3, color: "شکلاتی", code: "#472402" },
  { id: 4, color: "قهوه ای", code: "#914D03" },
  { id: 5, color: "مشکی", code: "#000" },
  { id: 6, color: "قرمز", code: "#C72100" },
  { id: 7, color: "زرد", code: "#FFB600" },
  { id: 8, color: "آبی", code: "#1063B0" },
  { id: 9, color: "سبز", code: "#97AA00" },
  { id: 10, color: "نارنجی", code: "#F07722" },
  { id: 11, color: "خاکستری", code: "#808080" },
];

const rollingGateSelect = [
  { id: 1, name: "انتخاب خودکار(براساس ارتفاع و عرض)" },
  { id: 2, name: "انتخاب دستی" },
];

const customRollingGate = [
  { id: 1, name: "موتور توبلار 100 نیوتن تیونی" },
  { id: 2, name: "موتور توبلار 140 نیوتن لینوکس" },
  { id: 3, name: "موتور توبلار 140 نیوتن بارزانته" },
  { id: 4, name: "موتور ساید 300 نیوتن تیونی" },
  { id: 5, name: "موتور ساید 600 نیوتن تیونی" },
  { id: 6, name: "موتور ساید 300 نیوتن بارزانته" },
  { id: 7, name: "موتور ساید 600 نیوتن بارزانته" },
  { id: 8, name: "موتور ساید 300 نیوتن لینوکسupsدار" },
  { id: 9, name: "موتور ساید 600 نیوتن لینوکسupsدار" },
  { id: 10, name: "موتور ساید 750 نیوتن بارزانته upsدار " },
];

const customCheckBox = [
  { id: 1, label: "جا قفلی هوشمند" },
  { id: 2, label: "جا قفلی هوشمند دزدگیردار" },
  { id: 3, label: "کاور موتور ساید" },
  { id: 4, label: "چشمی (فتوسل)" },
  { id: 5, label: "فلاشر" },
];

const Form = () => {
  let allPages = 7;
  let calculator = 0;
  const { addValue } = useFormContext();

  const [page, setPage] = useState(0);
  const [radioSelect, setRadioSelect] = useState(0);
  const [radioSelect3, setRadioSelect3] = useState(0);
  const [colorSelect, setColorSelect] = useState(colors.map(() => false));
  const [rollingGateSelected, setRollingGateSelected] = useState(0);

  const [size , setSize] = useState([])

  const pageHandler = (event) => {
    event.preventDefault()
    if (page < allPages) {
      setPage((prev) => prev + 1);
    }
  };

  const radioHandler = (event) => {
    setRadioSelect(event.target.value);
    addValue(Number(event.target.name) , 0)
    
  };
  
  const radioHandlerRolling = (event) => {
    setRadioSelect3(event.target.value);
    addValue(Number(event.target.name) , 1)
    
  };

  const pageHandlerIncrease = (event) => {
    event.preventDefault()
    setPage((prev) => prev - 1);
  };

  const colorHandler = (index) => {
    let newArray = [...colorSelect];
    if (newArray[index] == true) {
      newArray[index] = null;
    } else {
      newArray[index] = true;
    }
    setColorSelect(newArray);
  };

  const textFieldHandler=(event , index)=>{
    let newArray = [...size];
    newArray[index] = Number(event.target.value);
    setSize(newArray)
  }
  
  
  return (
    <section
      className={`border-2 rounded-lg border-theme-green mb-12 ${styles.container}`}
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
              />
            </div>
          </div>
          {/* body */}
        </>
      ) : page == 1 ? (
        <form onSubmit={pageHandler}>
          {/* head */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4 ">
            نوع و کارکرد کرکره برقی
          </div>
          {/* head */}

          {/* body */}
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
            <RadioCustom
              values={["فروشگاه", "پارکینگ", "پنجره", "سوله", "درب نفررو"]}
              name={[12000, 31000, 42000, 100000, 850000]}
              row={false}
              label="نوع کاربری کرکره برقی را مشخص کنید"
              selected={radioSelect}
              // onChange={(event) => setRadioSelect(event.target.value)}
              onChange={(event) => radioHandler(event)}
              
            />

            <div className="flex flex-col gap-4">
              <div className="text-base">ابعاد ورودی را مشخص کنید (cm)</div>
              {["عرض دهانه ورودی", "ارتفاع دهانه ورودی"].map((items, index) => (
                <TextFieldCustom 
                  onChange={(event)=>textFieldHandler(event , index)}
                  value={size[index]}
                  key={index} 
                  label={items} 
                  type="number"
                  required
                 />
              ))}
            </div>

            <Image
              className="col-start-3"
              alt="محاسبه قیمت"
              width={300}
              height={225}
              src={
                radioSelect == 0
                  ? store
                  : radioSelect == 1
                  ? park
                  : radioSelect == 2
                  ? window
                  : radioSelect == 3
                  ? soole
                  : radioSelect == 4
                  ? door
                  : null
              }
            />
          </div>
          {/* body */}

          {/* footer */}
          <div className="flex items-center justify-center p-4 gap-4">
            <ButtonCustom
              text="مرحله قبلی"
              color="#009688"
              onClick={pageHandlerIncrease}
            />
            <ButtonCustom
              text="مرحله بعدی"
              color="#009688"
              // onClick={pageHandler}
            />
          </div>
          {/* footer */}
        </form>
      ) : page == 2 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            ریل کرکره برقی
          </div>
          {/* heade */}

          {/* body */}
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
            <RadioCustom
              values={[
                "انتخاب خودکار براساس ارتفاع و عرض",
                "ریل 6 سانتیمتر آلومینیوم زواردار",
                "ریل 6 سانتیمتر فولادی زواردار",
                "ریل 10 سانتیمتر فولادی زواردار",
              ]}
              name={[12000, 31000, 42000, 100000]}
              row={false}
              label="نوع ریل کرکره را انتخاب کنید"
              selected={radioSelect3}
              // onChange={(event) => setRadioSelect3(event.target.value)}
              onChange={(event) => radioHandlerRolling(event)}
            />

            <Image
              className="col-start-3"
              alt="محاسبه قیمت"
              width={300}
              height={225}
              src={
                radioSelect3 == 0
                  ? automatic
                  : radioSelect3 == 3
                  ? tenCm
                  : sixCm
              }
            />
          </div>
          {/* body */}

          {/* footer */}
          <div className="flex items-center justify-center p-4 gap-4">
            <ButtonCustom
              text="مرحله قبلی"
              color="#009688"
              onClick={pageHandlerIncrease}
            />
            <ButtonCustom
              text="مرحله بعدی"
              color="#009688"
              onClick={pageHandler}
            />
          </div>
          {/* footer */}
        </>
      ) : page == 3 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            تیغه کرکره برقی
          </div>
          {/* heade */}

          {/* body */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 px-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm">نوع تیغه را انتخاب کنید: </div>
              <SelectCustom data={data} selected={0} />
              <div className="text-sm">
                مساحت کرکره شما با دورپیچ و کسر اندازه قوطی 0.1488 مترمربع
                محاسبه گردید.
              </div>
              <div className="text-xs">
                راهنمایی:
                <br />
                برای مساحت های زیر 30 متر مربع تیغه های 8 سانتیمتر یا پلی کربنات
                لوله آلومینیومی پیشنهاد می شود.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm">رنگ تیغه را انتخاب کنید: </div>
              {colors.length > 0 && (
                <div className="grid grid-cols-11 gap-2">
                  {colors.map((color, i) => (
                    <div
                      onClick={() => colorHandler(i)}
                      key={i}
                      className={`rounded-full w-7 h-7 border-2 cursor-pointer ${
                        colorSelect[i] ? "opacity-100" : "opacity-50"
                      }`}
                      style={{ backgroundColor: color.code }}
                    ></div>
                  ))}
                </div>
              )}
              <div className="text-xs">*می توانید چند رنگ را انتخاب کنید.</div>
              <div className="text-xs">
                *با انتخاب هررنگ به جز رنگ سفید مبلغ نهایی فاکتور بیشتر خواهد
                شد.
              </div>
            </div>
          </div>
          {/* body */}

          {/* footer */}
          <div className="flex items-center justify-center p-4 gap-4">
            <ButtonCustom
              text="مرحله قبلی"
              color="#009688"
              onClick={pageHandlerIncrease}
            />
            <ButtonCustom
              text="مرحله بعدی"
              color="#009688"
              onClick={pageHandler}
            />
          </div>
          {/* footer */}
        </>
      ) : page == 4 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            موتور کرکره برقی
          </div>
          {/* heade */}

          {/* body */}
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 px-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm">نوع موتور کرکره را انتخاب کنید</div>
              <SelectCustom
                data={rollingGateSelect}
                selected={rollingGateSelected}
                onChange={(event) => setRollingGateSelected(event.target.value)}
              />
              <RadioCustom
                values={["بدون برق اضطراری", "با برق اضطراری"]}
                row={false}
                selected={radioSelect}
              />
            </div>
            <div className="flex flex-col gap-2">
              {rollingGateSelected == 1 && (
                <>
                  <div className="text-sm">
                    نوع موتور کرکره دلخواه را انتخاب کنید
                  </div>
                  <SelectCustom data={customRollingGate} selected={0} />
                </>
              )}
            </div>
            <div className="flex justify-end col-start-3">
              <Image
                alt="جستجو"
                title="جستجو"
                width={190}
                height={500}
                src={search}
              />
            </div>
          </div>
          {/* body */}

          {/* footer */}
          <div className="flex items-center justify-center p-4 gap-4">
            <ButtonCustom
              text="مرحله قبلی"
              color="#009688"
              onClick={pageHandlerIncrease}
            />
            <ButtonCustom
              text="مرحله بعدی"
              color="#009688"
              onClick={pageHandler}
            />
          </div>
          {/* footer */}
        </>
      ) : page == 5 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            متعلقات کرکره برقی
          </div>
          {/* heade */}

          {/* body */}
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm">
                اگر گزینه اضافی دیگری مدنظر دارید، آن را انتخاب کنید.
              </div>
              <div>
                {customCheckBox.map((item) => (
                  <CheckboxCustom label={item.label} key={item.id} />
                ))}
              </div>
            </div>

            <Image
              className="col-start-3"
              alt="محاسبه قیمت"
              // width={270}
              // height={270}
              src={accessories}
            />
          </div>
          {/* body */}

          {/* footer */}
          <div className="flex items-center justify-center p-4 gap-4">
            <ButtonCustom
              text="مرحله قبلی"
              color="#009688"
              onClick={pageHandlerIncrease}
            />
            <ButtonCustom
              text="مرحله بعدی"
              color="#009688"
              onClick={pageHandler}
            />
          </div>
          {/* footer */}
        </>
      ) : page == 6 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            هزینه آهن کشی کرکره برقی
          </div>
          {/* heade */}

          {/* body */}
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
            <div className="flex flex-col gap-2">
              <RadioCustom
                values={["بله", "خیر"]}
                row={false}
                label="آیا آهن کشی برای ورودی انجام شده است؟"
                selected={radioSelect}
                // onChange={(event) => setRadioSelect(event.target.value)}
              />
            </div>

            <Image
              className="col-start-3"
              alt="محاسبه قیمت"
              // width={241}
              // height={270}
              src={railPacking}
            />
          </div>
          {/* body */}

          {/* footer */}
          <div className="flex items-center justify-center p-4 gap-4">
            <ButtonCustom
              text="مرحله قبلی"
              color="#009688"
              onClick={pageHandlerIncrease}
            />
            <ButtonCustom
              text="مرحله بعدی"
              color="#009688"
              onClick={pageHandler}
            />
          </div>
          {/* footer */}
        </>
      ) : page == 7 ? (
        <>
          {/* heade */}
          <div className="bg-theme-green text-white p-2 sm:text-xl text-sm text-center mb-4">
            هزینه نصب کرکره برقی
          </div>
          {/* heade */}

          {/* body */}
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 px-4">
            <div className="flex flex-col gap-2">
              <RadioCustom
                values={["بله", "خیر"]}
                row={false}
                label="آیا مایل به محاسبه هزینه نصب هم هستید؟"
                selected={radioSelect}
                // onChange={(event) => setRadioSelect(event.target.value)}
              />
            </div>

            <Image
              className="col-start-3"
              alt="محاسبه قیمت"
              // width={241}
              // height={270}
              src={computation}
            />
          </div>
          {/* body */}

          {/* footer */}
          <div className="flex items-center justify-center p-4 gap-4">
            <ButtonCustom
              text="محاسبه نهایی و دریافت پیش فاکتور"
              color="#009688"
              // onClick={pageHandlerIncrease}
            />
          </div>
          {/* footer */}
        </>
      ) : null}
    </section>
  );
};

export default Form;
