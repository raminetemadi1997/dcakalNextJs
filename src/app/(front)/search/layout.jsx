import React from "react";
import Layout from "@/components/Layout";




const SearchLayout = ({ children }) => {
  return (
    <Layout>
      <main className="min-h-screen mx-auto max-w-[1358px]">{children}</main>
    </Layout>
  );
};

export default SearchLayout;
