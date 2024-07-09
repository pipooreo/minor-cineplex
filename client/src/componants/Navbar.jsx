function Navbar() {
  return (
    <nav
      className="relative bg-[rgba(0,0,0,0.2)] border-b-[1px] border-[#21263F] "
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="w-[100%] h-[100%] absolute backdrop-blur-sm bg-black/20 z-0"></div>
      <div className="relative z-10 flex justify-between items-center md:px-[80px] md:py-[15px] px-[10px]">
        <img
          className="md:w-[42px] md:h-[48px] w-[28px] h-[32px]"
          src="public/m_logo.png"
          alt=""
        />
        <div className="hidden md:flex gap-[24px]">
          <button className="text-gray-400">Login</button>
          <button className="border border-[#8B93B0] rounded px-[40px] py-[12px] text-white font-bold">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
