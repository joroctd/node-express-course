module.exports = {
	getHello: (req, res) => {
		const {
			user: { name }
		} = req;
		res.json({
			message: `Hello ${name}, you're successfully authenticated!`
		});
	}
};
