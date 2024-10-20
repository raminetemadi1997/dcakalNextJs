import React, { useState } from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import IconButton from '@mui/material/IconButton';

const CardsCustom = ({ body = '', image = '', type, title = '', }) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
    const [showMore, setShowMore] = useState(false)
    return (

        type == 'post'
            ?
            (
                <section
                    className='h-96 article bg-white w-full overflow-hidden rounded-lg'
                    style={{
                        backgroundImage: image && `url("${backendUrl}${image.webp}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center center'
                    }}
                >

                    {title &&
                        <div
                            className={`h-1/6 flex items-start justify-between p-2 ${showMore ? 'bg-white' : 'bg-gradient-to-b from-[#fff] via-[#fffffff6] to-[#ffffff13]'}`}
                        >
                            <p className='text-sm text-right'>{title}</p>
                            <IconButton
                                size='medium'
                                onClick={() => setShowMore(!showMore)}
                            >

                                <ExpandCircleDownIcon
                                    fontSize='inherit'
                                    sx={{
                                        transform: showMore && `rotate(180deg)`
                                    }}
                                />

                            </IconButton>
                        </div>
                    }
                    {body
                        &&
                        showMore ?
                        <div
                            className=" h-5/6 bg-white overflow-auto text-justify p-4 text-sm"
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                        : null
                    }


                </section>
            )
            : null

    );
};

export default CardsCustom;