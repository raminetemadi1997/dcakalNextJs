import { getSsrData } from "@/data/loaders";
import styles from "@/assets/css/Authors.module.css";
import Layout from "@/components/Layout";
import BreadcrumbCustom from "@/components/constantElements/BreadcrumbCustom";
import ImageCustom from "@/components/constantElements/ImageCustom";
import SearchIcon from "@mui/icons-material/Search";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Script from "next/script";
import Link from "next/link";
import Head from "next/head";
export async function generateMetadata({ params, searchParams }) {
  const fetchedData = await getSsrData(`api/author/${params.authors}`);
  return {
    title: fetchedData.data.data.full_name,
    description: "نویسنده و پژوهشگر سیستم های حفاظتی و نظارتی در دی سی ای کالا",
  };
}

export default async function AuthorsItems({ params }) {
  const backendUrlImage = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE;
  const fetchedData = await getSsrData(`api/author/${params.authors}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: fetchedData.data.data.data_created,
    dateModified: fetchedData.data.data.data_modified,
    mainEntity: {
      "@type": "Person",
      name: fetchedData.data.data.full_name,
      alternateName: fetchedData.data.data.slug,

      agentInteractionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/WriteAction",
        userInteractionCount:
          fetchedData.data.data.products.data.length > 0
            ? fetchedData.data.data.products.data.length
            : 0,
      },
      deScription: fetchedData.data.data.description,
      image: `${backendUrlImage}/${fetchedData.data.data.image_path.indexArray.original}`,
      ...(fetchedData.data.data.socials.length > 0 && {
        sameAs: fetchedData.data.data.socials.map((e) => e.link),
      }),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Layout>
        <main className="main_container">
          <BreadcrumbCustom
            parentId={null}
            categorySlug={null}
            type="authors"
            categoryName={fetchedData.data.data.full_name}
            uniqueSlug={`authors/${fetchedData.data.data.slug}`}
          />

          <section className={styles.container}>
            <div className={styles.items}>
              <ImageCustom
                size="original"
                data={fetchedData.data.data.image_path}
                alt={`نویسنده ${fetchedData.data.data.full_name}`}
                title={`نویسنده ${fetchedData.data.data.full_name}`}
                fullWidth={false}
                width={140}
                height={140}
                style={{ margin: "0 auto" , borderRadius:'.5rem' }}
              />
              <div className={styles.textField}>
                <div className={styles.textBox}>
                  <h1 className={styles.title}>
                    {fetchedData.data.data.full_name}
                  </h1>
                  <div
                    className={styles.introduction}
                    dangerouslySetInnerHTML={{
                      __html: fetchedData.data.data.introduction,
                    }}
                  />
                </div>
                <div className={styles.textBox}>
                  <div className={styles.title}>در مورد من</div>
                  <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{
                      __html: fetchedData.data.data.body,
                    }}
                  />
                </div>
                {fetchedData.data.data.socials.length > 0 && (
                  <div className={styles.textBox}>
                    <div className={styles.socialTitle}>
                      شبکه های اجتماعی من
                    </div>
                    <ul className={styles.social_container}>
                      {fetchedData.data.data.socials.map((socials) => (
                        <li key={socials.id}>
                          <Link
                            rel="nofollow"
                            href={socials.link ? socials.link : "#"}
                            title={socials.title}
                          >
                            <ImageCustom
                              data={socials.image}
                              size="original"
                              alt={socials.image_alt}
                              title={socials.image_alt}
                              width={40}
                              height={40}
                              fullWidth={false}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {fetchedData.data.data.products.data.length > 0 && (
              <div>
                <div className={styles.titr}>
                  <div className={styles.line}></div>
                  <div className={styles.titlePasage}>
                    <SearchIcon sx={{ color: "#63C7FF" }} />
                    <div>آخرین بررسی های من</div>
                  </div>
                </div>
                <div className={styles.products}>
                  {fetchedData.data.data.products.data.map((product) => (
                    <Link
                      href={`/${product.slug}`}
                      title={product.name}
                      className={styles.productsItems}
                      key={product.id}
                    >
                      <ImageCustom
                        data={product.image}
                        alt={product.image_alt}
                        title={product.image_alt}
                        // props
                        loading={"lazy"}
                        height={194}
                        width={361}
                        fullWidth={false}
                        style={{ height: "194px", width: "100%" }}
                        className={styles.main_image}
                      />
                      <div className="sm:p-4 p-2 sm:border-t flex flex-col sm:justify-start justify-between gap-2">
                        <div className="text-sm">{product.alt_name}</div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center sm:gap-2 gap-1">
                            <ImageCustom
                              size="original"
                              data={fetchedData.data.data.image_path}
                              alt={fetchedData.data.data.full_name}
                              title={fetchedData.data.data.full_name}
                              // props
                              loading={"lazy"}
                              style={{
                                height: "27px",
                                width: "27px",
                                borderRadius: "50%",
                              }}
                            />
                            <div className="text-[#848383] text-xs">
                              {fetchedData.data.data.full_name}
                            </div>
                          </div>
                          <div className="flex items-center sm:gap-2 gap-1">
                            <AccessAlarmIcon
                              className="text-[#848383]"
                              fontSize="small"
                            />
                            <div className="text-[#848383] text-xs">
                              {product.published}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </Layout>
    </>
  );
}
