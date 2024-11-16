"use client";
import React, { Fragment, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import TuneIcon from '@mui/icons-material/Tune';

//css
import styles from "@/assets/css/category/MainCategory.module.css";
//css

import Skeleton from "@mui/material/Skeleton";
import Pagination from "../category/Pagination";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButtonIcon from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SubCategory from "../category/SubCategory";
import Filters from "../menu/mobile/Filters";
import dynamic from "next/dynamic";

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

const Card = dynamic(() => import("@/components/Card"), {
    ssr: false,
    loading: () => (
        <div className="w-auto h-[447.19px] p-2 mb-2">
            <Skeleton
                variant="rounded"
                sx={{ width: "auto" }}
                height={447.19}
                animation="wave"
            />
        </div>
    ),
});



const overRide = () => ({
    display: "block",
    margin: "0 auto",
});


const Package = ({ apiData = null, pages, scrollTo }) => {

    const [filters, setFilters] = useState(false)
    const tablet = useMediaQuery("(max-width:1280px)");
    const [list, setList] = useState(false)
    const [view, setView] = useState(`module`);
    const mobile = useMediaQuery("(max-width : 540px)");
    const handleChange = (event, nextView) => {
        if (nextView !== null) setView(nextView);
        setList(nextView == 'list' ? true : false)
    };
    const [filterData, setFilterData] = useState(null)


    const data = (data) => {
        if (apiData.products.total == data.data.products.total) {
            setFilterData(null);
        } else {
            setFilterData(data)
        }

    }


    return (
        <>

            <main className={`flex flex-col items-center ${styles.mainContainer}`}>

                <>
                    <section
                        className={`grid grid-flow-row grid-cols-9 sm:px-4 px-2 py-8 gap-4 w-full  max-with-unique`}
                    >
                        <SideBar
                            className="col-span-2 xl:block hidden"
                            type='brand'
                            sideBanner={apiData.side_banners}
                            filters={apiData.filters}
                            popularData={apiData.popular_sliders}
                            sendData={data}
                            scrollTo={scrollTo}
                        />

                        {/* Aside Of Category */}
                        <section className="xl:col-span-7 col-span-9">
                            {
                                apiData &&
                                apiData.packege_categories.length > 0 &&
                                <section className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 mb-12">
                                    {apiData.packege_categories.map(subCategory => (
                                        <Fragment key={subCategory.id}>
                                            <SubCategory
                                                slug={`packages/${subCategory.slug}`}
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
                                <div
                                    className={`filters flex sm:flex-row flex-row-reverse sm:justify-start justify-between mb-5 gap-4`}
                                >
                                    {
                                        !mobile
                                            ?
                                            <Filter
                                                type="product"
                                                id="all"
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

                                    {tablet &&
                                        <>
                                            {/* <div className="flex items-center gap-2 border rounded-lg px-2" onClick={() => setFilters(true)}>
                                                <IconButton>
                                                    <TuneIcon />
                                                </IconButton>
                                                <div className="text-sm">فیلترها</div>
                                            </div>
                                             */}
                                        </>

                                    }
                                </div>
                                {/* filters */}
                                <div
                                    className={`card-container grid gap-2 ${view === "module" ? "xl:grid-cols-4 sm:grid-cols-3 grid-cols-2" : "grid-cols-1"
                                        } w-full h-fit mb-16`}
                                >
                                    {apiData.products.data.length > 0

                                        &&
                                        <>
                                            {!filterData ?

                                                apiData.products.data.map(product => (
                                                    <Fragment key={product.id}>
                                                        <Card
                                                            data={product}
                                                            list={list}
                                                        />
                                                    </Fragment>
                                                ))

                                                :
                                                filterData.data.products.data.map(product => (
                                                    <Fragment key={product.id}>
                                                        <Card
                                                            data={product}
                                                            list={list}
                                                        />
                                                    </Fragment>
                                                ))
                                            }
                                        </>


                                    }
                                </div>
                            </section>




                        </section>


                    </section>
                    {apiData.products.last_page != 1
                        &&
                        <Pagination
                            pagel={scrollTo}
                            currentPage={pages}
                            pages={apiData.products.last_page}
                            links={apiData.products.links}
                            slug={apiData.products.slug}
                        />
                    }
                </>

            </main>
        </>
    );
};

export default Package;