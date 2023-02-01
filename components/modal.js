import algoliasearch from "algoliasearch/lite";
// import Search from './Search'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import CustomSearchBox from "./customSearchBox";
import CustomHits from "./customHits";

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY)

const Modal = ({onClose}) => {

  return (
    <div className={`modal`}>
        <span class="close" onClick={onClose}>&times;</span>
        <div className="container">
            <InstantSearch searchClient={searchClient} indexName="victorbags">
                {/* <SearchBox /> */}
                <CustomSearchBox />
                {/* <Hits /> */}
                <CustomHits />
            </InstantSearch>
            {/* <Search /> */}
        </div>
      
    </div>
  )
}

export default Modal
