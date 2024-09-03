import mongoose, { Schema,model,Types} from "mongoose"

const jobapplication = new Schema({
    name: String,
    email: String,
    phone: Number,
    salaryExpectation: Number,
    workExperience: Number,
    coverLetter:String,
    user: {type:mongoose.Schema.Types.ObjectId,ref:"JobPuser"},
    appliedJobsId:[{type:mongoose.Schema.Types.ObjectId, ref:"Job"}],
})

const Application = model("Application",jobapplication);

export default Application;