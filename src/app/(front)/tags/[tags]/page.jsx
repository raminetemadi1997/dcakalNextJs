import React from "react";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";
import axios from "@/lib/axios";
import { redirect, notFound } from "next/navigation";
import TagBrands from "@/components/tags/TagBrands";
import TagCategory from "@/components/tags/TagCategory";
import TagProducts from "@/components/tags/TagProducts";

export default async function Tags({ params, searchParams }) {
  const slug = `tags/${params.tags}`;

  const fetchedData = await axios
    .get(`api/${slug}`)
    .then((result) => result)
    .catch((error) => {
      if (error.response.status == "301" || error.response.status == "302") {
        if (
          error.response.data.type == "error" &&
          error.response.data.message == "redirect" &&
          error.response.data.redirect
        ) {
          redirect(error.response.data.redirect);
        } else {
          redirect(notFound());
        }
      } else {
        redirect(notFound());
      }
    });



  return (
    <>
      <BreadcrumbCustom
        parentId={null}
        categorySlug={fetchedData.data.tag.slug}
        categoryName={fetchedData.data.tag.name}
        type="tag"
        // structure={dataFetch.data.brand.json_bread_crumb}
      />

      <section className="p-4 w-full mb-12 grid grid-cols-1 gap-8">
        {/* برند ها */}
        {fetchedData.data.tag.brands &&
          fetchedData.data.tag.brands.length > 0 && (
            <TagBrands data={fetchedData.data} />
          )}

        {/* دسته بندی ها */}
        {fetchedData.data.tag.categories &&
          fetchedData.data.tag.categories.length > 0 && (
            <TagCategory data={fetchedData.data} />
          )}

        {/* محصولات */}
        {fetchedData.data.tag.products &&
          !Array.isArray(fetchedData.data.tag.products) &&
          fetchedData.data.tag.products.data.length > 0 && (
            <div>
              <div className={`font-medium mb-2`}>
                {fetchedData.data.tag.name} بر اساس محصول:
              </div>
              <div className={`grid sm:grid-cols-5 grid-cols-1 sm:p-4 p-2 rounded-lg border`}>
                {fetchedData.data.tag.products.data.map((product) => (
                  <TagProducts key={product.id} data={product}/>
                ))}
              </div>
            </div>
          )}
      </section>
    </>
  );
}
