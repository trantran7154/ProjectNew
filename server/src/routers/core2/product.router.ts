import express from 'express';
import controller from '../../controllers/core2/product.controller';
const router = express.Router();

router.get(`/api/product/v1/product`, controller.getAllProduct);
router.get(`/api/product/v1/product/:_id`, controller.getByIdProduct);
router.post(`/api/product/v1/product`, controller.createProduct);
router.patch(`/api/product/v1/product/:_id`, controller.editProduct);
router.delete(`/api/product/v1/product/:_id`, controller.deleteProduct);

export default router;