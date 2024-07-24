import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useSearch } from "../contexts/SearchContext";
function BookTicketPage() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isOpen, setIsOpen] = useState([]);
  // const [days, setDays] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [citySearch, setCitySearch] = useState("");
  const [cinemaSearch, setCinemaSearch] = useState("");
  // const [movieTitle, setMovieTitle] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const params = useParams();

  // const getDays = async () => {
  // try {
  // const daysData = await axios.get("http://localhost:4000/days");
  // const daysList = daysData.data.data;
  // const currentDate = new Date();
  // const currentDayOfWeek = currentDate.getDay();
  // const offset = (1 - currentDayOfWeek + 3) % 7;

  // const daysWithDates = daysList.map((day, index) => {
  //   const date = new Date(currentDate);
  //   date.setDate(currentDate.getDate() + ((index + offset) % 7));
  //   return { ...day, date: date.toDateString() };
  // });
  // setDays(daysWithDates);
  // } catch (error) {
  // console.error("Error fetching days:", error);
  // }
  // };

  const toggleMenu = (index) => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...prevIsOpen];
      newIsOpen[index] = !newIsOpen[index];
      return newIsOpen;
    });
  };

  const getDataSearch = async () => {
    try {
      console.log("Data search has been performed");
      const response = await axios.get(
        `http://localhost:4000/ticket?movieName=${params.title}&moviesCity=${citySearch}&releasedDate=${dateSearch}&cinemaName=${cinemaSearch}`
      );
      // const response = await axios.get(
      //  `http://localhost:4000/ticket?movieName=${params.title}&moviesCity=${citySearch}&releasedDate=${dateSearch}&cinemaName=${cinemaSearch}`
      //);
      console.log(response.data.data);
      setSearchResult(response.data.data);
      // console.log("search result after getDatasearch:, ", searchResult)
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // const generateFormattedDates = (formatDate) => {
  //   const dates = [];
  //   const today = new Date();
  //   for (let i = 0; i < 7; i++) {
  //     const date = new Date(today);
  //     date.setDate(today.getDate() + i);
  //     dates.push(date);
  //   }
  //   return dates.map((date) => ({
  //     date,
  //     formattedDate: formatDate(date),
  //   }));
  // };

  const handleDayClick = (day) => {
    console.log("Day clicked:", day);
    const formattedDate = formatDate(day);
    setDateSearch(formattedDate);
    setSelectedDate(day);
    return formattedDate;
  };

  const isSelected = (date) => {
    const result =
      selectedDate && date.toDateString() === selectedDate.toDateString();
    // console.log("isSelected:", date, selectedDate, result);
    return result;
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const DateSlider = ({
    settings,
    getDates,
    handleDayClick,
    isSelected,
    isToday,
    formatDay,
    formatDate,
  }) => (
    <div className="p-5 text-[18px]">
      <div className="bg-[#351e21] px-12 py-4">
        <Slider {...settings}>
          {getDates().map((date, index) => (
            <div key={index} className="px-1">
              <button
                onClick={() => {
                  const formattedDate = handleDayClick(date);
                  console.log(
                    "Formatted Date outside function:",
                    formattedDate
                  );
                }}
                className={`w-full text-center p-2 ${
                  isSelected(date) ? "bg-[#e9cd3e]" : ""
                } hover:bg-[#2d3046] transition-colors duration-200 rounded-md`}
              >
                {/* Button content */}
                {isToday(date) ? (
                  <div className="text-[#ff2d2d] text-sm mb-1">Today</div>
                ) : (
                  <div
                    className={`text-sm mb-1 ${
                      isSelected(date) ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {formatDay(date)}
                  </div>
                )}
                <div
                  className={`text-lg font-semibold ${
                    isSelected(date) ? "text-white" : "text-gray-300"
                  }`}
                >
                  {formatDate(date)}
                </div>
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );

  const formatDateForCarousel = (date) => {
    return (
      date.getDate().toString().padStart(2, "0") +
      " " +
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getFullYear()
    );
  };

  const formatDay = (date) => {
    return date.toLocaleString("default", { weekday: "short" });
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  async function getTitleMovie() {
    try {
      const movieData = await axios.get(
        `http://localhost:4000/movies/movie?movieSearch=${params.title}`
      );
      const movieInfo = movieData.data.data[0];
      if (movieInfo) {
        setMovie(movieInfo);
        // setMovieTitle(movieInfo.title);
      }
    } catch (error) {
      console.error("Error fetching movie title:", error);
    }
  }

  useEffect(() => {
    getTitleMovie();
    // getDays();
    handleDayClick(selectedDate);
  }, []);

  useEffect(() => {
    getDataSearch();
  }, [dateSearch, citySearch, cinemaSearch]);

  return (
    <div
      className="bg-[#101525] w-full h-full "
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div>
        <div className="flex justify-center max-sm:h-[450px] ">
          <div
            className={`relative flex justify-center items-center w-full h-[600px] ${
              movie ? "bg-no-repeat bg-center bg-cover max-sm:hidden" : ""
            }`}
            style={{
              backgroundImage: movie
                ? `linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(33, 38, 63, 1) 100%), url(${movie.image})`
                : "none",
            }}
            alt="bg at back"
          >
            {/* Your content here */}
          </div>

          {movie && (
            <section className=" border-[1px] border-green gap-[2%] absolute md:top-20 md:right-50 backdrop-blur-md max-sm:backdrop-blur-none movie-detail xl:w-[68%] h-[400px] max-sm:h-[50%]  max-xs:pt-[100px] max-xs:h-[178px] max-xl:w-[70%] w-full mt-10 flex justify-between max-md:justify-evenly text-white max-sm:items-center max-sm:m-0 ">
              <div className="border-[1px] border-y-blue-200 w-[274px] md:h-[400px] max-[375px]:w-[121px] max-[375px]:h-[178px] ">
                <img
                  className="w-full h-full object-cover max-sm:h-[70%] max-sm:w-[100%]"
                  src={movie.image}
                  alt="bg in detail"
                />
              </div>
              <div className="border-[1px] border-red w-[75%] max-md:w-[75%] max-xl:flex max-xl:justify-center">
                <div className="flex flex-col w-[85%] h-[100%] max-md:h-[100%] xl:mb-20 justify-evenly max-xl:justify-center gap-8 max-sm:justify-center">
                  <div className="flex flex-col w-[100%] gap-4">
                    <h1 className="leading-[44px] font-bold text-[36px] max-sm:text-[24px] max-sm:leading-[30px]">
                      {movie.title}
                    </h1>
                    <p className="flex flex-wrap justify-start items-center gap-[10px] text-[14px] max-sm:text-[14px] max-sm:leading-[20px]">
                      {movie.genres.map((item) => (
                        <span
                          className="bg-[#21263F] text-[#8B93B0] rounded-[4px] px-3 py-1.5"
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                      <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px] px-3 py-1.5">
                        {movie.language}
                      </span>
                      <img
                        className="h-[35px] max-xl:hidden"
                        src="/pipe.png"
                        alt=""
                      />
                      <span className="text-[#C8CEDD] leading-[24px] text-[16px] w-full lg:w-auto mt-2">
                        Release date: {movie.theatrical_release}
                      </span>
                    </p>
                  </div>
                  <div>
                    <button
                      className="my-[10px] xs:px-[40px] py-3 bg-[#4E7BEE] text-[16px] leading-[24px] rounded-md"
                      onClick={() => {
                        navigate(`/movie/${movie.title}`);
                      }}
                    >
                      Movie detail
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
      {/* above this line is background and movie details */}
      <div className="text-[18px]">
        <div className="bg-[#070C1B] px-[16%] py-6 z-100">
          <Slider {...settings}>
            {getDates().map((date, index) => (
              <div key={index} className="px-1">
                <button
                  onClick={() => handleDayClick(date)}
                  className={`w-full text-center p-2 ${
                    isSelected(date) ? "bg-gray-100" : ""
                  } hover:bg-[#2d3046] transition-colors duration-200 rounded-md`}
                >
                  {isToday(date) ? (
                    <div className="text-[#b4b4b4] text-sm mb-1">Today</div>
                  ) : (
                    <div
                      className={`text-sm mb-1 ${
                        isSelected(date) ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {formatDay(date)}
                    </div>
                  )}
                  <div
                    className={`text-lg font-semibold ${
                      isSelected(date) ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {formatDateForCarousel(date)}
                  </div>
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* above is the slider part */}
      <section className="bg-BG xs:pt-[24px] md:pt-[40px] xl:pt-[20px] md:pb-[80px] flex flex-col items-center">
        <div className="container mx-auto pt-[2%]">
          <div className="flex justify-between pb-[3%] gap-5">
            <div className="flex items-center w-[100%] ">
              <div className="relative w-[100%]">
                <input
                  type="text"
                  value={cinemaSearch}
                  onChange={(event) => {
                    setCitySearch("");
                    setCinemaSearch(event.target.value);
                  }}
                  className="w-full h-12 rounded-md bg-[#21263F] border-[#565F7E] text-[#8B93B0] border px-3 pr-12 outline-none"
                  placeholder="Search cinema"
                />
                <span
                  onClick={() => {
                    getDataSearch();
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#8B93B0] hover:text-[#4E7BEE]"
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
            </div>

            <select
              value={citySearch}
              onChange={(event) => {
                setCitySearch(event.target.value);
              }}
              className="col-span-1 xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="city"
            >
              <option value="">Select city</option>
              <option value="Bangkok">Bangkok</option>
              <option value="Pathumthani">Pathumthani</option>
              <option value="Nonthaburi">Nonthaburi</option>
            </select>
          </div>
          <div className="container mx-auto">
            {searchResult.map((item, index) => {
              if (!item.cinemas) {
                return null;
              }

              return (
                <div
                  key={index}
                  className="p-4 bg-gray-0 mb-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold">{item.movieTitle}</h3>
                  {item.cinemas.map((cinema, cinemaIndex) => {
                    if (
                      !cinema.movie_details.cinema_tags ||
                      !cinema.movie_details.schedule
                    ) {
                      return null;
                    }

                    return (
                      <div key={cinemaIndex} className=" pb-5">
                        {" "}
                        <div className=" px-[16px] py-[24px] flex justify-between items-center gap-[20px]">
                          <div className="xs:grid xs:grid-cols-6 gap-2 xl:flex xl:items-center xl:gap-[20px]">
                            <i className="fa-solid fa-location-dot w-[44px] h-[44px] text-[#4E7BEE] rounded-[50%] bg-[#474e6e] flex justify-center items-center col-span-1"></i>
                            <div className="text-[24px] text-[white] font-[700] leading-[30px] xs:col-span-5">
                              {cinema.cinema_name}
                            </div>
                            {cinema.movie_details.cinema_tags.map(
                              (tags, index_tags) => {
                                return (
                                  <div
                                    key={index_tags}
                                    className="rounded-[4px] bg-gray-200 text-[14px] leading-[20px] py-[6px] px-[12px] xs:col-span-3"
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
                              toggleMenu(cinemaIndex);
                            }}
                          ></i>
                        </div>
                        <div>
                          {isOpen[cinemaIndex] && (
                            <div className=" xs:flex xs:flex-col md:flex md:flex-row">
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
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookTicketPage;
