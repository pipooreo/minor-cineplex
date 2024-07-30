import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function MoviePage() {
  const navigate = useNavigate();
  const [comments, setComents] = useState([]);
  const [movie, setMovie] = useState();
  const params = useParams();
  async function getTitleMovie() {
    let movieData = await axios.get(
      `http://localhost:4000/movies/movie?movieSearch=${params.title}`
    );
    setMovie(movieData.data.data[0]);
  }
  async function getCommentMovie() {
    let commentsData = await axios.get(
      `http://localhost:4000/comments/moviesComment?movieName=${params.title}`
    );
    setComents(commentsData.data.data);
  }

  useEffect(() => {
    getTitleMovie();
    getCommentMovie();
  }, []);
  return (
    <div className="bg-BG relative" style={{ fontFamily: "Roboto Condensed" }}>
      <div className="absolute  w-full h-[500px] hidden sm:block">
        <div
          className=" bg-center bg-no-repeat w-full h-full bg-cover"
          style={{
            backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url('${
              movie && movie.image
            }')`,
          }}
        ></div>
      </div>
      <div>
        <section className="movie-detail">
          <div className="relative flex justify-center items-center xl:pt-[180px]">
            <div className="w-[100%] xl:w-[80%] h-[100%] xl:h-[600px] absolute xl:rounded-xl backdrop-blur-md bg-[#070C1B]/70 "></div>
            {movie && (
              <div className="flex flex-col xl:flex-row gap-10 z-10 xl:rounded-xl justify-start items-center xl:w-[80%] w-100%">
                <img
                  className="w-[100%] md:w-[411px] md:h-[600px] xl:rounded-xl "
                  src={movie.image}
                  alt=""
                />
                <div>
                  <div className="flex flex-col gap-[20px] xl:gap-[50px] md:px-[25%] xl:px-[20px] px-[15px] pb-[50px] ">
                    <div>
                      <h1 className="text-head2 text-white font-bold ">
                        {movie.title}
                      </h1>
                      <div className="flex flex-col xl:flex-row justify-start xl:items-center">
                        <div className=" py-[10px] pr-[10px] w-fit">
                          <p className="flex justify-start items-center gap-[10px]">
                            {movie.genres.map((item, index) => {
                              return (
                                <span
                                  className="bg-gray-100 text-gray-300 text-body2R rounded-[4px]  px-[6px] py-[12px] "
                                  key={index}
                                >
                                  {item}
                                </span>
                              );
                            })}
                            <span className="bg-gray-100 text-gray-400 text-body2M rounded-[4px]  px-[6px] py-[12px] ">
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
                          <span className="text-gray-400  text-body2M px-[10px]">
                            Release date: {movie.theatrical_release}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <button
                        className="my-[10px] xs:my-[20px] text-white text-body1M px-[40px] py-[12px] bg-blue-100 hover:bg-blue-200 active:bg-blue-300 rounded-md w-[153px] h-[48px]"
                        onClick={() => {
                          navigate(`/bookticket/${movie.title}`);
                        }}
                      >
                        Book ticket
                      </button>
                      <div className="my-[10px] xl:my-[50px] w-[100%] md:w-[90%] xl:w-[80%] flex flex-col gap-5 ">
                        <p className="text-gray-400  text-body2R">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="reviews flex flex-col justify-center px-[10px] items-center p-[20px] ">
          <div className="flex gap-3 justify-start items-center w-[100%]  mt-0 md:w-[50%] my-[30px] mx-0 md:m-[50px]">
            <p className="bg-gray-100 text-white text-head4 px-[16px] py-[12px]">
              <i className="fas fa-star text-blue-100 px-2"></i>
              {movie && movie.rating}
            </p>
            <h2 className="text-head3 text-white">Rating & Reviews</h2>
          </div>
          {comments.map((comment) => {
            return (
              <div
                className=" border-b-2 border-gray-100 m-5 w-[100%]  md:w-[50%]"
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
                      <h3 className="text-body1M text-gray-400">
                        {comment.name}
                      </h3>
                      <p className="text-body2R text-gray-300">24 Jun 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-3">
                    {Array.from({ length: comment.rating }).map((_, i) => (
                      <i className="fas fa-star text-[#4E7BEE]" key={i}></i>
                    ))}
                  </div>
                </div>
                <p className="py-[20px] text-body2R text-gray-300">
                  {comment.comment}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default MoviePage;
