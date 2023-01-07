// import mongoose from 'mongoose';
// import config from 'config';

// const dbUrl = `mongodb://${config.get('dbUserName')}:${config.get(
//   'dbPass'
// )}@${config.get('dbHost')}:${config.get('dbPort')}/${config.get('dbName')}?authSource=admin`;
// const connectDB = async () => {
// mongoose.set('strictQuery', false);
//   try {
//     await mongoose.connect(dbUrl);
//     console.log('Database connected...');
//   } catch (error: any) {
//     console.log(error.message);
//     setTimeout(connectDB, 5000);
//   }
// };

// export default connectDB;


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { config } from '../../config/custom-environment-variables';
dotenv.config();

// mongo db connect
mongoose.set('strictQuery', false)
mongoose
  .connect(config.mongo.url, { retryWrites: true, writeConcern: { w: 'majority', j: true } })
  .then(() => {
    console.log('Connected to Mongo ...');
  })
  .catch((error) => {
    console.log('Error connecting to DB: ' + error);
  });

export default mongoose;
