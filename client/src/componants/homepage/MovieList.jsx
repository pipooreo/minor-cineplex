import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MovieList() {
  const [Movie, setMovie] = useState([]);

  const getDataMovie = async () => {
    try {
      const response = await axios.get("http://localhost:4000/movies");
      setMovie(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    getDataMovie();
  }, []);

  const navigate = useNavigate();

  return (
    <section className="px-[120px] pt-[144px] pb-[80px] bg-[#21263F] flex justify-center max-[375px]:px-[16px] max-[375px]:pb-[40px]">
      <div className="flex flex-col gap-[16px]">
        <div className="w-[294px] h-[38px] flex flex-row justify-between items-center">
          <button className="w-[136px] h-[30px] text-[#8B93B0] text-[24px] font-[700] underline md:underline-offset-8 leading-[30px] p-[4px] max-[375px]:underline-offset-8">
            Now showing
          </button>
          <button className="w-[136px] h-[30px] text-[#8B93B0] text-[24px] font-[700] leading-[30px] p-[4px]">
            Coming soon
          </button>
        </div>
        <div className="flex flex-wrap gap-[14px] min-[1920px]:flex min-[1441px]:justify-between ">
          {Movie &&
            Movie.map((data) => {
              return (
                <div className="flex flex-col gap-[16px] max-[375px]:w-[161px]">
                  <img
                    className="w-[285px] h-[416px] max-[375px]:w-[161px] max-[375px]:h-[235px]"
                    src={data.image}
                    alt=""
                    onClick={() => {
                      navigate(`/movie/${data.title}`);
                    }}
                  />
                  <div className="w-[285px] flex flex-col max-[375px]:w-[161px]">
                    <div className="flex flex-row justify-between text-[14px]">
                      <div className="text-[#8B93B0]">
                        {data.theatrical_release}
                      </div>
                      <div className="text-[#8B93B0]">{data.rating}</div>
                    </div>
                    <div className="text-[white] text-[20px]">{data.title}</div>
                  </div>
                  <div className="flex flex-row gap-[8px] max-[375px]:flex max-[375px]:flex-wrap">
                    {data.genres.map((genre) => {
                      return (
                        <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px] max-[375px]:text-[14px]">
                          {genre}
                        </div>
                      );
                    })}

                    <div className="h-[32px] rounded-[4px] text-[#C8CEDD] bg-[#0d0f1a] px-[12px] py-[6px] max-[375px]:text-[14px]">
                      {data.language}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default MovieList;
