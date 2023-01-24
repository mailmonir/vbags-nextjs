import React from "react";
import dynamic from "next/dynamic";
import Layout from "../components/layout";
import Banner from "../components/banner";
import Breadcrumb from "../components/breadcrumb";
import { getProductsPageData } from "../lib/api";

const IsoProducts = dynamic(() => import("../components/isoproducts"), {
  ssr: false,
});

const Products = ({ productsPageData }) => {
  const products = productsPageData?.page?.productsPage?.products;
  const header = productsPageData?.myOptionsPage?.header;
  const footer = productsPageData?.myOptionsPage?.footer;

  return (
    <Layout header={header} footer={footer}>
      <Banner
        title={productsPageData?.page?.title}
        image={productsPageData?.page?.featuredImage?.node}
      />
      <Breadcrumb bcitems={[{ text: "Products", link: "" }]} />
      <main className="products u-offset-x">
        <IsoProducts products={products} />
      </main>
    </Layout>
  );
};

export default Products;

export async function getStaticProps({ preview = false }) {
  const productsPageData = await getProductsPageData(preview);
  return {
    props: {
      productsPageData,
    },
    revalidate: 10,
  };
}
