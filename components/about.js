import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = ({ data }) => {
  return (
    <section className="about-section">
      <div className="about-section__content">
        <h2 className="heading-secondary heading-secondary--white">
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
              alt="some text"
              className="info__image"
              width={1280}
              height={862}
              sizes={data?.aboutUsImage?.srcSet}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
