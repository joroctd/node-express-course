const { Router } = require('express');
const router = Router();
const { getDashboard } = require('../controllers/dashboard');

router.route('/').get(getDashboard);

module.exports = router;
