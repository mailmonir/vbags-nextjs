import Image from "next/image";

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
        sizes={image.srcSet}
      />
      <div className="banner__overlay">
        <h2 className="banner__title">{title}</h2>
      </div>
    </div>
  );
};

export default Banner;
