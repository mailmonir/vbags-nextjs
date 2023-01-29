
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import ScrollTop from "./ScrollTop";
import WhatsApp from "./WhatsApp";


const Layout = ({ children, header, footer, info }) => {
  
  return (
    
    <div>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta
          name="description"
          content="Victor Leather Bags Factory Ltd. is a Bangladeshi manufacturing and exporting unit of backpack, laptop bag, hiking bag, luggage and ladies bag."
        />
      </Head>
      <Navbar header={header} />
      <main>{children}</main>
      <Footer footer={footer} />
      <ScrollTop />
      <WhatsApp info={info} />
    </div>
  );
};

export default Layout;
