import {model,Schema} from "mongoose";


const userSchema= new Schema({
    name:String,
    email:String,
    password:{type:String,required:true}
});

const JobPuser = model("JobPusers",userSchema);

export default JobPuser;