import React from "react";

import Title from "@/components/main/Title";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@/components/category/Pagination";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";

import { getSsrData } from "@/data/loaders";

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

export async function generateMetadata({ params, searchParams }) {
  return {
    title: `نتایج جستجو برای ${searchParams.search}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const searchData = await getSsrData(
    searchParams.page
      ? `api/search?search=${searchParams.search}&page=${searchParams.page}`
      : `api/search?search=${searchParams.search}`
  );

  return (
    <>
      <BreadcrumbCustom
        parentId={null}
        categorySlug={null}
        categoryName={"جستجو"}
        structure={null}
        uniqueSlug={`search`}
      />
      <Title
        position="head"
        titleValue={`نتایج جستجو برای ${searchParams.search}`}
      />
      <section
        className={`grid grid-flow-row grid-cols-9 sm:px-4 px-2 py-4 gap-4 w-full  max-with-unique`}
      >
        <section className="sm:col-span-9 col-span-9 grid sm:grid-cols-5 grid-cols-2">
          {searchData.data.data.products.data.length > 0 ? (
            <>
              {searchData.data.data.products.data.map((card) => (
                <div
                  key={card.id}
                  className={`card-container grid gap-4 w-full`}
                >
                  <Card data={card} />
                </div>
              ))}
            </>
          ) : (
            <div className="text-center sm:col-span-5 col-span-2 p-4 font-bold text-xl">
              نتیجه ای یافت نشد
            </div>
          )}
        </section>
      </section>
      {searchData.data.data.products.last_page != 1 && (
        <Pagination
          currentPage={searchData.data.data.products.current_page}
          pages={searchData.data.data.products.last_page}
          links={searchData.data.data.products.links}
          slug={`search?search=${searchParams.search}`}
          type="search"
        />
      )}
    </>
  );
}
