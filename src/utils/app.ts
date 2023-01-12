require('dotenv').config();
import express, { NextFunction, Request, Response,  } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from '../utils/connectDB';
import userRouter from '../routes/user.route';
import authRouter from '../routes/auth.route';
// import { config } from '../../config/custom-environment-variables';

const app = express();

// Middleware

// 1. Body Parser
app.use(express.json({ limit: '50mb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// // 4. Cors
// app.use(
//   cors({
//     origin: config.get<string>('origin'),
//     // origin: 'http://localhost:5173/',
//     credentials: true,

//   })
// );
const allowedOrigins = ['http://localhost:5173'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  allowedHeaders:['Access-Control-Allow-Credentials'],
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
};
app.use(cors(options));

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

// UnKnown Routes
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

// const port = config.get<number>('port');
// app.listen(port, () => {
//   console.log(`Server started on port: ${port}`);
//   mongoose();
// });
export default app;