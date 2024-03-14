import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller";



const router = Router();

router.get("/:id", getUserDetails);

export { router as userRouter };