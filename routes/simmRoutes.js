const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const simmController = require('../controllers/simmController');

router.get('/:component', auth, simmController.getComponentScores);
router.post('/:component/submit',auth, simmController.submitScores);
router.post('/calculate_final_score',auth,  simmController.calculateFinalScore);
router.get('/assessment_score_history', auth, simmController.getLatestAssessmentScore);


module.exports = router;

