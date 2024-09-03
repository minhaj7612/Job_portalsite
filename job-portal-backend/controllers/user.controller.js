import UserPersonalInfo from "../model/UserPersonalInfo.model.js";
import Application from "../model/Jobapplication.model.js";
import Job from "../model/JobsDetail.model.js";

// export const UserAppliedJobs = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.json({ success: false, error: "User ID is required" });
//     }

//     const applicantdata = await Application.find({ user: userId }).populate('appliedJobsId');

//     // const jobIds = applicantdata.flatMap(app => app.appliedJobsId);

//     // const jobDetails = await Job.find({ _id: { $in: jobIds } });

//     return res.json({ success: true, applicantdata });

//   } catch (error) {
//     console.error('Error fetching applied jobs:', error); // Improved error logging
//     return res.json({ success: false, error: "Something went wrong" });
//   }
// }

export const UserAppliedJobs = async(req,res)=>{
  try{
    const {userId} = req.body;

    if (!userId) {
      return res.json({ success: false, error: "User ID is required" });
    }

    const jobdata = await Application.find({user:userId});

    const jobIds = jobdata.flatMap(app => app.appliedJobsId);

    console.log('Job IDs:', jobIds);
        
    const appliedJobsId = [];
    for (let i = 0; i < jobIds.length; i++) {
      const jobId = jobIds[i];
      const job = await Job.findById(jobId);

      if (job) {
        appliedJobsId.push(job);
      }
    }


    return res.json({ success:true, appliedJobsId});

  }catch(error){

    return res.json({success:false, error:"Something went Wrong"});
  }
}

export const GetProfileDetail= async(req,res)=>{

  try {
    const { name, email,phone,skills} = req.body?.updateData;
    const userId = req.body; 

 
    if (!name || !email || !phone || !skills || !userId) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const updatedUser = await UserPersonalInfo.findOneAndUpdate(
       {email},
       {name,phone,skills},
       {new: true, upsert: true } 
    );
    const updatedData = await updatedUser.save();
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    res.status(200).json({ success: true, updatedData });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: 'An error occurred while updating your profile.' });
  }
}



// export const EditProfile = async(req,res)=>{

//     try {
//         const { name, email, phone, skills } = req.body?.formData
    
//         if (!name || !email || !phone ||!skills) {
//           return res.json({ success: false, error: "All fields are required" });
//         }
    
//         const userInfo = new UserPersonalInfo({
//           name: name,
//           email: email,
//           phone:phone,
//           skills:skills
//         });
    
//         const userdata = await userInfo.save();
    
//         return res.json({ success: true, userdata, message:"User Info is Successfully Updated" });
//       } catch (error) {
//         return res.json({ success: false, error: "Something went wrong" });
//       }
// }


