import React, { useState } from "react";
import { FiX, FiMapPin, FiCalendar } from "react-icons/fi";
import { createCompany } from "../../api/api";
import {toast} from "react-toastify";

const AddCompany = ({ isOpen, onClose, refreshCompanies }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    foundedOn: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 // simple validation
  const validate = () => {
    if (!form.name || !form.location || !form.foundedOn || !form.city) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
  ...form,
  foundedOn: new Date(form.foundedOn),
  logo: `https://ui-avatars.com/api/?name=${form.name}&background=10B981&color=fff`,
};

      const res = await createCompany(payload);

      toast.success("Company added successfully ");

      refreshCompanies?.(); 

      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add company ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* Modal Box */}
      <div className="w-[414px] h-[494px] bg-white rounded-[25px] shadow-lg relative overflow-hidden">

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
          <button onClick={onClose} className="mt-3 mr-3 z-20 hover:cursor-pointer">
            <FiX size={24} />
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-[24px] font-semibold text-black text-center w-full mt-6">
          Add Company
        </h1>

        {/* FORM */}
        <div className="mt-6 flex flex-col gap-4 items-center">

          {/* Company Name */}
          <div className="w-[359px] flex flex-col gap-1">
            <label className="text-[14px] text-[#959595]">
              Company Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter..."
              className="w-full h-[37px] border border-[#CDCDCD] rounded-[5px] px-3 text-[14px] placeholder:text-[#D4D4D4] outline-none"
            />
          </div>

          {/* Location */}
          <div className="w-[359px] flex flex-col gap-1">
            <label className="text-[14px] text-[#959595]">
              Location
            </label>

            <div className="h-[37px] border border-[#CDCDCD] rounded-[5px] px-3 flex items-center justify-between">
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Select Location"
                className="w-full text-[14px] placeholder:text-[#D4D4D4] outline-none"
              />
              <FiMapPin className="text-[#777777]" />
            </div>
          </div>

          {/* Founded On */}
          <div className="w-[359px] flex flex-col gap-1">
            <label className="text-[14px] text-[#959595]">
              Founded On
            </label>

            <div className="h-[37px] border border-[#CDCDCD] rounded-[5px] px-3 flex items-center justify-between">
              <input
                name="foundedOn"
                value={form.foundedOn}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                className="w-full text-[14px] placeholder:text-[#D4D4D4] outline-none"
              />
              <FiCalendar className="text-[#777777]" />
            </div>
          </div>

          {/* City */}
          <div className="w-[359px] flex flex-col gap-1">
            <label className="text-[14px] text-[#959595]">
              City
            </label>

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter..."
              className="w-full h-[37px] border border-[#CDCDCD] rounded-[5px] px-3 text-[14px] placeholder:text-[#D4D4D4] outline-none"
            />
          </div>

        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
             disabled={loading}
            className="w-[101px] h-[37px] rounded-[5px] bg-gradient-to-r from-[#D100F3] to-[#002BC5] text-white text-[15px] font-medium hover: cursor-pointer"
          >
             {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCompany; 
