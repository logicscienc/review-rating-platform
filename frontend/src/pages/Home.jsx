import React, {useEffect, useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import FilterSection from '../components/FilterSection'
import CompanyCard from '../components/CompanyCard'
import { getCompanies } from '../api/api'

import AddCompany from '../components/modal/AddCompany'
const Home = () => {

    const [companies, setCompanies] = useState([]);
const [filteredCompanies, setFilteredCompanies] = useState([]);
const [city, setCity] = useState("");
const [open, setOpen] = useState(false);
const [selectedSort, setSelectedSort] = useState("Name");

useEffect(() => {
  fetchCompanies();
}, []);

const fetchCompanies = async () => {
  try {
    const res = await getCompanies();

    setCompanies(res.data.data);
    setFilteredCompanies(res.data.data);

  } catch (error) {
    console.log(error);
  }
};

const handleSearch = () => {
  const filtered = companies.filter((company) =>
    company.location?.toLowerCase().includes(city.toLowerCase())
  );

  setFilteredCompanies(filtered);
};

const sortedCompanies = useMemo(() => {
  let updatedCompanies = [...filteredCompanies];

  if (selectedSort === "Name") {
    updatedCompanies.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (selectedSort === "Average") {
    updatedCompanies.sort(
      (a, b) => b.averageRating - a.averageRating
    );
  }

  if (selectedSort === "Rating") {
    updatedCompanies.sort(
      (a, b) => b.totalReviews - a.totalReviews
    );
  }

  if (selectedSort === "Location") {
    updatedCompanies.sort((a, b) =>
      a.location.localeCompare(b.location)
    );
  }

  return updatedCompanies;
}, [filteredCompanies, selectedSort]);


  return (
    <div>
      {/* <Navbar/> */}
      <FilterSection
       city={city}
  setCity={setCity}
  handleSearch={handleSearch}
    setOpen={setOpen}
     selectedSort={selectedSort}
  setSelectedSort={setSelectedSort}
  
      
      />

      <CompanyCard filteredCompanies={sortedCompanies} />


    <AddCompany
      isOpen={open}
      onClose={() => setOpen(false)}
      refreshCompanies={fetchCompanies}
    />
    </div>
  )
}

export default Home 