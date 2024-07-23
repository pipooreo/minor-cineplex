import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";

function Header() {
  const {
    citySearch,
    setCitySearch,
    titleSearch,
    setTitleSearch,
    languageSearch,
    setLanguageSearch,
    genreSearch,
    setGenreSearch,
    dateSearch,
    setDateSearch,
  } = useSearch();

  const navigate = useNavigate();

  const createQueryParams = () => {
    const queryParams = new URLSearchParams();

    if (citySearch) queryParams.append("city", citySearch);
    if (titleSearch) queryParams.append("title", titleSearch);
    if (languageSearch) queryParams.append("language", languageSearch);
    if (genreSearch) queryParams.append("genre", genreSearch);
    if (dateSearch) queryParams.append("date", dateSearch);
    return queryParams.toString();
  };

  const handleSearch = () => {
    const query = createQueryParams();
    navigate(`/moviesearch?${query}`);
  };

  return (
    <section className="relative flex justify-center items-center">
      <div
        className="md:w-full md:h-[400px] md:bg-bottom  md:bg-[length:100%_1100px] w-full h-[265px] bg-left-bottom  bg-[length:100%_550px]"
        style={{
          backgroundImage:
            "linear-gradient(360deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url('https://s3-alpha-sig.figma.com/img/66bd/f9bc/e87b78b1ce0343d72f5934b7d8ea0e25?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cMl-mDW5BsFzI1weTzgTddRPq8LJ-0IPGoqpC8OjWfLevS4870qX2HYoZdpKm~8VzzxEPpUwlPU~Y2nzKAvPJpDZ4kGOSLh0ddN4imQBghIUJq7O1577IGgnwJ9qnhRYY~gKhqNp2IL3x4SwBpI8Vn2gctt0FXRxCobCXHimRqRwmP9Hw59iv~pp2~graHq~CxyuH1OhEyYNJ51-UIbhkPc~LjUVcii8XE2CSQvXRGJRA3OyHLi4kxztkPfWl6VqnMY~~IJSgQUT1HlYg~7QZv2j-9wpWWCTHrVkUUM9xQsMaj6w2y6LfSc7FipHEF-qnS6mDCFPojwsb1HgPu-TtQ__')",
        }}
      ></div>
      <div className="absolute top-[133px] md:top-[250px] xl:top-[340px] bg-[#070C1B] rounded-[4px] w-[344px] sm:w-[60%] sm:px-[20px] p-[20px] xl:w-[1200px] h-[264px] xl:h-[128px] flex flex-col xl:flex-row justify-around items-center xs:gap-[15px] gap-[6px] max-[375px]:flex-col max-[375px]:gap-[16px]">
        <div className="grid grid-cols-2 xl:flex xl:justify-between xl:gap-[15px] gap-[12px] w-[312px] sm:w-[90%]  h-[168px] xl:h-[48px]">
          <select
            value={titleSearch}
            onChange={(event) => {
              setTitleSearch(event.target.value);
            }}
            className="col-span-2  xl:w-[267px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            name="movie"
          >
            <option value="">Movie</option>
            <option>The Dark Knight</option>
            <option>Django Unchained</option>
            <option>DUNE: Part Two</option>
            <option>Interstellar</option>
          </select>

          <select
            value={languageSearch}
            onChange={(event) => {
              setLanguageSearch(event.target.value);
            }}
            className="col-span-1  xl:w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            name="language"
          >
            <option value="">Language</option>
            <option>EN</option>
            <option>TH</option>
            <option>TH/EN</option>
          </select>

          <select
            value={genreSearch}
            onChange={(event) => {
              setGenreSearch(event.target.value);
            }}
            className="col-span-1  xl:w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            name="genre"
          >
            <option value="">Genre</option>
            <option>Action</option>
            <option>Crime</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Sci-fi</option>
          </select>

          <select
            value={citySearch}
            onChange={(event) => {
              setCitySearch(event.target.value);
            }}
            className="col-span-1  xl:w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            name="city"
          >
            <option value="">City</option>
            <option>Bangkok</option>
            <option>Nonthaburi</option>
            <option>Pathumthani</option>
          </select>

          <input
            value={dateSearch}
            onChange={(event) => {
              setDateSearch(event.target.value);
            }}
            className="col-span-1  xl:w-[177.25px] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none "
            type="date"
            name="releaseDate"
            placeholder="Release date"
          />
        </div>
        <button
          className="w-[72px] h-[48px] bg-[#4E7BEE] rounded-[4px] active:w-[71.5px] active:h-[47.5px]"
          onClick={handleSearch}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </section>
  );
}

export default Header;
