const algoliaSearch = require("algoliasearch/lite");

import { getProducts } from "../../lib/api";

function transformProductsToSearchObjects(products) {
  const transformed = products.map((product, index) => {
    return {
      objectID: index,
      productName: product.productName,
      productDescription: product.productDescription
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/\n/g, ""),
      productImage: {
        altText: product?.productImage?.altText,
        sourceUrl: product?.productImage?.sourceUrl,
      },
    };
  });

  return transformed;
}

const algolia = async (req, res) => {
  try {
    const data = await getProducts();
    const products = data?.page?.productsPage?.products;
    const transformed = transformProductsToSearchObjects(products);

    const client = algoliaSearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_KEY
    );
    const index = client.initIndex("victorbags");

    index.clearObjects().then(() => {
      index.saveObjects(transformed);
    });

    res.status(200).json({
      status: "success",
      message: "Data sending to algolia successful",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Data sending failed to algolia",
    });
  }
};

export default algolia;
