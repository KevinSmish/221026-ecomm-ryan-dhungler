import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext("");

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keywords: "",
    results: [],
  });

  return (
    <SearchContext.Provider
      // @ts-ignore
      value={[values, setValues]}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
