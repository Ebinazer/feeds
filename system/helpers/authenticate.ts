import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../db/models';

// JWT strategy setup
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SHA256_PASSWORD_SALT,
};

passport.use(
    new Strategy(jwtOptions, async(payload, done) => {
        try {
            const user = await User.findOne({
                where: {
                    uuid: payload.uuid,
                },
            });
            
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Middleware function to handle authentication
export const authenticate = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const userData = {
            uuid: user.uuid,
            name:user.name,
            role: user.role,
        }
        req.user = userData;
        next();
    })(req, res, next);
}


