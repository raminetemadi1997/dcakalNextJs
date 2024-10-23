"use client";
import React, { useRef } from "react";
//fontawsome
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
//css
import styles from "@/assets/css/head/SearchBox.module.css";
//router dom
import Link from "next/link";
//constants

import Skeleton from "@mui/material/Skeleton";
import ImageCustom from "../constantElements/ImageCustom";

const SearchBox = ({
  shownSearchBox,
  data = null,
  searchSlug = null,
  searchContainer,
}) => {
  return (
    shownSearchBox && (
      <>
        <div
          ref={searchContainer}
          id="searchBox"
          className={`absolute bg-white top-full w-4/5 shadow rounded-b-lg block searchBox_container`}
        >
          <div className="grid grid-cols-3 gap-4 p-2">
            <div className="h-fit col-span-2">
              <div className="header flex justify-between pb-2 border-b-2 border-stone-200">
                <div className="flex text-sm items-center">
                  <SearchIcon className="ml-1" />
                  <p>جستجو در</p>
                  <span className="text-theme mr-1">محصولات</span>
                </div>
                <span className="text-xs flex items-center">
                  {data && data.search_count ? data.search_count : 0}
                </span>
              </div>
              <div className="content w-full flex justify-between flex-wrap p-2">
                {data ? (
                  data.search_count == 0 ? (
                    <div className="h-48 w-full p-4 flex items-center justify-center text-lg">
                      محصولی موجود نیست
                    </div>
                  ) : (
                    data.products.length > 0 && (
                      <ul className="grid grid-cols-2 gap-2 w-full">
                        {data.products.splice(0, 6).map((product, index) => {
                          return (
                            <li key={product.id}>
                              <Link
                                title={product.name}
                                href={`/${product.slug}`}
                                className={styles.items}
                              >
                                <ImageCustom
                                  data={product.image}
                                  alt={product.image_alt}
                                  title={product.image_alt}
                                  size="small"
                                  width={106}
                                  height={106}
                                  fullWidth={false}
                                />
                                <div className={`text-sm col-span-2 ${styles.price_field}`}>
                                  <div className={styles.truncate}>{product.name}</div>
                                  {product.marketable == 1 ? (
                                    <div className="text-end font-bold text-[#009688]">تماس بگیرید</div>
                                  ) : product.marketable == 2 ? (
                                    <div className="text-end font-bold text-[#555555]">ناموجود</div>
                                  ) : product.marketable == 3 ? (
                                    <div className="text-end font-bold text-[#555555]">توقف تولید</div>
                                  ) : (
                                    product.price == 0
                                    ?
                                      <div className="text-end font-bold text-[#009688]">تماس بگیرید</div>
                                    :
                                      <div className="text-end font-bold flex items-center justify-end gap-2">
                                        <div>{Number(product.price).toLocaleString()}</div>
                                        <div className="font-normal">تومان</div>
                                      </div>
                                  )}
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )
                  )
                ) : (
                  <div className="h-auto w-full p-4 grid grid-cols-2 gap-2">
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={96}
                      sx={{ width: "100%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={96}
                      sx={{ width: "100%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={96}
                      sx={{ width: "100%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={96}
                      sx={{ width: "100%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={96}
                      sx={{ width: "100%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={96}
                      sx={{ width: "100%" }}
                    />
                  </div>
                )}
              </div>
              {data && (
                <div className="show-more text-sm flex justify-end w-full">
                  <Link
                    rel="preload"
                    href={
                      searchSlug ? `/search?search=${searchSlug}` : `/search`
                    }
                    className="flex items-center w-fit text-xs"
                  >
                    مشاهده نتایج بیشتر
                    <ChevronLeftIcon className="mr-1 text-lg" />
                  </Link>
                </div>
              )}
            </div>
            <div className="h-fit">
              <div>
                <div className="header flex justify-between pb-2 border-b-2 border-stone-200">
                  <div className="flex text-sm items-center">
                    <SearchIcon className="ml-1" />
                    <p>جستجو در</p>
                    <span className="text-theme mr-1">دسته بندی</span>
                  </div>
                </div>
                <ul className="content">
                  {data ? (
                    data.search_count == 0 ? (
                      <div className="h-48 w-full p-4 flex items-center justify-center text-lg">
                        محصولی موجود نیست
                      </div>
                    ) : (
                      data.categories.length > 0 &&
                      data.categories.splice(0, 6).map((i, index) => {
                        return (
                          <li key={index} className="item flex justify-between">
                            <Link
                              rel="preload"
                              href={`/${i.url}`}
                              className="text-sm my-2"
                            >
                              {i.main_name}
                            </Link>
                          </li>
                        );
                      })
                    )
                  ) : (
                    <div className="h-auto w-full p-4 grid grid-cols-1 gap-4">
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        height={24}
                        sx={{ width: "100%" }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        height={24}
                        sx={{ width: "100%" }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        height={24}
                        sx={{ width: "100%" }}
                      />
                    </div>
                  )}
                </ul>
              </div>
              <div className="mb-3">
                <div className="header flex justify-between pb-2 border-b-2 border-stone-200">
                  <div className="flex text-sm items-center">
                    <SearchIcon className="ml-1" />
                    <p>جستجو در</p>
                    <span className="text-theme mr-1">تولید کنندگان</span>
                  </div>
                </div>
                <ul className="content">
                  {data ? (
                    data.search_count == 0 ? (
                      <div className="h-48 w-full p-4 flex items-center justify-center text-lg">
                        محصولی موجود نیست
                      </div>
                    ) : (
                      data.brands.length > 0 &&
                      data.brands.splice(0, 6).map((i, index) => {
                        return (
                          <li key={index} className="item flex justify-between">
                            <Link
                              rel="preload"
                              href={`/${i.url}`}
                              className="text-sm my-2"
                            >
                              {i.name}
                            </Link>
                          </li>
                        );
                      })
                    )
                  ) : (
                    <div className="h-auto w-full p-4 grid grid-cols-1 gap-2">
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        height={24}
                        sx={{ width: "100%" }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        height={24}
                        sx={{ width: "100%" }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        height={24}
                        sx={{ width: "100%" }}
                      />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default SearchBox;
