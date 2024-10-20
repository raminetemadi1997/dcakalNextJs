'use client'
import React , {useState} from 'react';
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const DatePickerFa = () => {
    let [value, setValue] = useState(new Date())
    return (
        <DatePicker locale={persian_fa} calendar={persian} inputClass="custom-input" placeholder='تاریخ تولد' style={{
            backgroundColor: "#fff",
            height: "100%",
            width:'100%' ,
            borderRadius: "8px",
            fontSize: "14px",
            padding: "3px 10px",
            borderRadius:'4px'
          }}/>
    );
};

export default DatePickerFa;