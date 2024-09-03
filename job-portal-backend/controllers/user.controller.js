
import Application from "../model/Jobapplication.model.js";
import Job from "../model/JobsDetail.model.js";


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





