import React from 'react';
import TextField from '@mui/material/TextField';

const style = {
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "var(--theme-color)",
        },
    },
    "& label.Mui-focused": {
        color: "var(--theme-color)",
    },
}

const TextFieldCustom = ({ size='small' , disabled = false, value, type = 'text', required = false, label, className, ...props }) => {

    return <TextField  size={size} disabled={disabled} focused={value && true} value={value ? value : ''} className={className} dir={type == 'number' ? 'ltr' : 'rtl'} type={type} required={required} id="outlined-basic" label={label} variant="outlined" sx={style} {...props} />

};

export default TextFieldCustom;