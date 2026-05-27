const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const companyRoutes = require("./routes/companyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const dbConnect = require("./config/database");


dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;


// DATABASE CONNECT
dbConnect.connect();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use("/api/companies", companyRoutes);

app.use("/api/reviews", reviewRoutes);


// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});


// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

