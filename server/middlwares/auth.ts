import session from 'express-session';
import passport from 'passport';

export const sessionMiddleware = session({
    secret: 'mysecretstring',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 1 month
  });

export const passportMiddleware = passport.initialize()
export const passportSessionMiddleware = passport.session()