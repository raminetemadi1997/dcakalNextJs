import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//accordion
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from 'next/link';
//accoedion styles
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowBackIosNewIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const MobileMenu = ({ openMenu = false, onClose, mainMenu = [] }) => {
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;

    const [activeIndex, setActiveIndex] = useState(mainMenu.map(e => null));
    const [subIndex, setSubIndex] = useState(null);



    const openHandler = (index) => {
        const newArrayService = [...activeIndex];

        if (newArrayService[index] == true) {
            newArrayService[index] = false;
        } else {
            newArrayService[index] = true;
        }
        setActiveIndex(newArrayService);
        setSubIndex(null)
    }
    const openSub = (index, i) => {
        setSubIndex((prevIndex) => (prevIndex === i ? null : i));
    }



    return (
        <div>
            <Drawer  open={openMenu} onClose={onClose} >
                <Box sx={{ width: 300 }}>
                    {/* head */}
                    <div className='p-2 border-b bg-white sticky top-0 flex items-center justify-between z-10'>
                        <div className='uppercase text-theme'>dca<span className='text-black'>kala</span></div>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    {/* head */}

                    {/* body */}
                    {mainMenu.length > 0 &&
                        <div>
                            <ul>
                                {mainMenu.map((mainList, index) => (
                                    <li key={mainList.id}>
                                        <div className='text-sm p-4 py-2 border-b flex items-center justify-between'>

                                            <Link href={mainList.url}>
                                                {mainList.name}
                                            </Link>
                                            {mainList.items.length > 0 ?
                                                <IconButton size='small' onClick={() => openHandler(index)}>
                                                    {activeIndex[index] ?
                                                        <ExpandMoreIcon />
                                                        :
                                                        <ChevronLeftIcon />
                                                    }
                                                </IconButton>

                                                :
                                                <div className='w-[34px] h-[34px]'>
                                                </div>

                                            }
                                        </div>


                                        <div className={`bg-[#f3f3f3] ${activeIndex[index] ? 'block' : 'hidden'}`}>
                                            <ul>
                                                {mainList.items.map((sub, i) => (
                                                    <li key={sub.id} >
                                                        <div className='text-sm px-6 py-2 flex items-center justify-between' onClick={() => openSub(index, i)}>
                                                            <div>
                                                                {sub.title}
                                                            </div>

                                                            <IconButton>
                                                                {subIndex == i ?
                                                                    <ExpandMoreIcon />
                                                                    :
                                                                    <ChevronLeftIcon />
                                                                }
                                                            </IconButton>
                                                        </div>


                                                        <div className={`bg-[#f3f3f3] px-6 ${subIndex == i ? 'block' : 'hidden'}`}>
                                                            <ul className='border-r'>
                                                                {sub.items.map(target => (
                                                                    <li key={target.id} >
                                                                        <div className='text-sm px-4 py-2 flex items-center justify-between'>
                                                                            <Link href={`${target.url}`}>
                                                                                {target.identity_name}
                                                                            </Link>


                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>


                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    {/* body */}
                </Box>
            </Drawer>
        </div>
    );
};

export default MobileMenu;