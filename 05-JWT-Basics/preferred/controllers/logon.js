const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');

module.exports = {
	logon: (req, res) => {
		const { username, password } = req.body;
		if (!username || !password) {
			throw new ApiError('No username and/or password provided.', 400);
		}

		// https://nodejs.org/api/crypto.html#cryptorandomuuidoptions
		const id = crypto.randomUUID({ disableEntropyCache: true });

		// TODO: use jwt.sign to create a JWT
		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
			expiresIn: '1d'
		});

		res.json({ message: 'Logged in successfully.', token });
	}
};
