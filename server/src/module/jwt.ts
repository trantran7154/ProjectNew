var jwt = require('jsonwebtoken');

import bcrypt from 'bcryptjs';
import secretConfig from "../configs/secret";

export default {
    async createJWT(content: any, type: string, time: number) {
        const jwtSignUser = await jwt.sign(content, type === "generate" ? secretConfig.secret : secretConfig.refresh, { expiresIn: time });
        return jwtSignUser;
    },
    async createJWTCall(content: any, type: string, time: number) {
        const jwtSignUser = await jwt.sign(content, type === "generate" ? secretConfig.secretCallAPI : secretConfig.refreshCallAPI, { expiresIn: time });
        return jwtSignUser;
    },
    async destroyJWT(tokenSend: string, currentToken: string) {
        return tokenSend !== currentToken ? false : true;
    },
    async decode(token: any) {
        const jwtSignUser = await jwt.decode(token);
        return jwtSignUser;
    },
    async refreshToken(token: any) {
        return jwt.verify(token, secretConfig.refresh, (err: any, tokenDetails: any) => {
            if (err)
                return ({
                    error: true,
                    message: "Invalid refresh token",
                });
            return ({
                tokenDetails,
                error: false,
                message: "Valid refresh token",
            });
        });
    },

    async verify(token: any) {
        return jwt.verify(token, secretConfig.secret, (err: any, tokenDetails: any) => {
            if (err)
                return ({
                    error: true,
                    message: "Invalid refresh token",
                });
            return ({
                tokenDetails,
                error: false,
                message: "Valid refresh token",
            });
        });
    },
}