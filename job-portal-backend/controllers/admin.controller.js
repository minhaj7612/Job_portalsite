import JobPadmin from "../model/JobPadmin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs" 
import Job from "../model/JobsDetail.model.js";
import Application from "../model/Jobapplication.model.js";

export const Applicants= async(req, res)=>{
  try{

     const {jobId} = req.body;

     const userdata = await Application.find({appliedJobsId:jobId})

     res.json({succes:true,userdata})

   }catch(error){
    return res.json({ success: false, error: "Something went wrong" });
   }
}


export const GetAddedJobs= async(req, res)=>{
  try{
    const {userId} = req.query;
    console.log(userId,"userId");
    if (!userId) {
      return res.status(400).json({ success: false, error: "userId is required" });
    }
    const jobs = await Job.find({ creatorId:userId });
    return res.json({ success:true, jobs})

  }catch(error){
    return res.json({ success: false, error: "Something went wrong" });
  }
   
}

export const RegisterAdmin = async (req, res) => {
    try {
      const { name, email, password } = req.body?.formData;
  
      if (!name || !email || !password) {
        return res.json({ success: false, error: "All fields are required" });
      }
      const emailExist = await JobPadmin.findOne({ email: email });
  
      if (emailExist) {
        return res.json({ success: false, error: "Email already exists" });
      }
      const Encryptedpassword = await bcrypt.hash(password, 10);
  
      const adminData = new JobPadmin({
        name: name,
        email: email,
        password: Encryptedpassword,
      });
  
      const data = await adminData.save();
  
      return res.json({ success: true,data, message:"Registration complete" });
    } catch (error) {
      return res.json({ success: false, error: "Something went wrong" });
    }
  };

  export const LoginAdmin = async (req, res) => {

    try {
      const { email, password } = req.body?.formData;

      if (!email || !password) {
        return res.json({ success: false, error: "All fields are required." });
      }
  
      const isAdminexist = await JobPadmin.findOne({ email: email });
  
      if (!isAdminexist) {
        return res.json({ success: false, error:"Email not found." });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isAdminexist.password
      );
      if (!isPasswordCorrect) {
        return res.json({ success: false, error: "Password is wrong." });
      }
      const adminData = {
        name: isAdminexist.name,
        email: isAdminexist.email,
        role: "Admin",
        adminId :isAdminexist._id
      }
      const token = await jwt.sign({adminId:isAdminexist._id },process.env.JWT_key);
      res.cookie("token", token);
      return res.json({
        success: true,
        message:"Login successfull.",
        adminData,
      });
    } catch (error) {
      return res.json({ success: false, error: "Something went Wrong" });
    }
  };


  