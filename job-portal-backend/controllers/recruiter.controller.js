import Job from "../model/JobsDetail.model.js";


export const JobsDetails = async (req, res) => {
  try {
    const { jobTitle, jobDescription, location, company, salary, image, date, jobtype}=req.body.formData;
    const{userId}=req.body;
    
    if (!jobTitle || !jobDescription || !location || !company || !salary || !image || !date|| !jobtype || !userId) {
      return res.json({ success: false, error: "All fields are required" });
    }

    const jobsdesc = new Job({
      jobTitle,
      jobDescription,
      location,
      company,
      salary,
      image,
      date,
      jobtype,
      creatorId: userId,

    });

    const jobsdata = await jobsdesc.save();
    return res.json({ success: true, message: "Job is successfully posted", jobsdata });
  } catch (error) {
    return res.json({ success: false, error: "Something went wrong" });
  }
};


     export const GetJobsDetails = async(req,res)=>{
      
      try{
        const jobDetails = await Job.find({});
        return res.json({ success:true,jobDetails});

       }catch(error){
       return res.json({success:false, error:error})
       }
     }
    
    //  export const SearchJobs= async(req,res)=>{
    //   try {
    //     const { searchedWord } = req.body;
    //     const serchedjobs = await Job.find({
    //       $or:[
    //         {company:{ $regex: searchedWord, $options:"i"}},
    //         {location: { $regex: searchedWord, $options:"i"}},
    //         {jobTitle:{ $regex: searchedWord, $options:"i"}}
    //       ]
    //       });
    //       return res.json({success:true,serchedjobs});
    //     } catch (error) {
    //     console.log(error, "error");
    //     return res.json({ error: error, success: false });
    //     }
    //  }
    // export const SearchJobs = async (req, res) => {
    //   try {
    //     const { jobType, location, jobTitle } = req.body;  // Adjust according to your filters
    //     const searchConditions = {};
        
    //     if (jobType) searchConditions.company = { $regex: jobType, $options: "i" };
    //     if (location) searchConditions.location = { $regex: location, $options: "i" };
    //     if (jobTitle) searchConditions.jobTitle = { $regex: jobTitle, $options: "i" };
        
    //     const serchedjobs = await Job.find(searchConditions);
    //     return res.json({ success: true, serchedjobs });
    //   } catch (error) {
    //     console.log(error, "error");
    //     return res.json({ error: error.message, success: false });
    //   }
    // };

export const SearchJobs = async (req, res) => {
  try {
    const { jobtype, location, jobTitle } = req.body;

    // Construct search query based on provided filters
    const searchConditions = {};
    
    if (jobtype) searchConditions.jobtype = { $regex: jobtype, $options: 'i' };
    if (location) searchConditions.location = { $regex: location, $options: 'i' };
    if (jobTitle) searchConditions.jobTitle = { $regex: jobTitle, $options: 'i' };

    // Find jobs based on search conditions
    const serchedjobs = await Job.find(searchConditions);

    return res.json({ success: true, serchedjobs });
  } catch (error) {
    console.error("Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

     
     export const GetsingleJobsDetails = async (req, res) => {
      try {
      const { jobId } = req.body;
      if (!jobId) {
      return res.json({ success: false, error: "Job ID is required." });
      }
      const job = await Job.findById(jobId);
      console.log(Job,"Job")
      return res.json({ success: true, job });
     } catch (error) {
      return res.json({ error, success: false });
     }
  };

  