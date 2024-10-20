import React from 'react';
import styled from '@emotion/styled'
//components
//css
import styles from '@/assets/css/slider/BrandSlider.module.css';
import look from '@/assets/css/slider/CategoryBrandSlider.module.css'
import SwiperCarousel from '../SwiperCarousel';

const BrandSlider = ({ type , className , brandData , title , backgroundImage }) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
    
    const BrandContainer = styled("div")({
        background:`url("${backendUrl}${backgroundImage}") no-repeat center center`,
        backgroundSize:'100% 100%'
    })
    return (
        <>
            {type === 'category' ? (
                <div className={`min-w-0 bg-red-500 w-full flex flex-col justify-center items-center px-0 ${look.container} ${className}`}>
                    <h3 className={` mb-0 w-full text-right`}>
                        <p className='bg-[#A4A4A4] w-fit px-12 py-2  text-white rounded-tr-2xl rounded-tl-2xl relative'>
                              {title}                     
                        </p>
                    </h3>
                    {/* <Carousel type='categroyBrand'/> */}
                    <SwiperCarousel type='brand' brandData={brandData} />
                </div >
            ) : (

                <BrandContainer className={`h-[300px] min-w-0 w-full flex flex-col justify-start items-center py-8`}>
                    <h3 className={`mb-4`}>برندها</h3>
                    {/* <Carousel type='brand' /> */}
                    <SwiperCarousel type='brand' brandData={brandData}  />
                </BrandContainer >
            )}

        </>
    );
};

export default BrandSlider;