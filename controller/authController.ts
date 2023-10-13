import { Request, Response } from "express";
import bcrypt from "bcrypt";
import authModel from "../model/authModel"

export const createUser = async (req: any, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await authModel.create({
      userName,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "creating User",
      data: user,
    });
  } catch (error:any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const findUsers = async (req: any, res: Response) => {
  try {
    const user = await authModel.find().sort({ createdAt: -1 });

    res.status(201).json({
      message: "find Users",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error finding User",
    });
  }
};

export const findOneUser = async (req: any, res: Response) => {
  try {
    const { UserID } = req.params;
    const user = await authModel.findById(UserID);

    res.status(201).json({
      message: "find one Users",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error finding User",
    });
  }
};

export const deleteOneUser = async (req: any, res: Response) => {
  try {
    const { UserID } = req.params;

    const user = await authModel.findByIdAndDelete({ id: UserID });

    res.status(201).json({
      message: "find Users",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error finding User",
    });
  }
};

export const signinUser = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });

    if (user) {
      const checkPassword = await bcrypt.compare(password, user?.password!);

      if (checkPassword) {
        return res.status(201).json({
          message: "user sign in",
          data: user._id,
        });
      } else {
        res.status(404).json({ message: "password not correct" });
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(404).json({
      message: "Error finding User",
    });
  }
};
