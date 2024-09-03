// import React, { useContext, useState } from 'react'
// import Api from '../../AxiosConfigue';
// import toast from 'react-hot-toast';
// import { Authcontext } from '../context/AuthContext';

// const Update = ({updateData,setUpdateData}) => {

// const {state,dispatch}=useContext(Authcontext);

//  console.log(updateData,"updateData");

//  const handleChange=(e)=>{
//     setUpdateData({...updateData,[e.target.name]:e.target.value})
//     // console.log(e.target.value);
//  }


//  const submit = async(e)=>{
//     e.preventDefault();
//   try{
//     const response = await Api.put("/user/get-user-profile",{updateData,
//           userId:state?.user.userId
//     }
//     );
//     if(response.data.success){

//         setUpdateData={name:"",email:"",skills:"",phone:""};
//         toast.success(response.data.message);
//         setUpdateData({
//           name:"",
//           email:"",
//           skills:"",
//           phone:"",
//         })

//       }
//   }catch(error){  
//     toast.error(error?.response?.data?.error || error.message);
//   }
// }
//   return (
//     <div>
//        <form onSubmit={submit} action="">
//         <div>
//             <label htmlFor="">name</label>
//             <input type="text" name="name" value={updateData.name}onChange={handleChange}  id="" />
//         </div>
//         <div>
//             <label htmlFor="">email</label> 
//             <input type="text" name="email" value={updateData.email} onChange={handleChange}  id="" />
//         </div>
//         <div>
//             <label htmlFor="">Add Skills</label> 
//             <input type="text" name="skills" value={updateData.skills} onChange={handleChange}  id=""/>
//         </div>
//         <div>
//             <label htmlFor="">Phone</label> 
//             <input type="text" name="phone" value={updateData.phone} onChange={handleChange}  id=""/>
//         </div>
//          <input type="submit" />
//        </form>
//     </div>
//   )
// }

// export default Update