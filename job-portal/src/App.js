import logo from './logo.svg';
import Home from './components/Home/Home';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Registeruser from './components/RegisterUer/Registeruser';
import JobPostingPage from './components/Rucrieters/JobPostingPage';
import Jobs from './components/Jobs/Jobs';
import SingleProduct from './components/singleProductPage/SingleProduct';
import Search from './components/Searchbar/Search';
import UserProfile from "./components/UserProfilePage/UserProfile"
import { useState } from 'react';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegister from './components/Admin/AdminRegister';
import JobApplicationForm from './components/Jobapplications/JobApplicationForm';
import AddedJobs from './components/AddedJobs/AddedJobs';
import AdmimProfile from './components/admiProfile/AdminProfile';
import EditProfile from './components/editProfile/EditProfile';
import AppliedJobs from './components/ApplidedJobs/AppliedJobs';
import JobApplicants from './components/Applicants/JobApplicants';
import Update from './components/updateProfile/Update';


function App() {
  const [getJobs , setGetJobs] = useState([]);
  const [updateData, setUpdateData] = useState({name:"",email:"",skills:"", phone:""});
  

  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/update" element={<Update updateData={updateData} setUpdateData={setUpdateData}  />}/>
      <Route path="/userprofile" element={<UserProfile updateData={updateData} setUpdateData={setUpdateData} />}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/editprofile" element={<EditProfile/>}/>
      <Route path="/register" element={<Registeruser/>}/>
      <Route path="/jobposting" element={<JobPostingPage/>}/>
      <Route path="/jobs" element={<Jobs getJobs={getJobs} setGetJobs={setGetJobs}/> }/>
      <Route path="/singleProduct/:id" element={<SingleProduct/>}/>
      <Route path="/searchbar" element={<Search setGetJobs={setGetJobs}/>}/>
      <Route path="/adminprofile" element={<AdmimProfile/>}/>
      <Route path="/adminLogin" element={<AdminLogin/>}/>
      <Route path="/adminregister" element={<AdminRegister/>}/>
      <Route path="/jobform/:id" element={<JobApplicationForm/>}/>
      <Route path="/addedJobs" element={<AddedJobs/>}/>
      <Route path="/editProfle" element={<EditProfile/>}/>
      <Route path="/appliedJobs" element={<AppliedJobs/>}/>
      <Route path="/applicants/:id" element={<JobApplicants/>}/>
   
  </Routes>
   </div>
  );
}

export default App;
