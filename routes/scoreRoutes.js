const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');
const auth = require('../middleware/auth');

router.post('/', auth, scoreController.createScore);
router.get('/:category', auth, scoreController.getScoresByCategory);

module.exports = router;