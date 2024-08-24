import React, { useState } from 'react';
import './JobPostingPage.css'; 
import Api from '../../AxiosConfigue';
import toast from 'react-hot-toast';

const JobPostingPage = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    company: '',
    salary: '',
    jobDescription: '',
    image: '',
    date: '',
    jobtype:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.jobTitle && formData.location && formData.company &&
        formData.salary && formData.jobDescription && formData.image && formData.date && formData.jobtype){
        
        const response = await Api.post("/recruiter/Post-job-deatil", { formData });

        if (response.data.success) {
          setFormData({
            jobTitle: '',
            location: '',
            company: '',
            salary: '',
            jobDescription: '',
            image: '',
            date: '',
            jobtype:''
          });
          toast.success(response.data.message);
        } else {
          throw new Error(response.data.error || "Something went wrong");
        }
      } else {
        throw new Error("All fields are required");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="job-posting-container">
      <h1>Create a Job Posting</h1>
      <form onSubmit={handleSubmit}>
        <div className="job-posting-form">
          <label>
            Job Title:
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Salary:
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </label>
          <label>
            Job Posting Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Job Type:
            <input
              type="text"
              name="jobtype"
              value={formData.jobtype}
              onChange={handleChange}
            />
          </label>
          <label>
            Job Description:
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostingPage;

