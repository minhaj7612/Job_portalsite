import { Router } from "express";
import {UserAppliedJobs} from "../controllers/user.controller.js";
import {checkIsUserValid} from "../middlewares/all.middleware.js";
const router = Router();


// router.put("/get-user-profile",GetProfileDetail); 
router.post("/applied-jobs",checkIsUserValid,UserAppliedJobs);


export default router;