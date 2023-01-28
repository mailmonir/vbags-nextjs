import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import ScrollTop from "./ScrollTop";
import WhatsApp from "./WhatsApp";
import LoadingSpinner from "./LoadingSpinner"

const Layout = ({ children, header, footer, info }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    loading ? (
      <LoadingSpinner />
    ) : (
    <div>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <Navbar header={header} />
      <main>{children}</main>
      <Footer footer={footer} />
      <ScrollTop />
      <WhatsApp info={info} />
    </div>
  ));
};

export default Layout;
