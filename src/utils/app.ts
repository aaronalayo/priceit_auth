require('dotenv').config();
import express, { NextFunction, Request, Response,  } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from '../routes/user.route';
import authRouter from '../routes/auth.route';
import { boolean } from 'zod';

const app = express();
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));

// app.use(rateLimit)
//app.set('trust proxy', 1) 
// Middleware

// 1. Cors
// app.use(cors({ origin: 'https://priceit.zamanien.com', credentials: true }));


app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "https://priceit.zamanien.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


// 2. Body Parser
app.use(express.json({ limit: '10mb' }));

// 3. Cookie Parser
app.use(cookieParser());

// 4. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 5. Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Testing
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Priceit Auth',
  });
});

// Unknown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  console.log(err)
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;