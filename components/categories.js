import Image from "next/image";
import Link from "next/link";
import logow from "../public/img/logo-f-white.png";

const Categories = ({ products, heading }) => {
  return (
    <section className="categories">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">{heading}</h2>
      </div>

      <div className="categories__items">
        {products.map((product, index) => (
          <Link href="products" className="categories__item" key={index}>
            <Image
              src={product?.productImage?.sourceUrl}
              alt="test"
              className="categories__image"
              width={600}
              height={700}
            />
            <Image
              src={logow}
              alt="watermark logo"
              className="categories__watermark"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
