import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import { formatDate } from "../contexts/SearchContext";

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
    getDataSearch,
  } = useSearch();

  const [isOpen, setIsOpen] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCitySearch(params.get("city") || "");
    setTitleSearch(params.get("title") || "");
    setLanguageSearch(params.get("language") || "");
    setGenreSearch(params.get("genre") || "");
    setDateSearch(params.get("date") || formatDate(new Date()));
  }, [location.search]);

  useEffect(() => {
    getDataSearch();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const initialIsOpen = search.flatMap((searchItem) =>
        searchItem.cinemas ? searchItem.cinemas.map(() => true) : []
      );
      setIsOpen(initialIsOpen);
    }
  }, [search]);

  const handleClear = () => {
    setCitySearch("");
    setTitleSearch("");
    setLanguageSearch("");
    setGenreSearch("");
    setDateSearch("");
    // navigate("/moviesearch");
  };

  const toggleMenu = (index) => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...prevIsOpen];
      newIsOpen[index] = !newIsOpen[index];
      return newIsOpen;
    });
  };

  return (
    <div>
      <section className="bg-gray-0 pt-[120px] pb-[40px] flex flex-col items-center gap-[24px]">
        <div className="bg-gray-0 rounded-[4px] sm:w-[60%] flex flex-col justify-between items-center xl:w-[80%] xl:flex xl:flex-row xs:gap-[24px] xs:flex-col">
          <div className="bg-gray-0 w-[100%] grid grid-cols-2 gap-[12px] xl:flex xl:justify-between xl:gap-[12px]">
            <select
              value={titleSearch}
              onChange={(event) => setTitleSearch(event.target.value)}
              className="col-span-2 xl:w-[30%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="movie"
            >
              <option value="">Movie</option>
              <option>The Dark Knight</option>
              <option>Django Unchained</option>
              <option>DUNE: Part Two</option>
              <option>Interstellar</option>
            </select>

            <select
              value={languageSearch}
              onChange={(event) => setLanguageSearch(event.target.value)}
              className="col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="language"
            >
              <option value="">Language</option>
              <option>TH</option>
              <option>EN</option>
              <option>TH/EN</option>
            </select>

            <select
              value={genreSearch}
              onChange={(event) => setGenreSearch(event.target.value)}
              className="col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="genre"
            >
              <option value="">Genre</option>
              <option>Action</option>
              <option>Crime</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Sci-fi</option>
            </select>

            <select
              value={citySearch}
              onChange={(event) => setCitySearch(event.target.value)}
              className="col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="city"
            >
              <option value="">City</option>
              <option>Bangkok</option>
              <option>Nonthaburi</option>
              <option>Pathumthani</option>
            </select>

            <input
              value={dateSearch}
              onChange={(event) => setDateSearch(event.target.value)}
              className="col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              type="date"
              name="releaseDate"
              placeholder="Release date"
            />
          </div>
          <div className="flex items-center gap-[24px]">
            <button
              onClick={getDataSearch}
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
          <button
            onClick={getDataSearch}
            className="w-[72px] h-[48px] bg-[#4E7BEE] rounded-[4px] active:w-[71.5px] active:h-[47.5px]"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="flex xs:flex-col xs:justify-between xs:items-center xl:w-[80%] xl:flex-row xl:justify-between">
          <div className="xs:flex xs:flex-row xs:gap-[24px]">
            <div className="text-gray-400">
              <input className="mr-[5px]" type="checkbox" />
              Wheelchair access
            </div>
            <div className="text-gray-400">
              <input className="mr-[5px]" type="checkbox" />
              Hearing assistance
            </div>
          </div>
          <div
            onClick={handleClear}
            className="text-white underline underline-offset-2 max-md:hidden"
          >
            Clear
          </div>
        </div>
      </section>

      <section className="bg-BG xs:pt-[24px] md:pt-[40px] md:pb-[80px] flex flex-col items-center">
        <div className="xs:w-[100%] md:w-[80%] flex flex-col gap-[24px]">
          {(() => {
            let cinemaCount = 0;
            return search.map((searchItem, index_search) => (
              <div key={index_search} className="flex flex-col gap-[24px]">
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
                          <div className="xs:flex xs:flex-row md:flex md:flex-col p-[24px] gap-[24px]">
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
                                    `/movie/${cinema.movie_details.movie_name}`
                                  );
                                }}
                                className="text-white text-[16px] font-[700] underline mt-[40px]"
                              >
                                Movie Detail
                              </div>
                            </div>
                          </div>

                          <div className="w-[100%] p-[40px] flex flex-col xs:gap-[40px] md:gap-[60px]">
                            {Object.keys(cinema.movie_details.schedule).map(
                              (key, index_time) => (
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
                                        const showDate = new Date(dateSearch);
                                        const [hours, minutes] = time
                                          .split(".")
                                          .map(Number);
                                        const showTime = new Date(showDate);
                                        showTime.setHours(hours, minutes, 0, 0);

                                        let closestUpcomingIndex =
                                          array.findIndex((t, i) => {
                                            const [h, m] = t
                                              .split(".")
                                              .map(Number);
                                            const compTime = new Date(showDate);
                                            compTime.setHours(h, m, 0, 0);
                                            return compTime > now;
                                          });

                                        if (closestUpcomingIndex === -1) {
                                          closestUpcomingIndex = array.length;
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
                                            closestUpcomingIndex === index_times
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
                                          timeClass = "bg-blue-200 text-white";
                                        }

                                        return (
                                          <button
                                            onClick={() =>
                                              navigate(
                                                `/seat/${cinema.movie_details.movie_name}/${cinema.cinema_name}/${dateSearch}/${key}/${time}`
                                              )
                                            }
                                            disabled={status}
                                            key={index_times}
                                            className={`rounded-[4px] px-[24px] py-[12px] ${timeClass}`}
                                          >
                                            {time}
                                          </button>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ));
          })()}
        </div>

        <div>pagination</div>
      </section>
    </div>
  );
}

export default SearchResultPage;
