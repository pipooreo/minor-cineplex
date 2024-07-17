import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Meow = () => {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState({
    movieName: "",
    moviesGenres: "",
    moviesLanguage: "",
    moviesCity: "",
    cinemaName: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDays(); // Fetch days on component mount
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const getDays = async () => {
    try {
      const daysData = await axios.get("http://localhost:4000/days");
      const daysList = daysData.data.data;
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay();
      const offset = (2 - currentDayOfWeek + 7) % 7;
      const daysWithDates = daysList.map((day, index) => {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + ((index + offset) % 7));
        return { ...day, date: date.toDateString() };
      });
      setDays(daysWithDates);
    } catch (error) {
      console.error("Error fetching days:", error);
    }
  };

  const fetchMovieDetails = async (day) => {
    try {
      const {
        movieName,
        moviesGenres,
        moviesLanguage,
        moviesCity,
        cinemaName,
      } = searchParams;

      const searchData = await axios.get(`http://localhost:4000/search`, {
        params: {
          movieName: movieName || undefined,
          moviesGenres: moviesGenres || undefined,
          moviesLanguage: moviesLanguage || undefined,
          moviesCity: moviesCity || undefined,
          cinemaName: cinemaName || undefined,
          dayName: day.day_name,
        },
      });

      const moviesData = searchData.data.data;
      console.log("Movies Data:", moviesData); // Log moviesData to identify if it's undefined or not

      // Map and structure the movies data
      const formattedMovies = moviesData.map((cityEntry) => {
        const cinemas = cityEntry.cinemas.map((cinema) => {
          const dayStartTimes =
            cinema.movie_details.day_start_times[day.day_name];

          return {
            cinema_name: cinema.cinema_name,
            cinema_tags: cinema.movie_details.cinema_tags.join(", "),
            day_start_times: dayStartTimes ? dayStartTimes.join(", ") : "",
          };
        });

        return {
          city_name: cityEntry.city_name,
          cinemas: cinemas,
        };
      });

      // Update state with formatted movies data
      setMovies(formattedMovies);

      setSelectedDay(day);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDayClick = (day) => {
    fetchMovieDetails(day);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  return (
    <div
      className="bg-[#101525] relative"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <section className="reviews text-white flex flex-col justify-center px-[10px] items-center p-[20px]">
        <p>For Ticket</p>
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Days Carousel</h1>
          <Slider {...settings}>
            {days.map((day, index) => (
              <div
                key={index}
                className="p-4"
                onClick={() => handleDayClick(day)}
              >
                <div className=" p-6 rounded-lg shadow-lg cursor-pointer">
                  <p>{day.date}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {selectedDay && (
          <section className="meow">
            <div>
              <h2>
                {selectedDay.day_name} {selectedDay.date}
              </h2>
              <div className="search-form">
                <input
                  type="text"
                  name="cinemaName"
                  placeholder="Search by Cinema Name"
                  value={searchParams.cinemaName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="moviesCity"
                  placeholder="Search by City"
                  value={searchParams.moviesCity}
                  onChange={handleInputChange}
                />
              </div>
              {movies.length > 0 ? (
                movies.map((cityEntry, index) => (
                  <div key={index}>
                    <h3>{cityEntry.city_name}</h3>
                    {cityEntry.cinemas.map((cinema, cinemaIndex) => (
                      <div key={cinemaIndex}>
                        <h4>{cinema.cinema_name}</h4>
                        <p>{cinema.cinema_tags}</p>
                        {cinema.day_start_times && (
                          <div>
                            {cinema.day_start_times
                              .split(", ")
                              .map((startTime, idx) => (
                                <p key={idx}>{startTime}</p>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p>No movies available for the selected day.</p>
              )}
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Meow;
