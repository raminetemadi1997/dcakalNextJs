"use client";
import React, { Fragment, useEffect, useState } from "react";

import Title from "@/components/main/Title";
import SideBar from "@/components/category/SideBar";
import Card from "../../../components/Card";
import axios from "@/lib/axios";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Breadcrumb from "../../../components/Breadcrumb";

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedData = await axios.get("api/new-products");
        setData(fetchedData.data);
      } catch (error) {}
    };
    getUser();
  }, []);

  const BreadcrumbCustom = dynamic(
    () => import("@/components/constantElements/BreadcrumbCustom"),
    {
      ssr: false,
      loading: () => (
        <div className="w-full my-2 h-[24.44px] px-4">
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%" }}
            height={24.44}
            animation="wave"
          />
        </div>
      ),
    }
  );

  return data ? (
    <>
      <main className={`flex flex-col items-center`}>
        <BreadcrumbCustom
          parentId={null}
          categorySlug={null}
          categoryName={"محصولات جدید"}
          type="new-product"
        />
        <Title position="head" titleValue={"محصولات جدید"} />
        <section
          className={`grid grid-flow-row grid-cols-9 sm:px-4 px-2 py-4 gap-4 w-full  max-with-unique`}
        >
          <SideBar
            sideBanner={data.side_banners}
            popularData={data.popular_sliders}
            className="col-span-2 sm:block hidden"
            type="brand"
          />
          <section className="sm:col-span-7 col-span-9 grid grid-cols-4">
            {/* cards */}
            {data.data.length > 0 && (
              <>
                {data.data.map((product) => (
                  <Fragment key={product.id}>
                    <Card data={product} />
                    {product.structure_status == 1 && (
                      <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                          __html: JSON.stringify(product.data_structure),
                        }}
                      />
                    )}
                  </Fragment>
                ))}
              </>
            )}
          </section>
        </section>
      </main>
    </>
  ) : null;
};

export default Page;
