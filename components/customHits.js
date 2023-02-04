import { connectStateResults } from "react-instantsearch-dom";
import dynamic from "next/dynamic";

const IsoProducts = dynamic(() => import("../components/isoproducts"), {
    ssr: false,
  });

function CustomHits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>Aw snap! Nothing found.</p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <main>
            <IsoProducts products={searchResults.hits} cname="modal-cards" />
        </main>
      )}
    </>
  );
}

export default connectStateResults(CustomHits);