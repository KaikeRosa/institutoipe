const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getQuestions,
  listTests,
  createTest,
} = require('../controllers/testController');

const router = Router();

router.get('/questions', getQuestions);

router.use(authMiddleware);
router.get('/', listTests);
router.post('/', createTest);

module.exports = router;

