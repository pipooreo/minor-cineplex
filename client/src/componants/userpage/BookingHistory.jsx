import axios from "axios";
import { useState } from "react";
import { formatDate } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

function BookingHistory(props) {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const history = props.user;
  const myReview = props.review;
  const profile = props.profile;
  const screen = props.screen;
  const today = new Date(formatDate(new Date()));
  const navigate = useNavigate();
  // console.log(profile);
  function getCurrentTime() {
    // Get current date/time
    let now = new Date();

    // Get hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    // console.log(hours);
    // console.log(minutes);
    // Format minutes and hours to two digits if needed
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }

    // Combine into hh:mm format
    let formattedTime = hours + "." + minutes;

    return formattedTime;
  }
  const currentTime = getCurrentTime();

  const openReview = (index) => {
    const dialog = document.getElementById(`review_${screen}_${index}`);
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

  const editReview = (index) => {
    const dialog = document.getElementById(`edit_${screen}_${index}`);
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleOngoing = (index) => {
    const dialog = document.getElementById(`ongoing_${screen}__${index}`);
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
    } catch (error) {
      console.log(error);
    }
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
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReview = async (commentId, index) => {
    // console.log(commentId);
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/comments/${commentId}`
      );
      if (result.status === 200) {
        const dialog = document.getElementById(`edit_${index}`);
        if (dialog) {
          dialog.close();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (movie, index) => {
    console.log(movie);
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/booking`,
        {
          data: {
            user: profile.id,
            cinema: movie.cinema_name,
            movie: movie.title,
            hall: movie.hall_number,
            select_date: movie.select_date,
            time: movie.time,
            seats: movie.seats,
          },
        }
      );
      if (result.status === 200) {
        const dialog = document.getElementById(`ongoing_${index}`);
        if (dialog) {
          dialog.close();
        }
      }
    } catch (error) {
      console.log(error);
    }
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
    <div className="flex flex-col gap-[24px] px-[0px] sm:px-[20%] md:px-[5%] lg:pl-[5%] lg:pr-[10px]">
      <h1 className="text-[36px] text-white px-[20px] sm:p-[0px]  font-bold">
        Booking history
      </h1>
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
        const bookingDate = new Date(movie.select_date);

        return (
          <div className="flex flex-col w-full xl:w-[691px]" key={index}>
            <div className="flex flex-col  text-white px-[16px] pb-[24px] pt-[16px] gap-[24px] bg-gray-0 rounded-[8px]">
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
            <div className="flex justify-between flex-col md:flex-row border-t-2 border-gray-100 p-[16px] lg:p-[16px_10px] mt-[-10px] bg-gray-0 max-h-full rounded-b-[8px] gap-[16px]">
              <div className="flex justify-between gap-[24px]">
                <div className="bg-gray-100 p-[12px_16px] rounded-[4px] text-gray-400 text-body1M">
                  {movie.seats.length} Ticket
                </div>
                <div className="md:w-[185px] w-[225px]">
                  <div className="flex justify-between">
                    <p className="text-gray-300 text-body2R">Selected Seat</p>
                    <div className=" text-body2M  gap-[4px]">
                      {renderSeats(movie.seats)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-300 text-body2R">Payment method</p>
                    <div className="text-gray-400 text-body2M ">
                      {movie.payment_method}
                    </div>
                  </div>
                </div>
              </div>
              {(today > new Date(movie.select_date) &&
                !reviewExists &&
                movie.payment_status === "success") ||
              (today.getTime() === bookingDate.getTime() &&
                !reviewExists &&
                movie.payment_status === "success" &&
                currentTime > movie.time) ? (
                <div className="flex items-center justify-end gap-[8px]">
                  <button
                    className="underline text-white font-bold"
                    onClick={() => {
                      openReview(index);
                    }}
                  >
                    Review
                  </button>
                  <dialog id={`review_${screen}_${index}`} className="modal">
                    <div className="modal-box w-11/12 max-w-2xl bg-gray-100 border-gray-200 border flex flex-col gap-[40px]">
                      <form method="dialog">
                        <h3 className="font-bold text-lg text-center text-white">
                          Rating & review
                        </h3>
                        <button className="btn text-gray-400 btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <form
                        method="dialog"
                        className="flex flex-col gap-[40px] grow "
                        onSubmit={(event) =>
                          sendingReview(event, index, movie.movie_id)
                        }
                      >
                        <div className="flex flex-col gap-[24px]">
                          <div className="flex flex-col  items-center md:items-start  md:flex-row gap-[24px]">
                            <img
                              className="w-[96.31p]x h-[140px] rounded"
                              src={movie.image}
                              alt={movie.title}
                            />
                            <div className="flex flex-col md:items-start items-center gap-[23px]">
                              <div className="flex flex-col items-center md:items-start">
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
                                    className={`mask mask-star-2  ${
                                      ratings[index] >= star
                                        ? "bg-blue-100 "
                                        : "bg-gray-0 "
                                    }`}
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
                              className="h-[102px]  bg-gray-100 border border-gray-200 p-[8px_2px_2px_8px] rounded text-white"
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
              ) : (reviewExists &&
                  today > new Date(movie.select_date) &&
                  movie.payment_status === "success") ||
                (today.getTime() === bookingDate.getTime() &&
                  reviewExists &&
                  movie.payment_status === "success" &&
                  currentTime > movie.time) ? (
                <div className="flex items-center justify-end sm:justify-between gap-[8px] ">
                  <div className="flex items-center gap-[2px]">
                    {Array.from({ length: reviewRating[0].rating }).map(
                      (_, i) => (
                        <i className="fas fa-star text-[#4E7BEE]" key={i}></i>
                      )
                    )}
                  </div>
                  <button
                    className="underline text-white font-bold text-body1M"
                    onClick={() => {
                      editReview(index);
                      setComments((prevComments) => ({
                        ...prevComments,
                        [index]: reviewRating[0].comment,
                      }));
                      setRatings((prevRatings) => ({
                        ...prevRatings,
                        [index]: reviewRating[0].rating,
                      }));
                    }}
                  >
                    Edit your review
                  </button>

                  <dialog id={`edit_${screen}_${index}`} className="modal ">
                    <div className="modal-box w-11/12 max-w-2xl bg-gray-100 border-gray-200 border flex flex-col  gap-[40px]">
                      <form method="dialog">
                        <h3 className="font-bold text-lg text-center text-white">
                          Rating & review
                        </h3>
                        <button className="btn btn-sm text-gray-400 btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <form
                        className="flex flex-col gap-[40px]"
                        onSubmit={(event) =>
                          updateReview(event, index, movie.movie_id)
                        }
                      >
                        <div className="flex flex-col gap-[24px]">
                          <div className="flex flex-col  items-center md:items-start  md:flex-row gap-[24px]">
                            <img
                              className="w-[96.31p]x h-[140px] rounded"
                              src={movie.image}
                              alt={movie.title}
                            />
                            <div className="flex flex-col md:items-start items-center gap-[23px]">
                              <div className="flex flex-col items-center md:items-start">
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
                                    className={`mask mask-star-2  ${
                                      ratings[index] >= star
                                        ? "bg-blue-100 "
                                        : "bg-gray-0 "
                                    }`}
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
                          {/* <form method="dialog" className="grow flex"> */}
                          <button
                            className="grow bg-red text-white rounded-[4px] text-body1M font-bold  
                                transition-all duration-300 ease-in-out p-[12px_40px] hover:bg-gray-300 active:bg-gray-400"
                            onClick={() =>
                              deleteReview(reviewRating[0].id, index)
                            }
                          >
                            Delete
                          </button>
                          {/* </form> */}
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
              ) : (movie.payment_status === "success" &&
                  today < new Date(movie.select_date)) ||
                (today.getTime() === bookingDate.getTime() &&
                  movie.payment_status === "success" &&
                  currentTime < movie.time) ? (
                <div className="flex justify-end  items-center gap-[8px]">
                  <button className="bg-green p-[6px_16px] rounded-[100px] font-medium text-white text-[14px] ">
                    Paid
                  </button>
                </div>
              ) : (
                <div className="flex justify-end items-center gap-[8px]">
                  <button
                    className="bg-gray-200 p-[6px_16px] rounded-[100px] font-medium text-white text-[14px] "
                    onClick={() => handleOngoing(index)}
                  >
                    Ongoing
                  </button>
                  <dialog id={`ongoing_${screen}__${index}`} className="modal ">
                    <div className="modal-box bg-gray-100 border-gray-200 border flex flex-col gap-[40px]">
                      <form method="dialog">
                        <h3 className="font-bold text-lg text-center text-white">
                          Booking detail
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
                              <p className="text-white text-[24px] font-bold">
                                {movie.title}
                              </p>
                            </div>
                            <div className="bg-gray-0 p-[12px_16px] rounded-[4px] text-gray-400 font-bold text-center">
                              {movie.seats.length} Ticket
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-300 text-[14px]">
                                Selected Seat
                              </p>
                              <div className="flex gap-[5px] flex-wrap justify-end">
                                {movie.seats.map((seat, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="text-gray-400 text-[14px] "
                                    >
                                      {seat}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[16px]">
                        <button
                          className="grow bg-red text-white rounded-[4px] text-body1M font-bold  
                                transition-all duration-300 ease-in-out p-[12px_40px] hover:bg-gray-300 active:bg-gray-400"
                          onClick={() => cancelBooking(movie, index)}
                        >
                          Cancel booking
                        </button>
                        {/* </form> */}
                        <button
                          className="text-body1M font-bold rounded-[4px] 
                                transition-all duration-300 ease-in-out grow  p-[12px_40px] 
                                    bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                          onClick={() =>
                            navigate(
                              `/payment/${movie.title}/${movie.cinema_name}/${movie.select_date}/${movie.hall_number}/${movie.time}`
                            )
                          }
                        >
                          Go to Payment
                        </button>
                      </div>
                    </div>
                  </dialog>
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
