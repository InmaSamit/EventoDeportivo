//rutas
const router = require('express').Router();

//endpoints
router.get('/list', (req, res) => {
  res.json('todo correcto');
});
router.post('/register', () => {});

module.exports = router;
