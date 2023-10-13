import express, { Request, Response } from "express";
import taskModel from "../model/taskModel";
import authModel from "../model/authModel";
import mongoose from "mongoose";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { task, priority,email } = req.body;

    const check= await authModel.findOne({email})

    const tasks = await taskModel.create({
      task,
      priority,
    });

    check?.task?.push(new mongoose.Types.ObjectId(tasks.id))

    check?.save()

    return res.status(201).json({
      message: "Task created successfully",
      data: tasks,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getOneTask = async (req: Request, res: Response) => {
  try {
    const { taskID} = req.params;

    const tasks = await taskModel.findById({taskID});

    return res.status(201).json({
      message: "Task found successfully",
      data: tasks,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskID} = req.params;

    const tasks = await taskModel.findByIdAndDelete(taskID);

    return res.status(201).json({
      message: "Task deleted successfully",
      data: tasks,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {

    const tasks = await taskModel.find({});

    return res.status(201).json({
      message: "Task found successfully",
      data: tasks,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
