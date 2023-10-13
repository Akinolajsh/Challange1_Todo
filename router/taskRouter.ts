import express from 'express';
import { createTask, deleteTask, getOneTask, getTask } from '../controller/TaskController';

const router= express.Router();

router.route("/create-task").post(createTask)

router.route("/view-task").get(getTask)
router.route("/:taskID/view-task").get(getOneTask)

router.route("/:taskID/delete").delete(deleteTask)



export default router