import { Router } from "express";
import {JobsDetails,SearchJobs,GetJobsDetails,GetsingleJobsDetails} from "../controllers/recruiter.controller.js"


const router = Router();

router.post("/Post-job-deatil",JobsDetails)
router.get("/get-job-deatil",GetJobsDetails)
router.post("/get-single-job-deatil",GetsingleJobsDetails)
router.post("/search",SearchJobs)



export default router;