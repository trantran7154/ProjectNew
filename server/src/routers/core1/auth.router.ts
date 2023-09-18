import passport from 'passport';
import express from 'express';
import controller from '../../controllers/core1/auth.controller';
import '../../middleware/passport';
const router = express.Router();

router.post(`/api/user/v1/user`, controller.register);
router.patch(`/api/user/v1/user`, controller.login);
router.get(`/api/user/v1/get-profile`, passport.authenticate('jwt', {
    session: false
}), controller.getProfile);
router.post(`/api/user/v1/log-out`, passport.authenticate('jwt', {
    session: false
}), controller.logOut);

export default router;