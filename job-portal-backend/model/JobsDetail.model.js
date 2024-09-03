import mongoose, { Schema,Types,model } from "mongoose"



const jobsdetail= new Schema({
    jobTitle: String,
    jobDescription: String,
    location: String,
    company: String,
    salary: Number,
    image:String,
    jobtype:String,
    date:Date,
    creatorId: {type:mongoose.Schema.Types.ObjectId, ref: "JobPadmin" },
})

const Job = model("Jobs",jobsdetail);

export default Job;