const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { listUsers, listTests } = require('../controllers/adminController');

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/users', listUsers);
router.get('/tests', listTests);

module.exports = router;

