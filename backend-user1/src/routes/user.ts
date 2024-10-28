import { Router } from "express";
import {userLogin}   from "../controllers/userLogin";

const router: Router = Router();

// router.post("/signup", signup);
router.post("/signin", userLogin);

export default router;
