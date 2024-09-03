import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Api from '../../AxiosConfigue';
import "./SingleProduct.css"


const SingleProduct = () => {

    const [loading, setLoading] = useState(false);
    const[jobDetails,setJobDetails] = useState([]);
    const {id}=useParams();
    const route= useNavigate();

    console.log(id,"id")
    console.log(jobDetails,"jobDetails");

    async function GetSingleProductData() {
        setLoading(true);
        try {
          const response = await Api.post("/recruiter/get-single-job-deatil",{jobId:id});
          if (response.data.success) {
            setLoading(false);
            setJobDetails(response.data.job);
          }
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(()=>{
        GetSingleProductData();
      },[id])

       return (
            <div className="single-job-container">
              <h1 className='single-job-containerHed'>{jobDetails.jobTitle}</h1>
              <div className="job-header">
                <img src={jobDetails.image} alt={`${jobDetails.company} logo`} className="company-logo2" />
                <div className="job-info">
                  <h2>{jobDetails.company}</h2>
                  <p><strong>Location:</strong> {jobDetails.location}</p>
                  <p><strong>Salary:</strong> {jobDetails.salary}</p>
                  <p><strong>Date Posted:</strong> {new Date(jobDetails.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="job-description">
                <h3>Job Description:</h3>
                <p>{jobDetails.jobDescription}</p>
              </div>
              <div className="apply-section">
                <a href={jobDetails.applyLink}  onClick={()=>route(`/jobform/${jobDetails._id}`)} target="_blank" rel="noopener noreferrer" className="apply-button">Apply Now</a>
              </div>
            </div>
          )
        };
    

export default SingleProduct