import { Request, Response } from "express";
import { createTablesService, insertSeedDataService } from "../services/db.service";




export const createTablesController = async (req: Request, res: Response) => {
    console.log("in createTables controller");
    try {



        return await createTablesService();


    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const seedDataController = async (req: Request, res: Response) => {
    console.log("in seedDataController");
    try {

        const { userId, balance } = req.body;


        return await insertSeedDataService(userId, balance);


    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};