const securityRouter = require('./routers/security');
const parsingRouter = require('./routers/parsing');
const logger = require('./logger');

module.exports = {
	securityRouter,
	parsingRouter,
	logger
};
