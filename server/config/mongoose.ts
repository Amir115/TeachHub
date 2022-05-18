import mongoose from "mongoose";

export default () => {
  const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/teachHub';

  const result = mongoose.connect(databaseUrl)

  result.then(() => console.log(`Connected to MongoDB...`))

  return result;
};