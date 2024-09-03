// import React, { useContext, useState,useEffect } from 'react'
// import profilepic from "../img/blue-circle-with-white-user_78370-4707.avif"
// import "./UserProfile.css"
// import { Authcontext } from '../context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import Api from "../../AxiosConfigue/index"
// import AppliedJobs from '../ApplidedJobs/AppliedJobs'

// const UserProfile = ({updateData,setUpdateData}) => {
//   const route= useNavigate();
//   const {state}=useContext(Authcontext);
//   const [userInfo, setUserInfo] =useState();
//   console.log(userInfo,"userInfo")

//   return (
//     <div className='userProfileMainPage'>
//      <div className='userProfileContPage'>
//         <div className='userProfile_left'>
//           <h1 className='userpro_hed'>User Profile</h1>
//             <div className='userProfilebx'>
//                 <img src={profilepic} alt=""/>
//                 <h3>{state?.user?.name}</h3>
//                 {/* <span onClick={()=>route("/editProfle")}>edit</span> */}
//             </div>
//             <div>
//             { updateData.map((update, index) => (
//                <div key={index}>
//                 <p>{update.phone}</p>
//               </div>
//             ))}
//             </div>
//         </div>
//         <div className='userProfile_right'>
//            <AppliedJobs/>
//         </div>
//      </div>
//     </div>
//   )
// }

// export default UserProfile

import React, { useContext, useState, useEffect } from 'react';
import profilepic from "../img/blue-circle-with-white-user_78370-4707.avif";
import "./UserProfile.css";
import { Authcontext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Api from "../../AxiosConfigue/index";
import AppliedJobs from "../ApplidedJobs/AppliedJobs"

const UserProfile = ({ updateData, setUpdateData }) => {

  console.log(updateData,"updateData")
  const navigate = useNavigate();
  const { state } = useContext(Authcontext);
  console.log(state)
  const [userInfo, setUserInfo] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='userProfileMainPage'>
      <div className='userProfileContPage'>
        <div className='userProfile_left'>
          <h1 className='userpro_hed'>User Profile</h1>
          <div className='userProfilebx'>
            <img src={profilepic} alt="Profile" />
            <h3>{state?.user?.name}</h3>
            <span onClick={() => navigate("/editProfile")}>Edit</span>
          </div>
          <div>
            {updateData && updateData.map((update, index) => (
              <div key={index}>
                <p>{update.phone}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='userProfile_right'>
          <AppliedJobs />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
