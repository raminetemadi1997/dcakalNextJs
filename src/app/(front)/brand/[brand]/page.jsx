import Brands from "@/components/brand/Brands";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";
import { notFound, redirect } from "next/navigation";

import axios from "@/lib/axios";

async function pageApi(route) {
  const pageData = await axios.get(route).then((res) => res);
  return pageData;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const frontUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;


export async function generateMetadata({ params, searchParams }) {
  let video = false;
  const slug = params.brand;
  const dataFetch = await pageApi(
    searchParams
      ? `api/brand/${slug}?page=${searchParams.page}`
      : `api/brand/${slug}`
  ).then((result) => {
    return result;
  }).catch((error) => {
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

  dataFetch.data.brand.special_box.map((e) => {
    if (e.content_type == "video") {
      video = true;
    }
  });

  if (Array.isArray(dataFetch.data.brand.products)) {
    dataFetch.data.brand.products.map((e) => {
      if (e.video) {
        video = true;
      }
    });
  } else {
    dataFetch.data.brand.products.data.map((e) => {
      if (e.video) {
        video = true;
      }
    });
  }



  return {
    title: dataFetch.data.brand.title,
    description: dataFetch.data.brand.description,
    keywords: dataFetch.data.brand.keywords,
    openGraph: {
      title: dataFetch.data.brand.title,
      description: dataFetch.data.brand.description,
      keywords: dataFetch.data.brand.keywords,
    },
    alternates: {
      canonical: `${frontUrl}brand/${dataFetch.data.brand.slug}`,
    },

    robots: {
      index: dataFetch.data.brand.index_status == 0 ? false : true,
      follow: dataFetch.data.brand.index_status == 0 ? false : true,
    },
    ...(video
      ? dataFetch.data.brand.products
        ? dataFetch.data.brand.products.next_page_url &&
          dataFetch.data.brand.products.prev_page_url
          ? {
              icons: {
                other: [
                  {
                    rel: "next",
                    url: `${dataFetch.data.brand.products.next_page_url}`,
                  },
                  {
                    rel: "prev",
                    url: `${dataFetch.data.brand.products.prev_page_url}`,
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
          : dataFetch.data.brand.products.prev_page_url &&
            !dataFetch.data.brand.products.next_page_url
          ? {
              icons: {
                other: [
                  {
                    rel: "prev",
                    url: `${dataFetch.data.brand.products.prev_page_url}`,
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
          : dataFetch.data.brand.products.next_page_url &&
            !dataFetch.data.brand.products.prev_page_url
          ? {
              icons: {
                other: [
                  {
                    rel: "next",
                    url: `${dataFetch.data.brand.products.next_page_url}`,
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
      : dataFetch.data.brand.products
      ? dataFetch.data.brand.products.next_page_url &&
        dataFetch.data.brand.products.prev_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "next",
                  url: `${dataFetch.data.brand.products.next_page_url}`,
                },
                {
                  rel: "prev",
                  url: `${dataFetch.data.brand.products.prev_page_url}`,
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : dataFetch.data.brand.products.prev_page_url &&
          !dataFetch.data.brand.products.next_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "prev",
                  url: `${dataFetch.data.brand.products.prev_page_url}`,
                },
                {
                  rel: "preconnect",
                  url: "https://dashboard.dcakala.com",
                },
              ],
            },
          }
        : dataFetch.data.brand.products.next_page_url &&
          !dataFetch.data.brand.products.prev_page_url
        ? {
            icons: {
              other: [
                {
                  rel: "next",
                  url: `${dataFetch.data.brand.products.next_page_url}`,
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
}

export default async function BrandItem({ params, searchParams }) {
  const slug = params.brand;
  const dataFetch = await pageApi(
    searchParams
      ? `api/brand/${slug}?page=${searchParams.page}`
      : `api/brand/${slug}`
  ).then((result) => {
    return result;
  }).catch((error) => {
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
        categorySlug={dataFetch.data.brand.slug}
        categoryName={dataFetch.data.brand.name}
        type="brand"
        structure={dataFetch.data.brand.json_bread_crumb}
      />

      <Brands apiData={dataFetch.data} pages={searchParams.page} />
    </>
  );
}
