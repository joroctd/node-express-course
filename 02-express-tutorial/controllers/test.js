export default (req, res) => {
	res.status(200).json({ message: `Welcome ${req.user}!` });
};
