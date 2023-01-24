import Banner from "../components/banner";
import Layout from "../components/layout";
import Breadcrumb from "../components/breadcrumb";

import { getAboutPageData } from "../lib/api";

const About = ({ aboutPageData }) => {
  const header = aboutPageData?.myOptionsPage?.header;
  const footer = aboutPageData?.myOptionsPage?.footer;
  return (
    <Layout header={header} footer={footer}>
      <Banner
        title={aboutPageData?.page?.title}
        image={aboutPageData?.page?.featuredImage?.node}
      />
      <Breadcrumb bcitems={[{ text: "About", link: "" }]} />
      <main className="about u-offset-x">
        <div className="story">
          <div className="story__text">
            <h3 className="heading-secondary u-margin-bottom-small">
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
            <h3 className="heading-secondary u-margin-bottom-small">
              Speech from MD
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
