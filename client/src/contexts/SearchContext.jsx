import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [search, setSearch] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [languageSearch, setLanguageSearch] = useState("");
  const [genreSearch, setGenreSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");

  const resetSearchValues = () => {
    setCitySearch("");
    setTitleSearch("");
    setLanguageSearch("");
    setGenreSearch("");
    setDateSearch("");
  };

  const getDataSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/search?movieCity=${citySearch}&movieName=${titleSearch}&moviesLanguage=${languageSearch}&moviesGenres=${genreSearch}&releasedDate=${dateSearch}`
      );
      setSearch(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        citySearch,
        setCitySearch,
        titleSearch,
        setTitleSearch,
        languageSearch,
        setLanguageSearch,
        genreSearch,
        setGenreSearch,
        dateSearch,
        setDateSearch,
        resetSearchValues,
        getDataSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
