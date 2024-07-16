import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Meow from "./test";
function BookTicketPage() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const params = useParams();

  async function getTitleMovie() {
    // console.log(params);
    let movieData = await axios.get(
      `http://localhost:4000/movies/movie?movieSearch=${params.title}`
    );
    setMovie(movieData.data.data[0]);
  }

  useEffect(() => {
    getTitleMovie();
  }, []);

  return (
    <div
      className="bg-[#101525] relative"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="absolute  w-full h-[500px] hidden sm:block">
        <div
          className=" bg-top bg-no-repeat w-full h-full bg-[length:100%_1000px]"
          style={{
            backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(33, 38, 63, 1) 100%), url('${
              movie && movie.image
            }')`,
          }}
        ></div>
      </div>
      <div>
        <section className="movie-detail">
          <div className="relative flex justify-center items-center xl:pt-[180px]">
            <div className="w-[100%] xl:w-[80%] h-[100%] xl:h-[400px] absolute xl:rounded-xl backdrop-blur-md bg-[#070C1BB2]/70 "></div>
            {movie && (
              <div className="flex flex-col xl:flex-row gap-10 z-10 xl:rounded-xl justify-start items-center xl:w-[80%] w-100% text-white">
                <img
                  className="w-[100%] md:w-[274px] md:h-[400px] xl:rounded-xl "
                  src={movie.image}
                  alt=""
                />
                <div>
                  <div className="flex flex-col gap-[20px] xl:gap-[50px] md:px-[25%] xl:px-[20px] px-[15px] pb-[50px] ">
                    <div>
                      <h1 className="text-[36px] leading-[44px] font-bold ">
                        {movie.title}
                      </h1>
                      <div className="flex flex-col xl:flex-row justify-start xl:items-center">
                        <div className=" py-[10px] pr-[10px] w-fit">
                          <p className="flex justify-start items-center gap-[10px]">
                            {movie.genres.map((item, index) => {
                              return (
                                <span
                                  className="bg-[#21263F] text-[#8B93B0] rounded-[4px]  px-[6px] py-[12px] "
                                  key={index}
                                >
                                  {item}
                                </span>
                              );
                            })}
                            <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px]  px-[6px] py-[12px] ">
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
        </section>

        {/* ------------- MAP HELL --------------- */}
        <Meow />
      </div>
    </div>
  );
}

export default BookTicketPage;
