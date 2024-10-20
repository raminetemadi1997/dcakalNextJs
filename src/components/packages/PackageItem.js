"use client";
import React, { Fragment, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Pagination from "../category/Pagination";

//css
import styles from "@/assets/css/category/MainCategory.module.css";
//css


//components
import Title from "@/components/main/Title";
import Card from '../Card'
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButtonIcon from '@mui/material/ToggleButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect'
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SubCategory from "../category/SubCategory";
import Description from '@/components/category/Description'
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
//components


const overRide = () => ({
    display: "block",
    margin: "0 auto",
});



const Filter = dynamic(() => import("@/components/constantElements/Filter"), {
    ssr: false,
    loading: () => (
        <div className="w-[150px] h-[45px] sm:col-span-1">
            <Skeleton
                variant="rectangular"
                sx={{ width: "100%" }}
                height={45}
                animation="wave"
            />
        </div>
    ),
});



const SideBar = dynamic(() => import("@/components/category/SideBar"), {
    ssr: false,
    loading: () => (
        <div className="col-span-2 xl:block hidden w-full h-screen">
            <Skeleton
                variant="rectangular"
                sx={{ width: "100%" }}
                height={628}
                animation="wave"
            />
        </div>
    ),
});






const PackageItem = ({ apiData, slug, pages, scrollTo }) => {




    const [list, setList] = useState(false)
    const [filterData, setFilterData] = useState(null)
    // slug = slug.replace('api/', '')
    const [view, setView] = useState(`module`);
    const mobile = useMediaQuery("(max-width : 540px)");
    const handleChange = (event, nextView) => {
        if (nextView !== null) setView(nextView);
        setList(nextView == 'list' ? true : false)
    };



    const data = (data) => {
        if (apiData.products.total == data.data.products.total) {
            setFilterData(null);
        } else {
            setFilterData(data)
        }

    }






    return (
        <main className={`flex flex-col items-center ${styles.mainContainer}`}>

            <Title position="head" titleValue={apiData && apiData.title} />
            <section
                className={`grid grid-flow-row grid-cols-9 sm:px-4 px-2 py-4 gap-4 w-full  max-with-unique`}
            >
                {/* Aside Of Category */}
                <SideBar
                    className="col-span-2 sm:block hidden"
                    type='brand'
                    sideBanner={apiData && apiData.side_banners}
                    filters={apiData && apiData.filters}
                    popularData={apiData && apiData.popular_sliders}
                    sendData={data}
                    id='all'
                />
                {/* Aside Of Category */}
                <section className="sm:col-span-7 col-span-9">
                    {
                        apiData &&
                        apiData.children.length > 0 &&
                        <section className="grid sm:grid-cols-5 gap-4 grid-cols-2 mb-12">
                            {apiData && apiData.children.map(subCategory => (
                                <Fragment key={subCategory.id}>
                                    <SubCategory
                                        slug={subCategory.slug}
                                        name={subCategory.name}
                                        type='package'
                                    />
                                </Fragment>
                            ))}

                        </section>
                    }

                    {/* cards */}
                    <section id="products">
                        {/* filters */}
                        {
                            Array.isArray(apiData.products) ?
                                apiData.products.length > 0 &&
                                <div
                                    className={`filters flex sm:flex-row flex-row-reverse sm:justify-start justify-between mb-5`}
                                >
                                    {
                                        !mobile
                                            ?
                                            <Filter
                                                type="product"
                                                id={apiData.id}
                                                // urlValue={urlValue.length > 0 && urlValue}
                                                scrollTo={scrollTo}
                                            />
                                            :

                                            <></>
                                    }

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
                                :
                                apiData.products.data.length > 0 &&

                                <div
                                    className={`filters flex sm:flex-row flex-row-reverse sm:justify-start justify-between mb-5`}
                                >
                                    {
                                        !mobile
                                            ?
                                            <Filter
                                                type="product"
                                                id={apiData.id}
                                                // urlValue={urlValue.length > 0 && urlValue}
                                                scrollTo={scrollTo}
                                            />
                                            :

                                            <></>
                                    }

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
                        }
                        {/* filters */}
                        <div
                            className={`card-container grid gap-0 ${view === "module" ? "sm:grid-cols-4 grid-cols-2" : "grid-cols-1"
                                } w-full h-fit mb-16`}
                        >
                            {apiData.parent_id == null ? (
                                apiData.products &&
                                    apiData.products.data.length > 0 ?
                                    !filterData ?
                                        apiData.products.data.map((product) => {

                                            return (
                                                product &&
                                                <Card
                                                    key={product.id}
                                                    data={product}
                                                    list={list}
                                                />
                                            )
                                        })

                                        :
                                        filterData.data.products.data.map((product) => {
                                            return (
                                                <Fragment key={product.id}>
                                                    <Card
                                                        data={product}
                                                        list={list}
                                                    />
                                                </Fragment>
                                            )
                                        })

                                    : <p>محصولی برای نمایش موجود نیست</p>
                            ) : (
                                apiData.products ?
                                    !Array.isArray(apiData.products) ? (
                                        !apiData.products.data.length > 0 ?
                                            <div className="w-full p-4 text-center font-bold col-span-4">محصولی برای نمایس موجود نیست</div>
                                            :
                                            apiData.products.data.length > 0 &&
                                                !filterData ?
                                                apiData.products.data.map((product) => {
                                                    return (
                                                        product &&
                                                        <Card
                                                            key={product.id}
                                                            data={product}
                                                            list={list}
                                                        />
                                                    )

                                                })
                                                :
                                                filterData.data.products.data.map((product) => {
                                                    return (
                                                        <Fragment key={product.id}>
                                                            <Card
                                                                data={product}
                                                                list={list}
                                                            />
                                                        </Fragment>
                                                    )

                                                })

                                    )
                                        : (
                                            !apiData.products.length > 0 ?
                                                <div className="w-full p-4 text-center font-bold col-span-4">محصولی برای نمایس موجود نیست</div>
                                                :
                                                apiData.products.length > 0 &&
                                                    !filterData ?
                                                    apiData.products.map((product) => {
                                                        return (
                                                            <Fragment key={product.id}>
                                                                <Card
                                                                    data={product}
                                                                    list={list}
                                                                />
                                                            </Fragment>
                                                        )

                                                    })
                                                    :
                                                    filterData.data.products.map((product) => {
                                                        return (
                                                            <Fragment key={product.id}>
                                                                <Card
                                                                    data={product}
                                                                    list={list}
                                                                />
                                                            </Fragment>
                                                        )

                                                    })
                                        )

                                    : null
                            )}
                        </div>
                        {
                            apiData.products.last_page &&
                                apiData.products.last_page != 1 ?
                                <Pagination
                                    pagel={scrollTo}
                                    currentPage={pages}
                                    pages={apiData.products.last_page}
                                    links={apiData.products.links}
                                    slug={apiData.products.slug}
                                />
                                : null
                        }
                    </section>
                    {apiData && apiData.description ?
                        <Description type="default" body={apiData && apiData.body} />
                        :
                        null
                    }
                </section>
            </section>
        </main>
    );
};

export default PackageItem;