const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const authController = require('../controllers/authController');
const otherController = require('../controllers/otherController');

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.get('/logout', authMiddleware, authController.logout);

router.get('/info', authMiddleware, tokenMiddleware, otherController.info);
router.get('/latency', authMiddleware, tokenMiddleware, otherController.googleLatency);

module.exports = router;