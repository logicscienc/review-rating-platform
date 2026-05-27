const express = require("express");
const router = express.Router();

// import the controller
const {
    createCompany,
    getCompanies,
    getCompanyById,
}  = require("../controllers/companyController");


// Create a new company
router.post("/", createCompany);


// GET ALL COMPANIES
router.get("/", getCompanies);


// GET SINGLE COMPANY
router.get("/:id", getCompanyById);


module.exports = router;