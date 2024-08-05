import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import ProfileForm from "../componants/userpage/ProfileForm";
import UpdatePassword from "../componants/userpage/UpdatePassword";
import BookingHistory from "../componants/userpage/BookingHistory";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function UserProfilePage() {
  const location = useLocation();
  const { viewType } = location.state || {};
  const navigate = useNavigate();
  // console.log(viewType);
  const [isProfile, setIsProfile] = useState(viewType);
  const [isHistory, setIsHistory] = useState(viewType);
  const [isResetPassword, setIsResetPassword] = useState(viewType);
  const [userProfile, setUserProfile] = useState();
  const [history, setHistory] = useState([]);
  const [myReview, setMyReview] = useState([]);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  // console.log(isHistory, isProfile, isResetPassword);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };
  async function getUser() {
    try {
      const results = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/users/${user.id}`
      );
      setUserProfile(results.data.data);
      // console.log(results.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getHistory() {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/booking/${user.id}`
      );
      setHistory(result.data.data);
      // console.log(history);
    } catch (error) {
      console.log(error);
    }
  }

  async function getReview() {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/comments/${user.id}`
      );
      setMyReview(result.data.data);
      // console.log(myReview);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getHistory();
    getReview();
  }, []);

  return (
    <div className="w-full bg-BG absolute">
      <section className="w-full bg-BG absolute">
        <div className="h-[80px] bg-BG max-lg:h-[48px]"></div>
        {/* destop*/}
        <div className="justify-center items-center lg:items-start lg:justify-start flex-col lg:flex-row lg:gap-[0x] xl:gap-[48px] xl:p-[60px_10px_60px_222px] p-[60px_15px] hidden lg:flex">
          <div className="flex flex-row md:flex-col bg-gray-0 w-[257px] md:p-[8px_16px] p-[16px_16px_24px_16px] gap-[8px] rounded-[8px] shadow-[4px_4px_30px_0px_rgba(0,0,0,0.5)]">
            {isHistory === "history" ? (
              <button
                className="p-[16px] rounded-[4px] text-gray-400 flex items-center gap-[12px] bg-gray-100 hover:bg-gray-100"
                onClick={() => {
                  setIsProfile(false);
                  setIsHistory("history");
                  setIsResetPassword(false);
                  navigate("/profile", { state: { viewType: "history" } });
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="5"
                    y="3.3335"
                    width="10.8333"
                    height="14.1667"
                    rx="2"
                    stroke="#8B93B0"
                  />
                  <path
                    d="M12.5 8.3335V6.66683"
                    stroke="#8B93B0"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3.33301 7.5H6.66634"
                    stroke="#8B93B0"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3.33301 10.8335H6.66634"
                    stroke="#8B93B0"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3.33301 14.1665H6.66634"
                    stroke="#8B93B0"
                    strokeLinecap="round"
                  />
                </svg>
                <p>Booking history</p>
              </button>
            ) : (
              <button
                className="p-[16px]  rounded-[4px] text-gray-400 flex items-center gap-[12px] hover:bg-gray-100"
                onClick={() => {
                  setIsProfile(false);
                  setIsHistory("history");
                  setIsResetPassword(false);
                  navigate("/profile", { state: { viewType: "history" } });
                }}
              >
                <p>Booking history</p>
              </button>
            )}
            {isProfile === "profile" ? (
              <button
                className="p-[16px]  rounded-[4px] text-gray-400 flex items-center gap-[12px] bg-gray-100  hover:bg-gray-100"
                onClick={() => {
                  setIsProfile("profile");
                  setIsHistory(false);
                  setIsResetPassword(false);
                  navigate("/profile", { state: { viewType: "profile" } });
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    fill="#7E869E"
                    fillOpacity="0.25"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <p>Profile</p>
              </button>
            ) : (
              <button
                className="p-[16px] rounded-[4px] text-gray-400 flex items-center gap-[12px]  hover:bg-gray-100"
                onClick={() => {
                  setIsProfile("profile");
                  setIsHistory(false);
                  setIsResetPassword(false);
                  navigate("/profile", { state: { viewType: "profile" } });
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    fill="#7E869E"
                    fillOpacity="0.25"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <p>Profile</p>
              </button>
            )}
            {isResetPassword === "resetPassword" ? (
              <button
                className="p-[16px] rounded-[4px] text-gray-400 flex items-center gap-[12px] bg-gray-100 hover:bg-gray-100"
                onClick={() => {
                  setIsProfile(false);
                  setIsHistory(false);
                  setIsResetPassword("resetPassword");
                  navigate("/profile", {
                    state: { viewType: "resetPassword" },
                  });
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14 15L10 19L14 23" stroke="white" />
                  <path
                    d="M5.93782 15.5C5.14475 14.1264 4.84171 12.5241 5.07833 10.9557C5.31495 9.38734 6.07722 7.94581 7.24024 6.86729C8.40327 5.78877 9.8981 5.13721 11.4798 5.01935C13.0616 4.90149 14.6365 5.32432 15.9465 6.21856C17.2565 7.1128 18.224 8.42544 18.6905 9.94144C19.1569 11.4574 19.0947 13.0869 18.5139 14.5629C17.9332 16.0389 16.8684 17.2739 15.494 18.0656C14.1196 18.8573 12.517 19.1588 10.9489 18.9206"
                    stroke="white"
                    strokeLinecap="round"
                  />
                </svg>
                <p>Reset password</p>
              </button>
            ) : (
              <button
                className="p-[16px] rounded-[4px] text-gray-400 flex items-center gap-[12px]  hover:bg-gray-100"
                onClick={() => {
                  setIsProfile(false);
                  setIsHistory(false);
                  setIsResetPassword("resetPassword");
                  navigate("/profile", {
                    state: { viewType: "resetPassword" },
                  });
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14 15L10 19L14 23" stroke="white" />
                  <path
                    d="M5.93782 15.5C5.14475 14.1264 4.84171 12.5241 5.07833 10.9557C5.31495 9.38734 6.07722 7.94581 7.24024 6.86729C8.40327 5.78877 9.8981 5.13721 11.4798 5.01935C13.0616 4.90149 14.6365 5.32432 15.9465 6.21856C17.2565 7.1128 18.224 8.42544 18.6905 9.94144C19.1569 11.4574 19.0947 13.0869 18.5139 14.5629C17.9332 16.0389 16.8684 17.2739 15.494 18.0656C14.1196 18.8573 12.517 19.1588 10.9489 18.9206"
                    stroke="white"
                    strokeLinecap="round"
                  />
                </svg>
                <p>Reset password</p>
              </button>
            )}
          </div>
          {isProfile === "profile" && userProfile ? (
            <ProfileForm user={userProfile} />
          ) : isResetPassword === "resetPassword" ? (
            <UpdatePassword user={userProfile} />
          ) : (
            <BookingHistory
              user={history}
              review={myReview}
              profile={userProfile}
              screen={"desktop"}
            />
          )}
        </div>

        {/* moblie */}
        <div className="flex lg:hidden flex-col gap-[48px]">
          <div className="bg-[#070C1B] md:mt-[32px] p-[16px_16px] text-[18px] w-full">
            <Slider {...settings}>
              <button
                className="p-[16px] w-[169px] h-full rounded-[4px] text-gray-400 flex items-center gap-[12px] hover:bg-gray-100"
                onClick={() => {
                  setIsProfile(false);
                  setIsHistory("history");
                  setIsResetPassword(false);
                }}
              >
                <div className="flex items-center gap-[12px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5"
                      y="3.3335"
                      width="10.8333"
                      height="14.1667"
                      rx="2"
                      stroke="#8B93B0"
                    />
                    <path
                      d="M12.5 8.3335V6.66683"
                      stroke="#8B93B0"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3.33301 7.5H6.66634"
                      stroke="#8B93B0"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3.33301 10.8335H6.66634"
                      stroke="#8B93B0"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3.33301 14.1665H6.66634"
                      stroke="#8B93B0"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-body1M">Booking history</p>
                </div>
              </button>

              <button
                className="p-[16px] w-[111px] rounded-[4px] text-gray-400 flex items-center gap-[12px] hover:bg-gray-100"
                onClick={() => {
                  setIsProfile("profile");
                  setIsHistory(false);
                  setIsResetPassword(false);
                }}
              >
                <div className="flex items-center gap-[12px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                      stroke="white"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      fill="#7E869E"
                      fillOpacity="0.25"
                      stroke="white"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-body1M">Profile</p>
                </div>
              </button>
              <button
                className="p-[16px] w-[170px] rounded-[4px] text-gray-400 flex items-center gap-[12px] hover:bg-gray-100"
                onClick={() => {
                  setIsProfile(false);
                  setIsHistory(false);
                  setIsResetPassword("resetPassword");
                }}
              >
                <div className="flex items-center gap-[12px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 15L10 19L14 23" stroke="white" />
                    <path
                      d="M5.93782 15.5C5.14475 14.1264 4.84171 12.5241 5.07833 10.9557C5.31495 9.38734 6.07722 7.94581 7.24024 6.86729C8.40327 5.78877 9.8981 5.13721 11.4798 5.01935C13.0616 4.90149 14.6365 5.32432 15.9465 6.21856C17.2565 7.1128 18.224 8.42544 18.6905 9.94144C19.1569 11.4574 19.0947 13.0869 18.5139 14.5629C17.9332 16.0389 16.8684 17.2739 15.494 18.0656C14.1196 18.8573 12.517 19.1588 10.9489 18.9206"
                      stroke="white"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-body1M">Reset password</p>
                </div>
              </button>
            </Slider>
          </div>
          {isProfile === "profile" && userProfile ? (
            <ProfileForm user={userProfile} />
          ) : isResetPassword === "resetPassword" ? (
            <UpdatePassword user={userProfile} />
          ) : (
            <BookingHistory
              user={history}
              review={myReview}
              profile={userProfile}
              screen={"mobile"}
            />
          )}
        </div>
      </section>
      <section className="bg-BG h-screen "></section>
    </div>
  );
}

export default UserProfilePage;
