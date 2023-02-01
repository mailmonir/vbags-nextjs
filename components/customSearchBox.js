import { connectSearchBox } from "react-instantsearch-dom";
import { FaSearch } from "react-icons/fa";

const CustomSearchBox = ({refine}) => {
    return (
        <form action="" role="search">
          <input
            id="algolia_search"
            type="search"
            placeholder="Product search"
            onChange={(e) => refine(e.currentTarget.value)}
            className="form__input"
          />
          <span className="search-icon">
            <FaSearch />
          </span>
            
        </form>
      );
}

export default connectSearchBox(CustomSearchBox)
