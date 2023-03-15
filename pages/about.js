import Banner from "../components/banner";
import Layout from "../components/layout";
import Breadcrumb from "../components/breadcrumb";
import Head from "next/head";

import { getAboutPageData } from "../lib/api";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

const About = ({ aboutPageData }) => {
  const header = aboutPageData?.myOptionsPage?.header;
  const footer = aboutPageData?.myOptionsPage?.footer;
  const info = aboutPageData?.myOptionsPage?.info;
  return (
    <Layout header={header} footer={footer} info={info}>
      <Head>
        <title>About | Vicbor Bags BD Limited</title>
        <meta name="og:title" content="Vicbor Bags BD Limited" />
        <meta property="og:type" content="text" />
        <meta property="og:url" content="https://victorbagsbd.com/about" />
      </Head>
      <Banner
        title={aboutPageData?.page?.title}
        image={aboutPageData?.page?.featuredImage?.node}
      />
      <Breadcrumb bcitems={[{ text: "About", link: "" }]} />
      <main className="about u-offset-x">
        <div className="story">
          <div className="story__text">
            <h3
              className={`heading-secondary u-margin-bottom-small ${inter.className}`}
            >
              Our Story
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: aboutPageData?.page?.aboutPage?.aboutUs,
              }}
            ></div>
          </div>
        </div>
        <div className="story">
          <div className="story__text">
            <h3
              className={`heading-secondary u-margin-bottom-small ${inter.className}`}
            >
              More From Us
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: aboutPageData?.page?.aboutPage?.mdSpeech,
              }}
            ></div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default About;

export async function getStaticProps() {
  const aboutPageData = await getAboutPageData();
  return {
    props: {
      aboutPageData: aboutPageData || {},
    },
    revalidate: 10,
  };
}
