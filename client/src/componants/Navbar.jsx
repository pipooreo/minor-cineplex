import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="absolute top-0 left-0 w-full  border-b-[1px] border-gray-100 z-100"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div
        className={`w-[100%] h-[100%] absolute backdrop-blur-md ${
          isOpen ? "bg-black/40" : "bg-black/20"
        } z-0`}
      ></div>
      <div className="relative z-[100] flex justify-between items-center md:px-[80px] md:py-[15px] px-[10px] py-[10px]">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            className="md:w-[42px] md:h-[48px] w-[28px] h-[32px]"
            src="https://res.cloudinary.com/diah9m6gw/image/upload/v1720699560/m_logo_vf5qo2.png"
            alt=""
          />
        </button>
        <div className="hidden md:flex gap-[24px]">
          <button
            className="text-gray-400 hover:text-gray-400 active:text-gray-300 text-body1R px-[20px] py-[12px]"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="border border-gray-300 hover:bg-gray-300 active:bg-gray-200 rounded px-[40px] text-body1M py-[12px] text-white font-bold"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

        <div className="flex md:hidden cursor-pointer" onClick={toggleMenu}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6L20 6" stroke="white" stroke-linecap="round" />
            <path d="M4 12L20 12" stroke="white" stroke-linecap="round" />
            <path d="M4 18L20 18" stroke="white" stroke-linecap="round" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="transition-transform transform">
          <div className="p-[30px] border-t-[1px] border-[#21263F]">
            <nav className="flex flex-col justify-center items-center m-[15px] gap-[20px]">
              <button
                className=" text-gray-400 hover:text-gray-400 active:text-gray-300 px-[20px] text-body1R py-[12px]"
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
              >
                Login
              </button>
              <button
                className="border border-gray-300 hover:bg-gray-300 active:bg-gray-200 active:border-gray-200  text-white rounded px-[40px] py-[12px] font-bold"
                onClick={() => {
                  navigate("/register");
                  toggleMenu();
                }}
              >
                Register
              </button>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
