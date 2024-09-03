import React, { useContext, useEffect } from 'react'
import profilepic from "../img/blue-circle-with-white-user_78370-4707.avif"
import "../UserProfilePage/UserProfile.css"
import { Authcontext } from '../context/AuthContext'
import AddedJobs from '../AddedJobs/AddedJobs'

const AdmimProfile = () => {

  const {state}=useContext(Authcontext);

 
  return (
    <div className='userProfileMainPage'>
     <div className='userProfileContPage'>
        <div className='userProfile_left'>
          <h1>Admin Profile</h1>
            <div className='userProfilebx'>
                <img src={profilepic} alt=""/>
                <h3>{state?.user?.name}</h3>
            </div>
        </div>
        <div className='userProfile_right'>
        <AddedJobs/>
        </div>
     </div>
    </div>
  )
}

export default AdmimProfile;