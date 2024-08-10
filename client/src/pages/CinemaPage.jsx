import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClockLoader from "react-spinners/ClockLoader";

function CinemaPage() {
  const navigate = useNavigate();
  const [cinema, setCinema] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [cinemaSearch, setCinemaSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const getDataSearch = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/ticket?cinemaId=${params.title}`
      );
      setSearchResult(response.data.data);
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

  async function getTitleCinema() {
    try {
      // console.log("params", params.title);
      const cinemaData = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/ticket?cinemaId=${params.title}`
      );
      const cinemaInfo = cinemaData.data.data[0]?.cinemas[0];
      // console.log("cinemaAll:", cinemaData.data.data[0]?.cinemas[0]);
      // console.log("cinemaInfo:", cinemaInfo);

      if (cinemaInfo) {
        setCinema(cinemaInfo);
        // console.log("cinema that will be put in state:", cinemaInfo);
        // console.log("cinema.image:", cinemaInfo.cinema_image);
      }
    } catch (error) {
      console.error("Error fetching Cinema:", error);
    }
  }

  useEffect(() => {
    getTitleCinema();
    handleDayClick(selectedDate);
  }, [params.title, selectedDate]);

  useEffect(() => {
    getDataSearch();
  }, [dateSearch, cinemaSearch]);

  // useEffect(() => {
  //   console.log("Updated cinema state:", cinema);
  // }, [cinema]);

  if (loading) {
    return (
      <div className="sweet-loading flex justify-center h-screen bg-BG items-center ">
        <ClockLoader color="#4f7cee" />
      </div>
    );
  }

  return (
    <div
      className="bg-[#101525] w-full h-full "
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className=" flex justify-center h-[420px] sm:h-400px]  md:h-[600px] bg-[#070C1B]/70 ">
        <div
          className={`relative flex justify-center items-center w-full  ${
            cinema ? "bg-no-repeat bg-center bg-cover max-sm:hidden" : ""
          }`}
          style={{
            backgroundImage: cinema
              ? `linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url(${cinema.cinema_image})`
              : "none",
          }}
          alt="bg at back"
        ></div>

        {cinema ? (
          <section className="absolute  top-10 md:top-20 md:w-[80%] h-[400px] backdrop-blur-md rounded-lg bg-[#070C1B]/70 max-sm:backdrop-blur-none movie-detail my-8 md:m-10 text-white">
            <div className="gap-2 pl-5 md:p-0">
              <div className="  flex flex-row ">
                <img
                  className="md:w-[274px] md:h-[400px]  w-[121px] h-[176px] rounded-lg"
                  src={cinema.cinema_image}
                  alt="bg in detail"
                />
                <div className="xl:mb-20 md:p-[20px] p-5 w-[100%] max-md:h-[200px] flex flex-col justify-center md:justify-start md:gap-20">
                  <div className="">
                    {/* <div className="flex flex-col h-[300px] justify-evenly gap-20 md:gap-4"> */}
                    <div className="flex flex-col h-[150px] justify-start">
                      <h1 className="text-head3 md:text-head2 pb-5 ">
                        {cinema.cinema_name}
                      </h1>
                      <p className="flex flex-wrap justify-start items-center gap-[10px] text-body2R">
                        {cinema.cinema_tags.map((item) => (
                          <span
                            className="bg-[#21263F] text-gray-300 rounded-[4px] px-3 py-1.5"
                            key={item}
                          >
                            {item}
                          </span>
                        ))}
                      </p>
                    </div>
                    <span className=" flex flex-wrap w-[90%] max-md:hidden  justify-start items-center gap-[10px] text-[16px] max-sm:text-[14px] max-md:leading-[24px]">
                      {cinema.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span className=" flex flex-wrap justify-start md:hidden h-[200px]  p-5 items-start gap-[10px] text-gray-400 text-[16px] max-sm:leading-[24px]">
              {cinema.description}
            </span>
          </section>
        ) : (
          <div className="sweet-loading flex justify-center h-[10vh] m-10 items-center ">
            <ClockLoader color="#4f7cee" />
          </div>
        )}
      </div>
      {/* above this line is background and movie details */}

      <div className="bg-[#070C1B] px-[10%] py-[5%] lg:py-[1%] text-[18px] max-xs:pt-[10%]">
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
      <section className="bg-BG xs:pt-[24px] md:pt-[40px] xl:pt-[20px] md:pb-[80px] flex flex-col items-center">
        <div className="container mx-auto pt-[2%]">
          <div className="container mx-auto">
            {searchResult.map((item, index) => {
              if (!item.cinemas) {
                return null;
              }

              return (
                <div key={index} className="p-4 mb-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">{item.movieTitle}</h3>
                  {item.cinemas.map((cinema, cinemaIndex) => {
                    if (
                      !cinema.movie_details.cinema_tags ||
                      !cinema.movie_details.schedule
                    ) {
                      return null;
                    }

                    return (
                      <div key={cinemaIndex} className="bg-gray-0 mb-10 ">
                        {" "}
                        <div>
                          <div className=" xs:flex xs:flex-col md:flex md:flex-row ">
                            <div className="xs:flex xs:flex-row md:flex md:flex-col p-[24px] gap-[24px]  w-full md:w-[270px]">
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
                                      `/movie/${cinema.movie_details.movie_name}`
                                    );
                                  }}
                                  className="text-white text-[16px] font-[700] underline mt-[40px] max-xs:mt-[0px] flex"
                                >
                                  Movie Detail
                                </button>
                              </div>
                            </div>
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

export default CinemaPage;
