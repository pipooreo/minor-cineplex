import Navbar from "../Navbar";
function Header() {
  return (
    <section className="flex flex-col items-center relative ">
      <div
        className="w-[100%] h-[400px] bg-bottom bg-cover bg-[length:100%_1100px] max-[375px]:w-[375px] max-[375px]:h-[265px] max-[375px]:bg-left-bottom max-[375px]:bg-cover max-[375px]:bg-[length:100%_550px]"
        style={{
          backgroundImage:
            "linear-gradient(360deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url('https://s3-alpha-sig.figma.com/img/66bd/f9bc/e87b78b1ce0343d72f5934b7d8ea0e25?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cMl-mDW5BsFzI1weTzgTddRPq8LJ-0IPGoqpC8OjWfLevS4870qX2HYoZdpKm~8VzzxEPpUwlPU~Y2nzKAvPJpDZ4kGOSLh0ddN4imQBghIUJq7O1577IGgnwJ9qnhRYY~gKhqNp2IL3x4SwBpI8Vn2gctt0FXRxCobCXHimRqRwmP9Hw59iv~pp2~graHq~CxyuH1OhEyYNJ51-UIbhkPc~LjUVcii8XE2CSQvXRGJRA3OyHLi4kxztkPfWl6VqnMY~~IJSgQUT1HlYg~7QZv2j-9wpWWCTHrVkUUM9xQsMaj6w2y6LfSc7FipHEF-qnS6mDCFPojwsb1HgPu-TtQ__')",
        }}
      >
        {/* <Navbar /> */}
      </div>
      <div className=" w-[1200px] h-[128px] rounded-[4px] bg-[#070C1B] flex justify-center items-center gap-[6px] absolute top-[340px] max-[375px]:w-[344px] max-[375px]:h-[264px] max-[375px]:flex max-[375px]:flex-col max-[375px]:gap-[16px] max-[375px]:absolute max-[375px]:top-[133px]">
        <div className="w-[1024px] h-[48px] flex flex-row justify-between items-center gap-[12px] max-[375px]:w-[312px] max-[375px]:h-[168px] max-[375px]:flex max-[375px]:flex-wrap">
          <select
            className="w-[267px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[312px]"
            name="movie"
          >
            <option>Movie</option>
            <option>batman</option>
            <option>powerpopgirl</option>
            <option>avengers</option>
            <option>the flash</option>
          </select>

          <select
            className="w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[150px]"
            name="language"
          >
            <option>Language</option>
            <option>Thailand</option>
            <option>English</option>
          </select>

          <select
            className="w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[150px]"
            name="genre"
          >
            <option>Genre</option>
            <option>Action</option>
            <option>Love</option>
          </select>

          <select
            className="w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[150px]"
            name="city"
          >
            <option>City</option>
            <option>Bangkok</option>
          </select>

          <input
            className="w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[150px]"
            type="date"
            name="releaseDate"
            placeholder="Release date"
          />
        </div>
        <button className="w-[72px] h-[48px] bg-[#4E7BEE] rounded-[4px] active:w-[71.5px] active:h-[47.5px]">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </section>
  );
}

export default Header;
