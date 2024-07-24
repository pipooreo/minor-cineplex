<div className="  w-full h-[600px] hidden sm:block md:flex-row">
        
{movie && (
                  <div className="flex flex-col xl:flex-row gap-10 xl:rounded-xl justify-start items-center md:flex-row md:gap-[24px] xl:w-[80%] w-100% text-white ">
                    <img
                      className="w-[100%] md:w-[274px] md:h-[400px] sm:w-[121px] sm:h-[176] xl:rounded-xl "
                      src={movie.image}
                      alt=""
                    />
                    <div className="md:w-[225px] md:h-[178px]">
                      <div className="flex flex-col gap-[20px] xl:gap-[50px] md:px-[25%] xl:px-[20px] px-[15px] pb-[50px] ">
                        <div>
                          <h1 className="text-[36px] leading-[44px] font-bold ">
                            {movie.title}
                          </h1>
                          <div className="flex flex-col xl:flex-row justify-start xl:items-center">
                            <div className=" py-[10px] pr-[10px] w-fit">
                              <p className="flex justify-start items-center gap-[10px]">
                                {movie.genres.map((item) => (
                                  <span
                                    className="bg-[#21263F] text-[#8B93B0] rounded-[4px] px-[6px] py-[12px]"
                                    key={item}
                                  >
                                    {item}
                                  </span>
                                ))}
                                <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px] px-[6px] py-[12px] ">
                                  {movie.language}
                                </span>
                                <img
                                  className="h-[35px]"
                                  src="\public\pipe.png"
                                  alt=""
                                />
                              </p>
                            </div>
                            <p>
                              <span className="text-[#C8CEDD] text-[16px] leading-[24px] px-[10px]">
                                Release date: {movie.theatrical_release}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <button
                            className="my-[10px] xs:my-[20px] xs:px-[40px] py-[12px] bg-[#4E7BEE] rounded-md w-[159px] h-[48px]"
                            onClick={() => {
                              navigate(`/movie/${movie.title}`);
                            }}
                          >
                            Movie detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
      </div>


{movie && (
  <div className="text-white ">
    <img
      className="w-[274px] h-[400px]"
      src={movie.image}
      alt="bg in detail"
    />
    <div className="">
      <div className="flex  ">
        <div>
          <h1 className=" leading-[44px] font-bold ">
            {movie.title}
          </h1>
          <div className="">
            <div className=" w-fit">
              <p className="flex justify-start items-center gap-[10px]">
                {movie.genres.map((item) => (
                  <span
                    className="bg-[#21263F] text-[#8B93B0] rounded-[4px]"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
                <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px] ">
                  {movie.language}
                </span>
                <img
                  className="h-[35px]"
                  src="\public\pipe.png"
                  alt=""
                />
              </p>
            </div>
            <p>
              <span className="text-[#C8CEDD] leading-[24px] ">
                Release date: {movie.theatrical_release}
              </span>
            </p>
          </div>
        </div>

        <div>
          <button
            className="my-[10px] xs:my-[20px] xs:px-[40px] py-[12px] bg-[#4E7BEE] rounded-md"
            onClick={() => {
              navigate(`/movie/${movie.title}`);
            }}
          >
            Movie detail
          </button>
        </div>
      </div>
    </div>
  </div>
)}






<div>
        <div className="border-[1px] border-[#ff2d2d]">
          <div className="w-[100%] border-[1px] border-[#ee6cf0dd] text-white">
            <Slider
              {...settings}
              className="bg-gray-0 w-[100%] border-[1px] border-[#ff2d2d]"
            >
              {days.map((day, index_days) => {
                return (
                  <div
                    key={index_days}
                    className="p-4"
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="p-6 rounded-lg shadow-lg cursor-pointer bg-gray-800">
                      <p className="text-white">{day.date}</p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="container mx-auto border-[1px] border-[#42899f] pt-[5%]">
            <div className="flex justify-between pb-[3%]">
              <div className="flex items-center w-full">
                <div className="relative w-[85%]">
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
                    🔍
                  </span>
                </div>
              </div>

              <select
                value={citySearch} 
                onChange={(event) => {
                  setCitySearch(event.target.value);
                  setCinemaSearch("");
                  getDataSearch();
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
                        <div
                          key={cinemaIndex}
                          className="border-[1px] border-[#cbe14d] pb-5"
                        >
                          {" "}
                          <div className="border-[1px] border-[#ff2d2d] px-[16px] py-[24px] flex justify-between items-center gap-[20px]">
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
                              className="fa-solid fa-angle-down"
                              onClick={() => {
                                toggleMenu(cinemaIndex);
                              }}
                            ></i>
                          </div>
                          <div>
                            {isOpen[cinemaIndex] && (
                              <div className="border-[1px] border-[#ff2f2f] xs:flex xs:flex-col md:flex md:flex-row">
                                <div className="w-[100%] border-[1px] border-[#af36ff] p-[40px] flex flex-col xs:gap-[40px] md:gap-[60px]">
                                  {Object.keys(
                                    cinema.movie_details.schedule
                                  ).map(function (key, index_time) {
                                    return (
                                      <div
                                        key={index_time}
                                        className="border-[1px] border-[#34e7ff] flex flex-col gap-[16px] text-gray-400"
                                      >
                                        <div className="text-[24px] font-[700]  ">
                                          {key}
                                        </div>
                                        <div className="flex flex-wrap gap-[24px] text-[white]">
                                          {cinema.movie_details.schedule[
                                            key
                                          ].map((times, index_map) => {
                                            return (
                                              <div
                                                key={`${key}-${times}-${index_map}`} // Ensure unique key using a combination of values
                                                onClick={() => {}}
                                                className="border-[1px] rounded-[4px] px-[24px] py-[12px]"
                                              >
                                                {times}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
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
        </div>
      </div>



//new

try {
  const noResults = [];
  const {
    movieName,
    moviesGenres,
    moviesLanguage,
    moviesCity,
    releasedDate,
    tags = [] // Expecting an array of tags
  } = req.query;

  let params = [];
  let query = `
    WITH subquery AS (
      SELECT
        halls.hall_number,
        jsonb_agg(DISTINCT screentime.time ORDER BY screentime.time) AS start_times
      FROM
        halls
      INNER JOIN
        halls_screentimes ON halls.id = halls_screentimes.hall_id
      INNER JOIN
        screentime ON halls_screentimes.screen_time_id = screentime.id
      GROUP BY
        halls.hall_number
    )
    SELECT
      cinemas.name AS cinema_name,
      ARRAY_AGG(DISTINCT tag_name) AS cinema_tags,
      movies.title AS movie_name,
      city.city_name AS city_name,
      array_agg(DISTINCT genres.genres_name) AS movie_genres,
      movies.language AS movie_language,
      movies.image AS movie_Image,
      movies.theatrical_release,
      movies.out_of_theaters,
      jsonb_object_agg(subquery.hall_number, subquery.start_times) AS schedule
    FROM
      movies
    INNER JOIN
      movies_cinemas ON movies.id = movies_cinemas.movies_id
    INNER JOIN
      cinemas ON movies_cinemas.cinemas_id = cinemas.id
    LEFT JOIN 
      cinemas_tags ON cinemas.id = cinemas_tags.cinema_id
    LEFT JOIN
      tags ON cinemas_tags.tag_id = tags.id
    INNER JOIN
      movies_cinemas_halls ON movies.id = movies_cinemas_halls.movie_id AND cinemas.id = movies_cinemas_halls.cinema_id
    INNER JOIN
      halls ON movies_cinemas_halls.hall_id = halls.id
    INNER JOIN
      subquery ON halls.hall_number = subquery.hall_number
    INNER JOIN
      movies_genres ON movies.id = movies_genres.movie_id
    INNER JOIN
      city_cinemas ON cinemas.id = city_cinemas.cinema_id
    INNER JOIN
      city ON city_cinemas.city_id = city.id
    INNER JOIN
      genres ON movies_genres.genre_id = genres.id
    WHERE 1=1
  `;

  if (movieName) {
    query += ` AND LOWER(movies.title) LIKE LOWER($${params.length + 1})`;
    params.push(`%${movieName}%`);
  }
  if (moviesGenres) {
    query += ` AND movies.id IN (
                SELECT movies_genres.movie_id
                FROM movies_genres
                INNER JOIN genres ON movies_genres.genre_id = genres.id
                WHERE genres.genres_name ILIKE $${params.length + 1}
              )`;
    params.push(`%${moviesGenres}%`);
  }
  if (moviesLanguage) {
    query += ` AND movies.language = $${params.length + 1}`;
    params.push(moviesLanguage);
  }
  if (moviesCity) {
    query += ` AND LOWER(city.city_name) LIKE LOWER($${params.length + 1})`;
    params.push(`%${moviesCity}%`);
  }
  if (releasedDate) {
    query += ` AND TO_DATE(${
      params.length + 1
    }, 'YYYY-MM-DD') BETWEEN TO_DATE(movies.theatrical_release, 'YYYY-MM-DD') AND TO_DATE(movies.out_of_theaters, 'YYYY-MM-DD')`;
    params.push(releasedDate);
  }

  // Dynamically add tag conditions
  if (tags.length > 0) {
    query += ` AND (
      SELECT COUNT(DISTINCT tag_name)
      FROM cinemas_tags
      INNER JOIN tags ON cinemas_tags.tag_id = tags.id
      WHERE tags.tag_name ILIKE ANY($${params.length + 1})
      AND cinemas_tags.cinema_id = cinemas.id
    ) = ${tags.length}`;
    params.push(tags);
  }

  query += `
    GROUP BY 
      cinemas.name,
      movies.title,
      city.city_name,
      movies.language,
      movies.image,
      movies.theatrical_release,
      movies.out_of_theaters
    ORDER BY 
      cinemas.name;
  `;

  const { rows } = await connectionPool.query(query, params);

  if (rows.length === 0) {
    return res.status(200).json({
      data: noResults,
    });
  }

  let moviesData = {};
  rows.forEach((row) => {
    const {
      city_name,
      cinema_name,
      cinema_tags,
      movie_genres,
      ...movieDetails
    } = row;

    const cinemaInfo = {
      cinema_name,
      movie_details: {
        ...movieDetails,
        cinema_tags: Array.isArray(cinema_tags)
          ? cinema_tags.map((tag) => tag.trim())
          : [],
        movie_genres: Array.isArray(movie_genres)
          ? movie_genres.map((genre) => genre.trim())
          : [],
      },
    };

    if (!moviesData[city_name]) {
      moviesData[city_name] = [];
    }
    moviesData[city_name].push(cinemaInfo);
  });

  const formattedResult = Object.keys(moviesData).map((city) => ({
    city_name: city,
    cinemas: moviesData[city],
  }));

  return res.status(200).json({
    data: formattedResult,
  });
} catch (error) {
  console.error("Error fetching movies:", error);
  return res.status(500).json({
    message: "Server could not retrieve movies due to an internal error",
  });
}
