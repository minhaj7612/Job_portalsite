import { Router } from "express";
import AuthRoutes from "./auth.routes.js";
import RecruiterRoutes from "./recruiter.routes.js"
import AdminRoutes from "./admin.routes.js"
import UserRoutes from "./user.routes.js"
const router = Router();

router.use("/auth", AuthRoutes); // This adds the prefix to routes in auth.routes.js
router.use("/recruiter",RecruiterRoutes); 
router.use("/admin",AdminRoutes); 
router.use("/user",UserRoutes); 

export default router;