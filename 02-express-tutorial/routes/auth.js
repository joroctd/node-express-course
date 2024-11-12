const express = require('express');
const router = express.Router();
const { logon, logoff } = require('../controllers/auth');

router.post('/logon', logon);
router.delete('/logoff', logoff);

module.exports = router;
