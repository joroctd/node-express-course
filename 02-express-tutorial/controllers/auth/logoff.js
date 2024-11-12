module.exports = (req, res) => {
	const { name } = req.cookies;
	if (name) {
		res.clearCookie('name');
		res
			.status(200)
			.json({ message: `${name} has been logged off successfully.` });
	} else {
		res.status(403).json({
			message: 'Failed: You are not currently logged in.'
		});
	}
};
