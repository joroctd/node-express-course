const { Router } = require('express');
const router = Router();
const { getHello } = require('../controllers/hello');

router.route('/').get(getHello);

module.exports = router;
