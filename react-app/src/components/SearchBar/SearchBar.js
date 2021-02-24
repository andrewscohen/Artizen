import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
    return (
        <div className="search-wrapper">
            <input type="text" placeholder="Enter a city" />
            <button type="submit">
                <i className="fas fa-search"></i>
            </button>
        </div>
    )
}

export default SearchBar;
