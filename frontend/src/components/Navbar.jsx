import React from 'react'
import logo from "../assets/logo.png"
import { FiSearch } from "react-icons/fi";
const Navbar = () => {
  return (
    <nav className="w-full h-[70px] md:h-[75px] bg-white flex items-center justify-between">

        {/* logo */}
     <div className="ml-4 md:ml-[80px]">
    <img
      src={logo}
      alt="logo"
      className="w-[210px] h-[40px] object-contain"
    />
  </div>


       <div className="flex items-center gap-3 md:gap-6 lg:gap-[49px] mr-3 md:mr-6 lg:mr-[80px]">

  {/* searchbar */}
  <div className="hidden sm:flex w-[220px] md:w-[320px] lg:w-[384px] h-[37px] border border-[#E5E5E5] border-b-[#CFCFCF] rounded-full px-4 items-center justify-between">

    <p className="text-[#777777] text-sm font-normal">
      Search...
    </p>

    <FiSearch
      className="text-[20px] md:text-[22px]"
      style={{
        stroke: "url(#searchGradient)",
      }}
    />
  </div>

  {/* SVG gradient */}
  <svg width="0" height="0">
    <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#7F4AA9" />
      <stop offset="100%" stopColor="#4D54AA" />
    </linearGradient>
  </svg>

  {/* SignUp */}
  <div className="text-[14px] md:text-[17px] font-medium cursor-pointer">
    SignUp
  </div>

  {/* Login */}
  <div className="text-[14px] md:text-[17px] font-medium cursor-pointer">
    Login
  </div>
</div>
    </nav>
  )
}

export default Navbar
