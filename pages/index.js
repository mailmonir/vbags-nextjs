import React from "react";
import Slider from "../components/slider";
import Certifications from "../components/certifications";
import Layout from "../components/layout";
import { getMainPageData } from "../lib/api";
import Categories from "../components/categories";
import About from "../components/about";
import Head from "next/head";

const Home = ({ mainPageData }) => {
  const header = mainPageData?.myOptionsPage?.header;
  const footer = mainPageData?.myOptionsPage?.footer;
  const info = mainPageData?.myOptionsPage?.info;
  const products = mainPageData?.pages?.nodes[0]?.productsPage?.products.filter(
    (item) => item.showOnFrontPage === true
  );
  return (
    <Layout header={header} footer={footer} info={info}>
      <Head>
        <title>Home | Vicbor Bags BD Limited</title>
        <meta name="og:title" content="Vicbor Bags BD Limited" />
        <meta property="og:type" content="image" />
        <meta property="og:url" content="https://victorbagsbd.com/" />
        <meta
          property="og:image"
          content="https://victorbagsbd.com/_next/image?url=https%3A%2F%2Fvictorbagsbd.com%2Fadmin%2Fwp-content%2Fuploads%2F2023%2F01%2Fslider-one.jpg&w=1920&q=75"
        />
      </Head>
      <Slider slides={mainPageData?.page?.mainPage?.slides} />
      <Categories
        products={products}
        heading={mainPageData?.page?.mainPage?.productsHeading}
      />
      <About data={mainPageData?.page?.mainPage?.about} />
      <Certifications
        certifications={mainPageData?.page?.mainPage?.certifications}
        heading={mainPageData?.page?.mainPage?.certificationsHeading}
      />
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const mainPageData = await getMainPageData();
  return {
    props: {
      mainPageData: mainPageData || {},
    },
    revalidate: 10,
  };
}
