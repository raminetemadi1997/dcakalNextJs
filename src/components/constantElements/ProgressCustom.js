import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import CircularProgress, { circularProgressClasses} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const CircularProgressCustom = ({ type, value, title }) => {
    return (
        <Box
            sx={{
                position: "relative",
                display: "inline-flex",
                width: "213px",
                height: "213px",
                "@media (max-width: 540px)": {
                    width: "162px",
                    height: "162px",
                },
            }}
        >
            <CircularProgress
                variant="determinate"
                value={type == 0 ? value : 100}
                sx={{
                    width: "213px !important",
                    height: "213px !important",
                    backgroundColor: "#3DAFA540",
                    borderRadius: "50%",
                    color: "#007C70",
                    "@media (max-width: 540px)": {
                        width: "162px !important",
                        height: "162px !important",
                    },
                }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    sx={{
                        backgroundColor: "#fff",
                        width: "82%",
                        height: "82%",
                        borderRadius: "50%",
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "30px",
                        fontWeight: "bold",
                        color: "#000000",
                    }}
                >
                    {
                    `${Math.round(Number(value))}${type == 0 ? '%' : ''}`
                    }
                    <p className='text-xs font-normal'>{title}</p>
                </Typography>
            </Box>
        </Box>
    );
};

const ProgressCustom = ({ color= 'var(--theme-color-green)' , progressValue, type, data = [], ...props }) => {
    const LinearProgressCustom = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            backgroundColor: '#00968887',
    
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? color : '#308fe8',
        },
    }));
    
    return (
        <>
            {type == 0 ?
                //linear
                data.length > 0 &&
                <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', mb: '3rem' }} component='section'>
                    {data.map(progress => (
                        <div key={progress.id} >
                            <LinearProgressCustom variant="determinate" value={progress.percentage} />
                            <div className='flex items-center justify-between'>
                                <p className='text-sm'>{progress.title}</p>
                                <p className='text-sm'>{`${progress.percentage} %`}</p>
                            </div>
                        </div>
                    ))}
                </Box>
                // circule
                : type == 1 ?
                    data.length > 0 &&
                    <Box component='section' sx={{ position: 'relative', alignItems:'center' ,flexWrap:'wrap', justifyContent:'center' , display: 'flex', mb: '3rem', gap: '3rem' }}>
                        {data.map(progress => (
                            <CircularProgressCustom 
                            value={progress.percentage} 
                            key={progress.id} 
                            title={progress.title} 
                            type={progress.type}
                            />
                        ))}
                    </Box>
                    :
                    <Box sx={{ width: '100%' }} component='section'>
                        <LinearProgressCustom variant="determinate" value={progressValue >= 100 ? 100 : progressValue} color='error' />
                    </Box>
            }
        </>
    );
};

export default ProgressCustom;