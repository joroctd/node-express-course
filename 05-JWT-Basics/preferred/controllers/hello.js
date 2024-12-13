module.exports = {
	getHello: (req, res) => {
		const {
			user: { username }
		} = req;
		res.json({
			message: `Hello ${username}, you're successfully authenticated!`
		});
	}
};
