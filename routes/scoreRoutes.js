const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const scoreController = require('../controllers/scoreController');

router.post('/', auth, scoreController.createOrUpdateScore);
router.get('/:category', auth, scoreController.getScoresByCategory);

module.exports = router;
