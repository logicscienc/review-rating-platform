import React, { useEffect, useState } from "react";
import CompanyDetailCard from "../components/CompanyDetailCard";
import ReviewList from "../components/ReviewList";
import { getCompanyById, getReviewsByCompany } from "../api/api";
import { useParams } from "react-router-dom";
import AddReview from "../components/modal/AddReview";

const DetailReview = () => {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchCompany();
    fetchReviews();
  }, [id]);

  const fetchCompany = async () => {
    try {
      const res = await getCompanyById(id);
      setCompany(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getReviewsByCompany(id);

      console.log("REVIEWS API:", res.data);

      setReviews(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex justify-center mt-[160px]">
      <div className="w-full max-w-[1064px] min-h-[905px] flex flex-col gap-6">

        {company && <CompanyDetailCard company={company} 
        onAddReview={() => setOpenModal(true)}
        />}

        <ReviewList reviews={reviews} />


     {openModal && id && (
  <AddReview
    companyId={id}
    onClose={() => setOpenModal(false)}
    onSuccess={() => {
      fetchReviews();
      setOpenModal(false);
    }}
  />
)}

      </div>
    </div>
  );
};

export default DetailReview;
