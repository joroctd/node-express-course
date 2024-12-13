const crypto = require('node:crypto');

module.exports = {
	getDashboard: (req, res) => {
		const {
			user: { name }
		} = req;

		const words = ['butane', 'propane', 'ethane', 'inane'];
		const getRandIndex = () => crypto.randomInt(words.length);
		// would normally use .env variables here
		const hashedWord = crypto
			.createHmac('sha256', words[getRandIndex()])
			.update(words[getRandIndex()])
			.digest('hex');
		const secret = `Top secret within: ${hashedWord}`;
		res.json({
			message: `Hello ${name}, you're successfully authenticated!`,
			secret
		});
	}
};
