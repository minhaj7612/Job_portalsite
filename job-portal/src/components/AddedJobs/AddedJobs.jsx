import React, { useContext, useEffect, useState } from 'react';
import Api from '../../AxiosConfigue';
import "../Jobs/Jobs.css";
import "./Addedjobs.css"
import img from "../img/save-instagram.png";
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/AuthContext';
import moment from 'moment/moment';

const AddedJobs = () => {
  const { state } = useContext(Authcontext);
  const [getjobs, setGetjobs] = useState([]);
  const routes = useNavigate();

  const formatDate = (dateString) => {
    try {
      return moment(dateString).format('MMMM DD, YYYY');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date not available";
    }
  };

  const GetAddedjobs = async () => {
    try {
      if (state?.user?.userId) { 
        const response = await Api.get("/admin/get-added-jobs", {
          params:{ userId: state.user.userId } 
        });
        setGetjobs(response.data.jobs);
      } else {
        console.error('userId is not available in state');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    if (state) {
      GetAddedjobs();
    }
  }, [state]);

  return (
    <div className='mainAdded'>
        <h2 className='mainh2'>Your Posted Jobs</h2>
      <div className='Cont_Added'>
      {getjobs.map((jobs)=>{
      const formattedDate = formatDate(jobs.date);
      return(
      <div className='Jobs_mainPage'>
      <div className="job-card" onClick={()=>routes(`/singleproduct/${jobs._id}`)}>
        <div className='date_save'>
          <div className='date'>
            <span>{formattedDate}</span>
          </div>
          <div className='save_icon'>
            <img style={{width:"18px"}} src={img} alt="" />
          </div>
        </div>
      <div className="job-card-header">
        <img src={jobs.image} alt={`${jobs.company} logo`} className="company-logo" />
        <div className="job-details">
          <h2 className="job-title">{jobs.jobTitle}</h2>
          <p className="company-name">{jobs.company}</p>
        </div>
      </div>
      <div className="job-card-body">
        <p className="location">Location: {jobs.location}</p>
        <p className="salary">Type:  {jobs.jobtype}</p>
       
      </div>
    </div>
    <div className='applysec'>
      <div o onClick={()=>routes(`/applicants/${jobs._id}`)} className='aply'>
        Appllicants
      </div>
      <div className='detail' onClick={() => routes(`/singleproduct/${jobs._id}`)}>
        Details
      </div>
    </div>
      </div>)
    })
      }
    </div>
    </div>
  );
};

export default AddedJobs;
