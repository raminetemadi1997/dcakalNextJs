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
    marginBottom: 2,
    "& .MuiFormHelperText-root": {
        textAlign: "end",
    },
}

//pass value and onChnage
const TextareaCustom = ({
    row = 4,
    type = 'text',
    required = false,
    label,
    className,
    value,
    maxLength = 350 ,
    ...props 
}) => {
    const style = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "var(--theme-color)",
            },
        },
        "& label.Mui-focused": {
            color: "var(--theme-color)",
        },
        marginBottom: 2,
        "& .MuiFormHelperText-root": {
            textAlign: "end",
            color: `${value && value.length > maxLength - 50 ? "red" : "rgba(0, 0, 0, 0.6)"
                }`,
        },
    }
    return <TextField
        focused={value && true}
        value={value ? value : ''}
        multiline rows={row}
        className={className}
        dir={type == 'number' ? 'ltr' : 'rtl'}
        type={type}
        required={required}
        id="outlined-basic"
        label={label}
        variant="outlined"
        sx={style}
        inputProps={{
            maxLength: maxLength,
        }}
        helperText={`${value ? value.length : 0} / ${maxLength} (حداقل 5 کاراکتر نوشته شود) `}
        {...props}
    />

};

export default TextareaCustom;