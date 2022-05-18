import passport from 'passport';

export const passportMiddleware = passport.initialize()
export const passportSessionMiddleware = passport.session()