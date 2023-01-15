require('dotenv').config();
import express, { NextFunction, Request, Response,  } from 'express';
import morgan from 'morgan';
// import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from '../routes/user.route';
import authRouter from '../routes/auth.route';
import { config } from '../../config/custom-environment-variables';
import helmet from 'helmet';

const app = express();
app.set('trust proxy', 1);
// Initialize helmet middleware
// app.use(helmet());

// // Content Security Policy
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'"],
//         styleSrc: ["'self'", "'unsafe-inline'"],
//         imgSrc: ["'self'", "data:"],
//         connectSrc: ["'self'", "https://*.cloudflare.com"],
//         fontSrc: ["'self'", "https://fonts.gstatic.com"],
//         objectSrc: ["'none'"],
//         frameSrc: ["'none'"],
//         workerSrc: ["'none'"],
//         frameAncestors: ["'none'"],
//         formAction: ["'self'"],
//         reportUri: '/csp-violation-report-endpoint'
//     },
// }));

// // DNS prefetch control
// app.use(helmet.dnsPrefetchControl({ allow: false }));

// // Expect-CT
// app.use(helmet.expectCt({
//     enforce: true,
//     maxAge: 30,
//     reportUri: '/expect-ct-violation-report-endpoint'
// }));

// // Frameguard
// app.use(helmet.frameguard({ action: 'deny' }));

// // Hide "powered by" header
// app.use(helmet.hidePoweredBy());

// // HTTP Strict Transport Security
// app.use(helmet.hsts({
//     maxAge: 31536000, // 1 year
//     includeSubDomains: true,
//     preload: true
// }));

// // Block Internet Explorer from executing downloads in your site's context
// app.use(helmet.ieNoOpen());

// // MIME type sniffing
// app.use(helmet.noSniff());

// // Referrer Policy
// app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

// // XSS filter
// app.use(helmet.xssFilter());

// Middleware

// 1. Cors
app.use(cors({ origin: [config.auth.origin, config.auth.dev_origin], credentials: true }));

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