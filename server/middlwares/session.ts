import { MongoClient } from 'mongodb';
import session from 'express-session';
import MongoStore from 'connect-mongo';


export const createSessionMiddleware = (nativeClientPromise: Promise<MongoClient>) => session({
  secret: 'mysecretstring',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ clientPromise: nativeClientPromise }),
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 1 month
});
