//rutas
const router = require('express').Router();
const userController = require('../../controllers/users.controller');
const {checkToken} = require('../../middleware/auth');

//endpoints
router.get('/profile',  checkToken, userController.getProfile);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
