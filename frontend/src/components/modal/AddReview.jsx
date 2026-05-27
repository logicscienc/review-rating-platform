import React, { useState } from "react";
import { createReview } from "../../api/api";
import { FiX } from "react-icons/fi";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";

const AddReview = ({ onClose, onSuccess, companyId }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
  fullName: "",
  subject: "",
  reviewText: "",
});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.name = "Name is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.reviewText.trim()) newErrors.reviewText = "Review is required";
    if (!rating) newErrors.rating = "Rating is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        companyId,
        rating,
        ...form,
      };
    console.log(payload);
      await createReview(payload);

      toast.success("Review added successfully!");
      onSuccess();
    } catch (err) {
      toast.error("Failed to add review");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[530px] h-[731px] bg-white rounded-[25px] shadow-lg relative overflow-hidden">
        {/* TOP SECTION */}
        <div className="flex items-start justify-between relative z-10">
          {/* Ellipses */}
          <div className="relative">
            <div
              className="absolute w-[116px] h-[116px] rounded-full"
              style={{
                top: "-4px",
                left: "-34px",
                background: "linear-gradient(90deg, #D100F3, #002BC5)",
              }}
            />
            <div
              className="absolute w-[116px] h-[116px] rounded-full opacity-25"
              style={{
                top: "-55px",
                left: "28px",
                background: "linear-gradient(90deg, #D100F3, #002BC5)",
              }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-3 mr-3 z-20 hover:cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-[24px] font-semibold text-black text-center w-full mt-6">
          Add Review
        </h1>

        {/* FORM */}
        <div className="mt-6 flex flex-col gap-4 items-center">
          {/*  Name */}
          <div className="w-[359px] flex flex-col gap-1">
            <label className="text-[14px] text-[#959595]">Full Name</label>

            <input
              name="fullName"
value={form.fullName}
              onChange={handleChange}
              placeholder="Enter..."
              className="w-full h-[37px] border border-[#CDCDCD] rounded-[5px] px-3 text-[14px] placeholder:text-[#D4D4D4] outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* subject */}
          <div className="w-[359px] flex flex-col gap-1">
            <label className="text-[14px] text-[#959595]">Subject</label>

            <div className="h-[37px] border border-[#CDCDCD] rounded-[5px] px-3 flex items-center justify-between">
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter..."
                className="w-full text-[14px] placeholder:text-[#D4D4D4] outline-none"
              />
            </div>
            {errors.subject && (
              <p className="text-red-500 text-xs">{errors.subject}</p>
            )}
          </div>

          {/* Enter review*/}
          <div className="w-[359px] flex flex-col gap-1">
            <label className="text-[14px] text-[#959595]">
              Enter your Review
            </label>

            <div className="h-[100px] border border-[#CDCDCD] rounded-[5px] px-3 flex items-center justify-between">
              <textarea
                name="reviewText"
                value={form.reviewText}
                onChange={handleChange}
                placeholder="Description"
                className="w-full text-[14px] placeholder:text-[#D4D4D4] outline-none"
              />
            </div>

            {errors.reviewText && (
              <p className="text-red-500 text-xs">{errors.reviewText}</p>
            )}
          </div>

          {/*RAting  */}
          <h1 className="text-[24px] font-semibold text-black">Rating</h1>

          {/* Star Row */}
          <div className="flex items-center justify-between w-[359px]">
            {/* Stars */}
           
<Rating
  onClick={(rate) => setRating(rate / 20)}
  initialValue={rating}
  size={38}
  allowFraction
  transition
  SVGstyle={{ display: "inline-block" }}
/>

            {/* Text */}
            <p className="text-[14px] text-[#6B6B6B]">Satisfied</p>
          </div>

          {errors.rating && (
            <p className="text-red-500 text-xs w-[359px] text-left">
              {errors.rating}
            </p>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-[101px] hover:cursor-pointer h-[37px] rounded-[5px] text-white text-[15px] font-medium ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-[#D100F3] to-[#002BC5]"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
