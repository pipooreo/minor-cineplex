import React, { useState } from "react";
function Navbar() {
  return (
    <nav
      className="relative bg-[rgba(0,0,0,0.2)] border-b-[1px] border-[#21263F] "
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="w-[100%] h-[100%] absolute backdrop-blur-sm bg-black/20 z-0"></div>
      <div className="relative z-[100] flex justify-between items-center md:px-[80px] md:py-[15px] px-[10px] py-[10px]">
        <img
          className="md:w-[42px] md:h-[48px] w-[28px] h-[32px]"
          src="public/m_logo.png"
          alt=""
        />
        <div className="hidden md:flex gap-[24px]">
          <a href="/login" className="text-gray-400 px-[20px] py-[12px]">
            Login
          </a>
          <a
            href="/register"
            className="border border-[#8B93B0] rounded px-[40px] py-[12px] text-white font-bold"
          >
            Register
          </a>
        </div>

        <div className="flex md:hidden cursor-pointer">
          <i className="fas fa-bars text-white text-[24px]"></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
