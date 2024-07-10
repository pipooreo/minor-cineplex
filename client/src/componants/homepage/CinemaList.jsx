function CinemaList() {
  return (
    <section className="bg-[#21263F] px-[120px] py-[80px] flex justify-center">
      <div className="w-[1200px] flex flex-col gap-[40px] max-[375px]:w-[345px] ">
        <div className="h-[48px] flex flex-row justify-between items-center max-[375px]:h-[116px] max-[375px]:flex max-[375px]:flex-col max-[375px]:items-start">
          <div className="text-[white] text-[36px] font-[700]">All cinemas</div>
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
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
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
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
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
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
            <div className="w-[590px] h-[90px] p-[16px] border-[#565F7E] border-[1px] flex flex-row items-center gap-[16px]">
              <i class="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
              <div>
                <div className="text-[24px] text-[#ffffff]">Name address</div>
                <div className="text-[16px] text-[#8B93B0]"> address</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CinemaList;
