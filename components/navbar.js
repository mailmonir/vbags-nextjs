import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaSearch } from "react-icons/fa";
import { createPortal } from 'react-dom';
import Modal from '../components/modal'

const Navbar = ({ header }) => {
  const [navUp, setNavUp] = React.useState(false);
  const [rotateBars, setRotateBars] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = (event) => {
      window.scrollY > 10 ? setNavUp(true) : setNavUp(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlClick = () => {
    setRotateBars((state) => !state);
    setOpenMenu((state) => !state);
  };



  return (
    <nav className={`navbar ${navUp ? "float-nav" : ""}`}>
      <Link href="/">
        {header?.logoWhite?.sourceUrl ? (
          <>
            <Image
              className="logo"
              src={header?.logo?.sourceUrl}
              alt={header?.logo?.altText}
              width={1691}
              height={364}
              sizes={header?.logo?.srcSet}
            />
            <Image
              className="logo-white"
              src={header?.logoWhite?.sourceUrl}
              alt={header?.logoWhite?.altText}
              width={1691}
              height={364}
              sizes={header?.logoWhite?.srcSet}
            />
          </>
        ) : (
          <Image
            className="logo"
            src={header?.logo?.sourceUrl}
            alt={header?.logo?.altText}
            width={1691}
            height={364}
            sizes={header?.logo?.srcSet}
          />
        )}
      </Link>

      <div
        className={`nav__button ${rotateBars ? "rotate-bars" : ""}`}
        onClick={handlClick}
      >
        <span className="nav__icon">&nbsp;</span>
      </div>

      <div className={`nav-wrapper ${openMenu ? "open" : ""}`}>
        <ul className="nav">
          <li className="nav__list-item">
            <Link
              href="/"
              className={`nav__link ${router.pathname == "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              href="products"
              className={`nav__link ${
                router.pathname == "/products" ? "active" : ""
              }`}
            >
              Products
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              href="gallery"
              className={`nav__link ${
                router.pathname == "/gallery" ? "active" : ""
              }`}
            >
              Gallery
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              href="about"
              className={`nav__link ${
                router.pathname == "/about" ? "active" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              href="contact"
              className={`nav__link ${
                router.pathname == "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <>
        <button onClick={() => setShowModal(true)}className="search" aria-label="Search">
          <FaSearch />
        </button>
        {showModal && createPortal(
          <Modal onClose={() => setShowModal(false)} />,
          document.body
        )}
      </>
    </nav>
  );
};

export default Navbar;
