'use client'
import React, { useState } from 'react';
import TabCustom from "@/components/constantElements/TabCustom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Card from '../Card';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardsCustom from '@/components/constantElements/CardsCustom'
import 'swiper/css';
import '@/styles/styles.css'
import 'swiper/css/navigation';
import ButtonCustom from './ButtonCustom';
import ImageCustom from './ImageCustom';
import Link from 'next/link';

const style = {
    "--swiper-navigation-color": "var(--theme-color)",
    "--swiper-pagination-color": "var(--theme-color)",
};

const CardsCarousel = ({ slug = null, link = null, cover = null, title = "", type, data = [], spaceBetween = 30, slidesPerView = 3, navigation = true, className, backgroundColor = "#ffc794b5" }) => {


    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
    const mobile = useMediaQuery("(max-width:540px)");
    const [page, setPage] = useState(0)



    const breakpoints = {

        340: {
            slidesPerView: 1.9 
            // ...(
                
            //     cover && cover.mobile_image  ?
                
            //         { slidesPerView: 1.5 }
            //         :
            //         { slidesPerView: 1.9 }
            // )
        },

        540: {
            slidesPerView: 2.5,
        },

        768: {
            slidesPerView: 2.5,
        },

        990: {
            slidesPerView: 4.5,
        },

        1024: {
            slidesPerView: 3.5,
        },

        1200: {
            ...(
                type != 'special_box' ?
                    {

                        slidesPerView: slidesPerView,
                    }
                    :
                    {
                        ...(

                            cover.image || cover.mobile_image ?
                            
                                { slidesPerView: 3 }
                                :
                                { slidesPerView: 4 }
                        )


                    }
            )
        }
    }

    return (
        <>
            {type == 'group_slider'
                ?
                <section className='sm:px-4 px-2' style={{ maxWidth: '1358px', margin: '0 auto 2rem' }}>
                    {data.length > 0 &&
                        data[1].length > 0 &&
                        <>
                            <TabCustom
                                selected={page}
                                onChange={(event, newValue) => setPage(newValue)}
                                value={data[0].map(e => e.title)}
                            />
                            <div className='mt-4 bg-[#EFEFEF] p-4'>
                                <Swiper breakpoints={breakpoints} style={style} slidesPerView={slidesPerView} spaceBetween={spaceBetween} navigation={mobile ? false : navigation} modules={navigation && [Navigation]} className="mySwiper">

                                    {data[1][page].map(product => (
                                        <SwiperSlide key={product.id}>
                                            <Card
                                                data={product}
                                                altName={true}
                                            />
                                        </SwiperSlide>
                                    ))}


                                </Swiper>
                            </div>
                        </>

                    }
                </section>
                : type == 'special_box'
                    ?
                    <section className='sm:px-4 px-2 pb-4 flex flex-col items-center w-full bg-gradient-to-b from-[#CED0D0] to-white rounded-lg' style={{ maxWidth: '1358px', margin: '0 auto 3rem' }}>
                        <div className='bg-white sm:text-base text-sm w-4/5 text-center py-4 rounded-b-full font-bold'>{title}</div>
                        {data.length > 0
                            &&
                            <div className={`${cover.image || cover.mobile_image ? !mobile && 'grid grid-cols-4 gap-4' : null} w-full  mt-4`}>
                                {cover.image || cover.mobile_image ?
                                    !mobile &&
                                    <Link href={cover.link ? cover.link : "#"} title={title}>

                                        <ImageCustom
                                            data={cover.image}
                                            alt={cover.image_alt}
                                            title={cover.image_alt}

                                            mobileData={cover.mobile_image}
                                            mobileAlt={cover.mobile_image_alt}
                                            mobileTitle={cover.mobile_image_alt}
                                            // props
                                            loading={"lazy"}
                                            width={237}
                                            height={477}
                                            fullWidth={false}
                                            size="original"
                                            style={{borderRadius:'.5rem'}}
                                        />

                                    </Link>
                                    
                                    : null
                                }
                                <div className={`w-full ${cover.image || cover.mobile_image ? 'col-span-3' : null}`}>
                                    <Swiper breakpoints={breakpoints} style={style} slidesPerView={slidesPerView} spaceBetween={spaceBetween} navigation={mobile ? false : navigation} modules={navigation && [Navigation]} className="mySwiper">
                                        {data.map(product => (
                                            <SwiperSlide key={product.id}>
                                                <Card
                                                    data={product}
                                                    altName={true}
                                                    shipperVisible={false}
                                                    colorVisible={false}
                                                />
                                            </SwiperSlide>
                                        ))}

                                    </Swiper>
                                </div>
                            </div>
                        }
                    </section>
                    :
                    <section className='sm:px-4 px-2' style={{ maxWidth: '1358px', margin: '0 auto 3rem' }}>
                        {data.length > 0 &&
                            <>
                                <TabCustom
                                    value={title}
                                />
                                <div className={`mt-4 p-4 ${type == 'post' && "bg-gradient-to-b from-[#CED0D0] to-white"}`} style={{ backgroundColor: backgroundColor }}>
                                    {link ?
                                        <ButtonCustom
                                            text={link}
                                            justifyContent='end'
                                            variant='text'
                                            link={slug}
                                        />
                                        : null
                                    }
                                    <Swiper breakpoints={breakpoints} style={style} slidesPerView={slidesPerView} spaceBetween={spaceBetween} navigation={mobile ? false : navigation} modules={navigation && [Navigation]} className="mySwiper">
                                        {

                                            data.map(product => (
                                                <SwiperSlide key={product.id}>
                                                    {type == 'post'
                                                        ?
                                                        <CardsCustom
                                                            type='post'
                                                            title={product.title}
                                                            image={product.image}
                                                            body={product.body}
                                                        />
                                                        :
                                                        <Card
                                                            data={product}
                                                            altName={true}
                                                        />
                                                    }
                                                </SwiperSlide>
                                            ))

                                        }
                                    </Swiper>
                                </div>
                            </>
                        }
                    </section>
            }

        </>
    );
};

export default CardsCarousel;