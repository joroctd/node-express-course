module.exports = {
	getHello: (req, res) => {
		res.json({ message: "Hello, you're successfully authenticated!" });
	}
};
