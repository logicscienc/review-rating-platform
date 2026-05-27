import React from "react";
import { FiMapPin } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const CompanyDetailCard = ({ company, onAddReview }) => {
  const rating = company?.averageRating ?? 0;
  const reviews = company?.totalReviews ?? 0;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;

    for (let i = 0; i < 5; i++) {
      if (reviews === 0) {
        stars.push(
          <FaRegStar key={i} className="text-gray-300 text-[16px]" />
        );
        continue;
      }

      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="text-yellow-500 text-[16px]" />
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-500 text-[16px]" />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className="text-gray-300 text-[16px]" />
        );
      }
    }

    return stars;
  };

  return (
    <div className="w-full max-w-[1026px] border border-[#E5E5E5] rounded-[12px] px-4 sm:px-5 py-4 flex flex-col sm:flex-row justify-between gap-4 sm:items-center bg-white">

      {/* LEFT */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-[21px]">

        <img
          src={
            company?.logo && company.logo.trim() !== ""
              ? company.logo
              : `https://ui-avatars.com/api/?name=${company?.name}`
          }
          className="w-[70px] h-[55px] sm:w-[90px] sm:h-[70px] object-contain bg-white rounded-md"
        />

        <div className="space-y-1">

          <h2 className="text-[16px] sm:text-[18px] font-medium">
            {company?.name}
          </h2>

          <div className="flex items-center gap-2 text-[#767676]">
            <FiMapPin className="text-[14px]" />
            <p className="text-[12px] sm:text-[13px]">
              {company?.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] sm:text-[14px] font-medium">
              {reviews === 0 ? "No ratings" : rating.toFixed(1)}
            </span>

            <div className="flex gap-1">{renderStars()}</div>

            <span className="text-[12px] sm:text-[14px] text-[#767676]">
              {reviews} Reviews
            </span>
          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-row sm:flex-col sm:items-end items-start justify-between sm:justify-start gap-3 sm:gap-[47px] w-full sm:w-auto">

        <p className="text-[11px] sm:text-[12px] text-[#767676]">
          Founded on:{" "}
          {new Date(company.foundedOn).toLocaleDateString("en-IN")}
        </p>

        <button
        onClick={onAddReview}
        className="w-full sm:w-[146px] h-[37px] bg-gradient-to-r from-[#D100F3] to-[#002BC5] text-white text-[14px] sm:text-[15px] font-semibold rounded-[8px] hover:cursor-pointer">
          + Add Review
        </button>

      </div>

    </div>
  );
};

export default CompanyDetailCard;
