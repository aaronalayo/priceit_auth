import { omit, get } from "lodash";
// import config from 'config';
import { config } from "../../config/custom-environment-variables";
import redisClient from "../utils/connectRedis";
import { FilterQuery, ObjectId, QueryOptions, Types } from "mongoose";
import userModel, { User } from "../models/user.model";
import { excludedFields, excludedInfoFields } from "../controllers/auth.controller";
import { signJwt } from "../utils/jwt";
import { DocumentType } from "@typegoose/typegoose";
import { UpdateUserProps } from "../schema/user.schema";
// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedInfoFields);
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select("+password");
};
export const deleteUser = async (id: string) => {
  return await userModel.findByIdAndRemove(id).deleteOne();
};


export const addItem = async (id: Types.ObjectId, data: any) => {
  const update = { $push: { items: data.item } };
  // const options = { upsert: true};
  return await userModel
    .findOneAndUpdate(
      { _id: id },
      update,
      // options,
      function (err: any, docs: any) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
        }
      }
    )
    .catch(function (err) {
      console.log(err);
    });
};

export const deleteItem = async (id: Types.ObjectId, data: any) => {
  const update = { $pull: { items: {id:data.itemId} } };
  const options = { safe: true, multi:true };
  return await userModel
    .findOneAndUpdate(
      { _id: id },
      update,
      options,
      function (err: any, docs: any) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted Item : ", docs);
        }
      }
    )
    .catch(function (err) {
      console.log(err);
    });
};
export const addSearchWord = async (id: Types.ObjectId, data: any) => {
  console.log(data)
  const update = { $push: { searches: data } };
  const options = { returnNewDocument: true};
  return await userModel
    .findOneAndUpdate(
      { _id: id },
      update,
      options,
      function (err: any, docs: any) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated Search : ", docs);
        }
      }
    )
    .catch(function (err) {
      console.log(err);
    });
};
export const deleteSearchWord = async (id: Types.ObjectId, data: any) => {
  console.log(data.searchWord)
  const update = { $pull: { searches: data.searchWord} };
  const options = { safe: true, multi:true, returnNewDocument: true};
  return await userModel
    .findOneAndUpdate(
      { _id: id },
      update,
      options,
      function (err: any, docs: any) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted Search : ", docs);
        }
      }
    )
    .catch(function (err) {
      console.log(err);
    });
};



// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const access_token = signJwt(
    { sub: omit(user.toJSON(), excludedFields) },
    {
      expiresIn: `${config.auth.expireIn * 60 * 1000}m`,
      // expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );

  redisClient.set(user._id.toString(), JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { access_token };
};
