const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/userController');

const router = Router();

router.use(authMiddleware);
router.get('/me', getProfile);

module.exports = router;

