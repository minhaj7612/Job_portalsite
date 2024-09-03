import React, { useContext, useState } from 'react';
import './Navbar.css'; // Ensure this import is present
import { useNavigate } from 'react-router-dom';
import "../dropdownmenu/Dropdown.css" 
import { Authcontext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Api from '../../AxiosConfigue';

const Navbar = () => {
  const [open ,setOpen]=useState(false);
  const{state,dispatch}=useContext(Authcontext);
  const routes=useNavigate();
  const router = useNavigate();
  const [show, setShow]=useState(false);

  async function LogOut(){
    try{
       const response= await Api.get("/auth/user-logout");
       if(response.data.success){
        dispatch({type:"LOGOUT",payload:null})
        toast.success(response.data.message)
        router("/")
       }else{
        toast.error('Logout failed');
       }
    }catch(error){
      toast.error(error?.response?.data?.error || 'An error occurred during logout');
    }
}
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Job It</h1>
      </div>
      
       <div className={`navbar-links ${ show ? "open": ""}`}>
        <li className='navbar-links_list' onClick={ ()=>router("/jobs")}>Jobs</li>
        <li className='navbar-links_list' onClick={ ()=>router("/")}>Home</li>
        {state?.user?.role=="Admin"&& (<li className='navbar-links_list' onClick={ ()=>router("/jobposting")}>Post Job</li>)}
        {state?.user?.role=="Admin"&& (<li className='navbar-links_list' onClick={ ()=>router("/adminprofile")}>Profile</li>)}
        {state?.user?.role== "User" && (<li className='navbar-links_list' onClick={ ()=>router("/userprofile")}>Profile</li>)} 
        <li className='navbar-links_list' onClick={()=>setOpen(!open)}>Login</li>
      </div>

      <div className='bars' onClick={()=>setShow(!show)}>
        <div className='bars1'></div>
        <div className='bars1'></div>
        <div className='bars1'></div>
      </div>

      {open &&  <div className='useadmin_main'>
        <ul className='useadmin_cont' onClick={()=>setOpen(false)}>
            <li onClick={()=>routes("/login")} className='li2'>User Login</li>
            <li onClick={()=>routes("/adminLogin")} className='li2'>Admin Login</li>
              {state?.user && <li onClick={LogOut} className='li2'>Log Out</li>}
        </ul>
    </div>}
   
    </nav>
  );
};

export default Navbar;
