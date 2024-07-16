import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchResultPage() {
  const [isOpen, setIsOpen] = useState();
  const [search, setSearch] = useState([]);
  const [keepToggle, setKeepToggle] = useState([]);

  const getDataSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/search`);
      setSearch(response.data.data);
      // console.log(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getDataSearch();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <section className="border-[1px] border-[red] bg-[#070C1B] pt-[120px] pb-[40px] flex flex-col items-center gap-[24px]">
        <div className="border-[1px] border-[#11ff6c] bg-[#070C1B] rounded-[4px] sm:w-[60%] flex flex-col justify-between items-center xl:w-[80%] xl:flex xl:flex-row xs:gap-[24px] xs:flex-col">
          <div className="border-[1px] border-[#d711ff] w-[100%]  grid grid-cols-2 gap-[12px] xl:flex xl:justify-between xl:gap-[12px]">
            <select
              className="col-span-2 xl:w-[30%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="movie"
            >
              <option>Movie</option>
              <option>batman</option>
              <option>powerpopgirl</option>
              <option>avengers</option>
              <option>the flash</option>
            </select>

            <select
              className="col-span-1  xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="language"
            >
              <option>Language</option>
              <option>Thailand</option>
              <option>English</option>
            </select>

            <select
              className="col-span-1  xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="genre"
            >
              <option>Genre</option>
              <option>Action</option>
              <option>Love</option>
            </select>

            <select
              className="col-span-1  xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              name="city"
            >
              <option>City</option>
              <option>Bangkok</option>
            </select>

            <input
              className="col-span-1  xl:w-[20%] h-[48px] rounded-[4px] bg-[#21263F] border-[#565F7E] text-[#8B93B0] border-[1px] p-[12px] outline-none"
              type="date"
              name="releaseDate"
              placeholder="Release date"
            />
          </div>
          <button className="w-[72px] h-[48px] bg-[#4E7BEE] rounded-[4px] active:w-[71.5px] active:h-[47.5px]">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="border-[1px] border-[yellow] flex xs:flex-col xs:justify-between xs:items-center xl:w-[80%] xl:flex-row xl:justify-between">
          <div className="xs:flex xs:flex-row xs:gap-[24px] ">
            <div className="text-white">
              <input className="text-[white]" type="checkbox" />
              Wheelchair access
            </div>
            <div className="text-white">
              <input className="text-[white]" type="checkbox" />
              Hearing assistance
            </div>
          </div>
          <div className="text-white underline underline-offset-2">Clear</div>
        </div>
      </section>
      <section className="border-[1px] border-[#38c0ff] bg-[#070c1b62] md:pt-[40px] md:pb-[80px] flex flex-col items-center">
        <div className="border-[1px] border-[#af36ff] xs:w-[100%] md:w-[80%] flex flex-col gap-[24px]">
          {search.map((search, index) => {
            return (
              <div>
                <div className="border-[1px] border-[#ff2d2d] px-[16px] py-[24px] flex justify-between items-center gap-[20px]">
                  <div className="xs:grid xs:grid-cols-6 gap-2 xl:flex xl:items-center xl:gap-[20px]">
                    <i className="fa-solid fa-location-dot w-[44px] h-[44px] text-[#4E7BEE] rounded-[50%] bg-[#474e6e] flex justify-center items-center col-span-1"></i>
                    <div className="text-[24px] text-[white] font-[700] leading-[30px] xs:col-span-5">
                      minor cineplex arkham
                    </div>
                    <div className="rounded-[4px] bg-gray-200 text-[14px] leading-[20px] py-[6px] px-[12px] xs:col-span-3">
                      Hearing assistance
                    </div>
                    <div className="rounded-[4px] bg-gray-200 text-[14px] leading-[20px] py-[6px] px-[12px] xs:col-span-3">
                      Wheelchair access
                    </div>
                  </div>
                  <i
                    className="fa-solid fa-angle-down"
                    onClick={(index) => {
                      toggleMenu(index);
                    }}
                  ></i>
                </div>

                {isOpen && (
                  <div className="border-[1px] border-[#ff2f2f] xs:flex xs:flex-col md:flex md:flex-row">
                    <div className="border-[1px] border-[#af36ff] xs:flex xs:flex-row md:flex md:flex-col p-[24px] gap-[24px]">
                      <div className="border-[1px] border-[#af36ff] xs:w-[96px] xs:h-[140px] md:w-[174px] md:h-[254px] rounded-[4px]">
                        picture
                      </div>
                      <div className="border-[1px] border-[#af36ff] w-[100%] xs:flex xs:flex-col gap-[8px]">
                        <div className="text-[20px] font-[700] ">
                          movie name
                        </div>
                        <div className="flex gap-[8px]">
                          <div className="rounded-[4px] text-[14px] bg-gray-200 py-[6px] px-[12px] flex gap-[8px]">
                            genres
                          </div>
                          <div className="rounded-[4px] text-[14px] font-[500] bg-gray-200 py-[6px] px-[12px] flex gap-[8px]">
                            language
                          </div>
                        </div>

                        <div className="text-[16px] font-[700] underline mt-[40px]">
                          Movie Detail
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] border-[1px] border-[#af36ff] p-[40px] flex flex-col xs:gap-[40px] md:gap-[60px]">
                      <div className="border-[1px] border-[#34e7ff] flex flex-col gap-[16px]">
                        <div className="text-[24px] font-[700] ">hall1</div>
                        <div className="flex gap-[24px]">
                          <div className="border-[1px] rounded-[4px] px-[24px] py-[12px]">
                            11:30
                          </div>
                          <div className="border-[1px] rounded-[4px] px-[24px] py-[12px]">
                            12:00
                          </div>
                        </div>
                      </div>
                      <div className="border-[1px] border-[#34e7ff] flex flex-col gap-[16px]">
                        <div>hall2</div>
                        <div>time</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div>pagination</div>
      </section>
    </div>
  );
}

export default SearchResultPage;
