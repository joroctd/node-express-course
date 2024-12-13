const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');

const router = express.Router();
// HPP: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#prevent-http-parameter-pollution
router.use(hpp());
// Helmet: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#use-appropriate-security-headers
router.use(
	helmet.frameguard(),
	helmet.xssFilter(),
	helmet.noSniff(),
	helmet.hidePoweredBy()
);

module.exports = router;
