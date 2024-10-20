import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const style = {

    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "var(--theme-color)",
        },
    },
    "& label.Mui-focused": {
        color: "var(--theme-color) !important",
    },
}

const AutocompleteCustom = ({required =true,  label, value, size = 'small', selects =[], ...props }) => {
    
    return (
        <Autocomplete
            size={size}
            sx={style}
            disablePortal
            noOptionsText={'مقداری وجود ندارد'}
            id="combo-box-demo"
            options={selects.length > 0 && selects}
            {...props}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => {
                return(
                    <TextField required={required} {...params} label={label} />
                )
            }}
            
        />
    );
};

export default AutocompleteCustom;