import express from 'express';
import controller from '../../controllers/core1/auth.controller';
const router = express.Router();

router.post(`/api/user/v1/user`, controller.register);
router.patch(`/api/user/v1/user`, controller.login);

export default router;