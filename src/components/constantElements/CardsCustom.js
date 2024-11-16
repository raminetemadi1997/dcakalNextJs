import React, { useState } from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory";
import TimerCustom from "@/components/constantElements/TimerCustom";
import ImageCustom from './ImageCustom';
import Image from 'next/image';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PhoneIcon from "@mui/icons-material/Phone";
import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsIcon from "@mui/icons-material/Notifications";

const CardsCustom = ({
    body = '',
    image = '',
    type,
    title = '', data, shipperVisible = true,
    colorVisible = true,
    attributeValue = true,
    timerVisible = true, ...props }) => {
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
            :
            <>

                <div>
                    <Link
                        {...props}
                        href={`/${data.slug}`}
                        title={data.name}
                        className={` block rounded-lg border overflow-hidden sm:p-4 p-2 bg-white hover:shadow-md`}
                    >
                        {/* card head */}
                        {timerVisible && (
                            <div className="h-10 flex justify-between items-center">
                                <div>
                                    {data.new_product == 1 && (
                                        <div className="text-[#DE1616]">جدید</div>
                                    )}
                                </div>
                                {data.marketable == 0 ? (
                                    data.discount &&
                                        !Array.isArray(data.discount) &&
                                        date < new Date(data.discount.end_date) ? (
                                        <>
                                            {data.discount.infinite_status == 1 ? (
                                                <div className="flex items-center justify-end">
                                                    <div className="tracking-widest text-[#DE1616] sm:text-sm text-xs font-medium">
                                                        پیشنهاد ویژه
                                                    </div>

                                                    <LocalOfferIcon
                                                        sx={{ color: "#DE1616", ml: 0.5 }}
                                                        fontSize="medium"
                                                    />
                                                </div>
                                            ) : (
                                                <TimerCustom
                                                    startDate={data.discount.start_date}
                                                    endDate={data.discount.end_date}
                                                />
                                            )}
                                        </>
                                    ) : null
                                ) : null}
                            </div>
                        )}
                        {/* card head */}

                        {/* card image */}
                        {data.image ? (
                            <div
                                className="mb-4 relative overflow-hidden"
                                onMouseEnter={() => setShowVideo(true)}
                                onMouseLeave={() => setShowVideo(false)}
                            >
                                {showVideo && (
                                    <>
                                        {data.video ? (
                                            <div className="w-full h-full absolute top-0 bg-black">
                                                <video
                                                    width="1900"
                                                    height="500"
                                                    controls={false}
                                                    className="w-full h-full"
                                                    autoPlay
                                                    muted
                                                >
                                                    <source src={data.video} type="video/mp4" />
                                                </video>
                                            </div>
                                        ) : null}
                                    </>
                                )}
                                <ImageCustom
                                    data={data.image}
                                    alt={data.image_alt}
                                    title={data.image_alt}
                                    // props
                                    loading={"lazy"}
                                    height={height ? height : responsive("height")}
                                    width={width ? width : responsive("width")}
                                />
                            </div>
                        ) : (
                            <Image src={noImage} alt="عکس پیشفرض" className="mb-4" />
                        )}
                        {colorVisible && (
                            <div className="h-4 flex gap-2 mb-2">
                                {data.colors
                                    ? data.colors.length > 1 &&
                                    data.colors.map((color) => (
                                        <div
                                            key={color.id}
                                            className="w-4 h-4 border rounded-sm"
                                            style={{ backgroundColor: color.color_code }}
                                        ></div>
                                    ))
                                    : null}
                            </div>
                        )}

                        {/* card feature */}
                        {
                            attributeValue &&
                            <div className="h-[45px] mb-4 grid grid-cols-4 gap-1 place-items-center">
                                {data.attributes &&
                                    data.attributes.length > 0 &&
                                    data.attributes.map((attribute) => (
                                        <div key={attribute.id} className="grid gap-1">
                                            <ImageCustom
                                                data={JSON.parse(attribute.icon)}
                                                alt={attribute.icon_alt}
                                                title={attribute.icon_alt}
                                                // props
                                                size={"original"}
                                                width={25}
                                                height={25}
                                                fullWidth={false}
                                            />
                                            <div className="text-xs text-center text-[#8a8a8a] font-medium">
                                                {attribute.attribute_value}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        }
                        {/* card feature */}

                        {/* shipper */}
                        {shipperVisible && (
                            <div className="h-12">
                                {data.shipper && (
                                    <div className="flex items-center w-fit bg-[#009688] px-2 py-1 rounded-lg">
                                        <RocketLaunchIcon
                                            fontSize="small"
                                            sx={{ mr: 0.5, color: "#fff" }}
                                        />
                                        <div className="text-sm text-white">ارسال سریع</div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* shipper */}

                        {/* card name */}
                        <div
                            className={`sm:text-sm text-xs mb-4 min-h-[40px] leading-5 ${styles.truncate}`}
                        >
                            {altName ? data.alt_name : data.name}
                        </div>
                        {/* card name */}

                        {/* card footer */}
                        {data.type != 1 ? (
                            <>
                                {data.marketable == 0 && data.price != 0 ? (
                                    <>
                                        {data.discount &&
                                            !Array.isArray(data.discount) &&
                                            date < new Date(data.discount.end_date) ? (
                                            <div className="h-12">
                                                <div className="flex items-center justify-between">
                                                    {data.discount.type == 0 ? (
                                                        <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                                                    ) : (
                                                        <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                                            Math.round(
                                                                (data.discount.percentage / data.price) * 100
                                                            )
                                                        )} %`}</div>
                                                    )}
                                                    <div className="flex justify-end">
                                                        <span className="text-[#DE1616] sm:text-base text-sm">
                                                            {data.discount.type == 0 ? (
                                                                <span className="font-semibold tracking-widest">{`${Number(
                                                                    data.discount.final_price
                                                                ).toLocaleString()}`}</span>
                                                            ) : (
                                                                <span className="font-bold tracking-widest">{`${Number(
                                                                    data.discount.final_price
                                                                ).toLocaleString()}`}</span>
                                                            )}
                                                            <span className="text-xs mr-1">تومان</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end sm:text-sm text-xs text-[#C4C3C3] line-through">
                                                    <span>
                                                        <span className="font-bold tracking-widest">{`${Number(
                                                            data.price
                                                        ).toLocaleString()}`}</span>
                                                        <span className="text-xs mr-1">تومان</span>
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end h-12 items-center">
                                                <span>
                                                    <span className="font-bold tracking-widest">{`${Number(
                                                        data.price
                                                    ).toLocaleString()}`}</span>
                                                    <span className="text-xs mr-1">تومان</span>
                                                </span>
                                            </div>
                                        )}
                                    </>
                                ) : data.marketable == 1 || data.price == 0 ? (
                                    <div className="flex justify-between items-center h-12">
                                        <div className="text-[#009688] font-bold">
                                            تماس بگیرید
                                        </div>
                                        <PhoneIcon fontSize="medium" sx={{ color: "#009688" }} />
                                    </div>
                                ) : data.marketable == 2 ? (
                                    <div className="flex justify-between items-center h-12">
                                        <div className="text-[#555555] font-bold">ناموجود</div>
                                        <NotificationsIcon
                                            fontSize="medium"
                                            sx={{ color: "#555555" }}
                                        />
                                    </div>
                                ) : data.marketable == 3 ? (
                                    <div className="flex justify-between items-center h-12">
                                        <div className="text-[#555555] font-bold">توقف تولید</div>
                                        <CancelIcon fontSize="medium" sx={{ color: "#555555" }} />
                                    </div>
                                ) : null}
                            </>
                        ) : data.price ? (
                            <>
                                {data.discount &&
                                    !Array.isArray(data.discount) &&
                                    date < new Date(data.discount.end_date) ? (
                                    <div className="h-12">
                                        <div className="flex items-center justify-between">
                                            {data.discount.type == 0 ? (
                                                <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${data.discount.percentage} %`}</div>
                                            ) : (
                                                <div className="sm:text-sm text-xs bg-[#DE1616] px-1 text-white rounded-md">{`${Number(
                                                    Math.round(
                                                        (data.discount.percentage / data.price) * 100
                                                    )
                                                )} %`}</div>
                                            )}
                                            <div className="flex justify-end">
                                                <span className="text-[#DE1616] sm:text-base text-sm">
                                                    {data.discount.type == 0 ? (
                                                        <span className="font-semibold tracking-widest">{`${Number(
                                                            data.discount.final_price
                                                        ).toLocaleString()}`}</span>
                                                    ) : (
                                                        <span className="font-bold tracking-widest">{`${Number(
                                                            data.discount.final_price
                                                        ).toLocaleString()}`}</span>
                                                    )}
                                                    <span className="text-xs mr-1">تومان</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end text-sm text-[#C4C3C3] line-through">
                                            <span>
                                                <span className="font-bold tracking-widest">{`${Number(
                                                    data.price
                                                ).toLocaleString()}`}</span>
                                                <span className="text-xs mr-1">تومان</span>
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-end h-12 items-center">
                                        <span>
                                            <span className="font-bold tracking-widest">{`${Number(
                                                data.price
                                            ).toLocaleString()}`}</span>
                                            <span className="text-xs mr-1">تومان</span>
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex justify-between items-center h-12">
                                <div className="text-[#DE1616] lg:text-base text-sm font-bold">
                                    مشاهده همه پکیج ها
                                </div>
                                <InventoryIcon fontSize="medium" sx={{ color: "#DE1616" }} />
                            </div>
                        )}
                        {/* card footer */}
                    </Link>
                </div>



            </>

    );
};

export default CardsCustom;