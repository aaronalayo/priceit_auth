import mongoose from 'mongoose';
import config from 'config';

const dbUrl = `mongodb://${config.get('dbUserName')}:${config.get(
  'dbPass'
)}@${config.get('dbHost')}:${config.get('dbPort')}/${config.get('dbName')}?authSource=admin`;
const connectDB = async () => {
mongoose.set('strictQuery', false);


  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;


