import React from "react";
import Slider from "../components/slider";
import Certifications from "../components/certifications";
import Layout from "../components/layout";
import { getMainPageData } from "../lib/api";
import Categories from "../components/categories";
import About from "../components/about";

const Home = ({ mainPageData }) => {
  const header = mainPageData?.myOptionsPage?.header;
  const footer = mainPageData?.myOptionsPage?.footer;
  const products = mainPageData?.pages?.nodes[0]?.productsPage?.products.filter(
    (item) => item.showOnFrontPage === true
  );
  return (
    <Layout header={header} footer={footer}>
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
