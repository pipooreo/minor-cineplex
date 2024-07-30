function BookingHistory(props) {
  const history = props.user;

  return (
    <div className="flex flex-col gap-[24px]">
      <h1 className="text-[36px] text-white font-bold">Booking history</h1>
      {history?.map((movie, index) => {
        return (
          <div className="flex flex-col" key={index}>
            <div className="flex flex-col w-[691px] text-white px-[16px] pb-[24px] pt-[16px] gap-[24px] bg-gray-0 rounded-[8px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
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

            <div className="flex justify-between p-[16px] mt-[-10px] bg-gray-0 max-h-full rounded-[8px] gap-[16px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
              <div className="flex gap-[24px]">
                <div className="bg-gray-100 p-[12px_16px] rounded-[4px] text-gray-400 font-bold">
                  {movie.seats.length} Ticket
                </div>
                <div className="flex justify-between w-[172px]">
                  <p className="text-gray-300 text-[14px]">Selected Seat</p>
                  <div className="flex gap-[5px] flex-wrap justify-end">
                    {movie.seats.map((seat, index) => {
                      return (
                        <div key={index} className="text-gray-400 text-[14px] ">
                          {seat}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button className="bg-green p-[6px_16px] rounded-[100px] font-medium text-white text-[14px]">
                {movie.payment_status}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookingHistory;
