import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
const inter = Inter();

const Categories = ({ products, heading, wmImage }) => {
  return (
    <section className="categories">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className={`heading-secondary ${inter.className}`}>{heading}</h2>
      </div>

      <div className="categories__items">
        {products.map((product, index) => (
          <Link href="products" className="categories__item" key={index}>
            <Image
              src={product?.productImage?.sourceUrl}
              alt={product?.productImage?.altText}
              className="categories__image"
              width={600}
              height={700}
            />
            <Image
              src={wmImage?.sourceUrl}
              alt={wmImage?.altText}
              className="categories__watermark"
              width={1691}
              height={364}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
