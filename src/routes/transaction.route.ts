import { Router } from "express";
import { transact } from "../controllers/transaction.controller";


const router = Router();

router.post("/", transact);

export { router as transactRouter };