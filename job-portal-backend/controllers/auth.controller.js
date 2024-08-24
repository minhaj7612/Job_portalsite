import JobPuser from "../model/JobPuser.model.js"
import bcrypt from 'bcrypt'; // Ensure you have bcryptjs imported


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



export const Login = async (req, res) => {
  try {
    const { email, password } = req.body?.formData;
    if (!email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const isUserExists = await JobPuser.findOne({ email: email });
    if (!isUserExists) {
      return res.json({ success: false, error: "Email not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password
    );
    console.log(isPasswordCorrect,"isPasswordCorrect");
    if (!isPasswordCorrect) {
      return res.json({ success: false, error: "Password is wrong." });
    }
    const userData = {
      name: isUserExists.name,
      email: isUserExists.email,
      // role: "user",
      userId : isUserExists._id
    };
    // add user data (context), add jwt token,

    const token = await jwt.sign(
      { userId: isUserExists._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    return res.json({
      success: true,
      message: "Login successfull.",
      userData,
    });
  } catch (error) {
    return res.json({ success: false, error: "Something went Wrong" });
  }
};