const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const scoreController = require('../controllers/scoreController');

router.post('/save_scores', auth, scoreController.createOrUpdateScore);
router.get('/:category', auth, scoreController.getScoresByCategory);
// Endpoint to fetch saved answers for the current user
router.get('/display_scores', auth, scoreController.displayScores);



module.exports = router;

