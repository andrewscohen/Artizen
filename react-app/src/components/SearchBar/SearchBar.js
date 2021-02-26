import React from "react";
import "./SearchBar.css";
// import Search from '../Maps/Search.js'

const SearchBar = () => {
    return (
        <div className="search-wrapper">
            {/* <Search /> */}
            <input type="text" placeholder="Enter a city" />
            <button type="submit" className="btn__search">
                <i className="fas fa-search"></i>
            </button>
        </div>
    )
}

export default SearchBar;
