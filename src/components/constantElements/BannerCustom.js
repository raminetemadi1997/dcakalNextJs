'use client'
import React from 'react';
import ImageCustom from './ImageCustom';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';

const BannerCustom = ({ data = null, className, status }) => {

    const miniMobile = useMediaQuery("(max-width:375px)")
    const mobile = useMediaQuery("(max-width:600px)");
    const portraitTablets = useMediaQuery("(min-width:600px)  and (max-width:768px) ");
    const landscapeTablets = useMediaQuery("(min-width:768px) and (max-width:992px)");
    const laptops = useMediaQuery("(min-width:992px) and (max-width:1200px)");


    function response(porpose) {

        if (status == "odd") {

            if (porpose == "width") {
                if (miniMobile) {
                    return 358
                } else if (mobile) {
                    return 583
                } else if (portraitTablets) {
                    return 585
                } else if (landscapeTablets) {
                    return 737
                } else if (laptops) {
                    return 961
                } else {
                    return 1326
                }
            }

            else if (porpose == "height") {
                if (miniMobile) {
                    return 143
                } else if (mobile) {
                    return 103
                } else if (portraitTablets) {
                    return 103
                } else if (landscapeTablets) {
                    return 130
                } else if (laptops) {
                    return 170
                } else {
                    return 234
                }
            }
        } else if (status == "even") {

            if (porpose == "width") {
                if (miniMobile) {
                    return 175
                } else if (mobile) {
                    return 288
                } else if (portraitTablets) {
                    return 289
                } else if (landscapeTablets) {
                    return 361
                } else if (laptops) {
                    return 473
                } else {
                    return 655
                }
            }

            else if (porpose == "height") {
                if (miniMobile) {
                    return 115
                } else if (mobile) {
                    return 103
                } else if (portraitTablets) {
                    return 103
                } else if (landscapeTablets) {
                    return 129
                } else if (laptops) {
                    return 169
                } else {
                    return 235
                }
            }
        }


    }


    return (
        <>
            {
                data &&
                <div className={className}>
                    <Link href={data.link ? data.link : '#'} title={data.image_alt}>
                        <ImageCustom
                            data={data.image}
                            style={{ borderRadius: '.5rem' }}
                            alt={data.image_alt}
                            title={data.image_alt}
                            size="original"
                            mobileData={data.mobile_image}
                            mobileAlt={data.mobile_image_alt}
                            mobileTitle={data.mobile_image_alt}

                            loading={"lazy"}
                            width={response("width")}
                            height={response("height")}
                        />
                    </Link>
                </div>
            }
        </>
    );
};

export default BannerCustom;