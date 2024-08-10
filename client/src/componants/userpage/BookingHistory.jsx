import axios from "axios";
import { useState } from "react";
import { formatDate } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import {
  FacebookMessengerIcon,
  TwitterShareButton,
  XIcon,
  FacebookShareButton,
  FacebookIcon,
  LineIcon,
  LineShareButton,
  EmailShareButton,
  EmailIcon,
} from "react-share";

function BookingHistory(props) {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [reasonRefunds, setReasonRefunds] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showComment, setShowComment] = useState();

  const history = props.user;
  const myReview = props.review;
  const profile = props.profile;
  const today = new Date(formatDate(new Date()));
  const navigate = useNavigate();

  // console.log(history);
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

  const handleOngoing = (index) => {
    const dialog = document.getElementById(`ongoing_${index}`);
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleBookingDetail = (index) => {
    const dialog = document.getElementById(`detail_${index}`);
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleCloseAndReload = () => {
    const modal = document.getElementById("success_modal_${index}");
    if (modal) {
      modal.close();
    }
    window.location.reload();
  };

  const handlerefund = (index) => {
    document.getElementById(`detail_${index}`).close();
    const dialog = document.getElementById(`refund_${index}`);
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

  const sendingReview = async (e, index, movieId) => {
    e.preventDefault();
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
        // ปิด review dialog
        const reviewDialog = document.getElementById(`review_${index}`);
        if (reviewDialog) {
          reviewDialog.close();
        }

        // ดึงข้อมูล comment ที่เพิ่งสร้าง
        const getResult = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/comments/${profile.id}/${movieId}`
        );

        // เก็บข้อมูล comment ใน state
        setShowComment(getResult.data.data);

        // เปิด success modal
        const successModal = document.getElementById(`success_modal_${index}`);
        if (successModal) {
          successModal.showModal();
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

        const getResult = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/comments/${profile.id}/${movieId}`
        );

        // เก็บข้อมูล comment ใน state
        setShowComment(getResult.data.data);

        // เปิด success modal
        const successModal = document.getElementById(`success_modal_${index}`);
        if (successModal) {
          successModal.showModal();
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (movie, index) => {
    // console.log(movie);
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
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendRefund = async (movie, index) => {
    // console.log(movie);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/payment/refund`,
        {
          paymentIntentId: movie.payment_id,
        }
      );
      const deleteBooking = await axios.delete(
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
      // console.log(result);
      // if(result)
      if (result.status === 200 && deleteBooking.status === 200) {
        const dialog = document.getElementById(`refund_${index}`);
        if (dialog) {
          dialog.close();
        }
        navigate(`/refund/success/${result.data.refundPrice / 100}`);
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

  const toggleShareMenu = () => {
    setIsOpen(!isOpen);
  };

  const getShareUrl = (movie) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/booking/${movie.booking_id}`;
  };

  const SocialShareButtons = ({ url }) => {
    const handleCopyLink = () => {
      const link = getShareUrl(movie);
      navigator.clipboard.writeText(link).then(
        () => alert("Link copied to clipboard!"),
        (err) => alert("Failed to copy link: " + err)
      );
    };
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
    const encodedShareUrl = encodeURIComponent(url);
    const messengerShareUrl = `https://www.facebook.com/dialog/send?app_id=${appId}&link=${encodedShareUrl}&redirect_uri=${encodedShareUrl}`;

    return (
      <div
        className="transition-transform transform absolute top-7 right-0 sm:right-10 z-1 mt-6"
        style={{ fontFamily: "Roboto Condensed" }}
      >
        <nav className="flex flex-col gap-[8px] p-[16px] justify-center rounded-lg border-[1px] border-BG items-center  bg-gray-100  text-gray-400  shadow-xl  shadow-black/50 ">
          <h1 className="text-body1M text-white">Share Booking</h1>
          <ul className="grid gap-4 grid-cols-3 sm:grid-cols-5 text-body2R">
            <li className="flex flex-col justify-center gap-[4px] items-center w-[80px] h-[80px]">
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${getShareUrl(
                  movie
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-gray-0 rounded-full text-center w-[40px] h-[40px]"
              >
                <LineShareButton url={shareUrl}>
                  <LineIcon size={20} round />
                </LineShareButton>
              </a>
              <p>Line</p>
            </li>
            <li className="flex flex-col justify-center gap-[4px] items-center w-[80px] h-[80px]">
              <a
                href={`https://www.facebook.com/share.php?u=${getShareUrl(
                  movie
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-gray-0 rounded-full text-center w-[40px] h-[40px]"
              >
                <FacebookShareButton url={getShareUrl(movie)}>
                  <FacebookIcon size={20} round />
                </FacebookShareButton>
              </a>
              <p>Facebook</p>
            </li>
            <li className="flex flex-col justify-center gap-[4px] items-center w-[80px] h-[80px]">
              <a className="flex justify-center items-center bg-gray-0 rounded-full text-center w-[40px] h-[40px]">
                <EmailShareButton url={getShareUrl(movie)}>
                  <EmailIcon size={20} round />
                </EmailShareButton>
              </a>
              <p>Mail</p>
            </li>
            <li className="flex flex-col justify-center gap-[4px] items-center w-[80px] h-[80px]">
              <a
                href={`https://x.com/intent/tweet?url=${getShareUrl(movie)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-gray-0 rounded-full text-center w-[40px] h-[40px]"
              >
                <TwitterShareButton url={getShareUrl(movie)}>
                  <XIcon size={20} round />
                </TwitterShareButton>
              </a>
              <p>X</p>
            </li>
            <li className="flex flex-col justify-center gap-[4px] items-center w-[80px] h-[80px]">
              <button
                className="flex justify-center items-center bg-gray-0 rounded-full text-center w-[40px] h-[40px]"
                onClick={handleCopyLink}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="20" fill="#070C1B" />
                  <path
                    d="M22 15V15C22 14.0681 22 13.6022 21.8478 13.2346C21.6448 12.7446 21.2554 12.3552 20.7654 12.1522C20.3978 12 19.9319 12 19 12H16C14.1144 12 13.1716 12 12.5858 12.5858C12 13.1716 12 14.1144 12 16V19C12 19.9319 12 20.3978 12.1522 20.7654C12.3552 21.2554 12.7446 21.6448 13.2346 21.8478C13.6022 22 14.0681 22 15 22V22"
                    stroke="#C8CEDD"
                  />
                  <rect
                    x="18"
                    y="18"
                    width="10"
                    height="10"
                    rx="2"
                    stroke="#C8CEDD"
                  />
                </svg>
              </button>
              <p>Copy link</p>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  return (
    <div
      className="flex flex-col gap-[24px] px-[0px] sm:px-[20%] md:px-[5%] lg:pl-[5%] lg:pr-[10px]"
      style={{ fontFamily: "Roboto Condensed" }}
    >
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
              <div className="flex flex-col md:flex-row justify-between gap-[12px]">
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
                        <p className="text-gray-400 text-[14px]">
                          {movie.time}
                        </p>
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
                <div className="flex flex-col gap-[4px]">
                  <div className="flex gap-[8px]">
                    <p className="text-gray-300 text-body2R">Booking No.</p>
                    <div className=" text-body2M text-gray-300 gap-[4px]">
                      AK{movie.booking_id}
                    </div>
                  </div>
                  <div className="flex gap-[8px]">
                    <p className="text-gray-300 text-body2R">Booked date</p>
                    <div className=" text-body2M text-gray-300 gap-[4px]">
                      {formatDate(new Date(movie.booking_date))}
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
                currentTime > movie.time - 1) ? (
                <div className="flex items-center justify-end gap-[8px]">
                  <button
                    className="underline text-white font-bold"
                    onClick={() => {
                      openReview(index);
                    }}
                  >
                    Review
                  </button>
                  <dialog id={`review_${index}`} className="modal">
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
                        onSubmit={(event) => {
                          event.preventDefault();
                          sendingReview(event, index, movie.movie_id);
                        }}
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
                  {/* Add this near the end of your component */}
                  <dialog id={`success_modal_${index}`} className="modal">
                    <div className="modal-box w-11/12 max-w-2xl bg-gray-100 border-gray-200 border flex flex-col  gap-[40px]">
                      <form method="dialog">
                        <h3 className="text-head4 text-center text-white">
                          Your rating & review
                        </h3>
                        <div
                          className="btn text-gray-400 btn-sm btn-circle btn-ghost absolute right-10 top-[9px]"
                          onClick={toggleShareMenu}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 3V2.5H20.5V3H20ZM10.3536 13.3536C10.1583 13.5488 9.84171 13.5488 9.64645 13.3536C9.45118 13.1583 9.45118 12.8417 9.64645 12.6464L10.3536 13.3536ZM19.5 11V3H20.5V11H19.5ZM20 3.5H12V2.5H20V3.5ZM20.3536 3.35355L10.3536 13.3536L9.64645 12.6464L19.6464 2.64645L20.3536 3.35355Z"
                              fill="#C8CEDD"
                            />
                            <path
                              d="M18 14.625V14.625C18 15.9056 18 16.5459 17.8077 17.0568C17.5034 17.8653 16.8653 18.5034 16.0568 18.8077C15.5459 19 14.9056 19 13.625 19H10C7.17157 19 5.75736 19 4.87868 18.1213C4 17.2426 4 15.8284 4 13V9.375C4 8.09442 4 7.45413 4.19228 6.94325C4.4966 6.1347 5.1347 5.4966 5.94325 5.19228C6.45413 5 7.09442 5 8.375 5V5"
                              stroke="#C8CEDD"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        {isOpen && <SocialShareButtons url={shareUrl} />}
                        <button
                          onClick={handleCloseAndReload}
                          className="btn btn-sm text-gray-400 btn-circle btn-ghost absolute right-2 top-2"
                        >
                          ✕
                        </button>
                      </form>
                      {showComment && (
                        <div className="flex flex-col gap-[16px] md:px-[24px] px-[16px]">
                          <div className="flex justify-between  md:gap-2">
                            <div className="flex gap-[10px]">
                              <img
                                className="w-[44px] h-[44px] bg-white rounded-full"
                                src={showComment.image}
                                alt={showComment.name}
                              />
                              <div>
                                <h3 className="text-body1M text-gray-400">
                                  {showComment.name}
                                </h3>
                                <p className="text-body2R text-gray-300">
                                  {showComment.created_at}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1 md:gap-3">
                              {Array.from({ length: showComment.rating }).map(
                                (_, i) => (
                                  <i
                                    className="fas fa-star text-[#4E7BEE]"
                                    key={i}
                                  ></i>
                                )
                              )}
                            </div>
                          </div>

                          <p className="py-[20px] text-body2R text-gray-300">
                            {showComment.comment}
                          </p>
                        </div>
                      )}
                      <form
                        className="flex flex-col gap-[40px]"
                        method="dialog"
                      >
                        <div className="flex flex-col gap-[24px]">
                          <div className="flex flex-col  items-center md:items-start  md:flex-row gap-[24px]">
                            <div className="flex flex-col md:items-start items-center gap-[23px]"></div>
                          </div>
                        </div>
                        <div className="flex justify-evenly gap-[6px] md:gap-[16px]">
                          {/* <form method="dialog" className="grow flex"> */}
                          <button
                            className="sm:w-[268px] w-[147.5px] border border-gray-300 text-white rounded-[4px] text-body1M font-bold  
                               sm:p-[12px_40px] p-[12px_5px] hover:bg-gray-300 active:bg-gray-400"
                            onClick={() => {
                              navigate(`/movie/${showComment.title}`);
                            }}
                          >
                            View movie detail
                          </button>
                          {/* </form> */}
                          <button
                            type="submit"
                            className="sm:w-[268px] w-[147.5px] text-body1M font-bold rounded-[4px] sm:p-[12px_40px] p-[12px_5px]
                                  bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                            onClick={handleCloseAndReload}
                          >
                            OK
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
                  currentTime > movie.time - 1) ? (
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

                  <dialog id={`edit_${index}`} className="modal ">
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
                          <button
                            className="grow bg-red text-white rounded-[4px] text-body1M font-bold  
                                transition-all duration-300 ease-in-out p-[12px_40px] hover:bg-gray-300 active:bg-gray-400"
                            onClick={() =>
                              deleteReview(reviewRating[0].id, index)
                            }
                          >
                            Delete
                          </button>
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
                  <dialog id={`success_modal_${index}`} className="modal">
                    <div className="modal-box w-11/12 max-w-2xl bg-gray-100 border-gray-200 border flex flex-col  gap-[40px]">
                      <form method="dialog">
                        <h3 className="text-head4 text-center text-white">
                          Your rating & review
                        </h3>
                        <div
                          className="btn text-gray-400 btn-sm btn-circle btn-ghost absolute right-10 top-[9px]"
                          onClick={toggleShareMenu}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 3V2.5H20.5V3H20ZM10.3536 13.3536C10.1583 13.5488 9.84171 13.5488 9.64645 13.3536C9.45118 13.1583 9.45118 12.8417 9.64645 12.6464L10.3536 13.3536ZM19.5 11V3H20.5V11H19.5ZM20 3.5H12V2.5H20V3.5ZM20.3536 3.35355L10.3536 13.3536L9.64645 12.6464L19.6464 2.64645L20.3536 3.35355Z"
                              fill="#C8CEDD"
                            />
                            <path
                              d="M18 14.625V14.625C18 15.9056 18 16.5459 17.8077 17.0568C17.5034 17.8653 16.8653 18.5034 16.0568 18.8077C15.5459 19 14.9056 19 13.625 19H10C7.17157 19 5.75736 19 4.87868 18.1213C4 17.2426 4 15.8284 4 13V9.375C4 8.09442 4 7.45413 4.19228 6.94325C4.4966 6.1347 5.1347 5.4966 5.94325 5.19228C6.45413 5 7.09442 5 8.375 5V5"
                              stroke="#C8CEDD"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        {isOpen && <SocialShareButtons url={shareUrl} />}
                        <button
                          onClick={handleCloseAndReload}
                          className="btn btn-sm text-gray-400 btn-circle btn-ghost absolute right-2 top-2"
                        >
                          ✕
                        </button>
                      </form>
                      {showComment && (
                        <div className="flex flex-col gap-[16px] md:px-[24px] px-[16px]">
                          <div className="flex justify-between  md:gap-2">
                            <div className="flex gap-[10px]">
                              <img
                                className="w-[44px] h-[44px] bg-white rounded-full"
                                src={showComment.image}
                                alt={showComment.name}
                              />
                              <div>
                                <h3 className="text-body1M text-gray-400">
                                  {showComment.name}
                                </h3>
                                <p className="text-body2R text-gray-300">
                                  {showComment.created_at}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1 md:gap-3">
                              {Array.from({ length: showComment.rating }).map(
                                (_, i) => (
                                  <i
                                    className="fas fa-star text-[#4E7BEE]"
                                    key={i}
                                  ></i>
                                )
                              )}
                            </div>
                          </div>
                          <p className="py-[20px] text-body2R text-gray-300">
                            {showComment.comment}
                          </p>
                        </div>
                      )}
                      <form
                        className="flex flex-col gap-[40px]"
                        method="dialog"
                      >
                        <div className="flex flex-col gap-[24px]">
                          <div className="flex flex-col  items-center md:items-start  md:flex-row gap-[24px]">
                            <div className="flex flex-col md:items-start items-center gap-[23px]"></div>
                          </div>
                        </div>
                        <div className="flex justify-evenly gap-[6px] md:gap-[16px]">
                          <button
                            className="sm:w-[268px] w-[147.5px] border border-gray-300 text-white rounded-[4px] text-body1M font-bold  
                               sm:p-[12px_40px] p-[12px_5px] hover:bg-gray-300 active:bg-gray-400"
                            onClick={() => {
                              navigate(`/movie/${showComment.title}`);
                            }}
                          >
                            View movie detail
                          </button>
                          <button
                            type="submit"
                            className="sm:w-[268px] w-[147.5px] text-body1M font-bold rounded-[4px] sm:p-[12px_40px] p-[12px_5px]
                                  bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                            onClick={handleCloseAndReload}
                          >
                            OK
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
                  <button
                    className="bg-green p-[6px_16px] rounded-[100px] font-medium text-white text-[14px] "
                    onClick={() => handleBookingDetail(index)}
                  >
                    Paid
                  </button>
                  <dialog id={`detail_${index}`} className="modal">
                    {/* <div className="modal-box bg-gray-100 border-gray-200 border flex flex-col gap-[20px] p-[24px_0px]"> */}
                    <div className="modal-box w-11/12 max-w-2xl bg-gray-100 border-gray-200 border flex flex-col  gap-[20px] p-[24px_0px]">
                      <form method="dialog">
                        <h3 className="font-bold text-lg text-center text-white">
                          Booking detail
                        </h3>
                        <div
                          className="btn text-gray-400 btn-sm btn-circle btn-ghost absolute right-10 top-[9px]"
                          onClick={toggleShareMenu}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 3V2.5H20.5V3H20ZM10.3536 13.3536C10.1583 13.5488 9.84171 13.5488 9.64645 13.3536C9.45118 13.1583 9.45118 12.8417 9.64645 12.6464L10.3536 13.3536ZM19.5 11V3H20.5V11H19.5ZM20 3.5H12V2.5H20V3.5ZM20.3536 3.35355L10.3536 13.3536L9.64645 12.6464L19.6464 2.64645L20.3536 3.35355Z"
                              fill="#C8CEDD"
                            />
                            <path
                              d="M18 14.625V14.625C18 15.9056 18 16.5459 17.8077 17.0568C17.5034 17.8653 16.8653 18.5034 16.0568 18.8077C15.5459 19 14.9056 19 13.625 19H10C7.17157 19 5.75736 19 4.87868 18.1213C4 17.2426 4 15.8284 4 13V9.375C4 8.09442 4 7.45413 4.19228 6.94325C4.4966 6.1347 5.1347 5.4966 5.94325 5.19228C6.45413 5 7.09442 5 8.375 5V5"
                              stroke="#C8CEDD"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        {isOpen && <SocialShareButtons url={shareUrl} />}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-400">
                          ✕
                        </button>
                      </form>
                      <div className="flex flex-col gap-[24px] bg-gray-0 p-[24px] rounded">
                        <div className="flex justify-between max-md:flex-col max-md:gap-[16px]">
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
                                  <p className="text-gray-400 text-[14px]">
                                    {movie.time}
                                  </p>
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
                          <div className="flex flex-col gap-[4px]">
                            <div className="flex gap-[8px]">
                              <p className="text-gray-300 text-body2R">
                                Booking No.
                              </p>
                              <div className=" text-body2M text-gray-300 gap-[4px]">
                                AK{movie.booking_id}
                              </div>
                            </div>
                            <div className="flex gap-[8px]">
                              <p className="text-gray-300 text-body2R">
                                Booked date
                              </p>
                              <div className=" text-body2M text-gray-300 gap-[4px]">
                                {formatDate(new Date(movie.booking_date))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-[100%] h-[1px] bg-gray-100"></div>
                        <div className="flex justify-between flex-col md:flex-row    bg-gray-0 max-h-full rounded-b-[8px] gap-[16px]">
                          <div className="flex justify-between gap-[24px]">
                            <div className="bg-gray-100 text-center p-[12px_16px] max-md:w-[100px] rounded-[4px] text-gray-400 text-body1M">
                              {movie.seats.length} Ticket
                            </div>
                            <div className="md:w-[185px] w-[225px]">
                              <div className="flex justify-between">
                                <p className="text-gray-300 text-body2R">
                                  Selected Seat
                                </p>
                                <div className=" text-body2M  gap-[4px]">
                                  {renderSeats(movie.seats)}
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-gray-300 text-body2R">
                                  Payment method
                                </p>
                                <div className="text-gray-400 text-body2M ">
                                  {movie.payment_method}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end items-center gap-[8px]">
                            <button className="bg-green p-[6px_16px] rounded-[100px] font-medium text-white text-[14px] ">
                              Paid
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between p-[0px_24px] items-center max-md:flex-col max-md:gap-[16px]">
                        <div className="flex flex-col gap-[8px] grow max-md:w-full">
                          <div className="flex justify-between">
                            <p className="text-gray-300 text-body2R">
                              Payment method
                            </p>
                            <div className="text-gray-400 text-body2M ">
                              {movie.payment_method}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-300 text-body2R">
                              Ticket x{movie.seats.length}
                            </p>
                            <div className="text-gray-400 text-body2M ">
                              THB{movie.seats.length * 150}
                            </div>
                          </div>
                          {movie.coupon_type === "fixed" && (
                            <>
                              <div className="flex justify-between">
                                <p className="text-gray-300 text-body2R">
                                  Coupon
                                </p>
                                <div className=" text-body2M text-red">
                                  - THB{movie.discount}
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 h-[1px]" />
                              <div className="flex justify-between">
                                <p className="text-gray-300 text-body2R">
                                  Total
                                </p>
                                <div className=" text-body2M text-gray-400">
                                  THB{movie.seats.length * 150 - movie.discount}
                                </div>
                              </div>
                            </>
                          )}
                          {movie.coupon_type === "percentage" && (
                            <>
                              <div className="flex justify-between">
                                <p className="text-gray-300 text-body2R">
                                  Coupon
                                </p>
                                <div className=" text-body2M text-red">
                                  - THB
                                  {(movie.seats.length * 150 * movie.discount) /
                                    100}
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 h-[1px]" />
                              <div className="flex justify-between">
                                <p className="text-gray-300 text-body2R">
                                  Total
                                </p>
                                <div className=" text-body2M text-gray-400">
                                  THB
                                  {movie.seats.length * 150 -
                                    movie.seats.length *
                                      150 *
                                      (movie.discount / 100)}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="grow flex justify-end">
                          <button
                            className="border rounded-[4px] p-[12px_40px] text-body1M text-white"
                            onClick={() => handlerefund(index)}
                          >
                            Cancel booking
                          </button>
                          <dialog id={`refund_${index}`} className="modal">
                            <div className="modal-box  max-w-2xl bg-gray-100 border-gray-200 border flex flex-col gap-[40px]">
                              <form method="dialog">
                                <h3 className="font-bold text-lg text-center text-white">
                                  Cancel booking
                                </h3>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>
                              </form>
                              <div className="flex max-md:flex-col max-md:gap-[16px]">
                                <div className="flex flex-col items-start gap-[12px] grow">
                                  <p className="text-white text-body1R">
                                    Reason for cancellation
                                  </p>
                                  <div className="flex gap-[8px]">
                                    <input
                                      type="radio"
                                      name="reason"
                                      value="I had changed my mind"
                                      onChange={(e) => {
                                        setReasonRefunds((prevReason) => ({
                                          ...prevReason,
                                          [index]: e.target.value,
                                        }));
                                      }}
                                    />
                                    <label className="text-gray-400 text-body2R">
                                      I had changed my mind
                                    </label>
                                  </div>
                                  <div className="flex gap-[8px]">
                                    <input
                                      type="radio"
                                      name="reason"
                                      value="I found an alternative"
                                      onChange={(e) => {
                                        setReasonRefunds((prevReason) => ({
                                          ...prevReason,
                                          [index]: e.target.value,
                                        }));
                                      }}
                                    />
                                    <label className="text-gray-400 text-body2R">
                                      I found an alternative
                                    </label>
                                  </div>
                                  <div className="flex gap-[8px]">
                                    <input
                                      type="radio"
                                      name="reason"
                                      value="The booking was created by accident"
                                      onChange={(e) => {
                                        setReasonRefunds((prevReason) => ({
                                          ...prevReason,
                                          [index]: e.target.value,
                                        }));
                                      }}
                                    />
                                    <label className="text-gray-400 text-body2R">
                                      The booking was created by accident
                                    </label>
                                  </div>
                                  <div className="flex gap-[8px]">
                                    <input
                                      type="radio"
                                      name="reason"
                                      value="Other reasons"
                                      onChange={(e) => {
                                        setReasonRefunds((prevReason) => ({
                                          ...prevReason,
                                          [index]: e.target.value,
                                        }));
                                      }}
                                    />
                                    <label className="text-gray-400 text-body2R">
                                      Other reasons
                                    </label>
                                  </div>
                                </div>
                                <div className="grow bg-gray-0 rounded flex flex-col gap-[8px] p-[16px]">
                                  <div className="flex justify-between">
                                    <p className="text-gray-300 text-body2R">
                                      Ticket x{movie.seats.length}
                                    </p>
                                    <div className="text-gray-400 text-body2M ">
                                      THB{movie.seats.length * 150}
                                    </div>
                                  </div>
                                  {movie.coupon_type === "fixed" && (
                                    <>
                                      <div className="flex justify-between">
                                        <p className="text-gray-300 text-body2R">
                                          Coupon
                                        </p>
                                        <div className=" text-body2M text-red">
                                          - THB{movie.discount}
                                        </div>
                                      </div>

                                      <div className="flex justify-between">
                                        <p className="text-gray-300 text-body2R">
                                          Total
                                        </p>
                                        <div className=" text-body2M text-gray-400">
                                          THB
                                          {movie.seats.length * 150 -
                                            movie.discount}
                                        </div>
                                      </div>
                                      <div className="w-full bg-gray-200 h-[1px]" />
                                      <div className="flex justify-between">
                                        <p className="text-gray-300 text-body2R">
                                          Total refund
                                        </p>
                                        <div className=" text-body2M text-gray-400">
                                          THB
                                          {movie.seats.length * 150 -
                                            movie.discount}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  {movie.coupon_type === "percentage" && (
                                    <>
                                      <div className="flex justify-between">
                                        <p className="text-gray-300 text-body2R">
                                          Coupon
                                        </p>
                                        <div className=" text-body2M text-red">
                                          - THB
                                          {(movie.seats.length *
                                            150 *
                                            movie.discount) /
                                            100}
                                        </div>
                                      </div>

                                      <div className="flex justify-between">
                                        <p className="text-gray-300 text-body2R">
                                          Total
                                        </p>
                                        <div className=" text-body2M text-gray-400">
                                          THB
                                          {movie.seats.length * 150 -
                                            movie.seats.length *
                                              150 *
                                              (movie.discount / 100)}
                                        </div>
                                      </div>
                                      <div className="w-full bg-gray-200 h-[1px]" />
                                      <div className="flex justify-between">
                                        <p className="text-gray-300 text-body2R">
                                          Total refund
                                        </p>
                                        <div className=" text-body2M text-gray-400">
                                          THB
                                          {movie.seats.length * 150 -
                                            movie.seats.length *
                                              150 *
                                              (movie.discount / 100)}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex ">
                                <span className="text-body2R text-gray-300">
                                  {`Cancel booking before ${(
                                    movie.time - 1
                                  ).toFixed(2)} ${
                                    movie.select_date
                                  }, Refunds will be done according to `}
                                  <span className="text-white underline text-body2R text-[700]">
                                    Cancellation Policy
                                  </span>
                                </span>
                              </div>
                              <div className="flex justify-between gap-">
                                <form method="dialog">
                                  <button className="border rounded p-[12px_40px] border-gray-300 text-white hover:bg-gray-300 active:bg-gray-400">
                                    Back
                                  </button>
                                </form>
                                <button
                                  // type="submit"
                                  onClick={() => sendRefund(movie, index)}
                                  className={`text-body1M font-bold rounded-[4px] 
                                transition-all duration-300 ease-in-out   p-[12px_40px] ${
                                  reasonRefunds[index]
                                    ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                                    : "bg-blue-100/40 text-white/40 cursor-not-allowed"
                                }`}
                                >
                                  Refund
                                </button>
                              </div>
                            </div>
                          </dialog>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </div>
              ) : (
                <div className="flex justify-end items-center gap-[8px]">
                  <button
                    className="bg-gray-200 p-[6px_16px] rounded-[100px] font-medium text-white text-[14px] "
                    onClick={() => handleOngoing(index)}
                  >
                    Ongoing
                  </button>
                  <dialog id={`ongoing_${index}`} className="modal ">
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
