import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const style = {
    color: "var(--theme-color)",
    "&.Mui-checked": {
        color: "var(--theme-color)",
    },
}

const CheckboxCustom = ({checked,name , value,color ="var(--theme-color)"  ,label, size = 'small', className, ...props }) => {
    
    const style = {
        color: color,
        "&.Mui-checked": {
            color: "var(--theme-color)" ,
        },
    }

    return (
        <FormGroup sx={{ ml: 1 }} className={className}>
            <FormControlLabel control={<Checkbox defaultChecked={checked} sx={style} size={size} value={value} name={name}  {...props } />} label={label} />
        </FormGroup>
    );
};

export default CheckboxCustom;