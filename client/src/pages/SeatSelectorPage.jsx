import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function SeatSelectorPage() {
  const [movie, setMovie] = useState();
  // const [seatStatuses, setSeatStatuses] = useState(Array(50).fill("available"));
  const [seatStatuses, setSeatStatuses] = useState([]);
  const params = useParams();
  const seatPrice = 150;
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const navigate = useNavigate();

  function getSeat(seatArray) {
    let seatNumber = [];
    seatArray.map((num) => {
      if (num.status === "reserve") {
        seatNumber.push(num.seat);
      }
    });
    return seatNumber;
  }

  async function getMovie() {
    // console.log(params);
    let movieData = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/booking?cinema=${
        params.cinema
      }&movie=${params.title}&hall=${params.hall}&time=${
        params.time
      }&select_date=${params.date}`
    );
    // console.log("MovieListData: ", movieData.data.data);
    setMovie(movieData.data.data);
    setSeatStatuses(movieData.data.data.seat_status_array);
  }

  function getSeatNumber(seatArray) {
    return seatArray
      .filter((seat) => seat.status === "reserve")
      .map((seat) => seat.number);
  }

  const openDialog = () => {
    const dialog = document.getElementById("alert");
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

  async function handleReserveSeat() {
    const data = {
      user: user.id,
      cinema: movie.cinema_name,
      movie: movie.title,
      select_date: movie.select_date,
      time: movie.screening_time,
      hall: movie.hall_number,
      seats: getSeat(seatStatuses),
    };

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/booking`,
        data
      );
      if (result.status === 200) {
        navigate(
          `/payment/${movie.title}/${movie.cinema_name}/${movie.select_date}/${movie.hall_number}/${movie.screening_time}`
        );
      }
    } catch (err) {
      getMovie();
      openDialog();
    }
  }

  useEffect(() => {
    getMovie();
  }, []);

  const handleSeatClick = (index) => {
    const newStatuses = [...seatStatuses];
    if (newStatuses[index].status === "available") {
      // console.log(newStatuses[index]);
      newStatuses[index].status = "reserve";
    } else if (newStatuses[index].status === "reserve") {
      newStatuses[index].status = "available";
    }
    // else {
    //   newStatuses[index] = "reserve";
    // }
    setSeatStatuses(newStatuses);
  };

  const SeatButton = (index) => {
    let imgSrc =
      "https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png";
    if (seatStatuses[index]?.status === "reserve") {
      imgSrc =
        "https://res.cloudinary.com/diah9m6gw/image/upload/v1721541284/Seat_icon_2_dpv2uw.png";
    } else if (
      seatStatuses[index]?.status === "booked" ||
      seatStatuses[index]?.status === "reserved"
    ) {
      imgSrc =
        "https://res.cloudinary.com/diah9m6gw/image/upload/v1721105998/Seat_icon_1_gpwdvp.png";
    }
    return (
      <button
        key={index}
        onClick={() => handleSeatClick(index)}
        className={seatStatuses[index]?.status}
      >
        <img
          src={imgSrc}
          className="md:w-[40px] md:h-[40px] min-[479px]:w-[22px] min-[479px]:h-[22px] w-[18.67px] h-[18.67px]"
        />
      </button>
    );
  };
  // console.log(seatStatuses);
  const reservedSeatsCount = seatStatuses.filter(
    (status) => status.status === "reserve"
  ).length;
  const totalPrice = reservedSeatsCount * seatPrice;

  const renderSelectedSeats = () => {
    const seatNumbers = getSeatNumber(seatStatuses);
    const rows = seatNumbers.reduce((rows, seatNumber, index) => {
      if (index % 4 === 0) rows.push([]);
      rows[rows.length - 1].push(seatNumber);
      return rows;
    }, []);

    return (
      <div className="flex flex-col items-end gap-1">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            <span className="inline-block p-[1px_6px] bg-blue-500 text-white text-center rounded-[4px] text-sm">
              {row.join(", ")}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className=" w-full bg-BG absolute">
      <div className=" h-screen">
        <div className="h-[80px] bg-BG max-md:h-[48px]"></div>
        <header className="bg-gray-0 h-[106px] flex justify-center items-center gap-[190px]   max-md:gap-[80px]">
          <div className="flex flex-col items-center w-[140px]">
            <FaCheck className="w-[44px] h-[44px] bg-blue-300  rounded-full text-white p-3 " />
            <p className="text-white text-[16px] max-md:text-[14px]">
              Select showtime
            </p>
          </div>
          <div className="flex flex-col items-center w-[140px] absolute z-10">
            <div className="w-[44px] h-[44px] bg-blue-100  rounded-full text-white text-center pt-[9px]">
              2
            </div>
            <p className="text-white text-[16px] max-md:text-[14px]">
              Select seat
            </p>
          </div>
          <div className="flex flex-col items-center w-[140px]">
            <div className="w-[44px] h-[44px]  rounded-full text-white text-center pt-[9px] border-gray-100 border">
              3
            </div>
            <p className="text-white text-[16px] max-md:text-[14px]">Payment</p>
          </div>
          <hr className="w-[287px] absolute mb-[20px] border-gray-100 max-md:w-[176px]" />
        </header>

        <div className=" bg-BG h-full flex justify-center xl:p-[80px_120px] p-[80px_40px] xl:gap-[102px] gap-[28px] max-lg:items-center max-md:flex-col max-lg:p-[40px_1rem] max-lg:flex-col max-lg:gap-[40px] max-md:justify-start max-md:items-center">
          <div className=" flex flex-col lg:w-[793px]  gap-[60px] w-full md:w-[710px]">
            <div className="rounded-[80px_80px_0px_0px] bg-gradient-to-r from-[#2C344E] to-[#516199] text-center text-body1M h-[44px] pt-[8px] font-bold text-gray-400">
              screen
            </div>
            <div className="flex flex-col xl:gap-[30px] md:gap-[20px] gap-[10px]">
              {["E", "D", "C", "B", "A"].map((rowLabel, rowIndex) => (
                <div key={rowLabel} className="flex justify-between gap-[20%]">
                  <div className="flex justify-between w-full">
                    <p className="w-[15px] text-gray-300 text-body1M">
                      {rowLabel}
                    </p>
                    {Array.from({ length: 5 }).map((_, i) =>
                      SeatButton(i + rowIndex * 5)
                    )}
                  </div>
                  <div className="flex justify-between w-full">
                    {Array.from({ length: 5 }).map((_, i) =>
                      SeatButton(i + rowIndex * 5 + 25)
                    )}
                    <p className="w-[15px] text-gray-300 text-body1M">
                      {rowLabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-[40px] p-[16px_0px] border-t border-gray-100 max-md:flex-col ">
              <div className="bg-gray-100 text-gray-400 rounded-[4px] p-[12px_16px] font-bold text-[24px] max-md:w-[100px]">
                {movie && movie.hall_number}
              </div>
              <div className="flex gap-[40px]">
                <div className="flex gap-[16px] p-2 items-center max-md:grid-cols-2">
                  <img
                    src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                    className="w-[40px] h-[40px]"
                  />
                  <div>
                    <p className="text-gray-400 text-body1R">Available Seat</p>
                    <p className="text-gray-400 text-body1R">THB150</p>
                  </div>
                </div>
                <div className="flex gap-[16px] p-2 items-center">
                  <img
                    src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105998/Seat_icon_1_gpwdvp.png"
                    className="w-[40px] h-[40px]"
                  />
                  <p className="text-gray-400 text-body1R">Booked Seat</p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:w-[375px] max-lg:w-[100%] xl:[350px]">
            <div className="flex flex-col w-[320px] text-white px-[16px] pb-[24px] pt-[16px] gap-[24px] bg-gray-0 rounded-[8px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
              {movie && (
                <div className=" flex gap-[12px] ">
                  <img
                    className="w-[82.21px] h-[120px] rounded-[4px]"
                    src={movie.movie_image}
                  />
                  <div className="flex flex-col gap-[8px]">
                    <div className="font-bold text-[20px] ">{movie.title}</div>
                    <div className="py-[10px] pr-[10px] grid-cols-4 grid lg:grid-cols-3 text-center gap-3">
                      {movie.movie_genres.map((item, index) => {
                        return (
                          <p
                            className="bg-gray-100 text-gray-300 text-body2R rounded-[4px] px-[6px] py-[12px]"
                            key={index}
                          >
                            {item}
                          </p>
                        );
                      })}

                      <p className="bg-gray-100 text-gray-400 text-body2M rounded-[4px] px-[6px] py-[12px]">
                        {movie.language}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-[8px]">
                <div className="flex gap-[12px] items-center">
                  <i className="fa-solid fa-location-dot w-[16px] h-[16px] text-gray-200"></i>
                  <p className="text-gray-400">{movie && movie.cinema_name}</p>
                </div>
                <div className="flex gap-[12px] items-center">
                  <i className="fa-solid fa-calendar-days w-[16px] h-[16px] text-gray-200"></i>
                  <p className="text-gray-400">{movie && movie.select_date}</p>
                </div>
                <div className="flex gap-[12px] items-center">
                  <i className="fa-solid fa-clock w-[16px] h-[16px] text-gray-200"></i>
                  <p className="text-gray-400">
                    {movie && movie.screening_time}
                  </p>
                </div>
                <div className="flex gap-[12px] items-center">
                  <i className="fa-solid fa-shop w-[16px] h-[16px] text-gray-200"></i>
                  <p className="text-gray-400">{movie && movie.hall_number}</p>
                </div>
              </div>
            </div>
            {seatStatuses.some((seat) => seat.status === "reserve") && (
              <div className="flex flex-col p-[16px] mt-[-10px] bg-gray-0 max-h-full rounded-[8px] gap-[16px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
                <div className="flex justify-between">
                  <p className="text-gray-400">Selected Seat</p>
                  <div className="flex flex-col gap-[10px]">
                    {renderSelectedSeats()}
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400">Tickets: {reservedSeatsCount}</p>
                  <p className=" text-white">THB{totalPrice}</p>
                </div>
                <button
                  className="btn btn-primary bg-blue-100 h-[48px] hover:bg-blue-200 active:bg-blue-300 rounded-[8px] text-white"
                  onClick={handleReserveSeat}
                >
                  Pay THB{totalPrice}
                </button>
              </div>
            )}
            <dialog id="alert" className="modal ">
              <div className="modal-box bg-gray-100 border-gray-200 border flex flex-col gap-[40px] w-[343px]">
                <form method="dialog">
                  <h3 className="font-bold text-[20px] text-center text-white">
                    Your chosen seat is
                    <br />
                    no longer available
                  </h3>
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div className="text-center">
                  <p className="text-gray-400 text-[14px]">
                    Please select another seat to complete your booking
                  </p>
                </div>

                {/* <div className="flex gap-[16px] justify-center"> */}
                <form method="dialog" className="flex">
                  <button
                    className="text-body1M font-bold rounded-[4px] 
                                transition-all duration-300 ease-in-out grow  p-[12px_40px] 
                                    bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                    // onClick={() =>
                    //   navigate(
                    //     `/payment/${movie.title}/${movie.cinema_name}/${movie.select_date}/${movie.hall_number}/${movie.time}`
                    //   )
                    // }
                  >
                    OK
                  </button>
                </form>
                {/* </div> */}
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeatSelectorPage;
