import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function SearchProvider({ children }) {
  const currentDate = new Date();
  const toDay = formatDate(currentDate);
  const [search, setSearch] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [languageSearch, setLanguageSearch] = useState("");
  const [genreSearch, setGenreSearch] = useState("");
  const [dateSearch, setDateSearch] = useState(toDay);
  const [tagsSearch, setTagsSearch] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);

  const resetSearchValues = () => {
    setCitySearch("");
    setTitleSearch("");
    setLanguageSearch("");
    setGenreSearch("");
    setDateSearch(formatDate(new Date()));
    setTagsSearch([]);
    setNoResults(false);
  };

  const getDataSearch = async () => {
    if (!dateSearch) {
      setDateSearch(toDay);
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        moviesCity: citySearch,
        movieName: titleSearch,
        moviesLanguage: languageSearch,
        moviesGenres: genreSearch,
        releasedDate: dateSearch,
      });

      const tagsQuery = tagsSearch
        .map((tag) => `tags[]=${encodeURIComponent(tag)}`)
        .join("&");

      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/search?${params.toString()}&${tagsQuery}`;

      const response = await axios.get(url);
      if (response.data.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      console.log(response.data.data);

      setSearch(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        toDay,
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
        tagsSearch,
        setTagsSearch,
        noResults,
        setNoResults,
        resetSearchValues,
        getDataSearch,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
