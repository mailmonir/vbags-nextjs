import Image from "next/image";
import { Inter } from "@next/font/google";
const inter = Inter();

export default function Certifications({ certifications, heading }) {
  return (
    <section className="certifications">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className={`heading-secondary ${inter.className}`}>{heading}</h2>
      </div>

      <div className="certifications__item-wrapper">
        {certifications &&
          certifications.map((cimg, index) => (
            <div className="certifications__item" key={index}>
              <Image
                src={cimg?.image?.sourceUrl}
                alt={cimg?.image?.altText}
                className="certifications__image"
                width={600}
                height={400}
              />
            </div>
          ))}
      </div>
    </section>
  );
}
