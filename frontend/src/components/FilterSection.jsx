import React, { useState } from 'react'
import { FiMapPin, FiChevronDown } from "react-icons/fi";

const FilterSection = ({city, setCity, handleSearch, setOpen, selectedSort, setSelectedSort,}) => {


  const [openDropdown, setOpenDropdown] = useState(false);

  const options = ["Name", "Average", "Rating", "Location"];

  return (
    <section className="w-full min-h-[132px] bg-white flex items-center">

     <div className="w-full px-4 md:px-8 lg:px-[80px] pt-[40px] pb-4 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">

        {/* LEFT SECTION */}
        <div className="flex flex-col gap-2 xl:ml-[124px]">

          {/* label */}
          <label className="text-[14px] text-[#4A4A4A] font-medium">
            Select City:
          </label>

          {/* input + button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[22px]">

            {/* search box */}
            <div className="w-full sm:w-[320px] lg:w-[413px] h-[37px] border border-[#E5E5E5] border-b-[#CFCFCF] rounded-[8px] px-4 flex items-center justify-between">

              <input
                type="text"
                placeholder="Indore, Madhya Pradesh, India"
  value={city}
  onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent outline-none text-[15px] text-black placeholder:text-[#777777]"
              />

              <FiMapPin
                className="text-[20px] flex-shrink-0"
                style={{
                  stroke: "url(#locationGradient)",
                }}
              />
            </div>

            {/* Find Company */}
            <button
              onClick={handleSearch}
             className="w-[146px] h-[37px] rounded-[8px] text-white text-[16px] font-medium bg-gradient-to-r from-[#D100F3] to-[#002BC5] flex items-center justify-center hover:cursor-pointer">
              Find Company
            </button>

          </div>

          {/* gradient */}
          <svg width="0" height="0">
            <linearGradient
              id="locationGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#7F4AA9" />
              <stop offset="100%" stopColor="#4D54AA" />
            </linearGradient>
          </svg>

        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 lg:gap-[84px] xl:mr-[108px] pt-[27px]">

          {/* Add company */}
          <button 
           onClick={() => setOpen(true)}
          className="w-[146px] h-[37px] rounded-[8px] text-white text-[16px] font-medium bg-gradient-to-r from-[#D100F3] to-[#002BC5] hover:cursor-pointer">
  + Add Company
</button>

          {/* SORT DROPDOWN */}
          <div className="flex flex-col gap-2 relative">

            {/* label */}
            <label className="text-[14px] text-[#4A4A4A] font-medium">
              Sort:
            </label>

            {/* selected box */}
            <div
              onClick={() => setOpenDropdown(!openDropdown)}
              className="w-[154px] h-[37px] border border-[#E5E5E5] border-b-[#CFCFCF] rounded-[8px] px-4 flex items-center justify-between cursor-pointer bg-white"
            >
              <p className="text-[15px] text-black">
                {selectedSort}
              </p>

              <FiChevronDown className="text-[#777777] text-[14px]" />
            </div>

            {/* dropdown */}
            {openDropdown && (
              <div className="absolute top-[68px] left-0 w-[154px] h-[190px] bg-white border border-[#777777] rounded-[8px] shadow-md flex flex-col py-2 z-50">

                {options.map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setSelectedSort(item);
                      setOpenDropdown(false);
                    }}
                    className={`h-[40px] flex items-center pl-[14px] cursor-pointer text-[15px]
                    ${selectedSort === item
                        ? "text-black"
                        : "text-[#777777]"
                      }`}
                  >
                    {item}
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  )
}

export default FilterSection
