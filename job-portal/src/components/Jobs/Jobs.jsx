import React, { useContext, useEffect, useState } from 'react'
import Api from '../../AxiosConfigue';
import "./Jobs.css"
import img from "../img/save-instagram.png"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Search from '../Searchbar/Search';
import { Authcontext } from '../context/AuthContext';
import toast from 'react-hot-toast';


const Jobs = ({getJobs,setGetJobs}) => {
  const {state} = useContext(Authcontext);

   const routes=useNavigate();

   const formatDate = (dateString) => {
    try {
      return moment(dateString).format('MMMM DD, YYYY');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date not available";
    }
  };

    console.log(getJobs,"getJobs");

    const Getjobs = async () => {
       try{
          const response = await Api.get("/recruiter/get-job-deatil");
          setGetJobs(response.data.jobDetails);
         }catch(error){
         console.log(error,"error")
        }
    }
     useEffect(()=>{
      Getjobs();
    },[])
    
  return (
    <div>
    <Search setGetJobs={setGetJobs}/>
    <div className="JobsMaindiv" style={{display:"flex",gap: "35px",width:"85%",margin:"0 auto",flexWrap:"wrap"}}>
      {getJobs.map((jobs)=>{
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
        <p className="salary">Type:{jobs.jobtype}</p>
       
      </div>
    </div>
    <div className='applysec'>
    <div>
      <div
        onClick={() => {
          if (state?.user) {
            routes(`/jobform/${jobs._id}`);
          } else {
            toast.error("Please log in to apply for jobs."); 
            routes("/login")
          }
        }}
        className='aply'>
        Apply
      </div>
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
  )
}

export default Jobs