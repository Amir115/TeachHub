import {config as dotenvConfig} from 'dotenv';
import startServer from './config/server';
import connectDB from './config/mongoose';
import { createSessionMiddleware } from "./middlwares/session";

dotenvConfig()

const dbConnectionPromise = connectDB();
const dbNativeClientPromise = dbConnectionPromise.then(x => x.connection.getClient())

const mongoSessionMiddleware = createSessionMiddleware(dbNativeClientPromise)

dbConnectionPromise
    .then(() => startServer(mongoSessionMiddleware))
    .catch(e => console.log(e))