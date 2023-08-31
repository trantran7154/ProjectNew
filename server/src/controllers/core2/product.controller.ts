import { NextFunction, Request, Response } from "express";
import productService from "../../service/product.service";
class ProductController {
    public async getAllProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const call = await productService.getAll();
            return res.status(productService.getStatus()).json({ status: productService.getStatus(), error: true, message: productService.getMessage(), data: call })
        } catch (error) {
            return res.status(500).json({ status: 500, error: true, message: 'no' })
        }
    }

    public async getByIdProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const call = await productService.getId(req.params);
            return res.status(productService.getStatus()).json({ status: productService.getStatus(), error: true, message: productService.getMessage(), data: call })
        } catch (error) {
            return res.status(500).json({ status: 500, error: true, message: 'no' })
        }
    }

    public async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const call = await productService.addProduct(req.body);
            return res.status(productService.getStatus()).json({ status: productService.getStatus(), error: true, message: productService.getMessage(), data: call })
        } catch (error) {
            return res.status(500).json({ status: 500, error: true, message: 'no' })
        }
    }

    public async editProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const call = await productService.editProduct(req.body, req.params);
            return res.status(productService.getStatus()).json({ status: productService.getStatus(), error: true, message: productService.getMessage(), data: call })
        } catch (error) {
            return res.status(500).json({ status: 500, error: true, message: 'no' })
        }
    }

    public async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const call = await productService.deleteProduct(req.params);
            return res.status(productService.getStatus()).json({ status: productService.getStatus(), error: true, message: productService.getMessage(), data: call })
        } catch (error) {
            return res.status(500).json({ status: 500, error: true, message: 'no' })
        }
    }
}

export default new ProductController();