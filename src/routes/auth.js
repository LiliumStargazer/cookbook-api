const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// le rottte put e delete sono protette da auth nel middleware
// quindi richiedono un token JWT valido per accedere
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/api/user', auth, authController.updateUser);
router.delete('/api/user', auth, authController.deleteUser);

module.exports = router;