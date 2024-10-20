import Layout from "@/components/Layout";

export const metadata = {
    title: "محصولات جدید دی سی ای کالا",
    description: "محصولات جدید دی سی ای کالا",
    keywords: "محصولات جدید دی سی ای کالا",
  };
  
export default function NewProductsLayout({ children }) {
    return (
      <Layout>
        {children}
      </Layout>
    )
  }