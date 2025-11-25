const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getSummary } = require('../controllers/dashboardController');

const router = Router();

router.use(authMiddleware);
router.get('/summary', getSummary);

module.exports = router;

