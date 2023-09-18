import { NextFunction, Request, Response } from "express";
import userService from "../../service/auth.service";
class ProductController {
    public async register(req: Request, res: Response, next: NextFunction) {
        const auth = await userService.register(req.body);
        if(auth) {
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: false, message: userService.getMessage(), data: auth})
        }
        else {
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: true, message: userService.getMessage()})
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const auth = await userService.login(req.body);
        if(auth) {
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: false, message: userService.getMessage(), data: auth})
        }
        else {
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: true, message: userService.getMessage()})
        }
    }

    public async getProfile(req: Request, res: Response, next: NextFunction) {
        const auth = await userService.getProfile(req.user);
        if(auth) {
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: false, message: userService.getMessage(), data: auth})
        }
        else {
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: true, message: userService.getMessage()})
        }
    }

    public async logOut(req: Request, res: Response, next: NextFunction) {
        const auth = await userService.logOut(req.user, req.body);
        if(auth) {
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: false, message: userService.getMessage(), data: auth})
        }
        else {
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: true, message: userService.getMessage()})
        }
    }
}

export default new ProductController();