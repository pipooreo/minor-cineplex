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
        <div className="flex md:hidden">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-[24px] w-[24px] stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        id="menu"
        className="md:hidden  flex-col items-center gap-[24px] mt-[10px] hidden"
      >
        <button className="text-gray-400">Login</button>
        <button className="border border-[#8B93B0] rounded px-[40px] py-[12px] text-white font-bold">
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
