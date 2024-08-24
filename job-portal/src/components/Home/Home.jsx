import React from 'react';
import "./Home.css"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const routes=useNavigate();
  const popularJobs = [
    {position:'Software Engineer',vacancy:"10"},
    {position:'Data Scientist',vacancy:"20"},
    {position:'Product Manager',vacancy:"30"},
     {position:'UX/UI Designer',vacancy:"15"} ,
     {position:'Software Engineer',vacancy:"10"},
     {position:'Data Scientist',vacancy:"20"},
     {position:'Product Manager',vacancy:"30"},
      {position:'UX/UI Designer',vacancy:"15"} ,
      {position:'Software Engineer',vacancy:"10"},
      {position:'Data Scientist',vacancy:"20"},
      {position:'Product Manager',vacancy:"30"},
       {position:'UX/UI Designer',vacancy:"15"} 
];

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div className='hometopdv'>
      <div className='hometopdv2'>
        <h1 className='headinghome'>Get Your Dream Job</h1>
        <p className='headinpara'>Find the perfect job that matches your skills and interests. Explore opportunities and start your career journey with us!</p>
        <button onClick={()=>routes("/jobs")}>Start Applying</button>
      </div>
      <div className='rightBar' >
        <div className='imgside'>
        <img src="https://quantumhunts.com/user/assets/images/hero/hiring-team.png" alt="" />
        </div>
      </div>
      </div>
      
      <div>
        <h2>Most Popular Jobs</h2>
        <div className='job_cont'>
          {popularJobs.map((job, index) => (
            <div className='job_contmap' key={index}>
                <h4>{job.position}</h4>
                <span>{job.vacancy} open positions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;