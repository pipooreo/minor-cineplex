function SearchResultPage() {
  return (
    <div>
      <section className="h-[256px] bg-[#070C1B] border-[1px] border-[red] xl:flex xl:flex-col xl:justify-center xl:items-center xl:gap-[24px]">
        <div className="w-[1200px] border-[1px] border-[#11ff6c] mt-[80px] rounded-[4px] flex justify-center items-center gap-[24px]">
          <div className="h-[48px] flex flex-row justify-between items-center gap-[12px] max-[375px]:w-[312px] max-[375px]:h-[168px] max-[375px]:flex max-[375px]:flex-wrap">
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
              className="w-[197.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[150px]"
              name="language"
            >
              <option>Language</option>
              <option>Thailand</option>
              <option>English</option>
            </select>

            <select
              className="w-[197.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[150px]"
              name="genre"
            >
              <option>Genre</option>
              <option>Action</option>
              <option>Love</option>
            </select>

            <select
              className="w-[197.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[150px]"
              name="city"
            >
              <option>City</option>
              <option>Bangkok</option>
            </select>

            <input
              className="w-[197.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none max-[375px]:w-[150px]"
              type="date"
              name="releaseDate"
              placeholder="Release date"
            />
          </div>
          <button className="w-[72px] h-[48px] bg-[#4E7BEE] rounded-[4px] active:w-[71.5px] active:h-[47.5px]">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="xl:w-[1200px] xl:h-[24px] border-[1px] border-[yellow] xl:flex xl:flex-row xl:justify-between">
          <div className="xl:flex xl:flex-row xl:gap-[24px]">
            <div className="text-white">Wheelchair access</div>
            <div className="text-white">Hearing assistance</div>
          </div>
          <div className="text-white underline underline-offset-2">Clear</div>
        </div>
      </section>
      {/* <section className="flex flex-col items-center">
        <div className="bg-[#070C1B] rounded-[4px] w-[344px] sm:w-[60%] sm:px-[20px] p-[20px] xl:w-[1200px] h-[264px] xl:h-[128px] flex flex-col xl:flex-row justify-around items-center xs:gap-[15px] gap-[6px] max-[375px]:flex-col max-[375px]:gap-[16px]">
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
      </section> */}
      <section></section>
    </div>
  );
}

export default SearchResultPage;
