"use client";
import React, { Fragment, useContext, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
// import { VideoSourceContext } from "@/context/videoSrcContext";
import dynamic from "next/dynamic";
import Pagination from "../category/Pagination";
import CardsCarousel from '../constantElements/CardsCarousel'
import ButtonCustom from '../constantElements/ButtonCustom';
import PuffLoader from "react-spinners/PuffLoader";
import Description from '@/components/category/Description';
import Paragraph from '@/components/special-box/Paragraph';
import Progress from '@/components/special-box/Progress';
import VideoBox from '@/components/VideoBox';
import ContentImageBox from '@/components/ContentImageBox';
// import SideBar from '@/components/category/SideBar';
import BrandSlider from '@/components/main/BrandSlider'
// import Breadcrumb from '@/components/Breadcrumb'
import Accordions from '@/components/Accordions'
// import styles from "@/assets/css/category/MainCategory.module.css";
import Title from "@/components/main/Title";
// import Card from '../Card'
import Forms from "@/components/Forms";
import BannerCarousel from "../constantElements/BannerCarousel";




import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButtonIcon from '@mui/material/ToggleButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect'

const overRide = () => ({
    display: "block",
    margin: "0 auto",
});


const ToggleButtonGroup = dynamic(() => import("@mui/material/ToggleButtonGroup"), {
    ssr: false,
    loading: () => (
        <div className="w-[95px] h-12"><Skeleton variant="rectangular" sx={{ width: '100%' }} height={48} animation="wave" /></div>
    ),
});
const Box = dynamic(() => import("@mui/material/Box"), {
    ssr: false,
    loading: () => (
        <div className="w-[173px] h-12 ml-4"><Skeleton variant="rectangular" sx={{ width: '100%' }} height={48} animation="wave" /></div>
    ),
});
const BreadcrumbCustom = dynamic(() => import("../constantElements/BreadcrumbCustom"), {
    ssr: false,
    loading: () => (
        <div className="w-full my-2 h-[24.44px] px-4"><Skeleton variant="rectangular" sx={{ width: '100%' }} height={24.44} animation="wave" /></div>
    ),
});
const Card = dynamic(() => import("@/components/Card"), {
    ssr: false,
    loading: () => (
        <div className="w-auto h-[447.19px] p-2 mb-2"><Skeleton variant="rounded" sx={{ width: 'auto' }} height={447.19} animation="wave" /></div>
    ),
});


const SideBar = dynamic(
    () => import("@/components/category/SideBar"),
    {
        ssr: false,
        loading: () => (
            <div className="col-span-2 xl:block hidden w-full h-screen"><Skeleton variant="rectangular" sx={{ width: '100%' }} height={628} animation="wave" /></div>
        ),
    }
);


const Brands = ({ apiData, pages }) => {
    const [list, setList] = useState(false)
    const [view, setView] = useState(`module`);
    const mobile = useMediaQuery("(max-width : 540px)");
    const handleChange = (event, nextView) => {
        if (nextView !== null) setView(nextView);
        setList(nextView == 'list' ? true : false)
    };

    // const { setGetSrc } = useContext(VideoSourceContext);

    return (

        <>

            <Title position="head" titleValue={apiData && apiData.brand.name} />
            <section className={`grid grid-flow-row grid-cols-9 sm:px-4 px-2 py-4 gap-4 w-full  max-with-unique`}>
                <SideBar sideBanner={apiData && apiData.brand.side_banners} popularData={apiData && apiData.brand.popular_sliders} className="col-span-2 xl:block hidden" type='brand' />
                <section className="xl:col-span-7 col-span-9">
                    {(apiData && apiData.brand.special_box_status == 1 && apiData.brand.special_box.length > 0) ? (
                        <>
                            {apiData.brand.special_box.map((special) => {
                                switch (special.content_type) {
                                    case "paragraph":
                                        return (
                                            <Fragment key={special.id}>
                                                <section
                                                    className={`paragraph grid grid-cols-2 grid-flow-row-dense gap-4 mb-8`}
                                                >
                                                    {special.items.map(paragraph => {
                                                        return (
                                                            <Fragment key={paragraph.id}>
                                                                <Paragraph className="last:odd:col-span-2 sm:col-span-1 col-span-2" paragraphTitle={paragraph.title} paragraphDescription={paragraph.description}
                                                                    link={paragraph.link} />
                                                            </Fragment>
                                                        )
                                                    })}
                                                </section>
                                            </Fragment>
                                        );
                                    case "faq":
                                        return (<Fragment key={special.id}><Accordions type="FAQ" faqData={special.items} /></Fragment>);
                                    case "video":
                                        return (
                                            <Fragment key={special.id}>
                                                {setGetSrc(special.items[0].video_path)}
                                                {special.items.length == 1 ? (

                                                    <VideoBox position="Horizontal" videoData={special.items} />
                                                ) : (
                                                    <VideoBox position="Vertical" videoData={special.items} />
                                                )}
                                            </Fragment>
                                        );
                                    case "post":
                                        return (
                                            <Fragment key={special.id}>
                                                <CardsCarousel
                                                    type='post'
                                                    title={[special.title]}
                                                    data={special.items}
                                                    navigation={false}
                                                    backgroundColor=""
                                                    spaceBetween={5}
                                                />
                                            </Fragment>
                                        );
                                    case "first_content":
                                        return (
                                            <Fragment key={special.id}>
                                                <ContentImageBox type={"firstArticle"} title={special.title} firstContentData={special.items} />
                                            </Fragment>
                                        );
                                    case "second_content":
                                        return (
                                            <Fragment key={special.id}><ContentImageBox type={"secondArticle"} /></Fragment>
                                        );
                                    case "third_content":
                                        return <Fragment key={special.id}><ContentImageBox type="contentImageV3" /></Fragment>
                                    case "accordion":
                                        return <Fragment key={special.id}><Accordions type="photoContent" /></Fragment>;
                                    case "progress":
                                        return (
                                            <Fragment key={special.id}>
                                                {special.type === 1 ? (
                                                    <section
                                                        className={`circular-progress grid sm:grid-cols-3 grid-cols-2 gap-6 place-items-center mb-16`}
                                                    >
                                                        <Progress range={10} type="Circular" />
                                                    </section>
                                                ) : (
                                                    <Progress range={48} type="Linear" progressValue={special.items} />
                                                )}
                                            </Fragment>
                                        );
                                    case "image_slider":

                                        return (
                                            <Fragment key={special.id}>
                                                <BannerCarousel
                                                autoplayDelay={3500}
                                                    data={special.items}
                                                />
                                            </Fragment>
                                        );
                                    case "brand":
                                        return (
                                            <Fragment key={special.id}>
                                                <BrandSlider type="category" className={`mb-5`} brandData={special.items} title={special.title} />
                                            </Fragment>
                                        );
                                    case 'product':

                                        return (
                                            <Fragment key={special.id}>
                                                <CardsCarousel
                                                    type='special_box'
                                                    title={special.title}
                                                    data={special.items}
                                                    cover={special.cover}
                                                    spaceBetween={5}
                                                />
                                            </Fragment>
                                        );
                                    default:
                                        break;
                                }
                            })}
                            {/* end-special-box */}
                        </>
                    ) : (
                        (apiData.brand.summary != "" && apiData.brand.summary) ? (
                            <Description type="summary" summary={apiData.brand.summary} />
                        ) : null
                    )}
                    {/* cards */}
                    <section id="products">
                        {/* filters */}
                        <div
                            className={`filters flex sm:flex-row flex-row-reverse sm:justify-start justify-between mb-5`}
                        >
                           
                            <ToggleButtonGroup
                                orientation="horizontal"
                                value={view}
                                exclusive
                                onChange={handleChange}
                            >
                                <ToggleButtonIcon value="module" aria-label="module">
                                    <ViewModuleIcon />
                                </ToggleButtonIcon>
                                <ToggleButtonIcon value="list" aria-label="list">
                                    <ViewListIcon />
                                </ToggleButtonIcon>
                            </ToggleButtonGroup>
                        </div>
                        {/* filters */}
                        <div
                            className={`card-container grid gap-2 ${view === "module" ? "sm:grid-cols-4 grid-cols-2" : "grid-cols-1"
                                } w-full h-fit mb-16`}
                        >
                            {apiData.brand.products &&
                                Array.isArray(apiData.brand.products) ?
                                apiData.brand.products.length > 0 ?
                                    apiData.brand.products.map((product) => {
                                        return product && (
                                            <Fragment key={product.id}>
                                                <Card
                                                    data={product}
                                                    list={list}
                                                />
                                                {product.structure_status == 1 &&
                                                    <script
                                                        type="application/ld+json"
                                                        dangerouslySetInnerHTML={{ __html: JSON.stringify(product.data_structure) }}
                                                    />}
                                            </Fragment>
                                        )
                                    }) : <p className="text-center sm:col-span-5 col-span-2 p-4 font-bold ">محصولی برای نمایش موجود نیست</p>


                                :
                                apiData.brand.products.data.length > 0 ?
                                    apiData.brand.products.data.map((product) => {
                                        return product && (
                                            <Fragment key={product.id}>
                                                <Card
                                                    data={product}
                                                    list={list}
                                                />
                                                {product.structure_status == 1 &&
                                                    <script
                                                        type="application/ld+json"
                                                        dangerouslySetInnerHTML={{ __html: JSON.stringify(product.data_structure) }}
                                                    />}
                                            </Fragment>
                                        )
                                    }) : <p className="text-center sm:col-span-5 col-span-2 p-4 font-bold ">محصولی برای نمایش موجود نیست</p>
                            }
                        </div>
                        {
                            apiData.brand.products.last_page ?
                                apiData.brand.products.last_page != 1 &&
                                <Pagination type='brands' currentPage={pages} pages={apiData.brand.products.last_page} links={apiData.brand.products.links} slug={apiData.brand.slug} />
                                : null
                        }
                    </section>
                    <Description type="default" body={apiData && apiData.brand.body} />
                </section>
            </section>
        </>
    );
};

export default Brands;