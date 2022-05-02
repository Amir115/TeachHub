import mongoose from "mongoose";

export default () => {
  const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/teachHub';

  return new Promise<void | string>((resolve, reject) => {
    mongoose.connect(databaseUrl, error => {
      if (error) {
        reject(error);
      } else {
        console.log(`Connected to MongoDB...`)
        resolve();
      }
    });
  });
};