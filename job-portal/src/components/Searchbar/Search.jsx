import React, { useState } from 'react';
import "./Search.css";
import Api from '../../AxiosConfigue';

const Search = ({setGetJobs}) => {

  const [filters, setFilters] = useState({
    jobtype: '',
    location: '',
    jobTitle: ''
  });

  console.log(filters,"filters")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post('/recruiter/search',filters);
      if (response.data.success){
        setFilters({
          jobtype:"",
          location:"",
          jobTitle:""

        })
        setGetJobs(response.data.serchedjobs);
      } else {
        console.error('Failed to fetch jobs:', response.data.message);
      }
    }catch (error) {
      console.error('Error during job filter request:', error);
    }
  };
   
  return (
    <div className="filter-bar">
      <form onSubmit={handleSubmit}>
        <div className="filter-input">
          <label htmlFor="jobType">Job Type:</label>
          <input
            type="text"
            id="jobType"
            name="jobtype"
            value={filters.jobtype}
            onChange={handleChange}
            placeholder="Enter job type"
          />
        </div>
        <div className="filter-input">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>
        <div className="filter-input">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={filters.jobTitle}
            onChange={handleChange}
            placeholder="Enter job title"
          />
        </div>
        <button className='secrhbtn' type="submit">Filter</button>
      </form>
    </div>
  );
};

export default Search;
