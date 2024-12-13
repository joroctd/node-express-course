const ApiError = require('../errors/ApiError');

module.exports = (err, req, res, next) => {
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({ message: err.message });
	}

	res.status(500).json({ message: 'Something went wrong.' });
};
