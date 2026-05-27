const express = require("express");

const router = express.Router();



const {
  createReview,
  getReviewsByCompany,
  likeReview,
} = require("../controllers/reviewController");


// CREATE REVIEW
router.post("/", createReview);


// GET REVIEWS BY COMPANY
router.get("/:companyId", getReviewsByCompany);



router.patch("/:id/like", likeReview);


module.exports = router;