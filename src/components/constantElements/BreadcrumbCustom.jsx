import Link from "next/link";
import styles from "../../assets/css/Breadcrumb.module.css";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";


const HomeIcon = dynamic(() => import("@mui/icons-material/Home"), {
  ssr: true,

});

export default function BreadcrumbCustom({
  breadcrumb,
  parentId,
  categoryName,
  type,
  categorySlug,
  productSlug,
  structure,
  uniqueSlug,
}) {
  let counter = 2;
  return (
    <>
      <section className={styles.container}>
        <nav className="w-full mt-2">
          <ul className="w-full flex items-center row_container">
            <li>
              <Link href="/" className={styles.arrow}>
                {/* <HomeIcon /> */}
                خانه
              </Link>
            </li>

            {type == "package" && (
              <li>
                <Link
                  href={`/packages`}
                  style={{ fontSize: "12px" }}
                  className={styles.arrow}
                >
                  همه پکیج ها
                </Link>
              </li>
            )}

            {parentId != null || (type == "product" && breadcrumb)
              ? breadcrumb.map((breadcrumbItems, i) => {
                  return (
                    <li key={i}>
                      <Link
                        href={`/${breadcrumbItems.slug}`}
                        style={{ fontSize: "12px" }}
                        className={styles.arrow}
                      >
                        {breadcrumbItems.name}
                      </Link>
                    </li>
                  );
                })
              : null}

            {(parentId != null || type == "product") && (
              <li style={{ fontSize: "12px" }}>{categoryName}</li>
            )}

            {parentId == null && type == "brand" && (
              <li>
                <Link
                  href={`/brand`}
                  style={{ fontSize: "12px" }}
                  className={styles.arrow}
                >
                  برندها
                </Link>
              </li>
            )}

            {parentId == null && type == "authors" && (
              <li>
                <Link
                  href={`/authors`}
                  style={{ fontSize: "12px" }}
                  className={styles.arrow}
                >
                  نویسنده ها
                </Link>
              </li>
            )}

            {parentId == null && type != "product" && <li>{categoryName}</li>}
          </ul>
        </nav>
      </section>

      {structure ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structure),
          }}
        />
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "خانه",
                  item: "https://dcakala.com",
                },

                {
                  "@type": "ListItem",
                  position: counter,
                  name: categoryName,
                  item: `https://dcakala.com/${uniqueSlug}`,
                },
              ],
            }),
          }}
        />
      )}
    </>
  );
}
