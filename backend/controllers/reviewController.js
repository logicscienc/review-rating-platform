const Review = require("../models/Review");


// CREATE REVIEW
const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET REVIEWS BY COMPANY
const getReviewsByCompany = async (req, res) => {
  try {
    const reviews = await Review.find({
      companyId: req.params.companyId,
    }).sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    let averageRating = 0;

    if (totalReviews > 0) {
      const sum = reviews.reduce((acc, item) => acc + item.rating, 0);
      averageRating = sum / totalReviews;
    }

    res.status(200).json({
      success: true,
      count: totalReviews,
      averageRating,
      data: reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// LIKE REVIEW 
const likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.likes += 1;

    await review.save();

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createReview,
  getReviewsByCompany,
  likeReview,
};