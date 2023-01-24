import Image from "next/image";
import LightGallery from "lightgallery/react";
import { getGalleryPageData } from "../lib/api";
import Banner from "../components/banner";
import Breadcrumb from "../components/breadcrumb";
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

  return (
    <Layout header={header} footer={footer}>
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
                alt="img1"
                src={img.sourceUrl}
                className="gallery__image"
                width={1280}
                height={862}
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
