// src/JobApplicationForm.js
import React, { useContext, useState } from 'react';
import "./JobApplicationForm.css";
import Api from '../../AxiosConfigue';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Authcontext } from '../context/AuthContext';

const JobApplicationForm = () => {
  const {id} = useParams();
  console.log(id,"id")
    const route = useNavigate();
    const {state}=useContext(Authcontext)
    const [applicantsData, setApplicantsData] = useState({
    name: '',
    email: '',
    phone: '',
    salaryExpectation: '',
    workExperience: '',
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicantsData({ ...applicantsData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     try{
    if(applicantsData.name && applicantsData.email && 
        applicantsData.phone && applicantsData.salaryExpectation 
         &&applicantsData.workExperience && applicantsData.coverLetter){
          const response= await Api.post("/auth/job-application",{applicantsData,
            userId: state?.user?.userId,
            jobId: id,
            });
            if(response.data.success){
               setApplicantsData({
                name: '',
                email: '',
                phone: '',
                salaryExpectation: '',
                workExperience: '',
                coverLetter: '',
               })
              toast.success(response.data.message);
              route("/jobs")
            }
         }else{
            throw Error("All fields are Mandatory")
         }
     }catch(error){
        toast.error(error?.response?.data?.error|| error.message)
     }
  };

  return (
    <div className="application-form-container">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div className='jobappl'>
          <label htmlFor="name">Full Name:</label>
          <input  className='applicntinpt'
            type="text"
            id="name"
            name="name"
            value={applicantsData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='jobappl'>
          <label htmlFor="email">Email:</label>
          <input  className='applicntinpt'
            type="email"
            id="email"
            name="email"
            value={applicantsData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='jobappl'>
          <label htmlFor="phone">Phone Number:</label>
          <input  className='applicntinpt'
            type="tel"
            id="phone"
            name="phone"
            value={applicantsData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='jobappl'>
          <label htmlFor="salaryExpectation">Salary Expectation:</label>
          <input  className='applicntinpt'
            type="text"
            id="salaryExpectation"
            name="salaryExpectation"
            value={applicantsData.salaryExpectation}
            onChange={handleChange}
            required
          />
        </div>
        <div className='jobappl'>
          <label htmlFor="workExperience">Work Experience (in years):</label>
          <input className='applicntinpt'
            type="number"
            id="workExperience"
            name="workExperience"
            value={applicantsData.workExperience}
            onChange={handleChange}
            required
          />
        </div>
        <div className='jobappl'>
          <label htmlFor="coverLetter">Cover Letter:</label>
          <textarea className='applicanttextare'
            id="coverLetter"
            name="coverLetter"
            value={applicantsData.coverLetter}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <button className='apllicnt_button' type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
