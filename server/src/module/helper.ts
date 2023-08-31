var jwt = require('jsonwebtoken');

import bcrypt from "bcryptjs";

import { IDataJWT } from "../interface/module/helper";
import _default from "../configs/default";

class Helper {
    public async hash(content: string, salt?: number) {
        try {
            const salt_ = await bcrypt.genSalt(salt ? salt : 0);
            const passwordHashed = await bcrypt.hash(content, salt_);
            return passwordHashed;
        } catch (error) {
            return false;
        }
    }

    public async getTokenJWT(data: IDataJWT) {
        try {
            const dataexp = data.expdate ? data.expdate : 3;
            const data_ = {
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + dataexp),
                sub: data.sub
            };
            return jwt.sign(data_, _default._JWT_SECRET);
        } catch (error) {
            return false;
        }
    }

    public async randomNumber(){
        return Math.floor(100000 + Math.random() * 900000);
    }
}

export default new Helper();