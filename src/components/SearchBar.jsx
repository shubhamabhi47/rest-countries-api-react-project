const SearchBar = ({ setQuery }) => {
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        onChange={(event) => setQuery(event.target.value)}
        type="text"
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default SearchBar;
