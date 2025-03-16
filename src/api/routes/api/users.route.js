//rutas
const router = require('express').Router();
const users = require('../../controllers/users.controller');
const {checkToken} = require('../../middleware/auth');

//endpoints
router.get('/profile',  checkToken, users.getProfile);
router.post('/register', users.register);
router.post('/login', users.login);

module.exports = router;
