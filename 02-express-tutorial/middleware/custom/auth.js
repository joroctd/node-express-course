export default (req, res, next) => {
	const { name } = req.cookies;
	if (!name) {
		res.status(401).json({ message: 'Unauthorized. Please log in.' });
		return;
	}

	req.user = name;
	next();
};
