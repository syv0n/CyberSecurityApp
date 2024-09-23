const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const submissionsController = require('../controllers/submissionsController');
const finalScoreController = require('../controllers/finalScoreController');

router.post('/new_submission', auth, submissionsController.createSubmission);
router.get('/get_submission', auth, submissionsController.getSubmissionsByUser);
router.get('/scores/final_score', auth, finalScoreController.calculateFinalScore);
router.get('/scores/final_score/:submissionId', auth, submissionsController.getSubmissionById);

module.exports = router;