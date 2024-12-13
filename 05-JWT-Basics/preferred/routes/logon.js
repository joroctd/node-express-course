const { Router } = require('express');
const router = Router();
const { logon } = require('../controllers/logon');

router.route('/').post(logon);

module.exports = router;
