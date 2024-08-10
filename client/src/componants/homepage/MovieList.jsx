import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [activeButton, setActiveButton] = useState("nowShowing");

  const handleNowShowingClick = () => {
    setActiveButton("nowShowing");
    releasedData();
  };

  const handleComingSoonClick = () => {
    setActiveButton("comingSoon");
    comingSoonData();
  };
  const releasedData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/movies/release`
      );
      setMovies(response.data.data);
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };
  const comingSoonData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/movies/comingSoon`
      );
      setMovies(response.data.data);
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    releasedData();
  }, []);

  const navigate = useNavigate();

  return (
    <section className="xs:px-[10px] px-[120px] pt-[144px] bg-BG flex justify-center ">
      <div className="flex flex-col gap-[16px]">
        <div className="w-[294px] h-[38px] flex flex-row justify-between items-center pb-4">
          <button
            onClick={handleNowShowingClick}
            className={`w-[136px] h-[30px] text-[24px] font-[700] leading-[30px] p-[4px] ${
              activeButton === "nowShowing"
                ? "text-white underline md:underline-offset-8 max-[375px]:underline-offset-8"
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            Now showing
          </button>
          <button
            onClick={handleComingSoonClick}
            className={`w-[136px] h-[30px] text-[24px] font-[700] leading-[30px] p-[4px] ${
              activeButton === "comingSoon"
                ? "text-white underline md:underline-offset-8 max-[375px]:underline-offset-8"
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            Coming soon
          </button>
        </div>
        <div className="grid grid-cols-2 gap-[20px] xl:grid-cols-4">
          {movies && movies.length > 0 ? (
            movies.map((data) => {
              const releaseDate = new Date(data.theatrical_release);
              const formattedDate = releaseDate.toISOString().split("T")[0];
              return (
                <div
                  className="flex flex-col gap-[16px] w-[161px] xs:w-[100%]"
                  key={data.id}
                >
                  <img
                    className="lg:w-[285px] lg:h-[416px] md:w-[100%] md:h-[359px] w-[161px] h-[235px] hover:border-[#81afe7]  hover:border hover:shadow-[0px_0px_60px_-25px_#81afe7] rounded"
                    src={data.image}
                    alt=""
                    onClick={() => {
                      navigate(`/movie/${data.title}`);
                    }}
                  />
                  <div className=" flex flex-col lg:w-[285px] md:w-[100%] w-[161px]">
                    <div className="flex flex-row justify-between text-[14px]">
                      <div className="text-[#8B93B0]">{formattedDate}</div>
                      <div className="text-[#8B93B0]">
                        <i className="fas fa-star text-[#4E7BEE]"></i>
                        {data.average_rating}
                      </div>
                    </div>
                    <div
                      className="text-[white] text-[20px] cursor-pointer hover:underline"
                      onClick={() => {
                        navigate(`/movie/${data.title}`);
                      }}
                    >
                      {data.title}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-[10px] gap-[10px]">
                    <div className="grid gap-[8px] flex-wrap  w-fit grid-cols-3 md:flex md:flex-row">
                      {data.genres.map((genre) => {
                        return (
                          <div
                            className="h-[32px] w-fit rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[6px] py-[6px] max-[375px]:text-[14px]"
                            key={genre}
                          >
                            {genre}
                          </div>
                        );
                      })}
                    </div>
                    <div className="h-[32px] w-fit rounded-[4px] text-[#C8CEDD] bg-[#0d0f1a] px-[12px] py-[6px] text-[14px]">
                      {data.language}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="sweet-loading flex justify-center m-10 items-center col-span-full">
              <ClockLoader color="#4f7cee" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MovieList;
