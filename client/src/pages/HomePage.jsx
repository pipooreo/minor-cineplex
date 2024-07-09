function HomePage() {
  return (
    <>
      <div className="box-border p-0 m-0">
        <section className="border-[purple] border-2 flex flex-col items-center relative">
          <img
            className="w-[100%] h-[400px] border-[red] border-2"
            src="https://s3-alpha-sig.figma.com/img/66bd/f9bc/e87b78b1ce0343d72f5934b7d8ea0e25?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cMl-mDW5BsFzI1weTzgTddRPq8LJ-0IPGoqpC8OjWfLevS4870qX2HYoZdpKm~8VzzxEPpUwlPU~Y2nzKAvPJpDZ4kGOSLh0ddN4imQBghIUJq7O1577IGgnwJ9qnhRYY~gKhqNp2IL3x4SwBpI8Vn2gctt0FXRxCobCXHimRqRwmP9Hw59iv~pp2~graHq~CxyuH1OhEyYNJ51-UIbhkPc~LjUVcii8XE2CSQvXRGJRA3OyHLi4kxztkPfWl6VqnMY~~IJSgQUT1HlYg~7QZv2j-9wpWWCTHrVkUUM9xQsMaj6w2y6LfSc7FipHEF-qnS6mDCFPojwsb1HgPu-TtQ__"
            alt="background homepage"
          />
          <div className="w-[1200px] h-[128px] rounded-[4px] bg-[#070C1B] border-[green] border-2 flex justify-center items-center gap-[6px] absolute top-[340px]">
            <div className="w-[1024px] h-[48px] flex flex-row justify-between items-center gap-[12px]">
              <select
                className="w-[267px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px]"
                name="movie"
              >
                <option>Movie</option>
                <option>batman</option>
                <option>powerpopgirl</option>
                <option>avengers</option>
                <option>the flash</option>
              </select>

              <select
                className="w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px]"
                name="language"
              >
                <option>Language</option>
                <option>Thailand</option>
                <option>English</option>
              </select>

              <select
                className="w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px]"
                name="genre"
              >
                <option>Genre</option>
                <option>Action</option>
                <option>Love</option>
              </select>

              <select
                className="w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px]"
                name="city"
              >
                <option>City</option>
                <option>Bangkok</option>
              </select>

              <input
                className="w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px]"
                type="date"
                name="releaseDate"
                placeholder="Release date"
              />
            </div>
            <button className="w-[72px] h-[48px] bg-[#4E7BEE] rounded-[4px] active:w-[70px] active:h-[46px]">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </section>
        <section className="h-[828px] px-[120px] pt-[144px] pb-[80px] bg-[#21263F] flex justify-center">
          <div className="border-[purple] border-2 flex flex-col gap-[16px]">
            <div className="w-[294px] h-[38px] border-[yellow] border-[2px] flex flex-row justify-between items-center">
              <div className="text-[white]">Now showing</div>
              <div className="text-[white]">Coming soon</div>
            </div>
            <div className="w-[1200px] h-[526px] border-[purple] border-2 gap-[20px]">
              <img className="w-[285px] h-[416px]" src="" alt="" />
              <div className="w-[285px] flex flex-col">
                <div className="flex flex-row justify-between">
                  <div className="text-[#8B93B0]">Date</div>
                  <div className="text-[#8B93B0]">Rating</div>
                </div>
                <div className="text-[white]">Name movie</div>
              </div>
              <div className="flex flex-row gap-[8px]">
                <div className="text-[#8B93B0]">Genre1</div>
                <div className="text-[#8B93B0]">Genre2</div>
                <div className="text-[#C8CEDD]">Language</div>
              </div>
            </div>
          </div>
        </section>
        <section></section>
        <section></section>
      </div>
    </>
  );
}

export default HomePage;
