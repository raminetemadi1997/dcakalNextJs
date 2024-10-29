import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [values, setValues] = useState([]);
  

  
    
  const addValue = (value , index) => {
    let newArray = [...values]
    newArray[index] = value
    setValues(newArray)
  };


  return (
    <FormContext.Provider value={{ values, addValue }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
