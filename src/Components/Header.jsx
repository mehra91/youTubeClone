import React from "react";
import { FaYoutube, FaSearch, FaBell, FaMicrophone } from "react-icons/fa";

const Header = ({ text, setText, onSearch }) => {
  const handleChange = (e) => setText(e.target.value);

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#2D3B41] text-white">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div onClick={()=>window.location.reload()} className="flex items-center gap-1 text-xl font-semibold cursor-pointer">
          <FaYoutube  className="text-red-500 text-2xl " />
          <span>YouTube</span>
          <span className="text-xs ml-1 opacity-70">IN</span>
        </div>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="flex items-center bg-gray-700 rounded-full w-[500px]">
        <input
          type="text"
          placeholder="Search"
          value={text}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none  pl-5 text-sm text-white"
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 transition cursor-pointer h-full"
        >
          <FaSearch />
        </button>
        <button className="ml-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-full">
          <FaMicrophone />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <FaBell className="text-xl cursor-pointer hover:text-gray-300" />
      </div>
    </header>
  );
};

export default Header;

