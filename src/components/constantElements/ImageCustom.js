'use client'
import React from 'react';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
import useMediaQuery from '@mui/material/useMediaQuery';



const ImageCustom = ({ size = 'medium', fullWidth = true, mobileAlt, mobileTitle, mobileData = null, data = null, alt, title, className, ...props }) => {




    const mobile = useMediaQuery("(max-width:540px)");

    return data && (
        !mobile ?
            <>
                {
                    data.indexArray || data.indexArray
                        ?
                        size == 'large_2x' ?

                            <picture className={className}>
                                <source
                                    srcSet={`${backendUrl}${data.indexWeb.large_2x} 2x, ${backendUrl}${data.indexWeb.large}`}
                                    type="image/webp"
                                />

                                <source
                                    srcSet={`${backendUrl}${data.indexArray.large_2x} 2x , ${backendUrl}${data.indexArray.large_2x}`}
                                    type={data.indexArray.large_2x.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                />


                                <img
                                    className={`${fullWidth ? 'w-full' : ''}`}
                                    srcSet={`${backendUrl}${data.indexArray.large_2x} 2x, ${backendUrl}${data.indexArray.large}`}
                                    src={`${backendUrl}${data.indexArray.large_2x}`}
                                    alt={alt ? alt : 'تصویر'}
                                    title={title ? title : 'تصویر'}
                                    
                                    {...props}
                                />
                            </picture>
                            : size == 'large' ?
                                <picture className={className}>
                                    <source
                                        srcSet={`${backendUrl}${data.indexWeb.large} , ${backendUrl}${data.indexWeb.large_2x} 2x`}
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet={`${backendUrl}${data.indexArray.large} , ${backendUrl}${data.indexArray.large_2x} 2x`}
                                        type={data.indexArray.large.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                    />



                                    <img
                                        className={`${fullWidth ? 'w-full' : ''}`}
                                        srcSet={`${backendUrl}${data.indexArray.large} , ${backendUrl}${data.indexArray.large_2x} 2x`}
                                        src={`${backendUrl}${data.indexArray.large}`}
                                        alt={alt ? alt : 'تصویر'}
                                        title={title ? title : 'تصویر'}
                                        
                                        {...props}
                                    />
                                </picture>
                                : size == 'medium' ?
                                    <picture className={className}>
                                        <source
                                            srcSet={`${backendUrl}${data.indexWeb.medium} , ${backendUrl}${data.indexWeb.medium_2x} 2x`}
                                            type="image/webp"
                                        />
                                        <source
                                            srcSet={`${backendUrl}${data.indexArray.medium} , ${backendUrl}${data.indexArray.medium_2x} 2x`}
                                            type={data.indexArray.medium.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                        />




                                        <img
                                            className={`${fullWidth ? 'w-full' : ''}`}
                                            srcSet={`${backendUrl}${data.indexArray.medium} , ${backendUrl}${data.indexArray.medium_2x} 2x`}
                                            src={`${backendUrl}${data.indexArray.medium}`}
                                            alt={alt ? alt : 'تصویر'}
                                            title={title ? title : 'تصویر'}
                                            
                                            {...props}
                                        />
                                    </picture>
                                    : size == 'small' ?
                                        <picture className={className}>
                                            <source
                                                srcSet={`${backendUrl}${data.indexWeb.samll} , ${backendUrl}${data.indexWeb.samll_2x} 2x`}
                                                type="image/webp"
                                            />
                                            <source
                                                srcSet={`${backendUrl}${data.indexArray.samll} , ${backendUrl}${data.indexArray.samll_2x} 2x`}
                                                type={data.indexArray.samll.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                            />




                                            <img
                                                className={`${fullWidth ? 'w-full' : ''}`}
                                                srcSet={`${backendUrl}${data.indexArray.samll} , ${backendUrl}${data.indexArray.samll_2x} 2x`}
                                                src={`${backendUrl}${data.indexArray.samll}`}
                                                alt={alt ? alt : 'تصویر'}
                                                title={title ? title : 'تصویر'}
                                                {...props}
                                                
                                            />
                                        </picture>
                                        : size == 'original' ?
                                            <picture className={className}>
                                                <source
                                                    srcSet={`${backendUrl}${data.indexWeb.original} , ${backendUrl}${data.indexWeb.double_ratio} 2x , ${backendUrl}${data.indexWeb.triple_ratio} 3x`}
                                                    type="image/webp"
                                                />
                                                <source
                                                    srcSet={`${backendUrl}${data.indexArray.original} , ${backendUrl}${data.indexArray.double_ratio} 2x , ${backendUrl}${data.indexArray.triple_ratio} 3x`}
                                                    type={data.indexArray.original.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                                />




                                                <img
                                                    className={`${fullWidth ? 'w-full' : ''}`}
                                                    srcSet={`${backendUrl}${data.indexArray.original} , ${backendUrl}${data.indexArray.double_ratio} 2x , ${backendUrl}${data.indexArray.triple_ratio} 3x`}
                                                    src={`${backendUrl}${data.indexArray.original}`}
                                                    alt={alt ? alt : 'تصویر'}
                                                    title={title ? title : 'تصویر'}
                                                    {...props}
                                                    
                                                />
                                            </picture>
                                            : null
                        : data.webp || data.original ?
                            <picture className={className}>

                                <source
                                    srcSet={`${backendUrl}${data.webp}`}
                                    type="image/webp"
                                />


                                <source
                                    srcSet={`${backendUrl}${data.original}`}
                                    type={data.original.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                />



                                <img
                                    className={`${fullWidth ? 'w-full' : ''}`}
                                    srcSet={`${backendUrl}${data.original}`}
                                    src={`${backendUrl}${data.original}`}
                                    alt={alt ? alt : 'تصویر'}
                                    title={title ? title : 'تصویر'}
                                    {...props}
                                    
                                />
                            </picture>
                            :
                            <picture className={className}>
                                <source
                                    srcSet={`${backendUrl}${data}`}
                                    type="image/webp"
                                />
                                <source
                                    srcSet={`${backendUrl}${data}`}
                                    type={data.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                />

                                <img
                                    className={`${fullWidth ? 'w-full' : ''}`}
                                    srcSet={`${backendUrl}${data}`}
                                    src={`${backendUrl}${data}`}
                                    alt={alt ? alt : 'تصویر'}
                                    title={title ? title : 'تصویر'}
                                    {...props}
                                    
                                />
                            </picture>
                }
            </>

            :

            <>
                {mobileData ?

                    <>

                        {
                            mobileData.indexArray || mobileData.indexArray
                                ?
                                size == 'original' ?

                                    <picture className={className}>
                                        <source
                                            srcSet={`${backendUrl}${mobileData.indexWeb.original} , ${backendUrl}${mobileData.indexWeb.double_ratio} 2x , ${backendUrl}${mobileData.indexWeb.triple_ratio} 3x`}
                                            type="image/webp"
                                        />
                                        <source
                                            srcSet={`${backendUrl}${mobileData.indexArray.original} , ${backendUrl}${mobileData.indexArray.double_ratio} 2x , ${backendUrl}${mobileData.indexArray.triple_ratio} 3x`}
                                            type={mobileData.indexArray.original.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                        />




                                        <img
                                            className={`${fullWidth ? 'w-full' : ''}`}
                                            srcSet={`${backendUrl}${mobileData.indexArray.original} , ${backendUrl}${mobileData.indexArray.double_ratio} 2x , ${backendUrl}${mobileData.indexArray.triple_ratio} 3x`}
                                            src={`${backendUrl}${mobileData.indexArray.original}`}
                                            alt={alt ? alt : 'تصویر'}
                                            title={title ? title : 'تصویر'}
                                            {...props}
                                            
                                        />
                                    </picture>

                                    :
                                    <picture className={className}>
                                        <source
                                            srcSet={`${backendUrl}${mobileData.indexWeb.large} , ${backendUrl}${mobileData.indexWeb.large_2x} 2x`}
                                            type="image/webp"
                                        />
                                        <source
                                            srcSet={`${backendUrl}${mobileData.indexArray.large} , ${backendUrl}${mobileData.indexArray.large_2x} 2x`}
                                            type={mobileData.indexArray.large.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                        />

                                        <img
                                            className={`${fullWidth ? 'w-full' : ''}`}
                                            srcSet={`${backendUrl}${mobileData.indexArray.large} , ${backendUrl}${mobileData.indexArray.large_2x} 2x`}
                                            src={`${backendUrl}${mobileData.indexArray.large}`}
                                            alt={mobileAlt ? mobileAlt : 'تصویر'}
                                            title={mobileTitle ? mobileTitle : 'تصویر'}
                                            {...props}
                                            
                                        />
                                    </picture>
                                :
                                mobileData.indexArray &&
                                <picture className={className}>
                                    <source
                                        srcSet={`${backendUrl}${mobileData.webp}`}
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet={`${backendUrl}${mobileData.original}`}
                                        type={mobileData.indexArray.original.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                    />

                                    <img
                                        className={`${fullWidth ? 'w-full' : ''}`}
                                        srcSet={`${backendUrl}${mobileData.original}`}
                                        src={`${backendUrl}${mobileData.original}`}
                                        alt={mobileAlt ? mobileAlt : 'تصویر'}
                                        title={mobileTitle ? mobileTitle : 'تصویر'}
                                        {...props}
                                        
                                    />
                                </picture>
                        }

                    </> :

                    <>
                        {
                            data.indexArray || data.indexArray
                                ?
                                size == 'large' ?
                                    <picture className={className}>

                                        <source
                                            srcSet={`${backendUrl}${data.indexWeb.large} , ${backendUrl}${data.indexWeb.large_2x} 2x`}
                                            type="image/webp"
                                        />
                                        <source
                                            srcSet={`${backendUrl}${data.indexArray.large} , ${backendUrl}${data.indexArray.large_2x} 2x`}
                                            type={data.indexArray.large.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                        />

                                        <img
                                            className={`${fullWidth ? 'w-full' : ''}`}
                                            srcSet={`${backendUrl}${data.indexArray.large} , ${backendUrl}${data.indexArray.large_2x} 2x`}
                                            src={`${backendUrl}${data.indexArray.large}`}
                                            alt={alt ? alt : 'تصویر'}
                                            title={title ? title : 'تصویر'}
                                            {...props}
                                            
                                        />
                                    </picture>
                                    : size == 'medium' ?
                                        <picture className={className}>

                                            <source
                                                srcSet={`${backendUrl}${data.indexWeb.medium} , ${backendUrl}${data.indexWeb.medium_2x} 2x`}
                                                type="image/webp"
                                            />
                                            <source
                                                srcSet={`${backendUrl}${data.indexArray.medium} , ${backendUrl}${data.indexArray.medium_2x} 2x`}
                                                type={data.indexArray.medium.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                            />

                                            <img
                                                className={`${fullWidth ? 'w-full' : ''}`}
                                                srcSet={`${backendUrl}${data.indexArray.medium} , ${backendUrl}${data.indexArray.medium_2x} 2x`}
                                                src={`${backendUrl}${data.indexArray.medium}`}
                                                alt={alt ? alt : 'تصویر'}
                                                title={title ? title : 'تصویر'}
                                                {...props}
                                                
                                            />
                                        </picture>
                                        : size == 'small' ?
                                            <picture className={className}>

                                                <source
                                                    srcSet={`${backendUrl}${data.indexWeb.samll} , ${backendUrl}${data.indexWeb.samll_2x} 2x`}
                                                    type="image/webp"
                                                />
                                                <source
                                                    srcSet={`${backendUrl}${data.indexArray.samll} , ${backendUrl}${data.indexArray.samll_2x} 2x`}
                                                    type={data.indexArray.samll.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                                />

                                                <img
                                                    className={`${fullWidth ? 'w-full' : ''}`}
                                                    srcSet={`${backendUrl}${data.indexArray.samll} , ${backendUrl}${data.indexArray.samll_2x} 2x`}
                                                    src={`${backendUrl}${data.indexArray.samll}`}
                                                    alt={alt ? alt : 'تصویر'}
                                                    title={title ? title : 'تصویر'}
                                                    {...props}
                                                    
                                                />
                                            </picture>
                                            : size == 'original' ?
                                                <picture className={className}>
                                                    <source
                                                        srcSet={`${backendUrl}${data.indexWeb.original} , ${backendUrl}${data.indexWeb.double_ratio} 2x , ${backendUrl}${data.indexWeb.triple_ratio} 3x`}
                                                        type="image/webp"
                                                    />
                                                    <source
                                                        srcSet={`${backendUrl}${data.indexArray.original} , ${backendUrl}${data.indexArray.double_ratio} 2x , ${backendUrl}${data.indexArray.triple_ratio} 3x`}
                                                        type={data.indexArray.original.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                                    />




                                                    <img
                                                        className={`${fullWidth ? 'w-full' : ''}`}
                                                        srcSet={`${backendUrl}${data.indexArray.original} , ${backendUrl}${data.indexArray.double_ratio} 2x , ${backendUrl}${data.indexArray.triple_ratio} 3x`}
                                                        src={`${backendUrl}${data.indexArray.original}`}
                                                        alt={alt ? alt : 'تصویر'}
                                                        title={title ? title : 'تصویر'}
                                                        {...props}
                                                        
                                                    />
                                                </picture>
                                                : null
                                :
                                <picture className={className}>
                                    <source
                                        srcSet={`${backendUrl}${data.webp}`}
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet={`${backendUrl}${data.original}`}
                                        type={data.original && data.original.split(".")[1] == "png" ? "image/png" : "image/jpg"}
                                    />

                                    <img
                                        className={`${fullWidth ? 'w-full' : ''}`}
                                        srcSet={`${backendUrl}${data.original}`}
                                        src={`${backendUrl}${data.original}`}
                                        alt={alt ? alt : 'تصویر'}
                                        title={title ? title : 'تصویر'}
                                        {...props}
                                    />
                                </picture>
                        }

                    </>

                }


            </>
    );
};

export default ImageCustom;