import Image from "next/image";
import { Inter } from "@next/font/google";
const inter = Inter();

const Banner = ({ title, image }) => {
  return (
    <div className="banner">
      <Image
        src={image.sourceUrl}
        alt={image.altText}
        width={1920}
        height={400}
        className="banner__image"
        priority
      />
      <div className="banner__overlay">
        <h2 className={`banner__title ${inter.className}`}>{title}</h2>
      </div>
    </div>
  );
};

export default Banner;
