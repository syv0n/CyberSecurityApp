const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.delete('/profile', auth, userController.deleteUser);

router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, userController.updateUserById);
router.delete('/:id', auth, userController.deleteUserById);


module.exports = router;