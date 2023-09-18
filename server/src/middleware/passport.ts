import passport from 'passport';
import { Strategy } from 'passport-jwt';
import secretConfig from '../configs/secret';
import userModel from '../models/user.model';

const {
    ExtractJwt
} = require('passport-jwt');

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: secretConfig.secret
}, async (payload: any, done: any) => {
    try {
        const userId = payload.id;
        const findByUserID = await userModel.findOne({
            _id: userId
        });
        
        if (!findByUserID) return done(null, false)

        done(null, findByUserID);
    } catch (error) {
        console.log(error);
        return done(null, false)
    }
}))