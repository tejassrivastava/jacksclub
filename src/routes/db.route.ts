import { Router } from "express";
import { createTablesController, seedDataController } from "../controllers/db.controller";




const router = Router();

router.post("/create", createTablesController);
router.post("/seed", seedDataController);



export { router as dbRouter };