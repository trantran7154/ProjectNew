import { NextFunction, Request, Response } from "express";
import userService from "../../service/auth.service";
class ProductController {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const call = await userService.register(req.body);
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: true, message: userService.getMessage(), data: call })
        } catch (error) {
            return res.status(500).json({ status: 500, error: true, message: 'no' })
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const call = await userService.login(req.body);
            return res.status(userService.getStatus()).json({ status: userService.getStatus(), error: true, message: userService.getMessage(), data: call })
        } catch (error) {
            return res.status(500).json({ status: 500, error: true, message: 'no' })
        }
    }
}

export default new ProductController();