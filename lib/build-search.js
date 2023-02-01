const dotenv = require('dotenv');
const algoliaSearch = require('algoliasearch/lite')
dotenv.config()

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(process.env.WORDPRESS_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}


async function getProducts() {
  
  const data = await fetchAPI(
    `
    query NewQuery {
      
      page(id: "67", idType: DATABASE_ID) {
        productsPage {
          products {
            productDescription
            productName
            productImage {
              altText
              sourceUrl
              srcSet
            }
          }
        }
      }
    }
  `,
    {
      variables: {},
    }
  );
  return data || {};
}

function transformProductsToSearchObjects(products) {
    const transformed = products.map((product, index) => {
      return {
        objectID: index,
        productName: product.productName,
        productDescription: product.productDescription.replace( /(<([^>]+)>)/ig, '').replace(/\n/g,''),
        productImage: {
          altText: product?.productImage?.altText,
          sourceUrl: product?.productImage?.sourceUrl,
          srcSet: product?.productImage?.srcSet
        }
      };
    });
  
    return transformed;
  }

(async function() {

  try {

    const data = await getProducts()
    const products = data?.page?.productsPage?.products
    const transformed = transformProductsToSearchObjects(products)

    const client = algoliaSearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_KEY)
    const index = client.initIndex('victorbags')

    const algoliaResponse = await index.saveObjects(transformed)

    console.log(
      `Sucessfully added ${algoliaResponse.objectIDs.length} records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
          "\n",
        )}`,
      );
        
  } catch (error) {
      console.log(error)
  }
    

})()