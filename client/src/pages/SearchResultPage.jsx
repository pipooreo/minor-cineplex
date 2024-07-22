import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { date } from "yup";

function SearchResultPage() {
  const [isOpen, setIsOpen] = useState([]);
  const [search, setSearch] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [languageSearch, setLanguageSearch] = useState("");
  const [genreSearch, setGenreSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");

  const getDataSearch = async () => {
    if (!dateSearch) {
      setDateSearch(formattedDate);
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/search?movieCity=${citySearch}&movieName=${titleSearch}&moviesLanguage=${languageSearch}&moviesGenres=${genreSearch}&releasedDate=${dateSearch}`

        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // `http://localhost:4000/search?movieCity=${city}&movieName=${title}&moviesLanguage=${language}&moviesGenres=${genre}&releasedDate=${date}`
        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      );
      setSearch(response.data.data);
      // console.log(response.data.data);

      const initialIsOpen = response.data.data.flatMap((search) =>
        search.cinemas.map(() => true)
      );
      setIsOpen(initialIsOpen);

      // setIsOpen(Array(loop(response.data.data)).fill(false));
      // console.log(Array(loop(response.data.data)));
    } catch (error) {}
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  // console.log(dateSearch);

  const handdleClear = () => {
    setCitySearch("");
    setTitleSearch("");
    setLanguageSearch("");
    setGenreSearch("");
    setDateSearch("");
    getDataSearch();
  };
  // console.log(dateSearch);

  useEffect(() => {
    getDataSearch();
  }, []);

  const toggleMenu = (index) => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...prevIsOpen];
      newIsOpen[index] = !newIsOpen[index];
      return newIsOpen;
    });
    // console.log(isOpen);
  };

  const now = new Date();
  const nowTime = now.getHours() + now.getMinutes() / 60;

  // -------------------------------------------------------------------------------
  // const navitgate = useNavigate();
  // const location = useLocation();

  // const extractQueryParams = () => {
  //   const queryParams = new URLSearchParams(location.search);
  //   setCitySearch(queryParams.get("city") || "");
  //   setTitleSearch(queryParams.get("title") || "");
  //   setLanguageSearch(queryParams.get("language") || "");
  //   setGenreSearch(queryParams.get("genre") || "");
  //   setDateSearch(queryParams.get("date") || "");
  // };

  // useEffect(() => {
  //   extractQueryParams();
  // }, [location.search]);
  // --------------------------------------------------------------------------------

  return (
    <div>
      <section className="bg-gray-0 pt-[120px] pb-[40px] flex flex-col items-center gap-[24px]">
        <div className="bg-gray-0 rounded-[4px] sm:w-[60%] flex flex-col justify-between items-center xl:w-[80%] xl:flex xl:flex-row xs:gap-[24px] xs:flex-col">
          <div className="bg-gray-0 w-[100%] grid grid-cols-2 gap-[12px] xl:flex xl:justify-between xl:gap-[12px]">
            <select
              value={titleSearch}
              onChange={(event) => {
                setTitleSearch(event.target.value);
              }}
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
              onChange={(event) => {
                setLanguageSearch(event.target.value);
              }}
              className="col-span-1  xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
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
              }}
              className="col-span-1  xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="genre"
            >
              <option value="">Genre</option>
              <option>Action</option>
              <option>Love</option>
            </select>

            <select
              value={citySearch}
              onChange={(event) => {
                setCitySearch(event.target.value);
              }}
              className="col-span-1  xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="city"
            >
              <option value="">City</option>
              <option>Bangkok</option>
            </select>

            <input
              value={dateSearch}
              onChange={(event) => {
                setDateSearch(event.target.value);
              }}
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
              onClick={() => {
                handdleClear();
              }}
              className="text-white underline underline-offset-2 md:hidden"
            >
              Clear
            </div>
          </div>
        </div>

        <div className="flex xs:flex-col xs:justify-between xs:items-center xl:w-[80%] xl:flex-row xl:justify-between">
          <div className="xs:flex xs:flex-row xs:gap-[24px] ">
            <div className="text-gray-400 ">
              <input className="mr-[5px]" type="checkbox" />
              Wheelchair access
            </div>
            <div className="text-gray-400 ">
              <input className="mr-[5px]" type="checkbox" />
              Hearing assistance
            </div>
          </div>
          <div
            onClick={() => {
              handdleClear();
            }}
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
            return search.map((search, index_search) => {
              return (
                <div key={index_search} className="flex flex-col gap-[24px]">
                  {search.cinemas.map((cinemas, index_cinemas) => {
                    const currentCinemaIndex = cinemaCount++;
                    return (
                      <div key={index_cinemas}>
                        <div className="bg-gray-0 px-[16px] py-[24px] rounded-[5px] flex justify-between items-center gap-[20px]">
                          <div className="xs:grid xs:grid-cols-6 gap-2 xl:flex xl:items-center xl:gap-[20px]">
                            <i className="fa-solid fa-location-dot w-[44px] h-[44px] text-[#4E7BEE] rounded-[50%] bg-[#474e6e] flex justify-center items-center col-span-1"></i>
                            <div className="text-[24px] text-[white] font-[700] leading-[30px] xs:col-span-5">
                              {cinemas.cinema_name}
                            </div>
                            {cinemas.movie_details.cinema_tags.map(
                              (tags, index_tags) => {
                                return (
                                  <div
                                    key={index_tags}
                                    className="rounded-[4px] text-gray-300 bg-gray-100 text-[14px] leading-[20px] py-[6px] px-[12px] xs:col-span-3"
                                  >
                                    {tags}
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <i
                            className="fa-solid fa-angle-down text-gray-400"
                            onClick={() => {
                              toggleMenu(currentCinemaIndex);
                            }}
                          ></i>
                        </div>

                        {isOpen[currentCinemaIndex] && (
                          <div className="bg-gray-0 border-t-[1px] xs:flex xs:flex-col md:flex md:flex-row">
                            <div className="xs:flex xs:flex-row md:flex md:flex-col p-[24px] gap-[24px]">
                              <img
                                className="xs:w-[96px] xs:h-[140px] md:w-[174px] md:h-[254px] rounded-[4px]"
                                src={cinemas.movie_details.movie_image}
                                alt=""
                              />

                              <div className="w-[100%] xs:flex xs:flex-col gap-[8px]">
                                <div className="text-white text-[20px] font-[700] ">
                                  {cinemas.movie_details.movie_name}
                                </div>
                                <div className="flex flex-wrap gap-[8px]">
                                  {cinemas.movie_details.movie_genres.map(
                                    (genres, index_genres) => {
                                      return (
                                        <div
                                          key={index_genres}
                                          className="rounded-[4px] text-gray-300 bg-gray-100 py-[6px] px-[12px] flex gap-[8px]"
                                        >
                                          {genres}
                                        </div>
                                      );
                                    }
                                  )}

                                  <div className="rounded-[4px] text-[14px] font-[500] text-gray-400 bg-gray-100 py-[6px] px-[12px] flex gap-[8px]">
                                    {cinemas.movie_details.movie_language}
                                  </div>
                                </div>

                                <div
                                  onClick={() => {
                                    navitgate(
                                      `/movie/${cinemas.movie_details.movie_name}`
                                    );
                                  }}
                                  className="text-white text-[16px] font-[700] underline mt-[40px]"
                                >
                                  Movie Detail
                                </div>
                              </div>
                            </div>

                            <div className="w-[100%] p-[40px] flex flex-col xs:gap-[40px] md:gap-[60px]">
                              {Object.keys(cinemas.movie_details.schedule).map(
                                function (key, index_time) {
                                  return (
                                    <>
                                      <div
                                        key={index_time}
                                        className="flex flex-col gap-[16px]"
                                      >
                                        <div className="text-gray-400 text-[24px] font-[700] ">
                                          {key}
                                        </div>
                                        <div className="flex flex-wrap gap-[24px]">
                                          {cinemas.movie_details.schedule[
                                            key
                                          ].map((time, index_times, array) => {
                                            let timeClass = "";

                                            // Convert time slot to float
                                            const slotTime = parseFloat(time); // Assuming time is in "HH.MM" format

                                            if (nowTime > slotTime) {
                                              timeClass =
                                                "bg-gray-0 border-[1px] text-gray-200";
                                            } else if (
                                              nowTime < slotTime &&
                                              array.findIndex(
                                                (t) => parseFloat(t) > nowTime
                                              ) === index_times
                                            ) {
                                              timeClass =
                                                "bg-blue-100 text-white ";
                                            } else if (nowTime < slotTime) {
                                              timeClass =
                                                "bg-blue-200 text-white ";
                                            }
                                            return (
                                              <div
                                                key={index_times}
                                                className={`rounded-[4px] px-[24px] py-[12px] 
                                                  ${timeClass}`}
                                              >
                                                {time}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            });
          })()}
        </div>

        <div>pagination</div>
      </section>
    </div>
  );
}

export default SearchResultPage;
