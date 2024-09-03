import React, { useEffect, useState } from 'react'
import Api from '../../AxiosConfigue';
import { useParams } from 'react-router-dom';
import "./Applicants.css"

const JobApplicants = () => {
  const{id}=useParams();

  const[applicant,setApplicant]=useState([]);

  console.log(applicant,"applicant")

  const Getjobs = async () => {
    try{
       const response = await Api.post("/admin/get-applicants",{
        jobId:id,
       });
       setApplicant(response.data.userdata);
      }catch(error){
      console.log(error,"error")
     }
 }

  useEffect(()=>{
   Getjobs();
 },[])

  
 return (
  <div className="job-applicants-container">
    <h1 className='applicants_header'>Job Applicants</h1>
    {applicant.length === 0 ? (
      <p>No applicants found for this job.</p>
    ) : (
      <div className="applicants-table">
        <div className="table-header">
          <div className="header-item">Name</div>
          <div className="header-item">Number</div>
          <div className="header-item">Email</div>
          <div className="header-item">Work Experience</div>
          <div className="header-item">Salary Expectation</div>
        </div>
        {applicant.map((applicant, index) => (
          <div key={index} className="table-row">
            <div className="table-item">{applicant.name}</div>
            <div className="table-item">{applicant.phone}</div>
            <div className="table-item">{applicant.email}</div>
            <div className="table-item">{applicant.workExperience}</div>
            <div className="table-item">{applicant.salaryExpectation}</div>
          </div>
        ))}
      </div>
    )}
  </div>
)
}

export default JobApplicants