import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from 'react-instantsearch-dom';
import CustomSearchBox from "./customSearchBox";
import CustomHits from "./customHits";

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY)

const Modal = ({onClose}) => {

  return (
    <div className={`modal`}>
      <span className="close" onClick={onClose}>&times;</span>
      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="victorbags">
          <CustomSearchBox />
          <CustomHits />
        </InstantSearch>
      </div>
    </div>
  )
}

export default Modal
