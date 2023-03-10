import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
const inter = Inter();

const About = ({ data }) => {
  return (
    <section className="about-section">
      <div className="about-section__content">
        <h2
          className={`heading-secondary heading-secondary--white ${inter.className}`}
        >
          {data?.aboutheading}
        </h2>
        <div className="info">
          <div className="info__text">
            <p>{data?.aboutUsText}</p>
            <Link href="about" className="btn btn--red info__button">
              More about us
            </Link>
          </div>
          <div className="info__image-wrapper">
            <Image
              src={data?.aboutUsImage?.sourceUrl}
              alt={data?.aboutUsImage?.altText}
              className="info__image"
              width={1280}
              height={862}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
