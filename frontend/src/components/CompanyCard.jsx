import React from "react";
import { FiMapPin } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ filteredCompanies }) => {
  const navigate = useNavigate();

  const renderStars = (rating = 0, reviews = 0) => {
    const stars = [];

    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;

    for (let i = 0; i < 5; i++) {
      if (reviews === 0) {
        stars.push(
          <FaRegStar key={i} className="text-gray-300 text-[16px] sm:text-[18px]" />
        );
        continue;
      }

      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="text-yellow-500 text-[16px] sm:text-[18px]" />
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="text-yellow-500 text-[16px] sm:text-[18px]"
          />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className="text-gray-300 text-[16px] sm:text-[18px]" />
        );
      }
    }

    return stars;
  };

  return (
    <section className="w-full pt-[88px] flex justify-center">
      <div className="w-full max-w-[1064px] px-4 md:px-6">
        <div className="text-[13px] text-[#A0A0A0] mb-2">
          Result found: {filteredCompanies.length}
        </div>

        <div className="flex flex-col gap-[20px] sm:gap-[25px] mt-[5px]">
          {filteredCompanies.map((company) => {
            const rating = company.averageRating || 0;
            const reviews = company.totalReviews || 0;

            return (
              <div
                key={company._id}
                className="w-full border border-[#E5E5E5] rounded-[12px] px-4 sm:px-5 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white overflow-hidden"
              >
                {/* LEFT */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-[21.72px] w-full min-w-0">
                  <img
                    src={
                      company.logo && company.logo.trim() !== ""
                        ? company.logo
                        : `https://ui-avatars.com/api/?name=${company.name}&background=E5E7EB&color=111827`
                    }
                    alt={company.name}
                    className="w-[90px] h-[90px] sm:w-[105.28px] sm:h-[100px] object-contain flex-shrink-0"
                  />

                  <div className="flex flex-col gap-[18px] sm:gap-[22px] w-full min-w-0">
                    <h2 className="text-[18px] sm:text-[20px] text-black font-medium leading-[28px] break-words">
                      {company.name}
                    </h2>

                    <div className="flex items-start gap-[6px] min-w-0">
                      <FiMapPin className="text-[13px] text-[#767676] mt-[2px] flex-shrink-0" />

                      <p className="text-[13px] text-[#767676] leading-[20px] break-all min-w-0">
                        {company.location}
                      </p>
                    </div>

                    {/* rating row */}
                    <div className="flex flex-wrap items-center gap-[6px] w-full min-w-0">
                      <p className="text-[15px] sm:text-[16px] text-black font-medium">
                        {reviews === 0 ? "No ratings" : rating.toFixed(1)}
                      </p>

                      <div className="flex items-center gap-[2px] flex-shrink-0">
                        {renderStars(rating, reviews)}
                      </div>

                      <p className="text-[14px] sm:text-[16px] text-black break-words">
                        {reviews} Reviews
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT (FIXED FOR iPHONE) */}
                <div className="w-full lg:w-auto flex flex-col lg:flex-col items-start lg:items-end justify-between gap-3 lg:gap-[47px] shrink-0">
                  <p className="text-[12px] text-[#767676] break-words">
                    Founded on:{" "}
                    {new Date(company.foundedOn).toLocaleDateString("en-IN")}
                  </p>

                  <button
                    onClick={() => navigate(`/detail/${company._id}`)}
                    className="w-full sm:w-[146px] h-[40px] sm:h-[37px] bg-[#303030] text-white text-[15px] rounded-[8px]"
                  >
                    Detail Review
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanyCard;