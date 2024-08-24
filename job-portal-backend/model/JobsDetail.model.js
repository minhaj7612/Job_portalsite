import { Schema,model } from "mongoose"



const jobsdetail= new Schema({
    jobTitle: String,
    jobDescription: String,
    location: String,
    company: String,
    salary: Number,
    image:String,
    jobtype:String,
    date:Date
})

const Job = model("Jobs",jobsdetail);

export default Job;