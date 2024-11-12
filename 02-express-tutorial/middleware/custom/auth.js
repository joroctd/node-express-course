module.exports = (req, res, next) => {
	const { name } = req.cookies;
	if (!name) {
		res.status(401).json({ message: 'Unauthorized. Please log in.' });
	} else {
		req.user = name;
		next();
	}
};
