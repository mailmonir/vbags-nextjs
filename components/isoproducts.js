import React from "react";
import Image from "next/image";
import Isotope from "isotope-layout";

const IsoProducts = ({ products }) => {
  const categoriesSet = new Set();
  products.forEach((product) => {
    categoriesSet.add(product.productName);
  });

  // init one ref to store the future isotope object
  const isotope = React.useRef();
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = React.useState("*");

  //   initialize an Isotope object with configs
  React.useEffect(() => {
    isotope.current = new Isotope(".cards", {
      itemSelector: ".card",
      layoutMode: "fitRows",
    });
    // cleanup
    return () => isotope.current.destroy();
  }, []);

  //   handling filter key change
  React.useEffect(() => {
    filterKey === "*"
      ? isotope.current.arrange({ filter: `*` })
      : isotope.current.arrange({ filter: `.${filterKey}` });
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => setFilterKey(key);

  return (
    <>
      <ul className="filter-list">
        <li className="filter-list__item">
          <button
            className="btn btn--red btn--small"
            onClick={handleFilterKeyChange("*")}
          >
            All
          </button>
        </li>
        {[...categoriesSet] &&
          [...categoriesSet].map((category, index) => (
            <li className="filter-list__item" key={index}>
              <button
                className="btn btn--red btn--small"
                onClick={handleFilterKeyChange(
                  category.replace(/\s/g, "").toLowerCase()
                )}
              >
                {category}
              </button>
            </li>
          ))}
      </ul>

      <div className="cards">
        {products &&
          products.map((product, index) => (
            <div
              className={`card ${product?.productName
                .replace(/\s/g, "")
                .toLowerCase()}`}
              key={index}
            >
              <div className="card__side card__side--front">
                <Image
                  className="card__image"
                  src={product?.productImage?.sourceUrl}
                  alt={`${product?.productImage?.altText}`}
                  width={600}
                  height={700}
                />
              </div>
              <div className="card__side card__side--back">
                <h1 className="heading-tertiary">{product?.productName}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.productDescription,
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default IsoProducts;
