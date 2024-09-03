import JobPuser from "../model/JobPuser.model.js"
import bcrypt from "bcryptjs" 
import jwt from "jsonwebtoken";
import JobPadmin from "../model/JobPadmin.model.js";
import Application from "../model/Jobapplication.model.js";

export const Logout = async(req,res)=>{
  try{
    const token = req.cookies.token;
    if(token){
      console.log(token,"token")
      res.clearCookie("token");
      return res.json({success:true, message:"log out Succesfull"})
    }else{
      return res.json({ success: false, error: 'No token found' });
    }
  }catch(error){
    return res.json({success:false,error:"logout is not working properly"})
  }
 }


export const Login = async (req, res) => {

  try {
    const { email, password } = req.body?.formData;
    if (!email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const isUserExists = await JobPuser.findOne({ email: email });

    if (!isUserExists) {
      return res.json({ success: false, error:"Email not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password
    );
    if (!isPasswordCorrect) {
      return res.json({ success: false, error: "Password is wrong." });
    }
    const userData = {
      name: isUserExists.name,
      email: isUserExists.email,
      role: "User",
      userId :isUserExists._id
    };
  
     const token = await jwt.sign({ userId: isUserExists._id },process.env.JWT_key);
     res.cookie("token", token);
    return res.json({
      success: true,
      message:"Login successfull.",
      userData,
    });
  } catch (error) {
    return res.json({ success: false, error: "Something went Wrong" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log(token, "token");
    const data = await jwt.verify(token, process.env.JWT_key);
    console.log(data, "data");
    if (data?.adminId) {
      const admin = await JobPadmin.findById(data?.adminId);
      if (!admin) {
        return res.json({ success: false });
      }
      const adminData = {
        name: admin.name,
        email: admin.email,
        role: "Admin",
        userId: admin._id,
      };
      return res.json({ success: true, userData: adminData });
    } else {
      const user = await JobPuser.findById(data?.userId);
      if (!user) {
        return res.json({ success: false });
      }
      const userData = {
        name: user.name,
        email: user.email,
        role: "User",
        userId: user._id,
      };
      return res.json({ success: true, userData });
    }
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body?.formData

    if (!name || !email || !password) {
      return res.json({ success: false, error: "All fields are required" });
    }
    const emailExist = await JobPuser.findOne({ email: email });

    if (emailExist) {
      return res.json({ success: false, error: "Email already exists" });
    }
    const Encryptedpassword = await bcrypt.hash(password, 10);

    const userData = new JobPuser({
      name: name,
      email: email,
      password: Encryptedpassword,
    });

    const data = await userData.save();

    return res.json({ success: true,data, message:"Registration complete" });
  } catch (error) {
    return res.json({ success: false, error: "Something went wrong" });
  }
};

export const JobApplication = async(req,res)=>{
  try{
     const {name,email,phone,salaryExpectation,workExperience,coverLetter}= req.body?.applicantsData;
     const{userId,jobId}=req.body;

      if(!name ||!email||!phone||!salaryExpectation||!workExperience||!coverLetter||!userId ||!jobId){
            return res.json({success:false, error:"All fields are required"})
       }
      // const isalredayApply= await Application.findOne();

      const applicatDetail= new Application({
           name,
           email,
           phone,
           salaryExpectation,
           workExperience,
           coverLetter,
           user:userId,
           appliedJobsId:[jobId]
          });
 
       const applicantdata = await applicatDetail.save();

       return res.json({success:true, message:"Application Sent",applicantdata});

      }
      catch(error){
      return res.json({success:false, error:"Something went Wrong"});
      }
   }

   
