import Layout from "@/components/Layout";
import { Suspense } from 'react';

export const metadata = {
  title: "پکیج های محصولات سیستم های حفاظتی و نظارتی",
  robots: {
    index: false,
    follow: false,
  },

  description: "پکیج های محصولات سیستم های حفاظتی و نظارتی",
  keywords: "پکیج های محصولات سیستم های حفاظتی و نظارتی",
  openGraph: {
    title: "پکیج های محصولات سیستم های حفاظتی و نظارتی",
    description: "پکیج های محصولات سیستم های حفاظتی و نظارتی",
    keywords: "پکیج های محصولات سیستم های حفاظتی و نظارتی",
  },
};


const PackageLayout = ({ children }) => {
  return (
    <Layout>
      <Suspense>
      {children}
      </Suspense>
    </Layout>
  );
};

export default PackageLayout;
