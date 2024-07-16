import { FaCheck } from "react-icons/fa6";

function BookingPage() {
  return (
    <section className=" w-full h-screen absolute ">
      <div className="h-[80px] bg-BG"></div>
      <header className="bg-gray-0 h-[106px] flex justify-center items-center gap-[190px] relative">
        <div className="flex flex-col items-center w-[140px]">
          <FaCheck className="w-[44px] h-[44px] bg-blue-300  rounded-full text-white p-3 " />
          <p className="text-white text-[16px]">Select showtime</p>
        </div>
        {/* <hr className="w-[100px]" /> */}
        <div className="flex flex-col items-center w-[140px] absolute z-10">
          <div className="w-[44px] h-[44px] bg-blue-100  rounded-full text-white text-center pt-[9px]">
            2
          </div>
          <p className="text-white text-[16px]">Select seat</p>
        </div>
        <div className="flex flex-col items-center w-[140px]">
          <div className="w-[44px] h-[44px]  rounded-full text-white text-center pt-[9px] border-gray-100 border">
            3
          </div>
          <p className="text-white text-[16px]">Payment</p>
        </div>
        <hr className="w-[287px] absolute mb-[20px] border-gray-100" />
      </header>
      <div className="bg-BG h-full flex justify-center p-[80px_120px] gap-[102px]">
        <div className="flex flex-col w-[793px]  gap-[60px]">
          <div className="rounded-[80px_80px_0px_0px] bg-gradient-to-r from-[#2C344E] to-[#516199] text-center h-[44px] pt-[8px] font-bold text-white">
            screen
          </div>
          <div className=" flex justify-between">
            <div className=" flex gap-[24px] items-center">
              E{" "}
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
            </div>
            <div className=" flex gap-[24px] items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
              E
            </div>
          </div>
          <div className=" flex justify-between">
            <div className=" flex gap-[24px] items-center">
              D{" "}
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
            </div>
            <div className=" flex gap-[24px] items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
              D
            </div>
          </div>
          <div className=" flex justify-between">
            <div className=" flex gap-[24px] items-center">
              C{" "}
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
            </div>
            <div className=" flex gap-[24px] items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
              C
            </div>
          </div>
          <div className=" flex justify-between">
            <div className=" flex gap-[24px] items-center">
              B{" "}
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
            </div>
            <div className=" flex gap-[24px] items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
              B
            </div>
          </div>
          <div className=" flex justify-between">
            <div className=" flex gap-[24px] items-center">
              A{" "}
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
            </div>
            <div className=" flex gap-[24px] items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                  className="w-[40px] h-[40px]"
                />
              ))}
              A
            </div>
          </div>
          <div className="flex gap-[40px] p-[16px_0px] border-t border-gray-100">
            <div className="bg-gray-100 rounded-[4px] p-[12px_16px] font-bold text-[24px]">
              Hall 1
            </div>
            <div className="flex gap-[16px] p-2 items-center ">
              <img
                src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105746/Seat_icon_jfb7fn.png"
                className="w-[40px] h-[40px]"
              />
              Available Seat THB150
            </div>
            <div className="flex gap-[16px] p-2 items-center">
              <img
                src="https://res.cloudinary.com/diah9m6gw/image/upload/v1721105998/Seat_icon_1_gpwdvp.png"
                className="w-[40px] h-[40px]"
              />
              <p>Booked Seat</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[30%] text-white p-[16px_16px_24px_16px] gap-[24px] bg-gray-0 h-[40%]">
          <div className=" flex items-center gap-[12px]">
            <img className="w-[82.21px] h-[120px] border" src="" />
            <div className="flex flex-col gap-[8px]">
              <div className="font-bold text-[20px] ">Title</div>
              <div className="flex justify-between gap-[8px]">
                <div className="bg-gray-100 rouned-[4px] p-[6px_12px] text-gray-300">
                  Action
                </div>
                <div className="bg-gray-100 rouned-[4px] p-[6px_12px] text-gray-300">
                  Crime
                </div>
                <div className="bg-gray-100 rouned-[4px] p-[6px_12px] text-gray-400 font-medium">
                  TH
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[12px] items-center">
              <i className="fa-solid fa-location-dot w-[16px] h-[16px] text-gray-200"></i>
              <p className="text-gray-400">Minor Cineplex Arkham</p>
            </div>
            <div className="flex gap-[12px] items-center">
              <i className="fa-solid fa-calendar-days w-[16px] h-[16px] text-gray-200"></i>
              <p className="text-gray-400">24 Jun 2024</p>
            </div>
            <div className="flex gap-[12px] items-center">
              <i className="fa-solid fa-clock w-[16px] h-[16px] text-gray-200"></i>
              <p className="text-gray-400">16:30</p>
            </div>
            <div className="flex gap-[12px] items-center">
              <i className="fa-solid fa-shop w-[16px] h-[16px] text-gray-200"></i>
              <p className="text-gray-400">Hall 1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
