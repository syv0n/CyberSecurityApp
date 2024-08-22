const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const submissionsController = require('../controllers/submissionsController');

router.post('/', auth, submissionsController.createSubmission);
router.get('/', auth, submissionsController.getSubmissionsByUser);

module.exports = router;
