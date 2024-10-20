'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import '@/styles/styles.css'
import 'swiper/css/navigation';
import Link from 'next/link';
import ImageCustom from './ImageCustom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';

const style = {
    "--swiper-navigation-color": "var(--theme-color)",
    "--swiper-pagination-color": "var(--theme-color)",
};

const BannerCarousel = ({ borderRadius = '.5rem', data = [], spaceBetween = 30, slidesPerView = 1, navigation = false, pagination = true, className = 'mb-12' }) => {

    const miniMobile = useMediaQuery("(max-width:375px)")
    const mobile = useMediaQuery("(max-width:600px)");
    const portraitTablets = useMediaQuery("(min-width:600px)  and (max-width:768px) ");
    const landscapeTablets = useMediaQuery("(min-width:768px) and (max-width:992px)");
    const laptops = useMediaQuery("(min-width:992px) and (max-width:1200px)");

    function response(porpose) {

        if (porpose == "width") {
            if (miniMobile) {
                return 375
            } else if (mobile) {
                return 600
            } else if (portraitTablets) {
                return 768
            } else if (landscapeTablets) {
                return 992
            } else if (laptops) {
                return 1200
            } else {
                return 1600
            }
        }

        else if (porpose == "height") {
            if (miniMobile) {
                return 188
            } else if (mobile) {
                return 127
            } else if (portraitTablets) {
                return 127
            } else if (landscapeTablets) {
                return 162
            } else if (laptops) {
                return 209
            } else {
                return 334
            }
        }

    }



    return (
        <>
            {data.length > 0 &&
                <section className={className}>
                    <Swiper style={style} slidesPerView={slidesPerView} pagination={{ enabled: pagination, clickable: true }} spaceBetween={spaceBetween} navigation={mobile ? false : navigation} modules={[Pagination, Navigation]} className="mySwiper">
                        {data.map((product, i) => (
                            <SwiperSlide key={i}>
                                <Link href={product.link ? product.link : '#'} title={product.image_alt}>
                                    <ImageCustom
                                        data={product.image}
                                        alt={product.image_alt}
                                        title={product.image_alt}
                                        mobileData={product.mobile_image}
                                        mobileAlt={product.mobile_image_alt}
                                        mobileTitle={product.mobile_image_alt}
                                        loading={i == 0 ? "eager" : "lazy"}
                                        // width={!mobile ? 1900 : 375}
                                        // height={!mobile ? 333 : 188}
                                        width={response("width")}
                                        height={response("height")}
                                        fullWidth={true}
                                        style={{ borderRadius: borderRadius }}
                                        size='original'
                                    />
                                {/* <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhO5ntJnlTao2igCX_NdCFpY43dYguQK7JLg&s" width={600} height={600} alt="Alt text of image" /> */}
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            }
        </>
    );
};

export default BannerCarousel;