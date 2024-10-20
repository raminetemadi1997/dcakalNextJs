'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import VerifiedIcon from '@mui/icons-material/Verified';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import ImageCustom from './ImageCustom';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import '@/styles/styles.css';

const style = {
    "--swiper-navigation-color": "var(--theme-color)",
    "--swiper-pagination-color": "var(--theme-color)",
};

const BrandsCarousel = ({size = null , title = '', type, data = [], spaceBetween = 30, slidesPerView = 3, navigation = true }) => {

    

    const miniMobile = useMediaQuery("(max-width:375px)")
    const mobile = useMediaQuery("(max-width:600px)");
    const portraitTablets = useMediaQuery("(min-width:600px)  and (max-width:768px) ");
    const landscapeTablets = useMediaQuery("(min-width:768px) and (max-width:992px)");
    const laptops = useMediaQuery("(min-width:992px) and (max-width:1200px)");
  
  
    function response(porpose) {
  
        if (porpose == "width") {
            if (miniMobile) {
                return 75
            } else if (mobile) {
                return 75
            } else if (portraitTablets) {
                return 75
            } else if (landscapeTablets) {
                return 75
            } else if (laptops) {
                return 75
            } else {
                return 75
            }
        }
  
        else if (porpose == "height") {
            if (miniMobile) {
                return 75
            } else if (mobile) {
                return 75
            } else if (portraitTablets) {
                return 75
            } else if (landscapeTablets) {
                return 75
            } else if (laptops) {
                return 75
            } else {
                return 75
            }
        }
  
    }
  

    

    const breakpoints = {
        340: {
            slidesPerView: 2.5,
        },
        540: {
            slidesPerView: 2.5,
        },
        768: {
            slidesPerView: 3.5,
        },

        990: {
            slidesPerView: 4.5,
        },
        1024: {
            slidesPerView: slidesPerView ? slidesPerView : 5,
        }
    }

    return (
        <>
            {type == 'grid'
                ?
                (
                    <>
                        <section className='w-full' style={{ maxWidth: "1358px", margin: ' 0 auto 3rem' }}>
                            {title
                                &&
                                <div className='bg-[#CED0D0] sm:w-fit w-full px-4 py-2 rounded-t-lg'>{title}</div>
                            }
                            <div className='w-full p-4 bg-[#CED0D0] sm:rounded-lg rounded-b-xl sm:rounded-tr-none'>
                                <Swiper
                                    breakpoints={breakpoints}
                                    style={style}
                                    slidesPerView={slidesPerView}
                                    spaceBetween={spaceBetween}
                                    navigation={mobile ? false : navigation}
                                    modules={[Navigation, Grid]}
                                    grid={{
                                        rows: 2,
                                        fill: 'row'
                                    }}
                                    className="gridSwiper"
                                >
                                    {data.length > 0 &&
                                        <>
                                            {data.map(brand => (
                                                <SwiperSlide key={brand.id}>
                                                    <Link
                                                        title={brand.title ? brand.title : brand.name}
                                                        className='bg-white flex justify-center py-3 rounded-lg w-full h-full text-sm relative overflow-hidden group'
                                                        href={brand.link ? brand.link : brand.slug}
                                                    >
                                                        {brand.title ? brand.title : brand.alt_name}
                                                        {brand.image &&
                                                            <ImageCustom
                                                                data={brand.image}
                                                                alt={brand.image_alt}
                                                                title={brand.image_alt}
                                                                className='absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all group-hover:origin-center bg-white flex items-center justify-center'
                                                                loading={"lazy"}
                                                                width={75}
                                                                height={75}
                                                                
                                                                size = {size}
                                                            />
                                                        }

                                                    </Link>
                                                </SwiperSlide>
                                            ))}
                                        </>
                                    }
                                </Swiper>
                            </div>
                        </section>
                    </>
                )
                :
                <>
                    <section className='w-full sm:px-4 px-2' style={{ maxWidth: "1358px", margin: ' 0 auto 3rem', display: 'grid', gridTemplateColumns: "repeat(8 , 1fr)", gap: '.5rem' }}>
                        <div className='lg:col-span-1 col-span-8 lg:rounded-t-lg lg:rounded-b-lg rounded-t-xl p-4 flex flex-col justify-center items-center gap-1' style={{ "background": "linear-gradient(90deg, #FFA300 0%, #FF8C00 100%)" }}>
                            <VerifiedIcon sx={{ color: '#fff' }} />
                            <p className='text-xs text-white font-bold'>منتخب برندها</p>
                        </div>
                        <div className='border lg:col-span-7 col-span-8 border-theme rounded-lg p-4'>
                            <Swiper style={style} breakpoints={breakpoints} slidesPerView={slidesPerView} spaceBetween={spaceBetween} navigation={mobile ? false : navigation} modules={navigation && [Navigation]} className="mySwiper">
                                {data.length > 0 &&
                                    <>
                                        {data.map(brand => (
                                            <SwiperSlide key={brand.id} className='border-l'>
                                                <Link href={brand.slug} title={brand.name} className='sm:grayscale sm:hover:grayscale-0 sm:transition-colors'>
                                                    <ImageCustom
                                                        data={brand.image}
                                                        alt={brand.image_alt}
                                                        title={brand.image_alt}
                                                        className='flex justify-center'
                                                        loading={"lazy"}
                                                        width={response("width")}
                                                        height={response("height")}
                                                        fullWidth={false}
                                                    />
                                                </Link>
                                            </SwiperSlide>
                                        ))}
                                    </>
                                }
                            </Swiper>
                        </div>
                    </section>
                </>
            }


        </>
    );
};

export default BrandsCarousel;