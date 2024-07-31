import { useRef } from "react";

function BookingHistory(props) {
  const history = props.user;
  const today = new Date();
  // const dialogRefs = useRef([]);
  // console.log(today, history.select_date);

  // const openDialog = (index) => {
  //   const dialog = dialogRefs.current[index];
  //   // console.log(image);
  //   if (dialog) {
  //     dialog.showModal();
  //   }
  // };

  const openReview = (index) => {
    const dialog = document.getElementById(`review_${index}`);
    // console.log(image);
    if (dialog) {
      dialog.showModal();
    }
  };

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
                <div>
                  <div className="flex justify-between">
                    <p className="text-gray-300 text-[14px]">Selected Seat</p>
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
                  <div className="flex justify-between gap-[20px]">
                    <p className="text-gray-300 text-[14px]">Payment method</p>
                    <div className="text-gray-400 text-[14px] ">
                      {movie.payment_method}
                    </div>
                  </div>
                </div>
              </div>
              {today > new Date(movie.select_date) ? (
                <div className="flex items-center gap-[8px]">
                  <button
                    className="underline text-white font-bold"
                    onClick={() => {
                      // openDialog(index);
                      openReview(index);
                    }}
                  >
                    Review
                  </button>
                  <dialog
                    id={`review_${index}`}
                    // ref={(el) => (dialogRefs.current[index] = el)}
                    className="modal "
                  >
                    <div className="modal-box bg-gray-100 border-gray-200 border flex flex-col gap-[40px]">
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
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-blue-100"
                              />
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-blue-100"
                                defaultChecked
                              />
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-blue-100"
                              />
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-blue-100"
                              />
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-blue-100"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-gray-400">
                            Text Area Label
                          </label>
                          <textarea
                            className="h-[102px] bg-gray-100 border border-gray-200 p-[8px_2px_2px_8px] rounded text-white"
                            // placeholder="Nice..."
                          />
                        </div>
                      </div>
                      <div className="flex gap-[16px]">
                        <form method="dialog" className="grow">
                          <button className="btn w-full text-white">
                            Cancel
                          </button>
                        </form>
                        <button className="btn grow bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white">
                          Send
                        </button>
                      </div>
                    </div>
                  </dialog>
                  <div className="text-white text-[14px] font-medium border border-gray-100 p-[6px_16px] rounded-[100px]">
                    Completed
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-[8px]">
                  <button className="bg-green p-[6px_16px] rounded-[100px] font-medium text-white text-[14px] ">
                    {/* {movie.payment_status} */} Paid
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
