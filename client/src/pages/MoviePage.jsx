// import { useNavigate } from "react-router-dom";

function MoviePage() {
  //   const navigate = useNavigate();
  return (
    <div
      className="bg-[#101525] relative"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="absolute  w-full h-[500px] hidden sm:block">
        <div
          className=" bg-center bg-cover bg-no-repeat w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(33, 38, 63, 1) 100%), url('public/movie_background.png')",
          }}
        ></div>
      </div>
      <div>
        <section className="movie-detail relative  flex justify-center items-center xl:pt-[180px]">
          <div className="w-[100%] xl:w-[70%] h-[100%] xl:h-[600px] absolute xl:rounded-xl backdrop-blur-md bg-[#070C1BB2]/70 "></div>
          <div className="flex flex-col xl:flex-row gap-10 z-10 xl:rounded-xl justify-center items-center md:w-[70%] w-100% text-white">
            <img
              className="w-[100%] md:w-[411px] md:h-[600px] xl:rounded-xl "
              src="public\movie_img.png"
              alt=""
            />
            <div className="flex flex-col xl:gap-[50px]  px-[15px] pb-[50px]  xl:mt-[100px]">
              <div>
                <h1 className="text-[36px] leading-[44px] font-bold ">
                  The Dark Knight
                </h1>
                <div className="flex flex-col xl:flex-row justify-start xl:items-center">
                  <div className=" py-[10px] pr-[10px] w-fit">
                    <p className="flex justify-start items-center gap-[10px]">
                      <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px]  px-[6px] py-[12px] ">
                        Action
                      </span>
                      <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px]  px-[6px] py-[12px]">
                        Crime
                      </span>
                      <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px] px-[10px] py-[12px] ">
                        TH
                      </span>
                      <img className="h-[35px]" src="\public\pipe.png" alt="" />
                    </p>
                  </div>
                  <p>
                    <span className="text-[#C8CEDD] text-[16px] leading-[24px] px-[10px]">
                      Release date: 18 Jun 2024
                    </span>
                  </p>
                </div>
              </div>
              <button className="my-[20px] px-[40px] py-[12px] bg-[#4E7BEE] rounded-md w-[153px] h-[48px]">
                Book ticket
              </button>
              <div className="md:my-[20px] xl:w-[80%] flex flex-col gap-5 ">
                <p className="text-[16px] leading-[24px]">
                  With the help of allies Lt. Jim Gordon (Gary Oldman) and DA
                  Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been
                  able to keep a tight lid on crime in Gotham City.
                </p>
                <p>
                  But when a vile young criminal calling himself the Joker
                  (Heath Ledger) suddenly throws the town into chaos, the caped
                  Crusader begins to tread a fine line between heroism and
                  vigilantism.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="reviews text-white flex flex-col justify-center px-[10px] items-center p-[20px] ">
          <div className="flex gap-3 justify-start items-center w-[100%]  mt-0 md:w-[50%] my-[30px] mx-0 md:m-[50px]">
            <p className="bg-[#21263F] px-[16px] py-[12px]">
              <i className="fas fa-star text-[#4E7BEE] px-2"></i>
              4.6
            </p>
            <h2>Rating & Reviews</h2>
          </div>
          <div className=" border-b-2 border-[#21263F] m-5 w-[100%]  md:w-[50%]">
            <div className="flex justify-between  md:gap-2">
              <div className="flex gap-[10px]">
                <img
                  className="w-[44px] h-[44px] bg-white rounded-full"
                  src=""
                  alt=""
                />
                <div>
                  <h3>Christopher KaNolan</h3>
                  <p>24 Jun 2024</p>
                </div>
              </div>
              <div className="flex gap-1 md:gap-3">
                <i className="fas fa-star text-[#4E7BEE] "></i>
                <i className="fas fa-star text-[#4E7BEE] "></i>
                <i className="fas fa-star text-[#4E7BEE] "></i>
                <i className="fas fa-star text-[#4E7BEE] "></i>
                <i className="fas fa-star text-[#4E7BEE] "></i>
              </div>
            </div>
            <p className="py-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sint
              maiores necessitatibus? Animi sit laboriosam dolorem reiciendis
              voluptate quis consectetur placeat nemo dignissimos deserunt fugit
              debitis modi neque velit, libero minima cum voluptatum, laborum
              non provident eveniet at, quasi architecto. Nam accusantium
              distinctio nobis veniam culpa? Eveniet in eaque voluptates.
            </p>
          </div>
          <div className=" border-b-2 border-[#21263F] mb:pb-[50px] w-[100%]  md:w-[50%]">
            <div className="flex justify-between  md:gap-2">
              <div className="flex gap-[10px]">
                <img
                  className="w-[44px] h-[44px] bg-white rounded-full"
                  src=""
                  alt=""
                />
                <div>
                  <h3>Christopher KaNolan</h3>
                  <p>24 Jun 2024</p>
                </div>
              </div>
              <div className="flex gap-1 md:gap-3">
                <i className="fas fa-star text-[#4E7BEE] "></i>
                <i className="fas fa-star text-[#4E7BEE] "></i>
                <i className="fas fa-star text-[#4E7BEE] "></i>
                <i className="fas fa-star text-[#4E7BEE] "></i>
                <i className="fas fa-star text-[#4E7BEE] "></i>
              </div>
            </div>
            <p className="py-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sint
              maiores necessitatibus? Animi sit laboriosam dolorem reiciendis
              voluptate quis consectetur placeat nemo dignissimos deserunt fugit
              debitis modi neque velit, libero minima cum voluptatum, laborum
              non provident eveniet at, quasi architecto. Nam accusantium
              distinctio nobis veniam culpa? Eveniet in eaque voluptates.
            </p>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default MoviePage;
