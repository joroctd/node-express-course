import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';

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

export default router;
