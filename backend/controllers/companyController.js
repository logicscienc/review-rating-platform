const Company = require("../models/Company");
const mongoose = require("mongoose");

// CREATE COMPANY
const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "companyId",
          as: "reviews"
        }
      },
      {
        $addFields: {
          totalReviews: { $size: "$reviews" },

          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] },
              { $avg: "$reviews.rating" },
              0
            ]
          }
        }
      },
      {
        $project: {
          reviews: 0
        }
      }
    ]);

   
    console.log("DEBUG FIRST COMPANY:", companies[0]);

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// GET SINGLE COMPANY
const getCompanyById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }

    const company = await Company.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "companyId",
          as: "reviews"
        }
      },
      {
        $addFields: {
          totalReviews: { $size: "$reviews" },

          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] },
              { $avg: "$reviews.rating" },
              0
            ]
          }
        }
      },
      {
        $project: {
          reviews: 0
        }
      }
    ]);

    if (!company || company.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      data: company[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
};