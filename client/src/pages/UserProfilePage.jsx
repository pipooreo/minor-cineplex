import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import ProfileForm from "../componants/userpage/ProfileForm";
import UpdatePassword from "../componants/userpage/UpdatePassword";
import BookingHistory from "../componants/userpage/BookingHistory";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <section className="w-full h-screen bg-BG absolute">
      <div className="h-[80px] bg-BG max-md:h-[48px]"></div>
      <div className="flex justify-start gap-[48px] xl:p-[60px_222px] md:p-[60px_5%]">
        <div className="flex flex-col bg-gray-0 w-[257px] h-[224px] p-[16px_16px_24px_16px] gap-[8px] rounded-[8px] shadow-[4px_4px_30px_0px_rgba(0,0,0,0.5)]">
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
              <FaRegUser />
              <p>Booking history</p>
            </button>
          ) : (
            <button
              className="p-[16px] rounded-[4px] text-gray-400 flex items-center gap-[12px] hover:bg-gray-100"
              onClick={() => {
                setIsProfile(false);
                setIsHistory("history");
                setIsResetPassword(false);
                navigate("/profile", { state: { viewType: "history" } });
              }}
            >
              <FaRegUser />
              <p>Booking history</p>
            </button>
          )}
          {isProfile === "profile" ? (
            <button
              className="p-[16px] rounded-[4px] text-gray-400 flex items-center gap-[12px] bg-gray-100  hover:bg-gray-100"
              onClick={() => {
                setIsProfile("profile");
                setIsHistory(false);
                setIsResetPassword(false);
                navigate("/profile", { state: { viewType: "profile" } });
              }}
            >
              <FaRegUser />
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
              <FaRegUser />
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
              <FaRegUser />
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
              <FaRegUser />
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
          />
        )}
      </div>
    </section>
  );
}

export default UserProfilePage;
