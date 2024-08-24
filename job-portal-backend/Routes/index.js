import { Router } from "express";
import AuthRoutes from "./auth.routes.js";
import RecruiterRoutes from "./recruiter.routes.js"

const router = Router();

router.use("/auth", AuthRoutes); // This adds the prefix to routes in auth.routes.js
router.use("/recruiter",RecruiterRoutes); 

export default router;