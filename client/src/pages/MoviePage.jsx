import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function MoviePage() {
  // const navigate = useNavigate();
  const [comments, setComents] = useState([]);
  const [movie, setMovie] = useState();
  const params = useParams();
  async function getTitleMovie() {
    // console.log(params);
    let movieData = await axios.get(
      `http://localhost:4000/movies/movie?movieSearch=${params.title}`
    );
    setMovie(movieData.data.data[0]);
  }
  async function getCommentMovie() {
    // console.log(params);
    let commentsData = await axios.get(
      `http://localhost:4000/comments/moviesComment?movieName=${params.title}`
    );
    // console.log(comments.data.data);
    setComents(commentsData.data.data);
  }
  // console.log(movie);
  console.log(comments);
  useEffect(() => {
    getTitleMovie();
    getCommentMovie();
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
        <section className="movie-detail flex justify-center items-center">
          <div className="relative xl:w-[100%] flex justify-center items-center xl:pt-[180px]">
            <div className="w-[100%] xl:w-[80%] h-[100%] xl:h-[600px] absolute xl:rounded-xl backdrop-blur-md bg-[#070C1BB2]/70 "></div>
            {movie && (
              <div className="flex flex-col xl:flex-row gap-10 z-10 xl:rounded-xl justify-start items-center xl:w-[80%] w-100% text-white">
                <img
                  className="w-[100%] md:w-[411px] md:h-[600px] xl:rounded-xl "
                  src={movie.image}
                  alt=""
                />
                <div className="flex flex-col xl:gap-[50px] md:px-[20px] px-[15px] pb-[50px]  xl:mt-[100px]">
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
                  <button className="my-[20px] px-[40px] py-[12px] bg-[#4E7BEE] rounded-md w-[153px] h-[48px]">
                    Book ticket
                  </button>
                  <div className="md:my-[20px] xl:w-[80%] flex flex-col gap-5 ">
                    <p className="text-[16px] leading-[24px]">
                      {movie.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="reviews text-white flex flex-col justify-center px-[10px] items-center p-[20px] ">
          <div className="flex gap-3 justify-start items-center w-[100%]  mt-0 md:w-[50%] my-[30px] mx-0 md:m-[50px]">
            <p className="bg-[#21263F] px-[16px] py-[12px]">
              <i className="fas fa-star text-[#4E7BEE] px-2"></i>
              {movie && movie.rating}
            </p>
            <h2>Rating & Reviews</h2>
          </div>
          {comments.map((comment) => {
            return (
              <div
                className=" border-b-2 border-[#21263F] m-5 w-[100%]  md:w-[50%]"
                key={comment.comment_id}
              >
                <div className="flex justify-between  md:gap-2">
                  <div className="flex gap-[10px]">
                    <img
                      className="w-[44px] h-[44px] bg-white rounded-full"
                      src=""
                      alt=""
                    />
                    <div>
                      <h3>{comment.name}</h3>
                      <p>24 Jun 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-3">
                    {Array.from({ length: comment.rating }).map((_, i) => (
                      <i className="fas fa-star text-[#4E7BEE]" key={i}></i>
                    ))}
                  </div>
                </div>
                <p className="py-[20px]">{comment.comment}</p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default MoviePage;
