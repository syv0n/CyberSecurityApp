const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionController');

router.get('/:role', questionsController.getQuestionsByRole);

module.exports = router;