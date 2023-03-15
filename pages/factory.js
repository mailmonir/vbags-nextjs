import Image from "next/image";
import LightGallery from "lightgallery/react";
import { getFactoryPageData } from "../lib/api";
import Banner from "../components/banner";
import Breadcrumb from "../components/breadcrumb";
import Head from "next/head";
import Layout from "../components/layout";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const Factory = ({ factoryPageData }) => {
  const gImgs = factoryPageData?.page?.galleryPage?.galleryImages;
  const header = factoryPageData?.myOptionsPage?.header;
  const footer = factoryPageData?.myOptionsPage?.footer;
  const info = factoryPageData?.myOptionsPage?.info;

  return (
    <Layout header={header} footer={footer} info={info}>
      <Head>
        <title>Factory | Vicbor Bags BD Limited</title>
        <meta name="og:title" content="Vicbor Bags BD Limited" />
        <meta property="og:type" content="image" />
        <meta property="og:url" content="https://victorbagsbd.com/gallery" />
      </Head>

      <Banner
        title={factoryPageData?.page?.title}
        image={factoryPageData?.page?.featuredImage?.node}
      />
      <Breadcrumb bcitems={[{ text: "Factory", link: "" }]} />
      <main className="gallery u-offset-x">
        <LightGallery
          elementClassNames="gallery__light-gallery"
          plugins={[lgZoom, lgThumbnail]}
        >
          {gImgs.map((img, index) => (
            <a href={img.sourceUrl} key={index}>
              <Image
                alt={img.altText}
                src={img.sourceUrl}
                className="gallery__image"
                fill
              />
            </a>
          ))}
        </LightGallery>
      </main>
    </Layout>
  );
};

export default Factory;

export async function getStaticProps() {
  const factoryPageData = await getFactoryPageData();
  return {
    props: {
      factoryPageData: factoryPageData || {},
    },
    revalidate: 10,
  };
}
