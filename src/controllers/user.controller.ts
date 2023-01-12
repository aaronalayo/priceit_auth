import { NextFunction, Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  updateUser,
} from "../services/user.service";
import mongoose, {Types  } from "mongoose";
import { UpdateUserProps } from "../schema/user.schema";
export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(res);
    const user = res.locals.user;
    console.log(user);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.params.userId.trim();
    console.log(userId)
    const objectId = new mongoose.Types.ObjectId(userId)
    console.log(objectId)
    await updateUser( userId, req.body);
   
    const user = await findUserById(userId);
    return res.status(200).json(user);
  } catch (err: any) {
    console.log(err)
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
