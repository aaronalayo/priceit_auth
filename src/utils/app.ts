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


// app.use(helmet())
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());
// app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));

// app.use(rateLimit)
app.set('trust proxy', 1) 
// Middleware

// 1. Cors
app.use(cors({ origin: ['https://priceit.zamanien.com', 'http://localhost:5173'], credentials: true }));

app.use((req, res, next) => {
  const cloudflareIps = ['103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22', '104.16.0.0/12', '108.162.192.0/18', '131.0.72.0/22', '141.101.64.0/18', '162.158.0.0/15', '172.64.0.0/13', '173.245.48.0/20', '188.114.96.0/20', '190.93.240.0/20', '197.234.240.0/22', '198.41.128.0/17', '104.21.36.183:443'];
  if (cloudflareIps.includes(req.ip)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
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