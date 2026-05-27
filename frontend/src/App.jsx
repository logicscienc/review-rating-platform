import "./index.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "../src/pages/Home";
import DetailReview from "../src/pages/DetailReview";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailReview />} />
      </Routes>

    </div>
  );
}

export default App;
