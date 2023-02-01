const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
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

export async function getGalleryPageData() {
  const data = await fetchAPI(
    `
    query NewQuery {
      myOptionsPage {
        info {
          settings {
            whatsAppNumber
          }
        }
        header {
          logo {
            altText
            sourceUrl
            srcSet
          }
          logoWhite {
            altText
            sourceUrl
            srcSet
          }
        }
        footer {
          footerLogo {
            altText
            sourceUrl
            srcSet
          }
          copyrightText
          footerText
          socialMedia {
            facebookUrl
            instagramUrl
            linkedinUrl
            twitterUrl
            youtubeUrl
          }
        }
      }
      page(id: "70", idType: DATABASE_ID) {
        featuredImage {
          node {
            altText
            sourceUrl
            srcSet
          }
        }
        title
        galleryPage {
          galleryImages {
            altText
            sourceUrl
            srcSet
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

export async function getAboutPageData() {
  const data = await fetchAPI(
    `
    query NewQuery {
      myOptionsPage {
        info {
          settings {
            whatsAppNumber
          }
        }
        header {
          logo {
            altText
            sourceUrl
            srcSet
          }
          logoWhite {
            altText
            sourceUrl
            srcSet
          }
        }
        footer {
          footerLogo {
            altText
            sourceUrl
            srcSet
          }
          copyrightText
          footerText
          socialMedia {
            facebookUrl
            instagramUrl
            linkedinUrl
            twitterUrl
            youtubeUrl
          }
        }
      }
      page(id: "63", idType: DATABASE_ID) {
        aboutPage {
          aboutUs
          mdSpeech
        }
        title
        featuredImage {
          node {
            altText
            sourceUrl
            srcSet
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

export async function getContactPageData() {
  const data = await fetchAPI(
    `
    query NewQuery {
      myOptionsPage {
        info {
          settings {
            contactFormEmailRece
            whatsAppNumber
          }
        }
        header {
          logo {
            altText
            sourceUrl
            srcSet
          }
          logoWhite {
            altText
            sourceUrl
            srcSet
          }
        }
        footer {
          footerLogo {
            altText
            sourceUrl
            srcSet
          }
          copyrightText
          footerText
          socialMedia {
            facebookUrl
            instagramUrl
            linkedinUrl
            twitterUrl
            youtubeUrl
          }
        }
      }
      page(id: "65", idType: DATABASE_ID) {
        featuredImage {
          node {
            altText
            sourceUrl
            srcSet
          }
        }
        title
        contactPage {
          contactHeading
          contactDescription
          addressHeadOffice
          addressFactory
          addressChinaOffice
          contactFormHeading
          contactFormMessage
          contactFormImage {
            altText
            sourceUrl
            srcSet
          }
          locationHeading
          gmap {
            city
            country
            postCode
            state
            streetAddress
            stateShort
            streetName
            streetNumber
            countryShort
            latitude
            longitude
            placeId
            zoom
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



export async function getProducts() {
  
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

export async function getProductsPageData() {
  const data = await fetchAPI(
    `
    query NewQuery {
      myOptionsPage {
        info {
          settings {
            whatsAppNumber
          }
        }
        header {
          logo {
            altText
            sourceUrl
            srcSet
          }
          logoWhite {
            altText
            sourceUrl
            srcSet
          }
        }
        footer {
          footerLogo {
            altText
            sourceUrl
            srcSet
          }
          copyrightText
          footerText
          socialMedia {
            facebookUrl
            instagramUrl
            linkedinUrl
            twitterUrl
            youtubeUrl
          }
        }
      }
      page(id: "67", idType: DATABASE_ID) {
        featuredImage {
          node {
            altText
            sourceUrl
            srcSet
          }
        }
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
        title
      }
    }
  `,
    {
      variables: {},
    }
  );
  return data || {};
}

export async function getMainPageData() {
  const data = await fetchAPI(
    `
    query NewQuery {
      myOptionsPage {
        info {
          settings {
            whatsAppNumber
          }
        }
        header {
          logo {
            altText
            sourceUrl
            srcSet
          }
          logoWhite {
            altText
            sourceUrl
            srcSet
          }
        }
        footer {
          footerLogo {
            altText
            sourceUrl
          }
          copyrightText
          footerText
          socialMedia {
            facebookUrl
            instagramUrl
            linkedinUrl
            twitterUrl
            youtubeUrl
          }
        }
        
      }
      pages(where: {id: 67}) {
        nodes {
          productsPage {
            products {
              productName
              productDescription
              productImage {
                altText
                sourceUrl
                srcSet
              }
              showOnFrontPage
            }
          }
        }
      }
      page(id: "60", idType: DATABASE_ID) {
        mainPage {
          slides {
            buttonText
            buttonLink
            mainHeading
            subHeading
            slideImage {
              altText
              sourceUrl
              srcSet
            }
          }
          productsHeading
          
          certificationsHeading
          about {
            aboutUsText
            aboutUsImage {
              altText
              sourceUrl
              srcSet
            }
            aboutheading
          }
          certifications {
            image {
              altText
              sourceUrl
              srcSet
            }
          }
          watermarkImage {
            altText
            sourceUrl
            srcSet
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
