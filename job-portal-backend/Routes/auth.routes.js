import { Router } from "express";
import { Register,Login,getCurrentUser,JobApplication,Logout} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register",Register); 
router.post("/login",Login); 
router.get("/get-current-user",getCurrentUser); 
router.post("/job-application",JobApplication);
router.get("/user-logout",Logout); 



export default router;