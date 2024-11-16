import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [values, setValues] = useState([]);
  const [trigger, setTrigger] = useState(true)
  const [refresh, setRefresh] = useState(true)
  const [print , setPrint] = useState(false)


  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [rollingGate, setRollingGate] = useState(0);
  const [edgeSort, setEdgeSort] = useState(0);
  const [area, setArea] = useState(0)
  const [railPrice, setrailPrice] = useState(0)


  const [blade, setBalde] = useState(0);
  const [colorBlade, setColorBlade] = useState(0);

  const [emergencyValue, setEmergencyValue] = useState(0);
  const [ironValue, setIronValue] = useState(1000000)
  const [finalprice, setFinalPrice] = useState(0)
  const [accessoriesValue, setAccessoriesValue] = useState([]);

  // قیمت ریل کرکره
  const [rollPrice, setRollPrice] = useState(0);

  //قیمت تیغه
  const [bladePrice, setBladPrice] = useState(0);

  //قیمت موتور
  const [rollingMotorValue, setRollingMotorValue] = useState(0);


  //قیمت متعلقات  
  const [accessoriesPrice, setAccessoriesPrice] = useState(0)


  //قیمت سرویس
  const [support, setSupport] = useState(1)
  const [supportPrice, setSupportprice] = useState(0)



  //نوع محصول 
  const [productType , setProductType] = useState("فروشگاه")


  // محاسبه مجدد

  useEffect(() => {
    setArea(0)

    setRollPrice(0)

    setBladPrice(0)


    setAccessoriesPrice(0)

    setSupportprice(0)

    setFinalPrice(0)

  }, [refresh])

  useMemo(()=>{
   if (print) {
    //  console.log("print");
   }
    
  } , [print])




  const aluminiumZevar = 400000;
  const steelZevar10Price = 500000;
  const defaultBlade = 1160000
  

  // قسمت محاسبات
  useEffect(() => {
    setArea((width) * (height))

    setRollPrice(
      rollingGate == 0 ?
        width > 6 ?
          (height * 2) * steelZevar10Price
          :

          (height * 2) * aluminiumZevar

        :
        (height * 2) * rollingGate
    )

    setBladPrice(blade == 0 ? area * (defaultBlade + colorBlade) :area * (blade + colorBlade))


    setAccessoriesPrice(accessoriesValue.reduce((acc, num) => acc + num, 0))

    setSupportprice(support == 1 ? area * 350000 : 0)

    setFinalPrice(rollPrice + bladePrice + rollingMotorValue + accessoriesPrice + supportPrice + ironValue)

    

  }, [trigger])
  let a = area / 10000;



  // برای محاسبه نوع ریل کرکره برقی در مرحله دوم

  useEffect(() => {
    if (rollingGate == 0) {
      if (area <= 300000) {
        setrailPrice((height / 100) * 2 * aluminiumZevar)
        // console.log('30');

      } else {
        setrailPrice((height / 100) * 2 * steelZevar10Price)
        // console.log('10');
      }
    } else {
      setrailPrice((height / 100) * 2 * rollingGate)
    }
  }, [rollingGate, area, height])


  const addValue = (value, index) => {
    let newArray = [...values]
    newArray[index] = value
    setValues(newArray)
  };


  // useEffect(()=>{
  //   setFinalPrice(Number(railPrice + (blade + colorBlade.reduce((acc, num) => acc + num, 0) * a) + emergencyValue + rollingMotorValue + accessoriesValue.reduce((acc, num) => acc + num, 0) + ironValue));
  // } )





  return (
    <FormContext.Provider value={{ values, addValue, setWidth, setHeight, setRollingGate, setEdgeSort, width, area, setBalde, setColorBlade, colorBlade, setEmergencyValue, setRollingMotorValue, accessoriesValue, setAccessoriesValue, setIronValue, finalprice, setTrigger, setSupport, setRefresh , productType , setProductType , rollPrice , bladePrice , rollingMotorValue , ironValue , supportPrice , productType , rollingGate}}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
