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