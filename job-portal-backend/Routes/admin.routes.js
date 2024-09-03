import { Router } from "express";
import {RegisterAdmin,LoginAdmin,GetAddedJobs,Applicants} from "../controllers/admin.controller.js"
const route = Router();

route.post("/Register-admin",RegisterAdmin);
route.post("/login-admin",LoginAdmin);
route.get("/get-added-jobs",GetAddedJobs)
route.post("/get-applicants",Applicants)


export default route;