import { NextFunction, Request, Response } from "express";
import {
  deleteItem,
  findAllUsers,
  findUserById,
  addItem,
  deleteSearchWord,
  addSearchWord,
} from "../services/user.service";
import mongoose, {Types  } from "mongoose";
import { UpdateUserProps } from "../schema/user.schema";
export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
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
export const getUserItemsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId.trim();
    const objectId = new mongoose.Types.ObjectId(userId)
    const user = await findUserById(userId);
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
export const addItemHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const userId = req.params.userId.trim();
    console.log(req.body)
    const objectId = new mongoose.Types.ObjectId(userId)
    // console.log( mongoose.Types.ObjectId.isValid(objectId))
    await addItem( objectId, req.body);
   
    
    return res.status(200).json({message: "Product added to favorites"});
  } catch (err: any) {
    console.log(err)
    next(err);
  }
};

export const deleteItemHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.params.userId.trim();
    console.log(req.body)
    const objectId = new mongoose.Types.ObjectId(userId)
    // console.log( mongoose.Types.ObjectId.isValid(objectId))
    await deleteItem( objectId, req.body);
    return res.status(200).json({message: "Product deleted from favorites"});
  } catch (err: any) {
    console.log(err)
    next(err);
  }
};
export const deleteSearchHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.params.userId.trim();
    console.log(req.body)
    const objectId = new mongoose.Types.ObjectId(userId)
    // console.log( mongoose.Types.ObjectId.isValid(objectId))
    await deleteSearchWord( objectId, req.body);
    return res.status(200).json({message: "Search deleted from favorites"});
  } catch (err: any) {
    console.log(err)
    next(err);
  }
};
export const addSearchHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const userId = req.params.userId.trim();
    console.log(req.body)
    const objectId = new mongoose.Types.ObjectId(userId)
    // console.log( mongoose.Types.ObjectId.isValid(objectId))
    await addSearchWord( objectId, req.body.searchWord);
   
    
    return res.status(200).json({message: "Product added to favorites"});
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
