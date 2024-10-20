import { getSsrData } from "@/data/loaders";
import Link from "next/link";
import Layout from "@/components/Layout";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom"


export const metadata = {
  title: "نقشه سایت دی سی ای کالا",
  robots: {
    index: true,
    follow: true,
  },

  description: "گمشده اید؟ آنچه را که به دنبالش هستید پیدا کنید",
  keywords: "گمشده اید؟ آنچه را که به دنبالش هستید پیدا کنید",
  openGraph: {
    title: "نقشه سایت دی سی ای کالا",
    description: "گمشده اید؟ آنچه را که به دنبالش هستید پیدا کنید",
    keywords: "گمشده اید؟ آنچه را که به دنبالش هستید پیدا کنید",
  },
};

function loopMap(subCategory) {
  return (
    <ul className="pr-4 grid grid-cols-1 gap-1">
      {subCategory.map((sub) =>
        sub.children.length > 0 ? (
          <Fragment key={sub.id}>
            <li  className="list-disc text-sm">
              <Link title={sub.name} href={sub.link}>
                {sub.name}
              </Link>
            </li>
            {loopMap(sub.children)}
          </Fragment>
        ) : (
          <li key={sub.id} className="list-disc text-sm">
            <Link title={sub.name} href={sub.link}>
              {sub.name}
            </Link>
          </li>
        )
      )}
    </ul>
  );
}

const fetchedData = await getSsrData(`api/sitemap`);
export default function Page(params) {
  return (
    <Layout>
      <main
        className="px-4 grid grid-cols-1 gap-4"
        style={{ maxWidth: "1358px", margin: "auto" }}
      >
        <BreadcrumbCustom
          parentId={null}
          categorySlug={null}
          categoryName={"نقشه سایت"}
        />
        <h1>نقشه سایت</h1>
        <section className="grid grid-cols-3 gap-4 px-4">
          <div>
            <div className="mb-2 border-b pb-1 font-bold">برندها</div>
            <ul className="grid grid-cols-1 gap-1">
              {fetchedData.data.brands.map((brand) => (
                <li key={brand.id} className="list-disc text-sm">
                  <Link title={brand.name} href={brand.link}>
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-2 border-b pb-1 font-bold">شاخه ها</div>
            <ul className="grid grid-cols-1 gap-1">
              {fetchedData.data.categories.map((categories) => (
                <li key={categories.id} className="list-disc text-sm">
                  <Link title={categories.name} href={categories.link}>
                    {categories.name}
                  </Link>
                  {categories.children.length > 0 &&
                    loopMap(categories.children)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-2 border-b pb-1 font-bold">صفحه ها</div>
            <ul className="grid grid-cols-1 gap-1">
              {fetchedData.data.pages.map((pages) => (
                <li key={pages.id} className="list-disc text-sm">
                  <Link title={pages.name} href={pages.link}>
                    {pages.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
