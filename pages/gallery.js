import Image from "next/image";
import LightGallery from "lightgallery/react";
import { getGalleryPageData } from "../lib/api";
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

const Gallery = ({ galleryPageData }) => {
  const gImgs = galleryPageData?.page?.galleryPage?.galleryImages;
  const header = galleryPageData?.myOptionsPage?.header;
  const footer = galleryPageData?.myOptionsPage?.footer;
  const info = galleryPageData?.myOptionsPage?.info;

  return (
    <Layout header={header} footer={footer} info={info}>
      <Head>
        <title>Gallery | Vicbor Bags BD Limited</title>
        <meta name="og:title" content="Vicbor Bags BD Limited" />
        <meta property="og:type" content="image" />
        <meta property="og:url" content="https://victorbagsbd.com/gallery" />
      </Head>

      <Banner
        title={galleryPageData?.page?.title}
        image={galleryPageData?.page?.featuredImage?.node}
      />
      <Breadcrumb bcitems={[{ text: "Gallery", link: "" }]} />
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
                sizes={img.srcSet}
                priority
              />
            </a>
          ))}
        </LightGallery>
      </main>
    </Layout>
  );
};

export default Gallery;

export async function getStaticProps() {
  const galleryPageData = await getGalleryPageData();
  return {
    props: {
      galleryPageData: galleryPageData || {},
    },
    revalidate: 10,
  };
}
