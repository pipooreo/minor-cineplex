import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function SeatSelectorPage() {
  const [movie, setMovie] = useState();
  // const [seatStatuses, setSeatStatuses] = useState(Array(50).fill("available"));
  const [seatStatuses, setSeatStatuses] = useState([]);
  const params = useParams();
  const seatPrice = 150;
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

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
    // console.log(movieData.data.data);
    setMovie(movieData.data.data);
    setSeatStatuses(movieData.data.data.seat_status_array);
  }

  function getSeatNumber(seatArray) {
    return seatArray
      .filter((seat) => seat.status === "reserve")
      .map((seat) => seat.number);
  }

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
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/booking`, data);
    } catch (err) {}
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
          className="w-[40px] h-[40px] max-md:w-[18.67px] max-md:h-[18.67px]"
        />
      </button>
    );
  };
  // console.log(seatStatuses);
  const reservedSeatsCount = seatStatuses.filter(
    (status) => status.status === "reserve"
  ).length;
  const totalPrice = reservedSeatsCount * seatPrice;

  return (
    <section className=" w-full h-screen absolute ">
      <div className="bg-BG">
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
      </div>
      <div className=" bg-BG h-full flex justify-center p-[80px_120px] gap-[102px] max-lg:items-center max-md:flex-col max-lg:p-[1px_30px] max-lg:flex-col  max-lg:h-[1200px] max-lg:gap-[40px] max-md:justify-start max-md:items-center max-md:pt-[100px]">
        <div className=" flex flex-col w-[793px]  gap-[60px] max-md:w-[343px] max-lg:w-[710px] max-lg:mt-[-100px] max-md:mt-[0px]">
          <div className="rounded-[80px_80px_0px_0px] bg-gradient-to-r from-[#2C344E] to-[#516199] text-center h-[44px] pt-[8px] font-bold text-white ">
            screen
          </div>
          <div className="flex flex-col gap-[30px] max-md:gap-[10px]">
            {["E", "D", "C", "B", "A"].map((rowLabel, rowIndex) => (
              <div key={rowLabel} className="flex justify-between">
                <div className="flex gap-[24px] items-center max-md:gap-[10px] max-xl:gap-[10px] max-[1400px]:gap-[10px]">
                  <p className="w-[15px] text-white">{rowLabel}</p>
                  {Array.from({ length: 5 }).map((_, i) =>
                    SeatButton(i + rowIndex * 5)
                  )}
                </div>
                <div className="flex gap-[24px] items-center max-md:gap-[10px] max-xl:gap-[10px] max-[1400px]:gap-[10px]">
                  {Array.from({ length: 5 }).map((_, i) =>
                    SeatButton(i + rowIndex * 5 + 25)
                  )}
                  <p className="w-[15px] text-white">{rowLabel}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-[40px] p-[16px_0px] border-t border-gray-100 max-md:flex-col">
            <div className="bg-gray-100 text-white rounded-[4px] p-[12px_16px] font-bold text-[24px] max-md:w-[100px]">
              {movie && movie.hall_number}
            </div>
            <div className="flex gap-[40px]">
              <div className="flex gap-[16px] p-2 items-center max-md:grid-cols-2">
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
                <p className="text-white">Available Seat THB150</p>
              </div>
              <div className="flex gap-[16px] p-2 items-center">
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105998/Seat_icon_1_gpwdvp.png"
                  className="w-[40px] h-[40px]"
                />
                <p className="text-white">Booked Seat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
          <div className="flex flex-col w-[320px] text-white p-[16px_16px_24px_16px] gap-[24px] bg-gray-0 h-[304px] rounded-[8px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
            {movie && (
              <div className=" flex items-center gap-[12px]">
                <img
                  className="w-[82.21px] h-[120px] rounded-[4px]"
                  src={movie.movie_image}
                />
                <div className="flex flex-col gap-[8px]">
                  <div className="font-bold text-[20px] ">{movie.title}</div>
                  <div className="flex  gap-[8px] flex-wrap">
                    {movie.movie_genres.map((item, index) => (
                      <div
                        className="bg-gray-100 rouned-[4px] p-[6px_12px] text-gray-300"
                        key={index}
                      >
                        {item}
                      </div>
                    ))}
                    <div className="bg-gray-100 rouned-[4px] p-[6px_12px] text-gray-400 font-medium">
                      {movie.language}
                    </div>
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
                <p className="text-gray-400">{movie && movie.screening_time}</p>
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
                <div className="flex gap-[5px] flex-wrap w-[40%] justify-end">
                  {getSeatNumber(seatStatuses).map((seatNumber, index) => (
                    <p
                      key={index}
                      className="p-[1px_2px] bg-blue-100 text-white rounded-[4px]"
                    >
                      {seatNumber}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400">Tickets: {reservedSeatsCount}</p>
                <p className=" text-white">THB{totalPrice}</p>
              </div>
              <button
                className="btn btn-primary bg-blue-100 h-[48px] rounded-[8px] text-white"
                onClick={handleReserveSeat}
              >
                Pay THB{totalPrice}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SeatSelectorPage;
