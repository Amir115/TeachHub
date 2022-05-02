const mongoose =  require('mongoose');
const {config} = require('dotenv')
config()

module.exports = () => {
  const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/teachHub';

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, error => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
};