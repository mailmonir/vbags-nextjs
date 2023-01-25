import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = ({ footer }) => {
  const router = useRouter();
  return (
    <footer className="footer">
      <div className="footer__logobox">
        <Link href="/">
          <Image
            src={footer?.footerLogo?.sourceUrl}
            alt={footer?.footerLogo?.altText}
            className="footer__logo"
            width={1691}
            height={364}
            sizes={footer?.footerLogo?.srcSet}
          />
        </Link>
      </div>

      <div className="footer__middle">
        <div className="footer__navigation">
          <ul className="footer__list">
            <li className="footer__item">
              <Link
                href="/"
                className={`footer__link ${
                  router.pathname == "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="products"
                className={`footer__link ${
                  router.pathname == "/products" ? "active" : ""
                }`}
              >
                Products
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="gallery"
                className={`footer__link ${
                  router.pathname == "/gallery" ? "active" : ""
                }`}
              >
                Gallery
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="about"
                className={`footer__link ${
                  router.pathname == "/about" ? "active" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li className="footer__item">
              <Link
                href="contact"
                className={`footer__link ${
                  router.pathname == "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__text">
          <p className="footer__info">{footer?.footerText}</p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copyright">{footer?.copyrightText}</div>
        <ul className="footer__list-social">
          {footer?.socialMedia?.facebookUrl && (
            <li className="footer__item-social">
              <a
                className="footer__link-social"
                href={footer?.socialMedia?.facebookUrl}
              >
                <FaFacebookF />
              </a>
            </li>
          )}
          {footer?.socialMedia?.twitterUrl && (
            <li className="footer__item-social">
              <a
                className="footer__link-social"
                href={footer?.socialMedia?.twitterUrl}
              >
                <FaTwitter />
              </a>
            </li>
          )}
          {footer?.socialMedia?.instagramUrl && (
            <li className="footer__item-social">
              <a
                className="footer__link-social"
                href={footer?.socialMedia?.instagramUrl}
              >
                <FaInstagram />
              </a>
            </li>
          )}
          {footer?.socialMedia?.youtubeUrl && (
            <li className="footer__item-social">
              <a
                className="footer__link-social"
                href={footer?.socialMedia?.youtubeUrl}
              >
                <FaYoutube />
              </a>
            </li>
          )}
          {footer?.socialMedia?.linkedinUrl && (
            <li className="footer__item-social">
              <a
                className="footer__link-social"
                href={footer?.socialMedia?.linkedinUrl}
              >
                <FaLinkedinIn />
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
