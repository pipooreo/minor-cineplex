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
      const searchData = await axios.get(`http://localhost:4000/search`, {
        params: {
          movieName: params.title,
          moviesGenres: params.moviesGenres,
          moviesLanguage: params.moviesLanguage,
          moviesCity: params.moviesCity,
          dayName: day.day_name,
        },
      });

      const moviesData = searchData.data.data;

      // Log moviesData to verify its structure
      console.log("moviesData", moviesData);

      // Create a map to group cinemas by movie details
      const movieMap = new Map();

      moviesData.forEach((cityEntry) => {
        cityEntry.cinemas.forEach((cinema) => {
          const movieKey = cinema.movie_details.title;
          if (!movieMap.has(movieKey)) {
            movieMap.set(movieKey, {
              movieDetails: cinema.movie_details,
              cinemas: [],
            });
          }
          movieMap.get(movieKey).cinemas.push(cinema);
        });
      });

      // Convert the map to an array for rendering
      const groupedMovies = Array.from(movieMap.values());

      // Set movies state with the grouped movie data
      setMovies(groupedMovies);

      setSelectedDay(day);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDayClick = (day) => {
    fetchMovieDetails(day);
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
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <div key={index} className="movie-card mb-6">
                    <h3 className="movie-title text-xl mb-2">
                      {movie.movieDetails.title}
                    </h3>
                    <div className="movie-details flex">
                      <div className="movie-details-left flex-1 mr-4">
                        <img
                          src={movie.movieDetails.image}
                          alt={movie.movieDetails.title}
                          className="mb-2"
                        />
                        <p>Title: {movie.movieDetails.title}</p>
                        <p>
                          Genres: {movie.movieDetails.movie_genres.join(", ")}
                        </p>
                        <p>Language: {movie.movieDetails.language}</p>
                      </div>
                      <div className="movie-details-right flex-1">
                        {movie.cinemas.map((cinema, cinemaIndex) => (
                          <div key={cinemaIndex} className="cinema-card mb-4">
                            <h4 className="cinema-name text-lg mb-2">
                              {cinema.cinema_name}
                            </h4>
                            <p>
                              Hall Number: {cinema.movie_details.hall_number}
                            </p>
                            {/* Log cinema.movie_details to the console */}
                            {console.log(cinema.movie_details)}
                            <p>Start Time: {cinema.movie_details.start_time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
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
