import {config as dotenvConfig} from 'dotenv';
import startServer from './config/start-server';
import connectDB from './config/mongoose';

dotenvConfig()

connectDB()
.then(startServer)
.catch(e => console.log(e))