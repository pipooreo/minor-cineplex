import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import { formatDate } from "../contexts/SearchContext";
import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ClockLoader from "react-spinners/ClockLoader";

function SearchResultPage() {
  const {
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
    noResults,
    setTagsSearch,
    getDataSearch,
    loading,
  } = useSearch();

  const dateRef = React.useRef();
  const [isOpen, setIsOpen] = useState([]);
  const navigate = useNavigate();
  const [wheelchairAccess, setWheelchairAccess] = useState(false);
  const [hearingAssistance, setHearingAssistance] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(true);

  useEffect(() => {
    getDataSearch();
  }, []);

  useEffect(() => {
    if (
      citySearch === "" &&
      titleSearch === "" &&
      languageSearch === "" &&
      genreSearch === "" &&
      dateSearch === formatDate(new Date())
    ) {
      getDataSearch();
    }
  }, [
    citySearch,
    titleSearch,
    languageSearch,
    genreSearch,
    dateSearch,
    tagsSearch,
  ]);

  useEffect(() => {
    if (searchTriggered) {
      getDataSearch();
    }
  }, [
    searchTriggered,
    wheelchairAccess,
    hearingAssistance,
    citySearch,
    titleSearch,
    languageSearch,
    genreSearch,
    dateSearch,
    tagsSearch,
  ]);

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.value = dateSearch;
    }
  }, [dateSearch]);

  useEffect(() => {
    if (search.length > 0) {
      const initialIsOpen = search.flatMap((searchItem) =>
        searchItem.cinemas ? searchItem.cinemas.map(() => true) : []
      );
      setIsOpen(initialIsOpen);
    }
  }, [search]);

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const handleClear = () => {
    setCitySearch("");
    setTitleSearch("");
    setLanguageSearch("");
    setGenreSearch("");
    setDateSearch(formatDate(new Date()));
    setTagsSearch([]);
    setWheelchairAccess(false);
    setHearingAssistance(false);
    setSearchTriggered(false);
    navigate("/moviesearch");
  };

  const handleCheckboxChange = (event, type) => {
    const isChecked = event.target.checked;
    const wheelchairTag = "Wheelchair Access";
    const hearingAssistanceTag = "Hearing Assistance";

    if (type === "wheelchair") {
      setWheelchairAccess(isChecked);
    } else if (type === "hearing") {
      setHearingAssistance(isChecked);
    }

    setTagsSearch((prevTags) => {
      let newTags = [...prevTags];

      if (type === "wheelchair") {
        if (isChecked) {
          if (!newTags.includes(wheelchairTag)) {
            newTags.push(wheelchairTag);
          }
        } else {
          newTags = newTags.filter((tag) => tag !== wheelchairTag);
        }
      } else if (type === "hearing") {
        if (isChecked) {
          if (!newTags.includes(hearingAssistanceTag)) {
            newTags.push(hearingAssistanceTag);
          }
        } else {
          newTags = newTags.filter((tag) => tag !== hearingAssistanceTag);
        }
      }
      return newTags;
    });
  };

  const toggleMenu = (index) => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...prevIsOpen];
      newIsOpen[index] = !newIsOpen[index];
      return newIsOpen;
    });
  };

  return (
    <div style={{ fontFamily: "Roboto Condensed" }}>
      <section className="bg-gray-0 pt-[120px] pb-[40px] flex flex-col items-center gap-[24px] ">
        <div className="bg-gray-0 rounded-[4px] sm:w-[60%] flex flex-col justify-between items-center xl:w-[80%] xl:flex xl:flex-row xs:gap-[24px] xs:flex-col">
          <div className="bg-gray-0 w-[100%] grid grid-cols-2 gap-[12px] xl:flex xl:justify-between xl:gap-[12px]">
            <select
              value={titleSearch}
              onChange={(event) => {
                setTitleSearch(event.target.value);
                setSearchTriggered(false);
                // searchInitiated.current = false;
              }}
              className={`col-span-2 xl:w-[30%] h-[48px] rounded-[4px] bg-[#21263F] border-[1px] p-[12px] text-body1R outline-none ${
                titleSearch ? "text-white" : "text-gray-300 border-[#565F7E]"
              }`}
              name="movie"
            >
              <option value="">Movie</option>
              <option>The Dark Knight</option>
              <option>Django Unchained</option>
              <option>DUNE: Part Two</option>
              <option>Interstellar</option>
              <option>La La Land</option>
              <option>Pee Mak</option>
              <option>Death Whisperer</option>
              <option>Godzilla x Kong: The New Empire</option>
              <option>
                Demon Slayer: Kimetsu No Yaiba To the Hashira Training
              </option>
            </select>

            <select
              value={languageSearch}
              onChange={(event) => {
                setLanguageSearch(event.target.value);
                setSearchTriggered(false);
                // searchInitiated.current = false;
              }}
              className={`col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[1px] p-[12px] text-body1R outline-none ${
                languageSearch ? "text-white" : "text-gray-300 border-[#565F7E]"
              }`}
              name="language"
            >
              <option value="">Language</option>
              <option>TH</option>
              <option>EN</option>
              <option>TH/EN</option>
            </select>

            <select
              value={genreSearch}
              onChange={(event) => {
                setGenreSearch(event.target.value);
                setSearchTriggered(false);
                // searchInitiated.current = false;
              }}
              className={`col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[1px] p-[12px] text-body1R outline-none ${
                genreSearch ? "text-white" : "text-gray-300 border-[#565F7E]"
              }`}
              name="genre"
            >
              <option value="">Genre</option>
              <option>Action</option>
              <option>Animation</option>
              <option>Crime</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Fantasy</option>
              <option>History</option>
              <option>Horror</option>
              <option>Music</option>
              <option>Sci-fi</option>
            </select>

            <select
              value={citySearch}
              onChange={(event) => {
                setCitySearch(event.target.value);
                setSearchTriggered(false);
                // searchInitiated.current = false;
              }}
              className={`col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[1px] p-[12px] text-body1R outline-none ${
                citySearch ? "text-white" : "text-gray-300 border-[#565F7E]"
              }`}
              name="city"
            >
              <option value="">City</option>
              <option>Bangkok</option>
              <option>Nonthaburi</option>
              <option>Pathumthani</option>
            </select>

            <input
              ref={dateRef}
              className={`col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[1px] p-[12px] text-body1R outline-none ${
                dateSearch ? "text-white" : "text-gray-300 border-[#565F7E]"
              }`}
              type="date"
              name="releaseDate"
              placeholder="Release date"
            />
          </div>
          <div className="flex items-center gap-[24px]">
            <button
              onClick={() => {
                setDateSearch(dateRef?.current?.value);
                handleSearch();
              }}
              className="w-[72px] h-[48px] bg-[#4E7BEE] rounded-[4px] active:w-[71.5px] active:h-[47.5px]"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <div
              onClick={handleClear}
              className="text-white underline underline-offset-2 md:hidden"
            >
              Clear
            </div>
          </div>
        </div>

        <div className="flex xs:flex-col xs:justify-between xs:items-center xl:w-[80%] xl:flex-row xl:justify-between">
          <div className="flex">
            <FormControlLabel
              label="Wheelchair access"
              className="text-gray-400 text-body2R"
              control={
                <Checkbox
                  checked={wheelchairAccess}
                  onChange={(event) =>
                    handleCheckboxChange(event, "wheelchair")
                  }
                  sx={{
                    color: "#8B93B0",
                  }}
                />
              }
            />
            <FormControlLabel
              label="Hearing assistance"
              className="text-gray-400 text-body2R"
              control={
                <Checkbox
                  checked={hearingAssistance}
                  onChange={(event) => handleCheckboxChange(event, "hearing")}
                  sx={{
                    color: "#8B93B0",
                  }}
                />
              }
            />
          </div>

          <div
            onClick={handleClear}
            className="text-white underline underline-offset-2 max-md:hidden"
          >
            Clear
          </div>
        </div>
      </section>

      <section className="bg-BG xs:pt-[24px] md:pt-[40px] md:pb-[80px] h-[100%] flex flex-col items-center">
        <div className="xs:w-[100%] md:w-[80%] flex flex-col gap-[24px]">
          {loading ? (
            <div className="sweet-loading flex justify-center h-[30vh] m-10 items-center ">
              <ClockLoader color="#4f7cee" />
            </div>
          ) : (
            <div>
              {noResults ? (
                <div className="text-gray-400 text-center py-8 h-screen">
                  <h2 className="text-2xl font-bold mb-4">No results found</h2>
                  <p>
                    Please try different search criteria or clear your filters.
                  </p>
                </div>
              ) : (
                (() => {
                  let cinemaCount = 0;
                  return search.map((searchItem, index_search) => (
                    <div
                      key={index_search}
                      className="flex flex-col gap-[24px]"
                    >
                      {searchItem.cinemas.map((cinema, index_cinema) => {
                        const currentCinemaIndex = cinemaCount++;
                        return (
                          <div key={index_cinema}>
                            <div className="bg-gray-0 px-[16px] py-[24px] rounded-[5px] flex justify-between items-center gap-[20px]">
                              <div className="xs:grid xs:grid-cols-6 gap-2 xl:flex xl:items-center xl:gap-[20px]">
                                <i className="fa-solid fa-location-dot w-[44px] h-[44px] text-[#4E7BEE] rounded-[50%] bg-[#474e6e] flex justify-center items-center col-span-1"></i>
                                <div className="text-[24px] text-[white] font-[700] leading-[30px] xs:col-span-5">
                                  {cinema.cinema_name}
                                </div>
                                {cinema.movie_details.cinema_tags.map(
                                  (tag, index_tag) => (
                                    <div
                                      key={index_tag}
                                      className="rounded-[4px] text-gray-300 bg-gray-100 text-[14px] leading-[20px] py-[6px] px-[12px] xs:col-span-3"
                                    >
                                      {tag}
                                    </div>
                                  )
                                )}
                              </div>
                              <i
                                className="fa-solid fa-angle-down text-gray-400"
                                onClick={() => toggleMenu(currentCinemaIndex)}
                              ></i>
                            </div>

                            {isOpen[currentCinemaIndex] && (
                              <div className="bg-gray-0 border-t-[1px] xs:flex xs:flex-col md:flex md:flex-row">
                                <div className="xs:flex xs:flex-row md:flex md:flex-col p-[24px] gap-[24px] w-full md:w-[270px] ">
                                  <img
                                    className="xs:w-[96px] xs:h-[140px] md:w-[174px] md:h-[254px] rounded-[4px]"
                                    src={cinema.movie_details.movie_image}
                                    alt=""
                                  />

                                  <div className="w-[100%] xs:flex xs:flex-col gap-[8px]">
                                    <div className="text-white text-[20px] font-[700]">
                                      {cinema.movie_details.movie_name}
                                    </div>
                                    <div className="flex flex-wrap gap-[8px]">
                                      {cinema.movie_details.movie_genres.map(
                                        (genre, index_genre) => (
                                          <div
                                            key={index_genre}
                                            className="rounded-[4px] text-gray-300 bg-gray-100 py-[6px] px-[12px] flex gap-[8px]"
                                          >
                                            {genre}
                                          </div>
                                        )
                                      )}

                                      <div className="rounded-[4px] text-[14px] font-[500] text-gray-400 bg-gray-100 py-[6px] px-[12px] flex gap-[8px]">
                                        {cinema.movie_details.movie_language}
                                      </div>
                                    </div>

                                    <div
                                      onClick={() => {
                                        navigate(
                                          `/movie/${cinema.movie_details.movie_name}#`
                                        );
                                      }}
                                      className="text-white text-[16px] font-[700] underline mt-[40px]"
                                    >
                                      Movie Detail
                                    </div>
                                  </div>
                                </div>

                                <div className="xs:w-[100%] w-[343px] p-[10px] md:p-[40px] flex flex-col xs:gap-[40px] gap-[60px]">
                                  {Object.keys(
                                    cinema.movie_details.schedule
                                  ).map((key, index_time) => (
                                    <div
                                      key={index_time}
                                      className="flex flex-col gap-[16px]"
                                    >
                                      <div className="text-gray-400 text-[24px] font-[700]">
                                        {key}
                                      </div>
                                      <div className="flex flex-wrap gap-[24px]">
                                        {cinema.movie_details.schedule[key].map(
                                          (time, index_times, array) => {
                                            let timeClass = "";
                                            let status = false;
                                            const now = new Date();
                                            const showDate = new Date(
                                              dateSearch
                                            );
                                            const [hours, minutes] = time
                                              .split(".")
                                              .map(Number);
                                            const showTime = new Date(showDate);
                                            showTime.setHours(
                                              hours,
                                              minutes,
                                              0,
                                              0
                                            );

                                            let closestUpcomingIndex =
                                              array.findIndex((t, i) => {
                                                const [h, m] = t
                                                  .split(".")
                                                  .map(Number);
                                                const compTime = new Date(
                                                  showDate
                                                );
                                                compTime.setHours(h, m, 0, 0);
                                                return compTime > now;
                                              });

                                            if (closestUpcomingIndex === -1) {
                                              closestUpcomingIndex =
                                                array.length;
                                            }

                                            if (
                                              showDate.toDateString() ===
                                              now.toDateString()
                                            ) {
                                              if (now > showTime) {
                                                timeClass =
                                                  "bg-gray-0 border-[1px] text-gray-200";
                                                status = true;
                                              } else if (
                                                now < showTime &&
                                                closestUpcomingIndex ===
                                                  index_times
                                              ) {
                                                timeClass =
                                                  "bg-blue-100 text-white";
                                              } else {
                                                timeClass =
                                                  "bg-blue-200 text-white";
                                              }
                                            } else if (showDate < now) {
                                              timeClass =
                                                "bg-gray-0 border-[1px] text-gray-200";
                                              status = true;
                                            } else {
                                              timeClass =
                                                "bg-blue-200 text-white";
                                            }

                                            return (
                                              <button
                                                onClick={() =>
                                                  navigate(
                                                    `/seat/${cinema.movie_details.movie_name}/${cinema.cinema_name}/${dateSearch}/${key}/${time}#`
                                                  )
                                                }
                                                disabled={status}
                                                key={index_times}
                                                className={`rounded-[4px] xs:px-[24px] xs:py-[12px] md:w-[128px] w-[102px] ${timeClass}`}
                                              >
                                                {time}
                                              </button>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ));
                })()
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default SearchResultPage;
