import { config } from '../../config/custom-environment-variables';
// import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { date } from 'zod';
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
import { createUser, findUser, signToken } from '../services/user.service';
import AppError from '../utils/appError';

// Exclude this fields from the response
export const excludedFields = ['password', 'searches', 'items'];
export const excludedInfoFields = ['username', 'firstName', 'lastName', 'email', 'password']
// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    // Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    Date.now() + config.auth.expireIn * 60 * 1000

  ),
  // maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  maxAge: Number(config.auth.expireIn) * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite:'none',
  // domain: '.zamanien.com'
  domain: '75.119.139.228:8080'
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,  
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    const user = await createUser({
      email: req.body.email,
      userName: req.body.userName,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      password: req.body.password,
    });
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    console.log('ERROR IS HERE: ' + err)
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  // res.header("Access-Control-Allow-Origin", "*");
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.email });

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Create an Access Token
    const { access_token } = await signToken(user);

    // Send Access Token in Cookie
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
      // secure: true,
      sameSite:'none',
      domain: '75.119.139.228:8080'
      // domain: '.zamanien.com'
    });

    // Send Access Token
    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};
