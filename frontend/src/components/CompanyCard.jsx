import React from "react";
import { FiMapPin } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ filteredCompanies  }) => {
    const navigate = useNavigate();
  const renderStars = (rating = 0, reviews = 0) => {
    const stars = [];

    

    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;

    for (let i = 0; i < 5; i++) {
      if (reviews === 0) {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-[18px]" />);
        continue;
      }

      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500 text-[18px]" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-500 text-[18px]" />,
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-[18px]" />);
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

        <div className="flex flex-col gap-[25px] mt-[5px]">
          {filteredCompanies.map((company) => {
            const rating = company.averageRating || 0;
            const reviews = company.totalReviews || 0;

            return (
              <div
                key={company._id}
                className="w-full min-h-[142px] border border-[#E5E5E5] rounded-[12px] px-5 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white"
              >
                {/* LEFT */}
                <div className="flex items-center gap-[21.72px]">
                  <img
                    src={
                      company.logo && company.logo.trim() !== ""
                        ? company.logo
                        : `https://ui-avatars.com/api/?name=${company.name}&background=E5E7EB&color=111827`
                    }
                    alt={company.name}
                    className="w-[105.28px] h-[100px] object-contain"
                  />

                  <div className="flex flex-col gap-[22px]">
                    <h2 className="text-[20px] text-black font-medium">
                      {company.name}
                    </h2>

                    <div className="flex items-center gap-[6px]">
                      <FiMapPin className="text-[13px] text-[#767676]" />
                      <p className="text-[13px] text-[#767676]">
                        {company.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-[8px]">
                      <p className="text-[16px] text-black font-medium">
                        {reviews === 0 ? "No ratings" : rating.toFixed(1)}
                      </p>

                      <div className="flex items-center gap-[2px]">
                        {renderStars(rating, reviews)}
                      </div>

                      <p className="text-[16px] text-black">
                        {reviews} Reviews
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-[47px]">
                  <p className="text-[12px] text-[#767676]">
                    Founded on:{" "}
                    {new Date(company.foundedOn).toLocaleDateString("en-IN")}
                  </p>

                  <button 
                    onClick={() => navigate(`/detail/${company._id}`)}
                  className="w-[146px] h-[37px] bg-[#303030] text-white text-[15px] rounded-[8px] hover:cursor-pointer">
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