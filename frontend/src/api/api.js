import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default API;


// ================= COMPANY APIs =================

// Get all companies
export const getCompanies = () => API.get("/companies");

// Get single company
export const getCompanyById = (id) =>
  API.get(`/companies/${id}`);

// Create company
export const createCompany = (data) =>
  API.post("/companies", data);



// ================= REVIEW APIs =================

// Get reviews by company
export const getReviewsByCompany = (companyId) =>
  API.get(`/reviews/${companyId}`);

// Create review
export const createReview = (data) =>
  API.post("/reviews", data);

// Like review
export const likeReview = (id) =>
  API.patch(`/reviews/${id}/like`);