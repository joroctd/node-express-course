import { ApiError } from '../errors/ApiError.js';

export default (err, req, res, next) => {
	if (err instanceof ApiError) {
		res.status(err.statusCode).json({ message: err.message });
		return;
	}

	res.status(500).json({ message: 'Generic server error occurred.' });
};
