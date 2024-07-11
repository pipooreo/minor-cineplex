import Navbar from "../Navbar";
function Header() {
  return (
    <section className="relative flex flex-col items-center">
      <div
        className="md:w-full md:h-[400px] md:bg-bottom  md:bg-[length:100%_1100px] w-full h-[265px] bg-left-bottom  bg-[length:100%_550px]"
        style={{
          backgroundImage:
            "linear-gradient(360deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url('https://s3-alpha-sig.figma.com/img/66bd/f9bc/e87b78b1ce0343d72f5934b7d8ea0e25?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cMl-mDW5BsFzI1weTzgTddRPq8LJ-0IPGoqpC8OjWfLevS4870qX2HYoZdpKm~8VzzxEPpUwlPU~Y2nzKAvPJpDZ4kGOSLh0ddN4imQBghIUJq7O1577IGgnwJ9qnhRYY~gKhqNp2IL3x4SwBpI8Vn2gctt0FXRxCobCXHimRqRwmP9Hw59iv~pp2~graHq~CxyuH1OhEyYNJ51-UIbhkPc~LjUVcii8XE2CSQvXRGJRA3OyHLi4kxztkPfWl6VqnMY~~IJSgQUT1HlYg~7QZv2j-9wpWWCTHrVkUUM9xQsMaj6w2y6LfSc7FipHEF-qnS6mDCFPojwsb1HgPu-TtQ__')",
        }}
      >
        {/* <Navbar /> */}
      </div>
      <div className="absolute top-[133px] md:top-[250px] xl:top-[340px] bg-[#070C1B] rounded-[4px] w-[344px] sm:w-[60%] sm:px-[20px] p-[20px] xl:w-[1200px] h-[264px] xl:h-[128px] flex flex-col xl:flex-row justify-around items-center xs:gap-[15px] gap-[6px] max-[375px]:flex-col max-[375px]:gap-[16px]">
        <div className="grid grid-cols-2 xl:flex xl:justify-between xl:gap-[15px] gap-[12px] w-[312px] sm:w-[90%]  h-[168px] xl:h-[48px]">
          <select
            className="col-span-2  xl:w-[267px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            name="movie"
          >
            <option>Movie</option>
            <option>batman</option>
            <option>powerpopgirl</option>
            <option>avengers</option>
            <option>the flash</option>
          </select>

          <select
            className="col-span-1  xl:w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            name="language"
          >
            <option>Language</option>
            <option>Thailand</option>
            <option>English</option>
          </select>

          <select
            className="col-span-1  xl:w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            name="genre"
          >
            <option>Genre</option>
            <option>Action</option>
            <option>Love</option>
          </select>

          <select
            className="col-span-1  xl:w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            name="city"
          >
            <option>City</option>
            <option>Bangkok</option>
          </select>

          <input
            className="col-span-1  xl:w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
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
