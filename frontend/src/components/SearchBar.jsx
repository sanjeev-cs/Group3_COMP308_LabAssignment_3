import React from 'react';
import '../styles/App.css';

// Reusable search input component
const SearchBar = ({ value, onChange, placeholder = "Search for games..." }) => {
    return (
        <div className="search-bar-container">
            {/* Search input field */}
            <input
                type="text"
                className="search-input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

            {/* Search icon (visual only) */}
            <span className="search-icon">🔍</span>
        </div>
    );
};

export default SearchBar;
