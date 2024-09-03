import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import logoImg from "../img/hiring-team.png";
import sponsor1 from "../img/adidas.png"; 
import sponsor2 from "../img/puma.png"; 
import sponsor3 from "../img/nike.png"; 

const Home = () => {
  const routes = useNavigate();
  const popularJobs = [
    { position: 'Software Engineer', vacancy: "10" },
    { position: 'Data Scientist', vacancy: "20" },
    { position: 'Product Manager', vacancy: "30" },
    { position: 'UX/UI Designer', vacancy: "15" },
    { position: 'Software Engineer', vacancy: "10" },
    { position: 'Data Scientist', vacancy: "20" },
    { position: 'Product Manager', vacancy: "30" },
    { position: 'UX/UI Designer', vacancy: "15" },
    { position: 'Software Engineer', vacancy: "10" },
    { position: 'Data Scientist', vacancy: "20" },
    { position: 'Product Manager', vacancy: "30" },
    { position: 'UX/UI Designer', vacancy: "15" }
  ];

  return (
    <div className='home-container'>
      <div className='hometopdv'>
        <div className='hometopdv2'>
          <h1 className='headinghome'>Get Your Dream Job</h1>
          <p className='headinpara'>Find the perfect job that matches your skills and interests. Explore opportunities and start your career journey with us!</p>
          <div className='home-container_btn_main'>
          <button className='home-container_btn' onClick={() => routes("/jobs")}>Start Applying</button>
          </div>
      
        </div>
        <div className='rightBar'>
          <div className='imgside'>
            <img src={logoImg} alt="Hiring Team" />
          </div>
        </div>
      </div>

      <div className='popular-jobs'>
        <h2 className='popularjheader'>Most Popular Jobs</h2>
        <div className='job_cont'>
          {popularJobs.map((job, index) => (
            <div className='job_contmap' key={index}>
              <h4>{job.position}</h4>
              <span>{job.vacancy} open positions</span>
            </div>
          ))}
        </div>
      </div>

      <div className='sponsors'>
        <h2>Our Sponsors</h2>
        <div className='sponsors-container'>
          <img src={sponsor1} alt="Sponsor 1" />
          <img src={sponsor2} alt="Sponsor 2" />
          <img src={sponsor3} alt="Sponsor 3" />
        </div>
      </div>

      <footer className='footer'>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
