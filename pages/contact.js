import Banner from "../components/banner";
import Layout from "../components/layout";
import Breadcrumb from "../components/breadcrumb";
import ContactForm from "../components/contactform";
import GMap from "../components/gmap";
import Head from "next/head";

import { getContactPageData } from "../lib/api";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

const Contact = ({ contactPageData }) => {
  const data = contactPageData?.page?.contactPage;
  const header = contactPageData?.myOptionsPage?.header;
  const footer = contactPageData?.myOptionsPage?.footer;
  const info = contactPageData?.myOptionsPage?.info;
  const settings = contactPageData?.myOptionsPage?.info?.settings;

  const styles = {
    init: `linear-gradient(
          to right,
          rgba(255,255,255, 0.9) 0%,
          rgba(255,255,255, 0.9) 100%),
        url(${data?.contactFormImage?.sourceUrl})`,

    upto900: `linear-gradient(
        105deg,
        rgba(255,255,255, 0.9) 0%,
        rgba(255,255,255, 0.9) 65%,
        transparent 65%
      ),
      url(${data?.contactFormImage?.sourceUrl})`,

    upto1200: `linear-gradient(
      105deg,
      rgba(255,255,255, 0.9) 0%,
      rgba(255,255,255, 0.9) 50%,
      transparent 50%
    ),
    url(${data?.contactFormImage?.sourceUrl})`,
  };

  return (
    <Layout header={header} footer={footer} info={info}>
      <Head>
        <title>Contact | Vicbor Bags BD Limited</title>
        <meta name="og:title" content="Vicbor Bags BD Limited" />
        <meta property="og:type" content="text" />
        <meta property="og:url" content="https://victorbagsbd.com/contact" />
      </Head>
      <Banner
        title={contactPageData?.page?.title}
        image={contactPageData?.page?.featuredImage?.node}
      />
      <Breadcrumb bcitems={[{ text: "Contact", link: "" }]} />
      <main className="u-offset-x contact">
        <h2 className={`heading-secondary ${inter.className}`}>
          {data?.contactHeading}
        </h2>
        <div
          className="contact__text"
          dangerouslySetInnerHTML={{
            __html: data?.contactDescription,
          }}
        ></div>
        <div className="address-box-wrapper">
          <div className="address-box">
            <div
              dangerouslySetInnerHTML={{
                __html: data.addressHeadOffice,
              }}
            ></div>
          </div>

          <div className="address-box">
            <div
              dangerouslySetInnerHTML={{
                __html: data.addressFactory,
              }}
            ></div>
          </div>

          <div className="address-box">
            <div
              dangerouslySetInnerHTML={{
                __html: data.addressChinaOffice,
              }}
            ></div>
          </div>
        </div>

        <div className="contact-form u-margin-top-huge">
          <h2 className={`heading-secondary ${inter.className}`}>
            {data?.contactFormHeading}
          </h2>
          <div
            className="contact__text"
            dangerouslySetInnerHTML={{
              __html: data?.contactFormMessage,
            }}
          ></div>

          <div
            className="book upto1200"
            style={{ backgroundImage: styles.upto1200 }}
          >
            <ContactForm settings={settings} />
          </div>
          <div
            className="book upto900"
            style={{ backgroundImage: styles.upto900 }}
          >
            <ContactForm settings={settings} />
          </div>
          <div className="book init" style={{ backgroundImage: styles.init }}>
            <ContactForm settings={settings} />
          </div>
        </div>
        <div className="gmap u-margin-top-huge" id="gmap">
          <h2
            className={`heading-secondary ${inter.className}`}
            style={{ marginBottom: "2rem" }}
          >
            {data.locationHeading}
          </h2>
          <GMap
            lat={data?.gmap?.latitude}
            lng={data?.gmap?.longitude}
            zoom={data?.gmap?.zoom}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Contact;

export async function getStaticProps() {
  const contactPageData = await getContactPageData();
  return {
    props: {
      contactPageData: contactPageData || {},
    },
    revalidate: 10,
  };
}
