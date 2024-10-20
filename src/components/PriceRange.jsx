import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider() {

    const [value, setValue] = React.useState([0, 100]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (<>

        <div className={`values grid grid-cols-2 w-full gap-2`}>
            <div className={`flex items-center`}>
                <label htmlFor="from" className="ml-1 text-sm">از</label>
                <input type="number" name="from" id="from"
                       className={`w-full border rounded-lg text-xs p-1 focus-visible:outline-none `}
                        value={value[0]}
                        disabled
                        
                />
            </div>
            <div className={`flex items-center`}>
                <label htmlFor="from" className="ml-1 text-sm">تا</label>
                <input type="number" name="from" id="from"
                       className={`w-full border rounded-lg text-xs p-1 focus-visible:outline-none`}
                       value={value[1]}
                       disabled
                />
            </div>
        </div>
        
            <Box
            sx={{
                width:"100%",
                padding:"0 .5rem"
            }}
            >
                    <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        size="small"
                        sx={{
                            color: `#ff7900`,
                            '& .MuiSlider-thumb' :{
                                '&:hover': {
                                    boxShadow:'0px 0px 0px 8px rgb(255 121 0 / 16%)',
                                  },
                                  '&.Mui-focusVisible': {
                                    boxShadow: '0px 0px 0px 8px rgb(255 121 0 / 16%)',
                                  },
                                  '&.Mui-active':{
                                    boxShadow: '0px 0px 0px 10px rgb(255 121 0 / 16%)',
                                  }
                                  
                            }

                        }}
                    />
            </Box>
            <div className={`w-full flex justify-between mb-4`}>
                <p className={`text-xs text-stone-400`}>کمترین قیمت</p>
                <p className={`text-xs text-stone-400`}>بیشترین قیمت</p>
            </div>
        </>);
}
