import { Schema,model } from "mongoose";

const adminSchema = new Schema({
    name:String,
    email:String,
    password:{ type:String , required:true}
})
const JobPadmin = model("JobPadmins", adminSchema);


export default JobPadmin;