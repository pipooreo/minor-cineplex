import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClockLoader from "react-spinners/ClockLoader";

function BookTicketPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const [movie, setMovie] = useState(null);

  const [citySearch, setCitySearch] = useState("");
  const [cinemaSearch, setCinemaSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const params = useParams();

  const [isOpen, setIsOpen] = useState(() => {
    // Initialize all accordions as open by default
    return search.reduce((acc, searchItem, index_search) => {
      searchItem.cinemas.forEach((cinema, index_cinema) => {
        acc.push(true);
      });
      return acc;
    }, []);
  });

  const toggleMenu = (index) => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...prevIsOpen];
      newIsOpen[index] = !newIsOpen[index];
      return newIsOpen;
    });
  };

  const getDataSearch = async () => {
    try {
      // console.log("Data search has been performed", params.title);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/ticket?movieName=${
          params.title
        }&moviesCity=${citySearch}&releasedDate=${dateSearch}&cinemaName=${cinemaSearch}`
      );
      setSearch(response.data.data);

      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching search data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDayClick = (day) => {
    const formattedDate = formatDate(day);
    setDateSearch(formattedDate);
    setSelectedDate(day);
    return formattedDate;
  };

  const isSelected = (date) => {
    const result =
      selectedDate && date.toDateString() === selectedDate.toDateString();
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
        `${import.meta.env.VITE_SERVER_URL}/movies/movie?movieSearch=${
          params.title
        }`
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-BG">
        <ClockLoader color="#4f7cee" />
      </div>
    );
  }

  return (
    <div
      className="bg-[#101525] w-full h-full "
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="flex bg-[#070C1B] justify-center h-[258px] xs:h-[280px] md:h-[600px]">
        <div
          className={`relative flex justify-center items-center w-full  ${
            movie ? "bg-no-repeat bg-center bg-cover max-sm:hidden" : ""
          }`}
          style={{
            backgroundImage: movie
              ? `linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url(${movie.image})`
              : "none",
          }}
          alt="bg at back"
        ></div>

        {movie && (
          <section className="absolute  top-10 md:top-20 md:w-[80%] backdrop-blur-md bg-[#070C1B]/70 max-sm:backdrop-blur-none movie-detail my-8 md:m-10 text-white">
            <div className="flex justify-center items-center gap-2 pl-5 md:p-0">
              <img
                className="md:w-[274px] md:h-[400px]  w-[121px] h-[176px] rounded-lg"
                src={movie.image}
                alt="bg in detail"
              />
              <div className=" xl:mb-20 md:p-[20px] w-[100%] flex flex-col justify-center md:gap-20">
                <div className="flex flex-col  gap-2 md:gap-4">
                  <h1 className="text-head3 md:text-head2">{movie.title}</h1>
                  <p className="flex flex-wrap justify-start items-center gap-[10px] text-body2R">
                    {movie.genres.map((item) => (
                      <span
                        className="bg-[#21263F] text-gray-300 rounded-[4px] px-3 py-1.5"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                    <span className="bg-[#21263F] text-gray-400 rounded-[4px] px-3 py-1.5">
                      {movie.language}
                    </span>
                    <img className="h-[35px]" src="/pipe.png" alt="" />
                    <span className="text-[#C8CEDD] leading-[24px] flex  w-full lg:w-auto">
                      Release date: {movie.theatrical_release}
                    </span>
                  </p>
                </div>
                <div>
                  <button
                    className=" md:my-[20px] text-white text-body1M bg-blue-100 hover:bg-blue-200 active:bg-blue-300 rounded-md w-[153px] h-[48px]"
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

      {/* above this line is background and movie details */}
      <div className="bg-[#070C1B] px-[10%] py-[1%]  lg:py-[1%] text-[18px] max-xs:pb-5">
        <div className="  mt-10 sm:mt-0 z-100">
          <Slider {...settings}>
            {getDates().map((date, index) => (
              <div key={index} className="">
                <button
                  onClick={() => handleDayClick(date)}
                  className={`sm:w-[100%] md:w-[80%] text-center p-2 ${
                    isSelected(date) ? "bg-gray-100" : ""
                  } hover:bg-[#2d3046] transition-colors duration-200 rounded-md`}
                >
                  {isToday(date) ? (
                    <div
                      className={`text-[24px] mb-1  leading-[30px] ${
                        isSelected(date) ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Today
                    </div>
                  ) : (
                    <div
                      className={` mb-1 leading-[30px] text-[24px] ${
                        isSelected(date) ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {formatDay(date)}
                    </div>
                  )}
                  <div
                    className={`xs:text-[16px] flex flex-col items-center font-semibold ${
                      isSelected(date) ? "text-gray-400" : "text-gray-200"
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

      <section className="bg-BG xs:py-[24px] md:pt-[40px] md:pb-[80px] flex flex-col items-center">
        <div className="xs:w-[100%] md:w-[80%] flex flex-col gap-[24px]">
          <div className="flex flex-col md:flex-row p-2 md:justify-between pb-[3%] gap-5">
            <div className="flex items-center w-[100%] ">
              <div className="relative w-[100%]">
                <input
                  type="text"
                  value={cinemaSearch}
                  onChange={(event) => {
                    setCitySearch("");
                    setCinemaSearch(event.target.value);
                    // console.log("cinema search", event.target.value);
                  }}
                  className="w-full h-12 rounded-md text-body2R bg-[#21263F] border-[#565F7E] text-gray-300 border px-3 pr-12 outline-none"
                  placeholder="Search cinema"
                />
                <div
                  // onClick={() => {
                  //   getDataSearch();
                  // }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-body2R text-[#8B93B0]  hover:text-[#4E7BEE]"
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>

            <select
              value={citySearch}
              onChange={(event) => {
                setCitySearch(event.target.value);
              }}
              className="col-span-1 xl:w-[20%] h-[48px] rounded-[4px] text-body2R bg-[#21263F] border-[#565F7E] text-gray-300  border-[1px] p-[12px] outline-none"
              name="city"
            >
              <option value="">Select city</option>
              <option value="Bangkok">Bangkok</option>
              <option value="Pathumthani">Pathumthani</option>
              <option value="Nonthaburi">Nonthaburi</option>
            </select>
          </div>
          {(() => {
            let cinemaCount = 0;
            return search.map((searchItem, index_search) => (
              <div key={index_search} className="flex flex-col gap-[24px]">
                {searchItem.cinemas.map((cinema, index_cinema) => {
                  const currentCinemaIndex = cinemaCount++;
                  return (
                    <div key={index_cinema} className="w-[100%]">
                      <button
                        onClick={() => toggleMenu(currentCinemaIndex)}
                        className="bg-gray-0 px-[16px] py-[24px] rounded-[5px] w-[100%] flex justify-between items-center gap-[20px]"
                      >
                        <div className="flex gap-[20px] items-start md:items-start flex-col lg:flex-row lg:items-center">
                          <div className="flex gap-[20px] items-center">
                            <i className="fa-solid fa-location-dot w-[44px] h-[44px] text-[#4E7BEE] rounded-[50%] bg-[#474e6e] flex justify-center items-center col-span-1"></i>
                            <div className="text-[24px] text-[white] font-[700] leading-[30px] text-left ">
                              {cinema.cinema_name}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            {cinema.movie_details.cinema_tags.map(
                              (tag, index_tag) => (
                                <div
                                  key={index_tag}
                                  className="rounded-[4px] text-gray-300 bg-gray-100 text-[14px] leading-[20px] py-[6px] px-[12px]"
                                >
                                  {tag}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <i
                          className={`fa-solid ${
                            isOpen[currentCinemaIndex]
                              ? "fa-angle-up"
                              : "fa-angle-down"
                          } text-gray-400`}
                        ></i>
                      </button>

                      {!isOpen[currentCinemaIndex] && (
                        <div className="bg-gray-0 border-t-[1px] xs:flex xs:flex-col md:flex md:flex-row">
                          {/* <div className="xs:flex xs:flex-row md:flex md:flex-col p-[24px] gap-[24px] w-full md:w-[270px] ">
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

                              <button
                                onClick={() => {
                                  navigate(
                                    `/movie/${cinema.movie_details.movie_name}#`
                                  );
                                }}
                                className="text-white text-[16px] font-[700] w-[80px] underline mt-[20px] flex "
                              >
                                Movie Detail
                              </button>
                            </div>
                          </div> */}

                          <div className="xs:w-[100%] w-[343px] p-[10px] md:p-[40px] flex flex-col xs:gap-[40px] gap-[60px]">
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
      </section>
    </div>
  );
}

export default BookTicketPage;
