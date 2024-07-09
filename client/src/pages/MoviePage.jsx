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
      <div className="absolute w-full h-[400px]">
        <div className="bg-[url('public/movie_background.png')]  bg-center bg-no-repeat bg-cover w-full h-full"></div>
      </div>
      <div className="relative z-10">
        <Navbar />
        <section className="relative flex justify-center items-center  my-[60px]">
          <div className="w-[80%] h-[100%] absolute rounded-xl backdrop-blur-md bg-[#070C1BB2]/70  "></div>
          <div className="relative z-10 flex gap-10 rounded-xl justify-center items-center w-[80%] text-white">
            <img
              className="w-[411px] h-[600px] rounded-xl"
              src="public\movie_img.png"
              alt=""
            />
            <div className="flex flex-col gap-[20px] h-[600px]">
              <div className="py-[50px]">
                <h1 className="text-[36px] leading-[44px] font-bold pb-[20px]">
                  The Dark Knight
                </h1>
                <p className="flex justify-left items-center gap-[10px]">
                  <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px]  px-[6px] py-[12px] ">
                    Action
                  </span>
                  <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px]  px-[6px] py-[12px]">
                    Crime
                  </span>
                  <span className="bg-[#21263F] text-[#8B93B0] rounded-[4px] px-[10px] py-[12px] ">
                    TH
                  </span>
                  <div className="border-l-2 border-[#565F7E] mx-[10px] p-[5px]">
                    <span className="text-[#C8CEDD] text-[16px] leading-[24px] px-[5px]">
                      Release date: 18 Jun 2024
                    </span>
                  </div>
                </p>
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
