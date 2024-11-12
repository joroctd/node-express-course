const securityRouter = require('./routers/security');
const parsingRouter = require('./routers/parsing');
const { logger, auth } = require('./custom');

module.exports = {
	securityRouter,
	parsingRouter,
	logger,
	auth
};
