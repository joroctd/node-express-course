const { Router } = require('express');
const router = Router();
const { logon } = require('../controllers/auth');

router.route('/').post(logon);

module.exports = router;
