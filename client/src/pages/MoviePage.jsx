import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";

function MoviePage() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [movie, setMovie] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state
  const params = useParams();

  // Fetch movie details
  const getTitleMovie = async () => {
    setLoading(true);
    try {
      let movieData = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/movies/movie?movieSearch=${
          params.title
        }`
      );
      setMovie(movieData.data.data[0]);
    } catch (error) {
      console.error("Failed to fetch movie data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments
  const getCommentMovie = async () => {
    try {
      let commentsData = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/comments/moviesComment?movieName=${
          params.title
        }`
      );
      setComments(commentsData.data.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    getTitleMovie();
    getCommentMovie();
  }, [params.title]);

  // Calculate average rating
  const calculateAverageRating = (comments) => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce(
      (total, comment) => total + Number(comment.rating),
      0
    );
    return totalRating / comments.length;
  };

  const averageRating = calculateAverageRating(comments);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-BG">
        <ClockLoader color="#4f7cee" />
      </div>
    );
  }

  return (
    <div className="bg-BG relative" style={{ fontFamily: "Roboto Condensed" }}>
      <div className="absolute w-full h-[500px] hidden sm:block">
        <div
          className="bg-no-repeat w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url('${movie?.image}')`,
          }}
        ></div>
      </div>
      <div>
        <section className="movie-detail">
          <div className="relative flex justify-center items-center xl:pt-[180px]">
            <div className="w-[100%] xl:w-[80%] h-[100%] xl:h-[600px] absolute xl:rounded-xl backdrop-blur-md bg-[#070C1B]/70"></div>
            {movie && (
              <div className="flex flex-col xl:flex-row gap-10 z-10 xl:rounded-xl justify-start items-center xl:w-[80%] w-100%">
                <img
                  className="w-[100%] md:w-[411px] md:h-[600px] xl:rounded-xl"
                  src={movie.image}
                  alt={movie.title}
                />
                <div>
                  <div className="flex flex-col gap-[20px] xl:gap-[50px] md:px-[25%] xl:px-[20px] px-[15px] pb-[50px]">
                    <div>
                      <h1 className="text-head2 text-white font-bold">
                        {movie.title}
                      </h1>
                      <div className="flex flex-col xl:flex-row justify-start xl:items-center">
                        <div className="py-[10px] pr-[10px] w-fit">
                          <p className="flex justify-start items-center gap-[10px]">
                            {movie.genres.map((item, index) => (
                              <span
                                className="bg-gray-100 text-gray-300 text-body2R rounded-[4px] px-[6px] py-[12px]"
                                key={index}
                              >
                                {item}
                              </span>
                            ))}
                            <span className="bg-gray-100 text-gray-400 text-body2M rounded-[4px] px-[6px] py-[12px]">
                              {movie.language}
                            </span>
                            <svg
                              width="1"
                              height="50"
                              viewBox="0 0 1 50"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line
                                x1="0.5"
                                y1="0"
                                x2="0.5"
                                y2="50"
                                stroke="#565F7E"
                              />
                            </svg>
                          </p>
                        </div>
                        <p>
                          <span className="text-gray-400 text-body2M px-[10px]">
                            Release date: {movie.theatrical_release}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="my-[10px] xs:my-[20px] text-white text-body1M px-[40px] py-[12px] bg-blue-100 hover:bg-blue-200 active:bg-blue-300 rounded-md w-[153px] h-[48px]"
                        onClick={() => navigate(`/bookticket/${movie.title}`)}
                      >
                        Book ticket
                      </button>
                      <div className="my-[10px] xl:my-[50px] w-[100%] md:w-[90%] xl:w-[80%] flex flex-col gap-5">
                        <p className="text-gray-400 text-body2R">
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
        <section className="reviews bg-BG flex flex-col justify-center px-[10px] items-center p-[20px]">
          <div className="flex gap-3 justify-start items-center w-[100%] mt-0 md:w-[50%] my-[30px] mx-0 md:m-[50px]">
            <p className="bg-gray-100 text-white text-head4 px-[16px] py-[12px]">
              <i className="fas fa-star text-blue-100 px-2"></i>
              {averageRating.toFixed(1)}
            </p>
            <h2 className="text-head3 text-white">Rating & Reviews</h2>
          </div>
          {comments.map((comment, index) => {
            const isLastComment = index === comments.length - 1;
            return (
              <div
                className={`flex flex-col m-5 p-5 gap-[24px] w-[100%] md:w-[50%] ${
                  !isLastComment ? "border-b-2 border-gray-100" : ""
                }`}
                key={index}
              >
                <div className="flex justify-between md:gap-[24px]">
                  <div className="flex gap-[10px]">
                    <img
                      className="w-[44px] h-[44px] bg-white rounded-full"
                      src={comment.image}
                      alt={comment.name}
                    />
                    <div>
                      <h3 className="text-body1M text-gray-400">
                        {comment.name}
                      </h3>
                      <p className="text-body2R text-gray-300">
                        {comment.post_date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-3">
                    {Array.from({ length: comment.rating }).map((_, i) => (
                      <i className="fas fa-star text-[#4E7BEE]" key={i}></i>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-body2R text-gray-300">{comment.comment}</p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default MoviePage;
