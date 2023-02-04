import React from "react";
import dynamic from "next/dynamic";
import Layout from "../components/layout";
import Banner from "../components/banner";
import Breadcrumb from "../components/breadcrumb";
import { getProductsPageData } from "../lib/api";
import Head from "next/head";

const IsoProducts = dynamic(() => import("../components/isoproducts"), {
  ssr: false,
});

const Products = ({ productsPageData }) => {
  const products = productsPageData?.page?.productsPage?.products;
  const header = productsPageData?.myOptionsPage?.header;
  const footer = productsPageData?.myOptionsPage?.footer;
  const info = productsPageData?.myOptionsPage?.info;

  return (
    <Layout header={header} footer={footer} info={info}>
      <Head>
        <title>Products | Vicbor Bags BD Limited</title>
        <meta name="og:title" content="Vicbor Bags BD Limited" />
        <meta property="og:type" content="image" />
        <meta property="og:url" content="https://victorbagsbd.com/products" />
      </Head>
      <Banner
        title={productsPageData?.page?.title}
        image={productsPageData?.page?.featuredImage?.node}
      />
      <Breadcrumb bcitems={[{ text: "Products", link: "" }]} />
      <main className="products u-offset-x">
        <IsoProducts products={products} cname="cards" />
      </main>
    </Layout>
  );
};

export default Products;

export async function getStaticProps() {
  const productsPageData = await getProductsPageData();
  return {
    props: {
      productsPageData,
    },
    revalidate: 10,
  };
}
