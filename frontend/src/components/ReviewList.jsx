import React, { useMemo, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { likeReview } from "../api/api";

const ReviewList = ({ reviews = [] }) => {
   const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedRating, setSelectedRating] = useState("All");
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
const [selectedSort, setSelectedSort] = useState("Latest");
const [likedReviews, setLikedReviews] = useState({});

  const options = ["All", "5", "4.5", "4", "3.5", "3", "2", "1"];

  const sortOptions = [
  "Latest",
  "Oldest",
  "Highest Rated",
  "Lowest Rated",
];


const filteredReviews = useMemo(() => {
  let updatedReviews = [...reviews];

  // FILTER
  if (selectedRating !== "All") {
    updatedReviews = updatedReviews.filter(
      (review) => Number(review.rating) === Number(selectedRating)
    );
  }

  // SORT
  if (selectedSort === "Latest") {
    updatedReviews.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (selectedSort === "Oldest") {
    updatedReviews.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  if (selectedSort === "Highest Rated") {
    updatedReviews.sort((a, b) => b.rating - a.rating);
  }

  if (selectedSort === "Lowest Rated") {
    updatedReviews.sort((a, b) => a.rating - b.rating);
  }

  return updatedReviews;
}, [reviews, selectedRating, selectedSort]);


//   star render
  const renderStars = (rating = 0) => {
    const stars = [];

    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar
            key={i}
            className="text-[#F4B400]"
            style={{ width: 18, height: 18 }}
          />
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="text-[#F4B400]"
            style={{ width: 18, height: 18 }}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="text-[#D9D9D9]"
            style={{ width: 18, height: 18 }}
          />
        );
      }
    }

    return stars;
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

//   handle likes
const handleLike = async (reviewId) => {
  // stop multiple likes
  if (likedReviews[reviewId]) return;

  try {
    await likeReview(reviewId);

    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: true,
    }));
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="w-full bg-[#F8F8F8] px-[34px] py-[28px]">

      {/* Header */}
      <div className="flex justify-between items-center mb-[28px]">
      <div className="text-[13px] text-[#A0A0A0]  font-normal">
        Result found: {filteredReviews.length}
      </div>
      
      
      {/* Right */}
  <div className="flex flex-col gap-[9.71px] relative">

          {/* label */}
          <label className="text-[14px] text-[#4A4A4A] font-medium">
            Rating
          </label>

          {/* selected box */}
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-[134px] h-[37px] border border-[#CDCDCD] rounded-[5px] bg-white px-[13px] flex items-center justify-between cursor-pointer"
          >
            <p className="text-[14px] font-medium text-black">
              {selectedRating}
            </p>

            <IoChevronDown className="text-black w-[24px] h-[24px]" />
          </div>

          {/* dropdown */}
          {openDropdown && (
            <div className="absolute top-[72px] left-0 w-[134px] bg-white border border-[#CDCDCD] rounded-[5px] shadow-md z-50 overflow-hidden">

              {options.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelectedRating(item);
                    setOpenDropdown(false);
                  }}
                  className={`
                    h-[37px]
                    px-[13px]
                    flex
                    items-center
                    text-[14px]
                    font-medium
                    cursor-pointer
                    hover:bg-[#F5F5F5]
                    ${
                      selectedRating === item
                        ? "text-black"
                        : "text-[#666666]"
                    }
                  `}
                >
                  {item}
                </div>
              ))}

            </div>
          )}

        </div>


        {/* SORT */}
<div className="flex flex-col gap-[9.71px] relative">

  {/* label */}
  <label className="text-[14px] text-[#4A4A4A] font-medium">
    Sort
  </label>

  {/* selected box */}
  <div
    onClick={() => setOpenSortDropdown(!openSortDropdown)}
    className="
      w-[154px]
      h-[37px]
      border
      border-[#CDCDCD]
      rounded-[5px]
      bg-white
      px-[13px]
      flex
      items-center
      justify-between
      cursor-pointer
    "
  >
    <p className="text-[14px] font-medium text-black">
      {selectedSort}
    </p>

    <IoChevronDown className="text-black w-[24px] h-[24px]" />
  </div>

  {/* dropdown */}
  {openSortDropdown && (
    <div
      className="
        absolute
        top-[72px]
        left-0
        w-[154px]
        bg-white
        border
        border-[#CDCDCD]
        rounded-[5px]
        shadow-md
        z-50
        overflow-hidden
      "
    >

      {sortOptions.map((item) => (
        <div
          key={item}
          onClick={() => {
            setSelectedSort(item);
            setOpenSortDropdown(false);
          }}
          className={`
            h-[37px]
            px-[13px]
            flex
            items-center
            text-[14px]
            font-medium
            cursor-pointer
            hover:bg-[#F5F5F5]
            ${
              selectedSort === item
                ? "text-black"
                : "text-[#666666]"
            }
          `}
        >
          {item}
        </div>
      ))}

    </div>
  )}

</div>

      </div>

      {/* Reviews */}
      <div className="flex flex-col gap-[42px]">

        {filteredReviews.map((review)  => (
          <div
            key={review._id}
            className="flex items-start justify-between"
          >

            {/* LEFT SECTION */}
            <div className="flex items-start flex-1">

              {/* Profile */}
              <div className="w-[51px] h-[51px] rounded-full bg-[#D9D9D9] flex items-center justify-center text-[16px] font-medium text-[#444444] shrink-0 overflow-hidden">
                {review.profileImage ? (
                  <img
                    src={review.profileImage}
                    alt={review.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(review.fullName)
                )}
              </div>

              {/* Content */}
              <div className="ml-[20px] flex flex-col">

                {/* Name */}
                <div className="text-[18px] leading-none font-medium text-[#000000]">
                  {review.fullName}
                </div>

                {/* Date */}
                <div className="mt-[3px] text-[13px] text-[#969696] font-normal">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })},{" "}
                  {new Date(review.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>

                {/* Review Text */}
                <div className="mt-[11px] max-w-[928px] text-[15px]  text-[#494949] font-normal">
                  {review.reviewText}
                </div>


               {/* ACTIONS */}
<div className="flex items-center gap-[18px] mt-[18px]">

  {/* LIKE */}
  <button
    onClick={() => handleLike(review._id)}
    disabled={likedReviews[review._id]}
    className="flex items-center gap-[6px] cursor-pointer"
  >
    {likedReviews[review._id] ? (
      <BiSolidLike className="text-[#2563EB] w-[20px] h-[20px]" />
    ) : (
      <BiLike className="text-[#6B7280] w-[20px] h-[20px]" />
    )}

    <span className="text-[14px] text-[#6B7280] font-medium">
      {review.likes + (likedReviews[review._id] ? 1 : 0)}
    </span>
  </button>

  {/* SHARE */}
  <button
    onClick={() => {
      navigator.share
        ? navigator.share({
            title: review.fullName,
            text: review.reviewText,
            url: window.location.href,
          })
        : navigator.clipboard.writeText(window.location.href);
    }}
    className="flex items-center gap-[6px] cursor-pointer"
  >
    <FiShare2 className="text-[#6B7280] w-[18px] h-[18px]" />

    <span className="text-[14px] text-[#6B7280] font-medium">
      Share
    </span>
  </button>

</div> 
              </div>
            </div>

            {/* RIGHT STARS */}
            <div className="flex gap-[4px] mt-[4px] ml-[20px] shrink-0">
              {renderStars(review.rating)}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ReviewList;
