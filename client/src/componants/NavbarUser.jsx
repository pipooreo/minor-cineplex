import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/authentication";
import Avatar from "@mui/material/Avatar";
import { useSearch } from "../contexts/SearchContext";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  const nameParts = name.split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${nameParts[0][0]}`;
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

function NavbarUser() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  async function getUser() {
    try {
      const results = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/users/${user.id}`
      );
      setUserProfile(results.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getUser();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleUserMenu = () => {
    setIsUserOpen(!isUserOpen);
  };

  const handleHomeClick = () => {
    resetSearchValues();
    navigate("/");
  };

  const handleNavigation = (type) => {
    navigate("/profile", { state: { viewType: type } });
  };

  const { resetSearchValues } = useSearch();

  return (
    <nav
      className="absolute top-0 left-0 w-full  border-b-[1px] border-gray-100 z-100"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div
        className={`w-[100%] h-[100%] absolute backdrop-blur-sm ${
          isOpen ? "bg-black/40" : "bg-black/20"
        } z-0`}
      ></div>
      <div className="relative z-[100] flex justify-between items-center md:px-[80px] md:py-[15px] px-[10px] py-[10px]">
        <button onClick={handleHomeClick}>
          <img
            className="md:w-[42px] md:h-[48px] w-[28px] h-[32px]"
            src="https://res.cloudinary.com/diah9m6gw/image/upload/v1720699560/m_logo_vf5qo2.png"
            alt=""
          />
        </button>

        <div className="hidden md:flex relative ">
          <div
            className=" flex cursor-pointer justify-center items-center gap-2"
            onClick={toggleUserMenu}
          >
            {userProfile ? (
              <Avatar
                alt={userProfile && userProfile.name}
                src={userProfile && userProfile.image}
              />
            ) : // <Avatar {...stringAvatar(userProfile.name)} />
            null}
            <div className="text-white">{userProfile && userProfile.name}</div>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 1L7 7L1 1" stroke="white" />
            </svg>
          </div>
          {isUserOpen && (
            <div className="transition-transform transform absolute top-6 right-0 z-1 mt-6">
              <nav className="flex flex-col justify-center rounded-[4px] w-[182px] h-[192px] items-center  bg-gray-100 text-body1R  text-gray-400  shadow-lg shadow-black/50 ">
                <ul className="w-full flex flex-col gap-4 p-[20px]">
                  <li
                    className="flex justify-start items-center gap-4 active:text-gray-300"
                    onClick={() => handleNavigation("history")}
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
                    <a href="">Booking history</a>
                  </li>
                  <li
                    className="flex justify-start items-center gap-4 active:text-gray-300"
                    onClick={() => handleNavigation("profile")}
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
                    <a href="">Profile</a>
                  </li>
                  <li
                    className="flex justify-start items-center gap-4 active:text-gray-300"
                    onClick={() => handleNavigation("resetPassword")}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12L1.60957 11.6877L1.35969 12L1.60957 12.3123L2 12ZM11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5V12.5ZM5.60957 6.68765L1.60957 11.6877L2.39043 12.3123L6.39043 7.31235L5.60957 6.68765ZM1.60957 12.3123L5.60957 17.3123L6.39043 16.6877L2.39043 11.6877L1.60957 12.3123ZM2 12.5H11V11.5H2V12.5Z"
                        fill="white"
                      />
                      <path
                        d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066"
                        stroke="white"
                      />
                    </svg>

                    <a href="">Reset password</a>
                  </li>
                  <hr className="text-gray-200" />
                  <li className="flex justify-start items-center gap-4 active:text-gray-300">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12L1.60957 11.6877L1.35969 12L1.60957 12.3123L2 12ZM11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5V12.5ZM5.60957 6.68765L1.60957 11.6877L2.39043 12.3123L6.39043 7.31235L5.60957 6.68765ZM1.60957 12.3123L5.60957 17.3123L6.39043 16.6877L2.39043 11.6877L1.60957 12.3123ZM2 12.5H11V11.5H2V12.5Z"
                        fill="white"
                      />
                      <path
                        d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066"
                        stroke="white"
                      />
                    </svg>

                    <button
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
        <div
          className="flex md:hidden cursor-pointer gap-[5px] justify-center items-center"
          onClick={toggleMenu}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6L20 6" stroke="white" strokeLinecap="round" />
            <path d="M4 12L20 12" stroke="white" strokeLinecap="round" />
            <path d="M4 18L20 18" stroke="white" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="transition-transform transform text-gray-400 md:hidden text-body1R">
          <div className="p-[30px] border-t-[1px]  border-gray-100">
            <nav className="flex flex-col justify-center items-center">
              <ul className="w-full flex flex-col gap-6">
                <li className="flex justify-start items-center gap-4 active:text-gray-300">
                  {userProfile ? (
                    <Avatar
                      alt={userProfile && userProfile.name}
                      src={userProfile && userProfile.image}
                    />
                  ) : // <Avatar {...stringAvatar(userProfile.name)} />
                  null}
                  <div>{userProfile && userProfile.name}</div>
                </li>
                <li
                  className="flex justify-start items-center gap-4 active:text-gray-300"
                  onClick={() => handleNavigation("history")}
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
                  <a href="">Booking history</a>
                </li>
                <li
                  className="flex justify-start items-center gap-4 active:text-gray-300"
                  onClick={() => handleNavigation("profile")}
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
                  <a href="">Profile</a>
                </li>
                <li
                  className="flex justify-start items-center gap-4 active:text-gray-300"
                  onClick={() => handleNavigation("resetPassword")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12L1.60957 11.6877L1.35969 12L1.60957 12.3123L2 12ZM11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5V12.5ZM5.60957 6.68765L1.60957 11.6877L2.39043 12.3123L6.39043 7.31235L5.60957 6.68765ZM1.60957 12.3123L5.60957 17.3123L6.39043 16.6877L2.39043 11.6877L1.60957 12.3123ZM2 12.5H11V11.5H2V12.5Z"
                      fill="white"
                    />
                    <path
                      d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066"
                      stroke="white"
                    />
                  </svg>

                  <a href="">Reset password</a>
                </li>
                <hr className="text-gray-200" />
                <li className="flex justify-start items-center gap-4 active:text-gray-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12L1.60957 11.6877L1.35969 12L1.60957 12.3123L2 12ZM11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5V12.5ZM5.60957 6.68765L1.60957 11.6877L2.39043 12.3123L6.39043 7.31235L5.60957 6.68765ZM1.60957 12.3123L5.60957 17.3123L6.39043 16.6877L2.39043 11.6877L1.60957 12.3123ZM2 12.5H11V11.5H2V12.5Z"
                      fill="white"
                    />
                    <path
                      d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066"
                      stroke="white"
                    />
                  </svg>

                  <button
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarUser;
