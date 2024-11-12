module.exports = (req, res) => {
	const { name } = req.body;
	if (!name) {
		res.status(400).json({ message: 'No cookie due to: No name provided' });
	} else if (req.cookies.name) {
		res
			.status(403)
			.json({ message: 'No cookie due to: Already have a cookie.' });
	} else {
		res.cookie('name', name);
		res.status(201).json({ message: 'Cookie acquired!', name });
	}
};
