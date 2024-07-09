function HomePage() {
  return (
    <>
      <div
        className="box-border p-0 m-0"
        style={{ fontFamily: "Roboto Condensed" }}
      >
        <section className="flex flex-col items-center relative">
          <div
            className="w-[100%] h-[400px] bg-bottom bg-cover bg-[length:100%_1100px] max-[375px]:w-[375px]"
            style={{
              backgroundImage:
                "linear-gradient(360deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url('https://s3-alpha-sig.figma.com/img/66bd/f9bc/e87b78b1ce0343d72f5934b7d8ea0e25?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cMl-mDW5BsFzI1weTzgTddRPq8LJ-0IPGoqpC8OjWfLevS4870qX2HYoZdpKm~8VzzxEPpUwlPU~Y2nzKAvPJpDZ4kGOSLh0ddN4imQBghIUJq7O1577IGgnwJ9qnhRYY~gKhqNp2IL3x4SwBpI8Vn2gctt0FXRxCobCXHimRqRwmP9Hw59iv~pp2~graHq~CxyuH1OhEyYNJ51-UIbhkPc~LjUVcii8XE2CSQvXRGJRA3OyHLi4kxztkPfWl6VqnMY~~IJSgQUT1HlYg~7QZv2j-9wpWWCTHrVkUUM9xQsMaj6w2y6LfSc7FipHEF-qnS6mDCFPojwsb1HgPu-TtQ__')",
            }}
          ></div>
          <div className="w-[1200px] h-[128px] rounded-[4px] bg-[#070C1B] flex justify-center items-center gap-[6px] absolute top-[340px] max-[375px]:w-[375px]">
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
            <button className="w-[72px] h-[48px] bg-[#4E7BEE] rounded-[4px] active:w-[71.5px] active:h-[47.5px]">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </section>
        <section className="h-[828px] px-[120px] pt-[144px] pb-[80px] bg-[#21263F] flex justify-center">
          <div className="flex flex-col gap-[16px]">
            <div className="w-[294px] h-[38px] flex flex-row justify-between items-center">
              <button className="w-[136px] h-[30px] text-[#8B93B0] text-[24px] font-[700] underline md:underline-offset-8 leading-[30px] p-[4px]">
                Now showing
              </button>
              <button className="w-[136px] h-[30px] text-[#8B93B0] text-[24px] font-[700] leading-[30px] p-[4px]">
                Coming soon
              </button>
            </div>
            <div className="flex flex-wrap gap-[20px]">
              <div className="flex flex-col gap-[16px]">
                <img className="w-[285px] h-[416px]" src="" alt="" />
                <div className="w-[285px] flex flex-col">
                  <div className="flex flex-row justify-between text-[14px]">
                    <div className="text-[#8B93B0]">Date</div>
                    <div className="text-[#8B93B0]">Rating</div>
                  </div>
                  <div className="text-[white] text-[20px]">Name movie</div>
                </div>
                <div className="flex flex-row gap-[8px]">
                  <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Genre1
                  </div>
                  <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Genre2
                  </div>
                  <div className="h-[32px] rounded-[4px] text-[#C8CEDD] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Language
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <img className="w-[285px] h-[416px]" src="" alt="" />
                <div className="w-[285px] flex flex-col">
                  <div className="flex flex-row justify-between text-[14px]">
                    <div className="text-[#8B93B0]">Date</div>
                    <div className="text-[#8B93B0]">Rating</div>
                  </div>
                  <div className="text-[white] text-[20px]">Name movie</div>
                </div>
                <div className="flex flex-row gap-[8px]">
                  <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Genre1
                  </div>
                  <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Genre2
                  </div>
                  <div className="h-[32px] rounded-[4px] text-[#C8CEDD] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Language
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <img className="w-[285px] h-[416px]" src="" alt="" />
                <div className="w-[285px] flex flex-col">
                  <div className="flex flex-row justify-between text-[14px]">
                    <div className="text-[#8B93B0]">Date</div>
                    <div className="text-[#8B93B0]">Rating</div>
                  </div>
                  <div className="text-[white] text-[20px]">Name movie</div>
                </div>
                <div className="flex flex-row gap-[8px]">
                  <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Genre1
                  </div>
                  <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Genre2
                  </div>
                  <div className="h-[32px] rounded-[4px] text-[#C8CEDD] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Language
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <img className="w-[285px] h-[416px]" src="" alt="" />
                <div className="w-[285px] flex flex-col">
                  <div className="flex flex-row justify-between text-[14px]">
                    <div className="text-[#8B93B0]">Date</div>
                    <div className="text-[#8B93B0]">Rating</div>
                  </div>
                  <div className="text-[white] text-[20px]">Name movie</div>
                </div>
                <div className="flex flex-row gap-[8px]">
                  <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Genre1
                  </div>
                  <div className="h-[32px] rounded-[4px] text-[#8B93B0] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Genre2
                  </div>
                  <div className="h-[32px] rounded-[4px] text-[#C8CEDD] bg-[#0d0f1a] px-[12px] py-[6px]">
                    Language
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#21263F] px-[120px] py-[80px] flex justify-center">
          <div className="w-[1200px] flex flex-col gap-[40px]">
            <div className="h-[48px] flex flex-row justify-between items-center">
              <div className="text-[white] text-[36px] font-[700]">
                All cinemas
              </div>
              <div className="w-[285px] h-[48px] bg-[#0d0f1a] border-[#565F7E] border-[1px] rounded-[4px] p-[12px]">
                <input
                  className="w-[229px] h-[24px] text-[#8B93B0] bg-[#0d0f1a] outline-none"
                  type="text"
                  placeholder="Search City"
                />
                <button className="w-[24px] h-[24px] text-[white]">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>

            {/* section All cinema เดี๋ยวทำ.map ตอนได้ api */}
            {/* section 1 Province */}
            <div className="text-[white] flex flex-col gap-[24px]">
              <div className="text-[24px]">Province</div>
              <div className="flex flex-wrap gap-[20px]">
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
              </div>
            </div>

            {/* section 2 Province */}
            <div className="text-[white] flex flex-col gap-[24px]">
              <div className="text-[24px]">Province</div>
              <div className="flex flex-wrap gap-[20px]">
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[white] flex flex-col gap-[24px]">
              <div className="text-[24px]">Province</div>
              <div className="flex flex-wrap gap-[20px]">
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
                <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
                  <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                  <div>
                    <div className="text-[24px] text-[#ffffff]">
                      Name address
                    </div>
                    <div className="text-[16px] text-[#8B93B0]"> address</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
