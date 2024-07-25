import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import ProfileForm from "../componants/userpage/ProfileForm";
import UpdatePassword from "../componants/userpage/UpdatePassword";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import axios from "axios";

function UserProfilePage() {
  const location = useLocation();
  const { viewType } = location.state || {};
  // console.log(viewType);
  const [isProfile, setIsProfile] = useState(viewType);
  const [isHistory, setIsHistory] = useState(viewType);
  const [isResetPassword, setIsResetPassword] = useState(viewType);
  const [userProfile, setUserProfile] = useState();

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
    } catch (error) {}
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section className="w-full h-screen bg-BG absolute">
      <div className="h-[80px] bg-BG max-md:h-[48px]"></div>
      <div className="flex justify-start gap-[48px] p-[60px_222px]">
        <div className="flex flex-col bg-gray-0 w-[257px] h-[224px] p-[16px_16px_24px_16px] gap-[8px] rounded-[8px] shadow-[4px_4px_30px_0px_rgba(0,0,0,0.5)]">
          {isHistory === "history" ? (
            <button
              className="p-[16px] rounded-[4px] text-gray-400 flex items-center gap-[12px] bg-gray-100 hover:bg-gray-100"
              onClick={() => {
                setIsProfile(false);
                setIsHistory("history");
                setIsResetPassword(false);
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
        ) : null}
      </div>
    </section>
  );
}

export default UserProfilePage;
