import express from "express";
import { authenticated } from '../middlewares/auth.js';
import { deleteTask, myTasks, newtask, updateTasks } from "../controllers/taskControllers.js";


const router = express.Router();


router.post("/new",authenticated,newtask);
router.get("/mine",authenticated,myTasks);
router.route("/:id").put(authenticated,updateTasks).delete(authenticated,deleteTask);

export default router;