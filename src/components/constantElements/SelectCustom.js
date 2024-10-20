import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const SelectCustom = ({ selected, type, firstValue = false, backgroundColor = '#fff', label, size = 'small', data = [], ...props }) => {
    const style = {
        backgroundColor: backgroundColor,
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "var(--theme-color)",
            },
        },
        "& .Mui-focused": {
            color: "var(--theme-color) !important",
        },
    }
    const [age, setAge] = useState(firstValue ? 0 : '');
    const [select, setSelect] = useState([])

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <FormControl size={size} fullWidth sx={style}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={firstValue ? age : selected}
                label={label}
                {...props}
            >
                {type == 'services'
                    &&
                    <MenuItem value={'service'}>بدون نصب</MenuItem>
                }
                {data.length > 0 &&
                    data.map((selectItems, i) => (
                        <MenuItem key={selectItems.id} value={i}>{selectItems.alt_name ?  selectItems.alt_name : selectItems.name}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default SelectCustom;