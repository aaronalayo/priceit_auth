import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
// import config from 'config';
import { config } from '../../config/custom-environment-variables';

import userModel, { User } from '../models/user.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
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
  return await userModel.findOne(query, {}, options).select('+password');
};
export const deleteUser = async (
  query: FilterQuery<User>,
) => {
  return await userModel.findOneAndRemove(query);
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