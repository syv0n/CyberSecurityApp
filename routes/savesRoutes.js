const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const savesController = require('../controllers/savesController');

router.post('/', auth, savesController.createSave);
router.get('/', auth, savesController.getSavesByUser);

module.exports = router;
