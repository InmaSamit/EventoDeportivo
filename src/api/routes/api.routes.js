//enrutador principal del servidor
const router = require('express').Router();

router.use('/user', require('./api/user.route'));
//router.use('/otraruta', require('./api/user.route'));
module.exports = router;
