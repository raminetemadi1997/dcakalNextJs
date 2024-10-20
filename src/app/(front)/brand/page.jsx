import axios from "@/lib/axios";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";
import SideBar from "@/components/category/SideBar";
import Link from "next/link";
import ImageCustom from "@/components/constantElements/ImageCustom";
import styles from "@/assets/css/brands/Brands.module.css";



export default async function Brand() {
  const pageData = await axios.get("api/brand").then((response) => response);

  return (
    <>
      <BreadcrumbCustom
        parentId={null}
        categorySlug={null}
        categoryName={"برندها"}
        structure={null}
        uniqueSlug={`brand`}
      />
      <main
        className={`grid grid-flow-row grid-cols-9 sm:px-4 px-2 py-4 gap-4 w-full  max-with-unique mx-auto`}
        style={{ minHeight: "calc(100vh - 114px)" }}
      >
        <SideBar
          className="col-span-2 xl:block hidden"
          type="brand"
          sideBanner={pageData.data.side_banners}
          filters={pageData.data.filters}
          popularData={pageData.data.popular_sliders}
        />
        <section className={styles.container}>
          {pageData.data.brands.map((brand) => (
            <Link
              href={`/brand/${brand.slug}`}
              key={brand.id}
              className={styles.brand_container}
            >
              <div>
                <ImageCustom
                  data={brand.image}
                  alt={brand.image_alt}
                  title={brand.image_alt}
                  // props
                  loading={"lazy"}
                  width={75}
                  height={75}
                />
                <p>
                  {brand.name.split("").length > 18
                    ? `${brand.name.slice(0, 25)}...`
                    : brand.name}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
