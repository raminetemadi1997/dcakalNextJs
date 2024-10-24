import Category from "@/components/category/Category";
import Product from "@/components/product/Product";
import { notFound } from "next/navigation";

import axios from "@/lib/axios";
import { redirect } from "next/navigation";
import Invoice from "@/components/constantElements/Invoice";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";

const frontUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
const backendUrlImage = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;


export async function generateMetadata({ params, searchParams }) {
  let video = false;
  async function pageApi(route) {
    const pageData = await axios
      .get(route)
      .then((res) => {
        return res;
      })
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

    return pageData;
  }
  const slug = params.handler.join("/");
  const dataFetch = await pageApi(
    searchParams ? `api/${slug}?page=${searchParams.page}` : `api/${slug}`
  );

  if (dataFetch.data.type == "category") {
    dataFetch.data.category.special_box.map((e) => {
      if (e.content_type == "video") {
        video = true;
      }
    });

    if (dataFetch.data.products && !Array.isArray(dataFetch.data.products)) {
      dataFetch.data.products.data.map((e) => {
        if (e && e.video) {
          video = true;
        }
      });
    }


    

    return {
      title: dataFetch.data.category.title,
      description: dataFetch.data.category.description,
      keywords: dataFetch.data.category.keywords,
      openGraph: {
        title: dataFetch.data.category.title,
        description: dataFetch.data.category.description,
        keywords: dataFetch.data.category.keywords,
      },
      alternates: {
        canonical: `${frontUrl}${dataFetch.data.category.slug}`,
      },
      robots: {
        index: dataFetch.data.category.index_status == 0 ? false : true,
        follow: dataFetch.data.category.index_status == 0 ? false : true,
      },
     
      ...(video
        ? dataFetch.data.products
          ? dataFetch.data.products.next_page_url &&
            dataFetch.data.products.prev_page_url
            ? {
                icons: {
                  other: [
                    {
                      rel: "next",
                      url: `${dataFetch.data.products.next_page_url}`,
                    },
                    {
                      rel: "prev",
                      url: `${dataFetch.data.products.prev_page_url}`,
                    },
                    {
                      rel: "preconnect",
                      url: "https://upload.vidbeen.ir",
                    },
                    {
                      rel: "dns-prefetch",
                      url: "https://upload.vidbeen.ir",
                    },
                    {
                      rel: "preconnect",
                      url: "https://dashboard.dcakala.com",
                    },
                  ],
                },
              }
            : dataFetch.data.products.prev_page_url &&
              !dataFetch.data.products.next_page_url
            ? {
                icons: {
                  other: [
                    {
                      rel: "prev",
                      url: `${dataFetch.data.products.prev_page_url}`,
                    },
                    {
                      rel: "preconnect",
                      url: "https://upload.vidbeen.ir",
                    },
                    {
                      rel: "dns-prefetch",
                      url: "https://upload.vidbeen.ir",
                    },
                    {
                      rel: "preconnect",
                      url: "https://dashboard.dcakala.com",
                    },
                  ],
                },
              }
            : dataFetch.data.products.next_page_url &&
              !dataFetch.data.products.prev_page_url
            ? {
                icons: {
                  other: [
                    {
                      rel: "next",
                      url: `${dataFetch.data.products.next_page_url}`,
                    },
                    {
                      rel: "preconnect",
                      url: "https://upload.vidbeen.ir",
                    },
                    {
                      rel: "dns-prefetch",
                      url: "https://upload.vidbeen.ir",
                    },
                    {
                      rel: "preconnect",
                      url: "https://dashboard.dcakala.com",
                    },
                  ],
                },
              }
            : {
                icons: {
                  other: [
                    {
                      rel: "preconnect",
                      url: "https://upload.vidbeen.ir",
                    },
                    {
                      rel: "dns-prefetch",
                      url: "https://upload.vidbeen.ir",
                    },
                    {
                      rel: "preconnect",
                      url: "https://dashboard.dcakala.com",
                    },
                  ],
                },
              }
          : {
              icons: {
                other: [
                  {
                    rel: "preconnect",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "dns-prefetch",
                    url: "https://upload.vidbeen.ir",
                  },
                  {
                    rel: "preconnect",
                    url: "https://dashboard.dcakala.com",
                  },
                ],
              },
            }
        : dataFetch.data.products
        ? dataFetch.data.products.next_page_url &&
        dataFetch.data.products.prev_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "next",
                  url: `${dataFetch.data.products.next_page_url}`,
                },
                {
                  rel: "prev",
                  url: `${dataFetch.data.products.prev_page_url}`,
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : dataFetch.data.products.prev_page_url &&
          !dataFetch.data.products.next_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "prev",
                  url: `${dataFetch.data.products.prev_page_url}`,
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : dataFetch.data.products.next_page_url &&
          !dataFetch.data.products.prev_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "next",
                  url: `${dataFetch.data.products.next_page_url}`,
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : {
            icons: {
              other: [
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : null),
    };
  } else {
    return {
      title: dataFetch.data.products.title,
      description: dataFetch.data.products.description,
      keywords: dataFetch.data.products.keywords,
      openGraph: {
        title: dataFetch.data.products.title,
        description: dataFetch.data.products.description,
        images: `${backendUrlImage}${dataFetch.data.products.image.indexArray.original}`,
      },
      alternates: {
        canonical: `${frontUrl}${dataFetch.data.products.category.slug}/${dataFetch.data.products.slug}`,
      },
      robots: {
        index: dataFetch.data.products.index_status == 0 ? false : true,
        follow: dataFetch.data.products.index_status == 0 ? false : true,
      },
      icons: {
        other: [
          {
            rel: "preconnect",
            url: "https://dashboard.dcakala.com",
          },
        ],
      },

      ...(dataFetch.data.products.video_path ||
      (dataFetch.data.products.active_video_galleries.length > 0 &&
        dataFetch.data.products.active_video_galleries[0].video_path)
        ? {
            icons: {
              other: [
                {
                  rel: "preconnect",
                  url: "https://upload.vidbeen.ir",
                },
                {
                  rel: "dns-prefetch",
                  url: "https://upload.vidbeen.ir",
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : null),

      other: {
        product_id: dataFetch.data.products.id,
        product_name: dataFetch.data.products.name,
        product_price: dataFetch.data.products.price,
        product_old_price: dataFetch.data.products.price,
        availability:
          dataFetch.data.products.marketable == 0 ? "instock" : "outofstock",
        guarantee: dataFetch.data.products.guarantee,
      },
    };
  }
}

export default async function Page({ params, searchParams }) {
  
  async function pageApi(route) {
    const pageData = await axios
      .get(route)
      .then((res) => {
        return res;
      })
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

    return pageData;
  }
  const newSearchParams = new URLSearchParams(searchParams).toString();

  const slug = params.handler.join("/");
  const pageData = await pageApi(
    searchParams ? `api/${slug}?${newSearchParams}` : `api/${slug}`
  );

  return pageData.data.type == "category" ? (
    <>
      <BreadcrumbCustom
        categorySlug={pageData.data.category.slug}
        breadcrumb={pageData.data.category.bread_crumb}
        parentId={pageData.data.category.parent_id}
        categoryName={pageData.data.category.main_name}
        structure={pageData.data.category.json_bread_crumb}
      />
      <Category
        apiData={pageData.data}
        pages={searchParams.page}
        scrollTo={newSearchParams}
        currentSlug = {slug}
      />
      {/* <Invoice /> */}
      
    </>
    
  ) : (
    <>
      <BreadcrumbCustom
        breadcrumb={pageData.data.products.bread_crumb}
        parentId={pageData.data.products.parent_id}
        type="product"
        categoryName={pageData.data.products.name}
        categorySlug={pageData.data.products.slug}
        structure={pageData.data.products.json_bread_crumb}
      />
      <Product
        apiData={pageData.data.products}
        type={pageData.data.type}
        // user={dataUser}
      />
    </>
  );
}
