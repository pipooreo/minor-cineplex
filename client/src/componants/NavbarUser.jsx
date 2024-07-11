import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/authentication";

function NavbarUser() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleUserMenu = () => {
    setIsUserOpen(!isUserOpen);
  };

  return (
    <nav
      className="absolute top-0 left-0 w-full bg-[rgba(0,0,0,0.2)] border-b-[1px] border-[#21263F] z-100"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="w-[100%] h-[100%] absolute backdrop-blur-sm bg-black/20 z-0"></div>
      <div className="relative z-[100] flex justify-between items-center md:px-[80px] md:py-[15px] px-[10px] py-[10px]">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            className="md:w-[42px] md:h-[48px] w-[28px] h-[32px]"
            src="public/m_logo.png"
            alt=""
          />
        </button>

        <div className="hidden md:flex gap-[24px] relative">
          <div className="">{user.name}</div>
          <div className=" flex cursor-pointer" onClick={toggleUserMenu}>
            <i className="fas fa-bars text-white text-[24px]"></i>
          </div>
          {isUserOpen && (
            <div className="transition-transform transform absolute z-1 mt-6">
              <div className="p-[30px] border-[#21263F]">
                <nav className="flex flex-col justify-center items-center m-[15px] gap-[20px]">
                  <button
                    className="border border-[#8B93B0] rounded px-[40px] py-[12px] text-white font-bold"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
        <div
          className="flex md:hidden cursor-pointer gap-[5px]"
          onClick={toggleMenu}
        >
          <div className="">{user.name}</div>
          <i className="fas fa-bars text-white text-[24px]"></i>
        </div>
      </div>
      {isOpen && (
        <div className="transition-transform transform">
          <div className="p-[30px] border-t-[1px] border-[#21263F]">
            <nav className="flex flex-col justify-center items-center m-[15px] gap-[20px]">
              <button
                className="border border-[#8B93B0] rounded px-[40px] py-[12px] text-white font-bold"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarUser;
