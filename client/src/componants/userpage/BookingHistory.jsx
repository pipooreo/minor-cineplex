import axios from "axios";
import { useState } from "react";
import { formatDate } from "../../contexts/SearchContext";
import { boolean } from "yup";

function BookingHistory(props) {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const history = props.user;
  const myReview = props.review;
  const profile = props.profile;
  const today = new Date();

  const openReview = (index) => {
    const dialog = document.getElementById(`review_${index}`);
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

  const editReview = (index) => {
    const dialog = document.getElementById(`edit_${index}`);
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

  const sendingReview = async (e, index, movieId) => {
    e.preventDefault();
    // console.log(ratings[index], comments[index], movieId, profile);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/comments`,
        {
          user_id: profile.id,
          movie_id: movieId,
          rating: ratings[index],
          comment: comments[index],
          date: formatDate(today),
        }
      );
      if (result.status === 201) {
        const dialog = document.getElementById(`review_${index}`);
        if (dialog) {
          dialog.close();
        }
      }
    } catch (error) {}
  };

  const updateReview = async (e, index, movieId) => {
    e.preventDefault();
    // console.log(ratings[index], comments[index], movieId, profile);
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/comments`,
        {
          user_id: profile.id,
          movie_id: movieId,
          rating: ratings[index],
          comment: comments[index],
          date: formatDate(today),
        }
      );
      if (result.status === 200) {
        const dialog = document.getElementById(`edit_${index}`);
        if (dialog) {
          dialog.close();
        }
      }
    } catch (error) {}
  };

  const renderSeats = (seats) => {
    if (seats.length > 4) {
      return (
        <>
          {seats.slice(0, 4).map((seat, index) => (
            <span key={index} className="text-gray-400 text-[14px]">
              {seat}
              {index < 3 && ","}
            </span>
          ))}
          <span className="text-gray-400 text-[14px]">...</span>
        </>
      );
    } else {
      return seats.map((seat, index) => (
        <span key={index} className="text-gray-400 text-[14px]">
          {seat}
          {index < seats.length - 1 && ","}
        </span>
      ));
    }
  };

  return (
    <div className="flex flex-col gap-[24px] px-[5%]">
      <h1 className="text-[36px] text-white font-bold">Booking history</h1>
      {history?.map((movie, index) => {
        const reviewExists = myReview.some(
          (review) =>
            review.movie_id === movie.movie_id &&
            review.user_id === movie.user_id
        );
        const reviewRating = myReview.filter(
          (rate) =>
            rate.movie_id === movie.movie_id && rate.user_id === movie.user_id
        );

        return (
          <div className="flex flex-col w-[751px]" key={index}>
            <div className="flex flex-col  text-white px-[16px] pb-[24px] pt-[16px] gap-[24px] bg-gray-0 rounded-[8px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
              <div className=" flex items-center gap-[12px]">
                <img
                  className="w-[96.31px] h-[140px] rounded-[4px]"
                  src={movie.image}
                />
                <div className="flex flex-col gap-[4px]">
                  <div className="font-bold text-[20px] ">{movie.title}</div>
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex gap-[12px] items-center">
                      <i className="fa-solid fa-location-dot w-[16px] h-[16px] text-gray-200"></i>
                      <p className="text-gray-400 text-[14px]">
                        {movie.cinema_name}
                      </p>
                    </div>
                    <div className="flex gap-[12px] items-center">
                      <i className="fa-solid fa-calendar-days w-[16px] h-[16px] text-gray-200"></i>
                      <p className="text-gray-400 text-[14px]">
                        {movie.select_date}
                      </p>
                    </div>
                    <div className="flex gap-[12px] items-center">
                      <i className="fa-solid fa-clock w-[16px] h-[16px] text-gray-200"></i>
                      <p className="text-gray-400 text-[14px]">{movie.time}</p>
                    </div>
                    <div className="flex gap-[12px] items-center">
                      <i className="fa-solid fa-shop w-[16px] h-[16px] text-gray-200"></i>
                      <p className="text-gray-400 text-[14px]">
                        {movie.hall_number}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between border-t-2 border-gray-100 p-[16px] mt-[-10px] bg-gray-0 max-h-full rounded-b-[8px] gap-[16px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
              <div className="flex gap-[24px]">
                <div className="bg-gray-100 p-[12px_16px] rounded-[4px] text-gray-400 font-bold">
                  {movie.seats.length} Ticket
                </div>
                <div>
                  <div className="flex justify-between gap-2 w-[200px]">
                    <p className="text-gray-300 text-[14px]">Selected Seat</p>
                    <div className="flex flex-wrap gap-[4px]">
                      {renderSeats(movie.seats)}
                    </div>
                  </div>
                  <div className="flex justify-between gap-[20px]">
                    <p className="text-gray-300 text-[14px]">Payment method</p>
                    <div className="text-gray-400 text-[14px] ">
                      {movie.payment_method}
                    </div>
                  </div>
                </div>
              </div>
              {today > new Date(movie.select_date) &&
              !reviewExists &&
              movie.payment_status === "success" ? (
                <div className="flex items-center gap-[8px]">
                  <button
                    className="underline text-white font-bold"
                    onClick={() => {
                      openReview(index);
                    }}
                  >
                    Review
                  </button>
                  <dialog id={`review_${index}`} className="modal ">
                    <div className="modal-box bg-gray-100 border-gray-200 border flex flex-col gap-[40px]">
                      <form
                        className="flex flex-col gap-[40px]"
                        onSubmit={(event) =>
                          sendingReview(event, index, movie.movie_id)
                        }
                      >
                        <form method="dialog">
                          <h3 className="font-bold text-lg text-center text-white">
                            Rating & review
                          </h3>
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="flex flex-col gap-[24px]">
                          <div className="flex gap-[24px]">
                            <img
                              className="w-[96.31p]x h-[140px] rounded"
                              src={movie.image}
                              alt={movie.title}
                            />
                            <div className="flex flex-col gap-[23px]">
                              <div>
                                <p className="text-gray-400">Rate this movie</p>
                                <p className="text-white text-[24px] font-bold">
                                  {movie.title}
                                </p>
                              </div>
                              <div className="rating flex gap-[8px]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <input
                                    key={star}
                                    type="radio"
                                    name={`rating_${index}`}
                                    className="mask mask-star-2 bg-blue-100"
                                    checked={ratings[index] === star}
                                    onChange={() =>
                                      setRatings((prevRatings) => ({
                                        ...prevRatings,
                                        [index]: star,
                                      }))
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-[4px]">
                            <label className="text-gray-400">
                              Text Area Label
                            </label>
                            <textarea
                              name="comment"
                              value={comments[index] || ""}
                              className="h-[102px] bg-gray-100 border border-gray-200 p-[8px_2px_2px_8px] rounded text-white"
                              onChange={(e) =>
                                setComments((prevComments) => ({
                                  ...prevComments,
                                  [index]: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className="flex gap-[16px]">
                          <form method="dialog" className="grow flex">
                            <button
                              className="grow border border-gray-300 text-white rounded-[4px] text-body1M font-bold  
                                transition-all duration-300 ease-in-out p-[12px_40px] hover:bg-gray-300 active:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </form>
                          <button
                            type="submit"
                            className={`text-body1M font-bold rounded-[4px] 
                                transition-all duration-300 ease-in-out grow  p-[12px_40px] ${
                                  ratings[index] && comments[index]
                                    ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                                    : "bg-blue-100/40 text-white/40 cursor-not-allowed"
                                }`}
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                  <div className="text-white text-[14px] font-medium border border-gray-100 p-[6px_16px] rounded-[100px]">
                    Completed
                  </div>
                </div>
              ) : reviewExists &&
                today > new Date(movie.select_date) &&
                movie.payment_status === "success" ? (
                <div className="flex items-center gap-[8px]">
                  {Array.from({ length: reviewRating[0].rating }).map(
                    (_, i) => (
                      <i className="fas fa-star text-[#4E7BEE]" key={i}></i>
                    )
                  )}
                  <button
                    className="underline text-white font-bold"
                    onClick={() => {
                      editReview(index);
                      setComments((prevComments) => ({
                        ...prevComments,
                        [index]: reviewRating[0].comment,
                      }));
                    }}
                  >
                    Edit your review
                  </button>
                  <dialog id={`edit_${index}`} className="modal ">
                    <div className="modal-box bg-gray-100 border-gray-200 border flex flex-col gap-[40px]">
                      <form
                        className="flex flex-col gap-[40px]"
                        onSubmit={(event) =>
                          updateReview(event, index, movie.movie_id)
                        }
                      >
                        <form method="dialog">
                          <h3 className="font-bold text-lg text-center text-white">
                            Rating & review
                          </h3>
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="flex flex-col gap-[24px]">
                          <div className="flex gap-[24px]">
                            <img
                              className="w-[96.31p]x h-[140px] rounded"
                              src={movie.image}
                              alt={movie.title}
                            />
                            <div className="flex flex-col gap-[23px]">
                              <div>
                                <p className="text-gray-400">Rate this movie</p>
                                <p className="text-white text-[24px] font-bold">
                                  {movie.title}
                                </p>
                              </div>
                              <div className="rating flex gap-[8px]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <input
                                    key={star}
                                    type="radio"
                                    name={`rating_${index}`}
                                    className="mask mask-star-2 bg-blue-100"
                                    checked={ratings[index] === star}
                                    onChange={() =>
                                      setRatings((prevRatings) => ({
                                        ...prevRatings,
                                        [index]: star,
                                      }))
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-[4px]">
                            <label className="text-gray-400">
                              Text Area Label
                            </label>
                            <textarea
                              name="comment"
                              value={comments[index] || ""}
                              className="h-[102px] bg-gray-100 border border-gray-200 p-[8px_2px_2px_8px] rounded text-white"
                              onChange={(e) => {
                                setComments((prevComments) => ({
                                  ...prevComments,
                                  [index]: e.target.value,
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-[16px]">
                          <form method="dialog" className="grow flex">
                            <button
                              className="grow border border-gray-300 text-white rounded-[4px] text-body1M font-bold  
                                transition-all duration-300 ease-in-out p-[12px_40px] hover:bg-gray-300 active:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </form>
                          <button
                            type="submit"
                            className={`text-body1M font-bold rounded-[4px] 
                                transition-all duration-300 ease-in-out grow  p-[12px_40px] ${
                                  ratings[index] && comments[index]
                                    ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                                    : "bg-blue-100/40 text-white/40 cursor-not-allowed"
                                }`}
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                  <div className="text-white text-[14px] font-medium border border-gray-100 p-[6px_16px] rounded-[100px]">
                    Completed
                  </div>
                </div>
              ) : movie.payment_status === "success" &&
                today < new Date(movie.select_date) ? (
                <div className="flex items-center gap-[8px]">
                  <button className="bg-green p-[6px_16px] rounded-[100px] font-medium text-white text-[14px] ">
                    Paid
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-[8px]">
                  <button className="bg-gray-200 p-[6px_16px] rounded-[100px] font-medium text-white text-[14px] ">
                    Ongoing
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookingHistory;
