"use client";
import React, { Fragment, useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Filters from "../menu/mobile/Filters";
import ButtonCustom from "./ButtonCustom";
import { IconButton, useMediaQuery } from "@mui/material";
import styles from "@/assets/css/CardContainer.module.css";
import Card from "@/components/Card";
import Pagination from "../category/Pagination";
import CardsCustom from "./CardsCustom";

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

const ToggleButtonIconDynamic = dynamic(
  () => import("@mui/material/ToggleButton"),
  { ssr: false }
);

const ToggleButtonGroup = dynamic(
  () => import("@mui/material/ToggleButtonGroup"),
  {
    ssr: false,
    loading: () => (
      <div className={`w-28 h-12 animate-pulse`}>
        <div className={`w-full h-full bg-gray-100 rounded-lg`}></div>
      </div>
    ),
  }
);

const ViewModuleIconDynamic = dynamic(
  () => import("@mui/icons-material/ViewModule"),
  { ssr: false }
);

const ViewListIconDynamic = dynamic(
  () => import("@mui/icons-material/ViewList"),
  { ssr: false }
);

export default function CardContainer({
  apiData,
  pages,
  scrollTo,
  currentSlug,
}) {
  const tablet = useMediaQuery("(max-width:1280px)");
  const mobile = useMediaQuery("(max-width:600px)");
  const [view, setView] = useState(`module`);
  const [filters, setFilters] = useState(false);
  const [list, setList] = useState(false);
  const [client, setClient] = useState(false);
  const [changeShow, setChangeShow] = useState("module");
  const [changeShowMobile, setChangeShowMobile] = useState("list");

  useEffect(() => {
    setClient(true);
  }, []);

  const handleChange = (event, nextView) => {
    if (nextView !== null) {
      setList(nextView == "list" ? true : false);
      setChangeShow(nextView);
    }
    if (nextView !== null) setView(nextView);
  };
  const handleChangeMobile = (event, nextView) => {
    if (nextView !== null) {
      // setList(nextView == "list" ? true : false);
      setChangeShowMobile(nextView);
    }
    // if (nextView !== null) setView(nextView);
  };


  return (
    <section id="products">
      {/* filters */}
      <div
        className={`filters flex sm:flex-row flex-row-reverse sm:justify-start justify-between mb-5 h-11`}
      >
        {!mobile ? (
          <Filter
            type="product"
            id={apiData.category.id}
            // urlValue={urlValue.length > 0 && urlValue}
            // scrollTo={scrollTo}
          />
        ) : (
          // <Filters

          //   type="product"
          //   id={apiData.category.id}
          //   // urlValue={urlValue.length > 0 && urlValue}
          //   scrollTo={scrollTo}
          // />
          <></>
        )}
        {!Array.isArray(apiData.products) &&
        apiData.products.data.length > 0 ? (
          apiData.category.type == 0 ? (
            !mobile ? (
              <ToggleButtonGroup
                orientation="horizontal"
                value={changeShow}
                exclusive
                onChange={handleChange}
              >
                <ToggleButtonIconDynamic
                  size="small"
                  value="module"
                  aria-label="module"
                >
                  <ViewModuleIconDynamic />
                </ToggleButtonIconDynamic>
                <ToggleButtonIconDynamic
                  size="small"
                  value="list"
                  aria-label="list"
                >
                  <ViewListIconDynamic />
                </ToggleButtonIconDynamic>
              </ToggleButtonGroup>
            ) : (
              <ToggleButtonGroup
                orientation="horizontal"
                value={changeShowMobile}
                exclusive
                onChange={handleChangeMobile}
              >
                <ToggleButtonIconDynamic
                  size="small"
                  value="module"
                  aria-label="module"
                >
                  <ViewModuleIconDynamic />
                </ToggleButtonIconDynamic>
                <ToggleButtonIconDynamic
                  size="small"
                  value="list"
                  aria-label="list"
                >
                  <ViewListIconDynamic />
                </ToggleButtonIconDynamic>
              </ToggleButtonGroup>
            )
          ) : null
        ) : null}
        {tablet && (
          <>
            {/* <div className="flex items-center gap-2 border rounded-lg px-2" onClick={() => setFilters(true)}>
                                        <IconButton>
                                            <TuneIcon />
                                        </IconButton>
                                        <div className="text-sm">فیلترها</div>
                                    </div> */}
            <Filters
              openMenu={filters}
              onClose={() => setFilters(false)}
              data={apiData.category.filters}
              id={apiData.category.id}
              // sendData={data}
              // urlValue={urlValue}
              scrollTo={scrollTo}
              currentSlug={currentSlug}
            />
          </>
        )}
      </div>
      {/* filters */}
      <div
        className={
          apiData.category.type == 1 ?
          ""
          :changeShowMobile == "module"
            ? styles.module_mobile
            : changeShow == "module"
            ? styles.module
            : styles.list
        }
        // className={`card-container grid ${
        //   mobile ? "gap-0" : list ? "gap-4" : "gap-0"
        // } ${
        //   apiData.category.type == 1
        //     ? "grid-cols-1"
        //     : view === "module"
        //     ? "xl:grid-cols-4 sm:grid-cols-3 grid-cols-2"
        //     : "grid-cols-1"
        // } w-full h-fit mb-16`}
      >
        {apiData.category.parent_id == null ? (
          apiData.products ? (
            !Array.isArray(apiData.products) &&
            apiData.products.data.length >= 1 ? (
              apiData.products.data.map((product, index) => {
                return (
                  product && (
                    <Fragment key={product.id}>
                      {index >= 0 && index <= 3 ? (
                        <Card
                          data={product}
                          type="products"
                          styleList={changeShow}
                          styleListMobile={changeShowMobile}
                        />
                      ) : client ? (
                        <Card
                          data={product}
                          type="products"
                          styleList={changeShow}
                          styleListMobile={changeShowMobile}
                        />
                      ) : (
                        <div className={styles.skeleton}>
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "8px",
                              "@media (max-width: 540px)": {
                                borderRadius: "0",
                              },
                            }}
                          />
                        </div>
                      )}

                      {product.structure_status == 1 && (
                        <script
                          type="application/ld+json"
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify(product.data_structure),
                          }}
                        />
                      )}
                    </Fragment>
                  )
                );
              })
            ) : (
              <p className="w-full p-4 text-center font-bold col-span-4">
                محصولی برای نمایش موجود نیست
              </p>
            )
          ) : (
            <p className="w-full p-4 text-center font-bold col-span-4">
              محصولی برای نمایش موجود نیست
            </p>
          )
        ) : apiData.products && !Array.isArray(apiData.products) ? (
          apiData.products.data.length >= 1 &&
          apiData.products.data.map((product, index) => {
            return (
              product && (
                <Fragment key={product.id}>
                  {apiData.category.type == 1 ? (
                    <>
                      {index >= 0 && index <= 3 ? (
                        <Card
                          data={product}
                          priceList={true} 
                        />
                      ) : client ? (
                        <Card
                          data={product}
                          priceList={true} 
                        />
                      ) : (
                        <div className={styles.skeleton}>
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "8px",
                              "@media (max-width: 540px)": {
                                borderRadius: "0",
                              },
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {index >= 0 && index <= 3 ? (
                        <Card
                          data={product}
                          type="products"
                          styleList={changeShow}
                          styleListMobile={changeShowMobile}
                        />
                      ) : client ? (
                        <Card
                          data={product}
                          type="products"
                          styleList={changeShow}
                          styleListMobile={changeShowMobile}
                        />
                      ) : (
                        <div className={styles.skeleton}>
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "8px",
                              "@media (max-width: 540px)": {
                                borderRadius: "0",
                              },
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {product.structure_status == 1 && (
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(product.data_structure),
                      }}
                    />
                  )}
                </Fragment>
              )
            );
          })
        ) : (
          <p>محصولی برای نمایش موجود نیست</p>
        )}
      </div>
      {apiData.products &&
      !Array.isArray(apiData.products) &&
      apiData.products.last_page != 1 ? (
        apiData.category.scroll_mode == 0 ? (
          <>
            <Pagination
              pagel={scrollTo}
              currentPage={pages}
              pages={apiData.products.last_page}
              links={apiData.products.links}
              slug={apiData.category.slug}
            />
          </>
        ) : apiData.category.scroll_mode == 1 ? (
          <ButtonCustom justifyContent="center" text="مشاهده بیشتر" />
        ) : apiData.category.scroll_mode == 2 ? (
          <h5>load more</h5>
        ) : null
      ) : null}
    </section>
  );
}
