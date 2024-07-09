// import { useNavigate } from "react-router-dom";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";

function MoviePage() {
  //   const navigate = useNavigate();
  return (
    <div
      className="bg-[#101525] relative"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="absolute  w-full h-[500px] hidden sm:block">
        <div
          className=" bg-center bg-no-repeat w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url('public/movie_background.png')",
            backgroundSize: "100% 650px",
          }}
        ></div>
      </div>
      <div className="relative">
        <Navbar />
        <section className="relative  flex justify-center items-center mt-[100px] ">
          <div className="w-[100%] md:w-[80%] h-[100%] absolute md:rounded-xl backdrop-blur-md bg-[#070C1BB2]/70  "></div>
          <div className="flex flex-col md:flex-row gap-10 z-10 md:rounded-xl md:justify-center md:items-center md:w-[80%] w-100% text-white">
            <img
              className="w-full sm:w-[411px] sm:h-[600px] md:rounded-xl "
              src="public\movie_img.png"
              alt=""
            />
            <div className="flex flex-col gap-[20px] h-[600px] p-[50px]">
              <div className="">
                <h1 className="text-[36px] leading-[44px] font-bold pb-[20px]">
                  The Dark Knight
                </h1>
                <div className="flex flex-col md:flex-row justify-start md:items-center">
                  <div className="border-r-2 border-[#565F7E] mx-[10px] p-[5px]">
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
                    </p>
                  </div>
                  <p>
                    <span className="text-[#C8CEDD] text-[16px] leading-[24px] px-[5px]">
                      Release date: 18 Jun 2024
                    </span>
                  </p>
                </div>
              </div>
              <button className="my-[20px] px-[40px] py-[12px] bg-[#4E7BEE] rounded-md w-[153px] h-[48px]">
                Book ticket
              </button>
              <p className="my-[20px]">
                With the help of allies Lt. Jim Gordon (Gary Oldman) and DA
                Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been
                able to keep a tight lid on crime in Gotham City.
              </p>
              <p>
                But when a vile young criminal calling himself the Joker (Heath
                Ledger) suddenly throws the town into chaos, the caped Crusader
                begins to tread a fine line between heroism and vigilantism.
              </p>
            </div>
          </div>
        </section>
        <section className="text-white flex flex-col justify-center items-center">
          <div className="flex gap-3 justify-start items-center w-[794px] m-[50px]">
            <p className="bg-[#21263F] px-[16px] py-[12px]">
              <i className="fas fa-star text-[#4E7BEE] px-2"></i>
              4.6
            </p>
            <h2>Rating & Reviews</h2>
          </div>
          <div className="w-[794px] border-b-2 border-[#21263F] py-[50px]">
            <div className="flex justify-between gap-2">
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
              <div>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sint
              maiores necessitatibus? Animi sit laboriosam dolorem reiciendis
              voluptate quis consectetur placeat nemo dignissimos deserunt fugit
              debitis modi neque velit, libero minima cum voluptatum, laborum
              non provident eveniet at, quasi architecto. Nam accusantium
              distinctio nobis veniam culpa? Eveniet in eaque voluptates.
            </p>
          </div>
          <div className="w-[794px] border-b-2 border-[#21263F] py-[50px]">
            <div className="flex justify-between gap-2">
              <div className="flex gap-[10px]">
                <img
                  className="w-[44px] h-[44px] bg-white rounded-full"
                  src=""
                  alt=""
                />
                <div>
                  <h3>Christopher Nolan</h3>
                  <p>24 Jun 2024</p>
                </div>
              </div>
              <div>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
                <i className="fas fa-star text-[#4E7BEE] px-2"></i>
              </div>
            </div>
            <p>
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
      <Footer />
    </div>
  );
}

export default MoviePage;
