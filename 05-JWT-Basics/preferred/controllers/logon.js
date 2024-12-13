const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');

module.exports = {
	logon: (req, res) => {
		const { name, password } = req.body;
		if (!name || !password) {
			throw new ApiError('No name and/or password provided.', 400);
		}

		// https://nodejs.org/api/crypto.html#cryptorandomuuidoptions
		const id = crypto.randomUUID({ disableEntropyCache: true });

		const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRY
		});

		res.json({ message: 'Logged in successfully.', token });
	}
};
