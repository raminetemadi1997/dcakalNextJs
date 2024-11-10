import React, { Fragment, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReviewModal from "../modals/ReviewModal";
import QuestionModal from "../modals/QuestionModal";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';


const style = {
    width: '100%',
    borderBottom: 1,
    borderColor: "divider",

}

const TabCustom = ({ dataState, imageData, slug, type, bold = false, themeColor = 'var(--theme-color)', className, value = [], selected = 0, ...props }) => {

    
    const [selectTab, setSelectTab] = useState(0);
    const handleChange = (event, newValue) => {
        setSelectTab(newValue);
    };

    const tabStyle = {
        "& .MuiTab-root.Mui-selected": {
            color: themeColor,
        },
        "& .MuiTabs-indicator": {
            backgroundColor: themeColor,
        },
    }
    return (
        <Box sx={style} className={className}>
            <Tabs
                value={selected}
                sx={tabStyle}
                aria-label="theme custom tabs"
                {...props}
            >
                {value.length > 0 &&
                    value.map((tabs, i) => (
                        type =='accordion' ?
                        <Tab icon={<HelpIcon fontSize='small' />} iconPosition="start" key={i} sx={{
                            
                            fontWeight: bold ? 'bold' : 'normal',
                            "@media (max-width: 540px)": {
                                fontWeight: 'normal',
                            },

                        }} value={i} label={tabs} disabled={value.length <= 1 ? true : false} />
                        :
                        <Tab key={i} sx={{
                            
                            fontWeight: bold ? 'bold' : 'normal',
                            "@media (max-width: 540px)": {
                                fontWeight: 'normal',
                            },

                        }} value={i} label={tabs} disabled={value.length <= 1 ? true : false} />
                    ))
                }
            </Tabs>
            {type == "review"
                &&

                <ReviewModal
                    dataState={dataState}
                    imageData={imageData}
                    slug={slug}
                />
            }


            {
                type == "question"
                &&
                <QuestionModal slug={slug} />
            }
        </Box>
    );
};

export default TabCustom;