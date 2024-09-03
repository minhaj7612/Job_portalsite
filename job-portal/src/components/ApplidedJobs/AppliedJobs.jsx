
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../AxiosConfigue';
import { Authcontext } from '../context/AuthContext';
import img from "../img/save-instagram.png"
import moment from 'moment';
import "../Jobs/Jobs.css"
import { useNavigate } from 'react-router-dom';

const AppliedJobs = () => {
  const routes=useNavigate();
const {state}=useContext(Authcontext);
console.log(state,"state")
const[appliedJobs,setAppliedJobs]=useState([]);


useEffect(() => {
  // Ensure that the userId is available before making the request
  if (state?.user?.userId) {
    console.log('Sending request with userId:', state.user.userId);
    GetAppliedjobs();
  } else {
    console.warn('No userId available in state');
  }
}, [state?.user?.userId]);

const GetAppliedjobs = async () => {
  try {
    const response = await Api.post('/user/applied-jobs', {
      userId: state.user.userId,
    });
    console.log('Response data:', response.data); // Log the response to check data structure
    setAppliedJobs(response.data.appliedJobsId);
  } catch (error) {
    console.error('Error fetching applied jobs:', error); // Improved error logging
  }
};
const formatDate = (dateString) => {
  try {
    return moment(dateString).format('MMMM DD, YYYY');
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date not available";
  }
};
return (
  <div>
    <h1 style={{textAlign:'center'}} className='applied_sec'>Applied Jobs</h1>
    {appliedJobs.length === 0 ? (
      <p>No jobs applied yet.</p>
    ) : (
      <div className='Jobmain'>
        {appliedJobs.map((job) => {
          const formattedDate = formatDate(job.date);
          return (
            <div key={job._id} className="Jobs_mainPage">
              <div className="job-card">
                <div className="date_save">
                  <div className="date">
                    <span>{formattedDate}</span>
                  </div>
                  <div className="save_icon">
                    <img style={{ width: "18px" }} src={img} alt="Save Icon" />
                  </div>
                </div>
                <div className="job-card-header">
                  <img
                    src={job.image}
                    alt={`${job.company} logo`}
                    className="company-logo"
                  />
                  <div className="job-details">
                    <h2 className="job-title">{job.jobTitle}</h2>
                    <p className="company-name">{job.company}</p>
                  </div>
                </div>
                <div className="job-card-body">
                  <p className="location">Location: {job.location}</p>
                  <p className="salary">Type: {job.jobtype}</p>
                </div>
              </div>
              <div className="applysec">
                <div
                 onClick={()=>routes(`/jobform/${job._id}`)}
                  className="aply"
                >
                  Apply Again
                </div>
                <div
                  className="detail"
                  onClick={() => routes(`/singleproduct/${job._id}`)}
                >
                  Details
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);
}

export default AppliedJobs