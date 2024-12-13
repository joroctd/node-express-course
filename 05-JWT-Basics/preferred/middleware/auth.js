const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	console.log(req.headers);
	if (!authorization?.startsWith('Bearer ')) {
		throw new ApiError('Invalid (or no) authentication provided.', 401);
	}

	const token = authorization.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id, name } = decoded;
		req.user = { id, name };
		next();
	} catch (err) {
		throw new ApiError('Invalid authentication provided.', 401);
	}
};
